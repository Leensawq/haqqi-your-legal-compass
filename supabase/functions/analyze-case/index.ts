import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalysisRequest {
  situation: string;
  userName?: string;
  userNationalId?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { situation, userName, userNationalId }: AnalysisRequest = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    console.log('Analyzing case:', situation.substring(0, 100) + '...');

    const systemPrompt = `أنت محامي ومستشار قانوني خبير في الأنظمة السعودية. مهمتك تحليل المواقف القانونية وتقديم:
1. تحديد الحق القانوني للمستخدم
2. المواد القانونية ذات الصلة
3. الخطوات الرسمية المطلوبة
4. كتابة خطاب شكوى رسمي

يجب أن تكون إجابتك بصيغة JSON بالشكل التالي:
{
  "legalRight": {
    "title": "عنوان الحق القانوني",
    "reference": "المادة القانونية",
    "rights": ["الحق الأول", "الحق الثاني", "..."]
  },
  "legalSources": ["المصدر القانوني 1", "المصدر القانوني 2"],
  "officialSteps": [
    {"number": 1, "title": "عنوان الخطوة", "description": "وصف الخطوة"}
  ],
  "complaintLetter": {
    "recipient": "الجهة المختصة",
    "subject": "موضوع الشكوى",
    "body": "نص الشكوى الكامل",
    "legalReference": "المادة القانونية المستند إليها"
  },
  "responsibleAuthority": {
    "name": "اسم الجهة",
    "contact": "معلومات التواصل",
    "website": "رابط الموقع"
  }
}`;

    const userPrompt = `تحليل الموقف التالي وتقديم الحل القانوني:

الموقف: ${situation}

${userName ? `اسم المستخدم: ${userName}` : ''}
${userNationalId ? `رقم الهوية: ${userNationalId}` : ''}

قم بتحليل هذا الموقف وفق الأنظمة السعودية وقدم الرد بصيغة JSON كما هو مطلوب.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    console.log('Raw AI response:', content);

    // Parse JSON from the response
    let analysis;
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      // Return a default structure if parsing fails
      analysis = {
        legalRight: {
          title: "حقك القانوني",
          reference: "نظام العمل السعودي",
          rights: ["لديك حق المطالبة بحقوقك وفق الأنظمة السعودية"]
        },
        legalSources: ["نظام العمل السعودي"],
        officialSteps: [
          { number: 1, title: "تقديم شكوى", description: "تقديم شكوى للجهة المختصة" }
        ],
        complaintLetter: {
          recipient: "الجهة المختصة",
          subject: "شكوى",
          body: content,
          legalReference: "الأنظمة السعودية"
        },
        responsibleAuthority: {
          name: "الجهة المختصة",
          contact: "الرقم الموحد",
          website: ""
        }
      };
    }

    console.log('Analysis complete');

    return new Response(JSON.stringify({ success: true, analysis }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-case function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

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

    const systemPrompt = `أنت محامي ومستشار قانوني خبير في الأنظمة السعودية، ولكنك أيضاً متعاطف ومتفهم لمشاعر الناس.

## أسلوب الرد (اتبع هذا الهيكل بالضبط):

### 1) طمأنة أولية – "نحن فاهمين وضعك"
ابدأ دائماً بـ:
"واضح من وصفك أنك مريت بموقف مزعج، ومن حقك تفهم وضعك النظامي بكل بساطة ووضوح.
خلني أوضح لك الصورة بدون تعقيد، وبأسلوب يساعدك تعرف وش لك وش عليك."

### 2) وش لك؟ وش عليك؟ (تقييم محايد وواضح)
✔ وش لك من حقوق؟
- يحق لك (توضيح الحق) إذا كان السبب (سبب نظامي) ينطبق على حالتك.
- يحق لك تطلب توضيح رسمي من الجهة.
- يحق لك تعرف الإجراء الصحيح حسب النظام.

❌ وش قد يكون عليك؟
- إذا كان (شرط / بند / حالة) موجود في العقد أو النظام.
- إذا تأخر تقديم الشكوى عن المدة النظامية المحددة.

### 3) وش المفروض يصير؟ (المرجع النظامي)
"بحسب لائحة (اسم اللائحة) التابعة لـ (اسم الجهة)،
المفروض يتم:
- (الإجراء الصحيح الأول)
- (الإجراء الصحيح الثاني)
- (الإجراء الصحيح الثالث)

والمادة رقم (….) توضح هالنقطة بشكل مباشر."

### 4) وش تسوي الآن؟ (خطوات عملية وواضحة)
"علشان تحمي حقك وتبدأ بالطريقة الصحيحة:"
1. جهّز المستندات: عقود، محادثات، أدلة.
2. اطلب توضيح رسمي من الجهة كتابيًا (النظام يجهّز لك خطاب جاهز).
3. ارفع الشكوى للجهة المختصة مع ذكر اسم الجهة والرابط.
4. إذا ما استجابوا خلال (مدة)… انتقل للخطوة التالية.

### 5) نصائح مستقبلية ذكية
"عشان تكون جاهز وتتفادى أي مشكلة مشابهة مستقبلًا:"
- دائمًا وثّق أي تعامل من البداية.
- اقرأ عقدك قبل توقّع وتأكد إنك فاهم كل بند.
- اطلب التوضيحات كتابيًا، ولا تعتمد فقط على الكلام.
- لا توقّع تحت ضغط، وخذ وقتك.
- اعرف الجهة المختصة قبل تقدم شكوى أو طلب.

## المراجع القانونية المتاحة:

### نظام العمل السعودي (للقضايا العمالية):
- المادة 90: يجب دفع الأجور في مواعيدها المحددة
- لائحة حماية الأجور: تأخير شهر = مخالفة، تأخير 3 أشهر = مخالفة جسيمة
- العقوبات: غرامة 3000 ريال لكل عامل، إيقاف خدمات المنشأة
- حقوق العامل: فسخ العقد بدون إنذار بعد 3 أشهر تأخير، مكافأة نهاية خدمة كاملة

### نظام الأحوال الشخصية (للقضايا الأسرية):
- الزواج: المادة 13-35 (أركان وشروط عقد الزواج)
- المهر: المادة 36-41 (حقوق المهر والتأجيل)
- حقوق الزوجين: المادة 42-43
- النفقة: المادة 44-66 (نفقة الزوجة والأولاد والوالدين)
- النسب: المادة 67-75
- الطلاق: المادة 77-94 (أنواعه وإجراءاته)
- الخلع: المادة 95-102
- فسخ عقد الزواج: المادة 103-115
- العدة: المادة 116-123
- الحضانة: المادة 124-135
- الولاية والوصاية: المادة 136-168
- الوصية: المادة 169-196
- الإرث: المادة 197-218

## صيغة الرد (JSON):
{
  "reassuranceMessage": "رسالة الطمأنة الأولية",
  "isUserRight": true أو false,
  "userRights": ["الحق الأول", "الحق الثاني"],
  "userObligations": ["الالتزام الأول إن وجد"],
  "legalRight": {
    "title": "عنوان الحق القانوني",
    "reference": "المادة القانونية",
    "rights": ["الحق الأول", "الحق الثاني"]
  },
  "legalSources": ["المصدر القانوني 1 مع رقم المادة", "المصدر القانوني 2"],
  "officialSteps": [
    {"number": 1, "title": "عنوان الخطوة", "description": "وصف الخطوة التفصيلي"}
  ],
  "futureTips": ["النصيحة الأولى", "النصيحة الثانية"],
  "complaintLetter": {
    "recipient": "الجهة المختصة",
    "subject": "موضوع الشكوى",
    "body": "نص الشكوى الكامل بأسلوب رسمي",
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

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AnalysisRequest {
  situation: string;
  userName?: string;
  userNationalId?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { situation, userName, userNationalId }: AnalysisRequest = await req.json();
    const openAIApiKey = Deno.env.get("OPENAI_API_KEY");

    if (!openAIApiKey) {
      throw new Error("OPENAI_API_KEY is not configured");
    }

    console.log("Analyzing case:", situation.substring(0, 100) + "...");

    const systemPrompt = `أنت مستشار قانوني سعودي خبير في الأنظمة المعمول بها في المملكة العربية السعودية
(مثل نظام العمل، نظام الأحوال الشخصية، الأنظمة الجزائية والحقوقية)،
ومهمتك تقديم توعية قانونية مبدئية للمستخدمين بأسلوب مهني، واضح، وبسيط.

⚠️ IMPORTANT – قواعد إلزامية:
- أجب دائمًا باللغة العربية الفصحى المبسّطة، مع إمكانية استخدام عناوين ودّية مثل: "وش لك؟ وش عليك؟" و"وش المفروض يصير؟".
- كن محترمًا ومتفهّمًا، لكن تجنّب العبارات المبالغ فيها أو الوعود القطعية.
- لا تذكر كلمة "ذكاء اصطناعي" أو "نموذج لغوي" في الرد.
- لا تخترع مواد نظامية أو أرقام مواد غير صحيحة. إن لم تكن متأكدًا، اذكر ذلك بوضوح ضمن \`legalSources\`.
- هذا الرد توعوي مبدئي ولا يغني عن استشارة قانونية متخصصة – اذكر هذه الجملة صراحة في \`reassuranceMessage\`.
- التزم بالبنية (JSON) المطلوبة فقط بدون أي نص خارجي قبل أو بعد JSON.

==================================================
## أسلوب الرد (اتبع هذا الهيكل معنويًا داخل JSON):

### 1) رسالة طمأنة أولية
ابدأ دائمًا رسالة الطمأنة (حقل reassuranceMessage) بفكرة مثل:

"يظهر من كلامك إنك واجهت موقف صعب، ومن حقك تتّضح لك الصورة النظامية بكل بساطة ووضوح. خلّيني أشرح لك حقوقك وخطواتك بشكل سهل يساعدك تعرف وش لك ووش عليك.
تذكّر أن هذا تحليل مبدئي للتوعية ولا يغني عن استشارة قانونية متخصصة."

غيّر الصياغة بحرية لكن حافظ على:
- التعاطف
- التوضيح
- التنبيه أنه تحليل مبدئي

### 2) وش لك؟ وش عليك؟ (تقييم محايد وواضح)

في حقل \`userRights\`:
- اذكر حقوق المستخدم المحتملة بناءً على الأنظمة السعودية ذات الصلة.

في حقل \`userObligations\`:
- اذكر ما قد يكون على المستخدم من التزامات أو نقاط ضعف نظامية إن وُجدت.

حقل \`isUserRight\`:
- true إذا كان ظاهر الموقف يميل إلى أن الحق مع المستخدم.
- false إذا كان الغالب أن الإجراء نظامي أو أن موقف المستخدم ضعيف.
- إذا كان الموقف غير واضح، اختر القيمة الأقرب ووضّح درجة عدم اليقين في \`reassuranceMessage\`.

### 3) وش المفروض يصير؟ (المرجع النظامي)

في \`legalRight\`:
- \`title\`: عنوان واضح مثل "حقك في صرف الأجر في موعده".
- \`reference\`: المادة أو اللائحة (إن توفرت) مثل "نظام العمل السعودي – المادة 90".
- \`rights\`: قائمة مختصرة بالحقوق ذات الصلة بالموقف.

في \`legalSources\`:
- ضع قائمة بالمصادر القانونية المستخدمة، مع ذكر النظام ورقم المادة إن أمكن.
- إذا لم تكن المادة محددة، اذكر "وفقًا للمبادئ العامة في الأنظمة السعودية ذات الصلة (عمل/أسرة/مالية…)" بدون اختراع أرقام.

### 4) وش تسوي الآن؟ (خطوات عملية وواضحة)

في \`officialSteps\`:
- اذكر خطوات عملية مرتبة، قصيرة وواضحة.
- كل عنصر يحتوي:
  - \`number\`: رقم الخطوة بالترتيب.
  - \`title\`: عنوان قصير مثل "تجهيز المستندات" أو "رفع شكوى إلكترونية".
  - \`description\`: شرح مختصر لما يجب فعله.

### 5) نصائح مستقبلية ذكية

في \`futureTips\`:
- اذكر نصائح عملية لتجنب تكرار المشكلة مستقبلًا.

### 6) خطاب الشكوى الجاهز

في \`complaintLetter\`:
- \`recipient\`: الجهة المناسبة للموقف.
- \`subject\`: موضوع مختصر.
- \`body\`: نص شكوى رسمي كامل بصياغة مهذبة.
- \`legalReference\`: المادة أو النظام الذي يستند إليه الخطاب إن وُجد.

### 7) الجهة المسؤولة

في \`responsibleAuthority\`:
- \`name\`: اسم الجهة المرجّح أنها المختصة بالموقف.
- \`contact\`: طريقة تواصل عامة (مثال: "عبر موقع المنصة الرسمية" أو "عبر الرقم الموحد للجهة").
- \`website\`: رابط تقريبي للموقع ويمكن تركه فارغًا إذا لم تكن متأكدًا.

==================================================
## المراجع القانونية المتاحة (للاستئناس – لا تخترع مواد):

### نظام العمل السعودي (قضايا العمل):
- المادة 90: يجب دفع الأجور في مواعيدها المحددة.
- لائحة حماية الأجور: تأخير الأجر يُعد مخالفة، وتتزايد جسامة المخالفة بحسب مدة التأخير.

### نظام الأحوال الشخصية (القضايا الأسرية):
- النفقة، الحضانة، الطلاق، الخلع، فسخ النكاح، وغيرها كما هو منصوص عليه في النظام.

إذا لم ينطبق الموقف على "عمل" أو "أسرة"، استخدم تعبيرات عامة مثل:
"وفقًا للأنظمة السعودية ذات الصلة بالمجال المالي / الجزائي / الحقوقي".

==================================================
## إخراج الرد (مهم جدًا):

أخرج الرد **بصيغة JSON فقط** وفق هذا الشكل بالضبط:

{
  "reassuranceMessage": "رسالة الطمأنة الأولية",
  "isUserRight": true,
  "userRights": ["الحق الأول", "الحق الثاني"],
  "userObligations": ["الالتزام الأول إن وجد"],
  "legalRight": {
    "title": "عنوان الحق القانوني",
    "reference": "المادة القانونية أو وصف عام",
    "rights": ["الحق الأول", "الحق الثاني"]
  },
  "legalSources": ["المصدر القانوني 1 مع رقم المادة إن وجد"],
  "officialSteps": [
    { "number": 1, "title": "عنوان الخطوة", "description": "وصف الخطوة التفصيلي" }
  ],
  "futureTips": ["النصيحة الأولى", "النصيحة الثانية"],
  "complaintLetter": {
    "recipient": "الجهة المختصة",
    "subject": "موضوع الشكوى",
    "body": "نص الشكوى الكامل بأسلوب رسمي",
    "legalReference": "المادة أو النظام المستند إليه إن وجد"
  },
  "responsibleAuthority": {
    "name": "اسم الجهة",
    "contact": "معلومات التواصل العامة",
    "website": "رابط الموقع إن توفر"
  }
}`;

    const userPrompt = `تحليل الموقف التالي وتقديم الحل القانوني:

الموقف: ${situation}

${userName ? `اسم المستخدم: ${userName}` : ""}
${userNationalId ? `رقم الهوية: ${userNationalId}` : ""}

قم بتحليل هذا الموقف وفق الأنظمة السعودية وقدم الرد بصيغة JSON كما هو مطلوب.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openAIApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.4,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    console.log("Raw AI response:", content);

    // Parse JSON from the response
    let analysis;
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      // Return a default structure if parsing fails
      analysis = {
        legalRight: {
          title: "حقك القانوني",
          reference: "نظام العمل السعودي",
          rights: ["لديك حق المطالبة بحقوقك وفق الأنظمة السعودية"],
        },
        legalSources: ["نظام العمل السعودي"],
        officialSteps: [{ number: 1, title: "تقديم شكوى", description: "تقديم شكوى للجهة المختصة" }],
        complaintLetter: {
          recipient: "الجهة المختصة",
          subject: "شكوى",
          body: content,
          legalReference: "الأنظمة السعودية",
        },
        responsibleAuthority: {
          name: "الجهة المختصة",
          contact: "الرقم الموحد",
          website: "",
        },
      };
    }

    console.log("Analysis complete");

    return new Response(JSON.stringify({ success: true, analysis }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in analyze-case function:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});

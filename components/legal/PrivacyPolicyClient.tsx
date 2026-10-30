"use client";

import { useEffect } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiShield,
} from "react-icons/fi";

type PolicySection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  afterBullets?: string[];
};

type PrivacyCopy = {
  hero: {
    title: string;
    logistics: string;
    heading: string;
    paragraphs: string[];
  };

  directory: {
    label: string;
    titleLines: string[];
    description: string;
  };

  statement: {
    titleLines: string[];
    accent: string;
    description: string;
    principles: string[];
  };

  sections: PolicySection[];
};

type PrivacyPolicyClientProps = {
  lang: string;
};

const privacyCopy: Record<"en" | "ar", PrivacyCopy> = {
  en: {
    hero: {
      title: "Privacy Policy",
      logistics: "Logistics",
      heading: "YOUR INFORMATION. HANDLED RESPONSIBLY.",
      paragraphs: [
        "Difference Integrated respects your privacy and is committed to handling personal information responsibly. This Privacy Policy explains how we collect, use, store, and protect information when you visit our website, contact our team, or submit a transportation or logistics inquiry.",
        "By using this website or providing information to Difference Integrated, you acknowledge the practices described in this Privacy Policy.",
      ],
    },

    directory: {
      label: "Privacy Policy",
      titleLines: ["HOW WE", "HANDLE YOUR", "INFORMATION."],
      description:
        "A clear overview of how personal information is collected, used, protected, retained, and managed across our website and business interactions.",
    },

    statement: {
      titleLines: ["INFORMATION.", "RESPONSIBILITY."],
      accent: "CLEAR HANDLING.",
      description:
        "Personal information is handled according to the purpose for which it is collected and the requirements that apply to that interaction.",
      principles: [
        "Collect with purpose.",
        "Use responsibly.",
        "Protect information.",
      ],
    },

    sections: [
      {
        id: "information-we-collect",
        title: "Information We Collect",
        paragraphs: [
          "The information we collect depends on how you interact with our website and services.",
          "When you contact us or submit an inquiry, we may collect information such as:",
        ],
        bullets: [
          "Your name",
          "Company name",
          "Email address",
          "Phone number",
          "Project or service location",
          "Transportation or logistics requirements",
          "Material or cargo information",
          "Preferred schedule or timeline",
          "Information included in messages, forms, or other communications",
        ],
        afterBullets: [
          "We may also collect certain technical information automatically when you use our website, including device information, browser type, IP address, pages visited, and general website activity.",
        ],
      },

      {
        id: "how-we-use-information",
        title: "How We Use Your Information",
        paragraphs: [
          "We use the information we receive to manage legitimate business and website activities, including to:",
        ],
        bullets: [
          "Respond to questions and inquiries",
          "Review transportation and logistics requirements",
          "Prepare quotations or service proposals",
          "Coordinate project and service discussions",
          "Communicate with clients and business contacts",
          "Improve our website and digital experience",
          "Maintain website performance and security",
          "Keep appropriate operational and business records",
          "Meet applicable legal and regulatory requirements",
        ],
        afterBullets: [
          "We only use personal information for purposes that are relevant to the reason it was collected or as otherwise permitted by applicable law.",
        ],
      },

      {
        id: "project-service-information",
        title: "Project and Service Information",
        paragraphs: [
          "Transportation and logistics inquiries may require operational details so our team can properly understand the requirement.",
          "This information may include cargo or material type, quantity, route, project location, site conditions, required timeline, and other details relevant to transportation planning or logistics coordination.",
          "Please provide only the information reasonably necessary for us to review your requirement.",
        ],
      },

      {
        id: "cookies",
        title: "Cookies and Website Technologies",
        paragraphs: [
          "Our website may use cookies and similar technologies to support functionality, security, performance, and website analytics.",
          "Cookies may help us understand how visitors interact with the website and allow us to improve its usability and performance.",
          "You can manage or disable cookies through your browser settings. Some website features may not function as intended if certain cookies are disabled.",
        ],
      },

      {
        id: "sharing-information",
        title: "How We Share Information",
        paragraphs: [
          "Difference Integrated does not sell personal information.",
          "Information may be shared where reasonably necessary with authorized employees, technology providers, hosting providers, professional advisers, or other service providers that support our business and website operations.",
          "We may also disclose information when required to comply with applicable laws, regulations, legal processes, or requests from authorized government or regulatory bodies.",
          "Any sharing of information is limited to what is reasonably necessary for the relevant purpose.",
        ],
      },

      {
        id: "data-security",
        title: "Data Security",
        paragraphs: [
          "We take reasonable administrative, technical, and organizational measures to protect personal information against unauthorized access, misuse, loss, alteration, or disclosure.",
          "Access to personal information is limited to individuals or service providers who require it for legitimate business purposes.",
          "While we take appropriate steps to protect information, no website, communication method, or electronic storage system can guarantee complete security.",
        ],
      },

      {
        id: "data-retention",
        title: "Data Retention",
        paragraphs: [
          "We retain personal information only for as long as reasonably necessary for the purpose for which it was collected.",
          "Retention periods may depend on the nature of the inquiry, business relationship, service requirement, operational records, contractual obligations, and applicable legal or regulatory requirements.",
          "Information that is no longer required may be deleted, anonymized, or otherwise securely handled.",
        ],
      },

      {
        id: "privacy-rights",
        title: "Your Privacy Rights",
        paragraphs: [
          "Subject to applicable laws in the Kingdom of Saudi Arabia, you may have certain rights regarding your personal information.",
          "These may include the right to:",
        ],
        bullets: [
          "Request information about the personal data we hold",
          "Request access to your personal information",
          "Request correction of inaccurate or incomplete information",
          "Request deletion where applicable",
          "Withdraw consent where processing is based on consent",
          "Raise a concern regarding the way your information is handled",
        ],
        afterBullets: [
          "We may need to verify your identity before completing certain privacy-related requests.",
        ],
      },

      {
        id: "saudi-data-protection",
        title: "Saudi Data Protection Requirements",
        paragraphs: [
          "Difference Integrated handles personal information in accordance with applicable laws and regulations in the Kingdom of Saudi Arabia, including relevant requirements under the Saudi Personal Data Protection Law.",
          "Where required, personal information will be processed, stored, transferred, and retained in accordance with applicable regulatory requirements.",
        ],
      },

      {
        id: "international-transfers",
        title: "International Data Transfers",
        paragraphs: [
          "Some websites, hosting, communications, or technology providers may process information outside the Kingdom of Saudi Arabia.",
          "Where international transfers occur, appropriate measures will be taken where required to protect personal information and comply with applicable Saudi data protection requirements.",
        ],
      },

      {
        id: "third-party-links",
        title: "Third-Party Links",
        paragraphs: [
          "Our website may contain links to third-party websites or services.",
          "Difference Integrated does not control the privacy practices, security, or content of third-party websites. We encourage visitors to review the privacy policies of those websites before providing personal information.",
        ],
      },

      {
        id: "childrens-privacy",
        title: "Children's Privacy",
        paragraphs: [
          "Difference Integrated's website and services are intended for professional and commercial use.",
          "We do not knowingly seek to collect personal information from children through this website.",
          "If we become aware that information has been submitted by a child without appropriate authorization, we will take reasonable steps to address the matter in accordance with applicable law.",
        ],
      },

      {
        id: "communications",
        title: "Communications",
        paragraphs: [
          "If you contact Difference Integrated regarding a service, quotation, project, or transportation requirement, we may use the contact information you provide to respond and continue communication regarding that request.",
          "Operational or service-related communications may continue where necessary to manage an active inquiry, project, or business relationship.",
        ],
      },

      {
        id: "policy-changes",
        title: "Changes to This Privacy Policy",
        paragraphs: [
          "We may update this Privacy Policy from time to time to reflect changes in our website, business practices, technology, or applicable legal requirements.",
          "Any updated version will be published on this page with a revised Last Updated date.",
          "We encourage visitors to review this page periodically.",
        ],
      },
    ],
  },

  ar: {
    hero: {
      title: "سياسة الخصوصية",
      logistics: "الخدمات اللوجستية",
      heading: "معلوماتك. نتعامل معها بمسؤولية.",
      paragraphs: [
        "تحترم دفرنس إنتغريتد خصوصيتك وتلتزم بالتعامل مع المعلومات الشخصية بمسؤولية. توضح سياسة الخصوصية هذه كيفية جمع المعلومات واستخدامها وتخزينها وحمايتها عند زيارة موقعنا الإلكتروني أو التواصل مع فريقنا أو إرسال استفسار متعلق بالنقل أو الخدمات اللوجستية.",
        "باستخدام هذا الموقع الإلكتروني أو تزويد دفرنس إنتغريتد بالمعلومات، فإنك تقر بالممارسات الموضحة في سياسة الخصوصية هذه.",
      ],
    },

    directory: {
      label: "سياسة الخصوصية",
      titleLines: ["كيف", "نتعامل مع", "معلوماتك."],
      description:
        "نظرة واضحة على كيفية جمع المعلومات الشخصية واستخدامها وحمايتها والاحتفاظ بها وإدارتها عبر موقعنا الإلكتروني وتفاعلاتنا التجارية.",
    },

    statement: {
      titleLines: ["المعلومات.", "المسؤولية."],
      accent: "تعامل واضح.",
      description:
        "يتم التعامل مع المعلومات الشخصية وفقاً للغرض الذي جُمعت من أجله والمتطلبات التي تنطبق على ذلك التفاعل.",
      principles: [
        "نجمع المعلومات لغرض واضح.",
        "نستخدمها بمسؤولية.",
        "نحمي المعلومات.",
      ],
    },

    sections: [
      {
        id: "information-we-collect",
        title: "المعلومات التي نجمعها",
        paragraphs: [
          "تعتمد المعلومات التي نجمعها على كيفية تفاعلك مع موقعنا الإلكتروني وخدماتنا.",
          "عند التواصل معنا أو إرسال استفسار، قد نجمع معلومات مثل:",
        ],
        bullets: [
          "اسمك",
          "اسم الشركة",
          "عنوان البريد الإلكتروني",
          "رقم الهاتف",
          "موقع المشروع أو الخدمة",
          "متطلبات النقل أو الخدمات اللوجستية",
          "معلومات المواد أو الشحنة",
          "الجدول أو الإطار الزمني المفضل",
          "المعلومات الواردة في الرسائل أو النماذج أو غيرها من وسائل التواصل",
        ],
        afterBullets: [
          "قد نجمع أيضاً بعض المعلومات التقنية تلقائياً عند استخدام موقعنا الإلكتروني، بما في ذلك معلومات الجهاز ونوع المتصفح وعنوان بروتوكول الإنترنت (IP) والصفحات التي تمت زيارتها والنشاط العام على الموقع.",
        ],
      },

      {
        id: "how-we-use-information",
        title: "كيف نستخدم معلوماتك",
        paragraphs: [
          "نستخدم المعلومات التي نتلقاها لإدارة أنشطة الأعمال والموقع الإلكتروني المشروعة، بما في ذلك:",
        ],
        bullets: [
          "الرد على الأسئلة والاستفسارات",
          "مراجعة متطلبات النقل والخدمات اللوجستية",
          "إعداد عروض الأسعار أو مقترحات الخدمات",
          "تنسيق مناقشات المشاريع والخدمات",
          "التواصل مع العملاء وجهات الاتصال التجارية",
          "تحسين موقعنا الإلكتروني وتجربتنا الرقمية",
          "الحفاظ على أداء الموقع وأمنه",
          "الاحتفاظ بالسجلات التشغيلية والتجارية المناسبة",
          "الامتثال للمتطلبات القانونية والتنظيمية المعمول بها",
        ],
        afterBullets: [
          "نستخدم المعلومات الشخصية فقط للأغراض ذات الصلة بالسبب الذي جُمعت من أجله أو على النحو المسموح به بموجب الأنظمة المعمول بها.",
        ],
      },

      {
        id: "project-service-information",
        title: "معلومات المشروع والخدمة",
        paragraphs: [
          "قد تتطلب استفسارات النقل والخدمات اللوجستية تفاصيل تشغيلية حتى يتمكن فريقنا من فهم المتطلبات بالشكل المناسب.",
          "قد تشمل هذه المعلومات نوع الشحنة أو المادة والكمية والمسار وموقع المشروع وظروف الموقع والجدول الزمني المطلوب وغيرها من التفاصيل المتعلقة بتخطيط النقل أو تنسيق الخدمات اللوجستية.",
          "يرجى تقديم المعلومات الضرورية بصورة معقولة فقط لتمكيننا من مراجعة متطلباتك.",
        ],
      },

      {
        id: "cookies",
        title: "ملفات تعريف الارتباط وتقنيات الموقع",
        paragraphs: [
          "قد يستخدم موقعنا الإلكتروني ملفات تعريف الارتباط وتقنيات مشابهة لدعم الوظائف والأمان والأداء وتحليلات الموقع.",
          "قد تساعدنا ملفات تعريف الارتباط على فهم كيفية تفاعل الزوار مع الموقع وتمكننا من تحسين سهولة استخدامه وأدائه.",
          "يمكنك إدارة ملفات تعريف الارتباط أو تعطيلها من خلال إعدادات المتصفح. وقد لا تعمل بعض ميزات الموقع بالشكل المقصود عند تعطيل بعض ملفات تعريف الارتباط.",
        ],
      },

      {
        id: "sharing-information",
        title: "كيف نشارك المعلومات",
        paragraphs: [
          "لا تقوم دفرنس إنتغريتد ببيع المعلومات الشخصية.",
          "قد تتم مشاركة المعلومات عند الضرورة المعقولة مع الموظفين المصرح لهم أو مزودي التقنية أو خدمات الاستضافة أو المستشارين المهنيين أو غيرهم من مقدمي الخدمات الذين يدعمون أعمالنا وعمليات موقعنا الإلكتروني.",
          "وقد نفصح أيضاً عن المعلومات عندما يكون ذلك مطلوباً للامتثال للأنظمة أو اللوائح أو الإجراءات القانونية المعمول بها أو لطلبات الجهات الحكومية أو التنظيمية المختصة.",
          "تقتصر أي مشاركة للمعلومات على القدر الضروري بصورة معقولة للغرض ذي الصلة.",
        ],
      },

      {
        id: "data-security",
        title: "أمن البيانات",
        paragraphs: [
          "نتخذ تدابير إدارية وتقنية وتنظيمية معقولة لحماية المعلومات الشخصية من الوصول غير المصرح به أو إساءة الاستخدام أو الفقد أو التعديل أو الإفصاح.",
          "يقتصر الوصول إلى المعلومات الشخصية على الأشخاص أو مقدمي الخدمات الذين يحتاجون إليها لأغراض تجارية مشروعة.",
          "على الرغم من اتخاذنا خطوات مناسبة لحماية المعلومات، فلا يمكن لأي موقع إلكتروني أو وسيلة اتصال أو نظام تخزين إلكتروني ضمان الأمان الكامل.",
        ],
      },

      {
        id: "data-retention",
        title: "الاحتفاظ بالبيانات",
        paragraphs: [
          "نحتفظ بالمعلومات الشخصية فقط للمدة اللازمة بصورة معقولة لتحقيق الغرض الذي جُمعت من أجله.",
          "قد تعتمد فترات الاحتفاظ على طبيعة الاستفسار والعلاقة التجارية ومتطلبات الخدمة والسجلات التشغيلية والالتزامات التعاقدية والمتطلبات القانونية أو التنظيمية المعمول بها.",
          "يجوز حذف المعلومات التي لم تعد مطلوبة أو إخفاء هويتها أو التعامل معها بطريقة آمنة أخرى.",
        ],
      },

      {
        id: "privacy-rights",
        title: "حقوقك المتعلقة بالخصوصية",
        paragraphs: [
          "وفقاً للأنظمة المعمول بها في المملكة العربية السعودية، قد تتمتع بحقوق معينة تتعلق بمعلوماتك الشخصية.",
          "وقد تشمل هذه الحقوق ما يلي:",
        ],
        bullets: [
          "طلب معلومات عن البيانات الشخصية التي نحتفظ بها",
          "طلب الوصول إلى معلوماتك الشخصية",
          "طلب تصحيح المعلومات غير الدقيقة أو غير المكتملة",
          "طلب الحذف حيثما ينطبق ذلك",
          "سحب الموافقة عندما تكون المعالجة قائمة على الموافقة",
          "إبداء ملاحظة أو شكوى بشأن كيفية التعامل مع معلوماتك",
        ],
        afterBullets: [
          "قد نحتاج إلى التحقق من هويتك قبل إكمال بعض الطلبات المتعلقة بالخصوصية.",
        ],
      },

      {
        id: "saudi-data-protection",
        title: "متطلبات حماية البيانات في السعودية",
        paragraphs: [
          "تتعامل دفرنس إنتغريتد مع المعلومات الشخصية وفقاً للأنظمة واللوائح المعمول بها في المملكة العربية السعودية، بما في ذلك المتطلبات ذات الصلة بموجب نظام حماية البيانات الشخصية السعودي.",
          "عند الاقتضاء، ستتم معالجة المعلومات الشخصية وتخزينها ونقلها والاحتفاظ بها وفقاً للمتطلبات التنظيمية المعمول بها.",
        ],
      },

      {
        id: "international-transfers",
        title: "نقل البيانات دولياً",
        paragraphs: [
          "قد يقوم بعض مزودي خدمات المواقع الإلكترونية أو الاستضافة أو الاتصالات أو التقنية بمعالجة المعلومات خارج المملكة العربية السعودية.",
          "عند حدوث عمليات نقل دولية، سيتم اتخاذ التدابير المناسبة عند الاقتضاء لحماية المعلومات الشخصية والامتثال لمتطلبات حماية البيانات السعودية المعمول بها.",
        ],
      },

      {
        id: "third-party-links",
        title: "روابط الجهات الخارجية",
        paragraphs: [
          "قد يحتوي موقعنا الإلكتروني على روابط لمواقع أو خدمات تابعة لجهات خارجية.",
          "لا تتحكم دفرنس إنتغريتد في ممارسات الخصوصية أو الأمان أو محتوى المواقع التابعة لجهات خارجية. ونشجع الزوار على مراجعة سياسات الخصوصية الخاصة بتلك المواقع قبل تقديم المعلومات الشخصية.",
        ],
      },

      {
        id: "childrens-privacy",
        title: "خصوصية الأطفال",
        paragraphs: [
          "موقع دفرنس إنتغريتد وخدماتها مخصصة للاستخدام المهني والتجاري.",
          "لا نسعى عن علم إلى جمع معلومات شخصية من الأطفال عبر هذا الموقع الإلكتروني.",
          "إذا علمنا بأن معلومات قد تم تقديمها من طفل دون تصريح مناسب، فسنتخذ خطوات معقولة لمعالجة الأمر وفقاً للأنظمة المعمول بها.",
        ],
      },

      {
        id: "communications",
        title: "الاتصالات",
        paragraphs: [
          "إذا تواصلت مع دفرنس إنتغريتد بشأن خدمة أو عرض سعر أو مشروع أو متطلبات نقل، فقد نستخدم معلومات الاتصال التي تقدمها للرد عليك ومواصلة التواصل بشأن ذلك الطلب.",
          "قد تستمر الاتصالات التشغيلية أو المتعلقة بالخدمة عند الضرورة لإدارة استفسار نشط أو مشروع أو علاقة تجارية.",
        ],
      },

      {
        id: "policy-changes",
        title: "التغييرات على سياسة الخصوصية",
        paragraphs: [
          "قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر لتعكس التغييرات في موقعنا الإلكتروني أو ممارساتنا التجارية أو التقنية أو المتطلبات القانونية المعمول بها.",
          "سيتم نشر أي نسخة محدثة على هذه الصفحة مع تعديل تاريخ آخر تحديث.",
          "نشجع الزوار على مراجعة هذه الصفحة بشكل دوري.",
        ],
      },
    ],
  },
};

function PrivacyHero({
  copy,
  isArabic,
}: {
  copy: PrivacyCopy["hero"];
  isArabic: boolean;
}) {
  return (
    <section
      id="hero"
      className="hero-about relative flex h-screen min-h-[760px] flex-col justify-end bg-cover bg-center text-white max-[1025px]:min-h-[680px]"
      style={{
        backgroundImage: "url('/assets/img/about/privacy-policy.webp')",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[#19255b]/50" />

      <div className="hero-about__container di-container relative z-[2] pb-[110rem] max-[1025px]:pb-[40rem]">
        <div className="hero-about__head main-animated-text relative mb-[155rem] flex items-end justify-between pb-[10rem] max-[1025px]:mb-[40rem] max-[1025px]:flex-col max-[1025px]:items-stretch">
          <h1
            className={`hero-about__title leading-[.8] uppercase max-[1025px]:mb-[75rem] ${
              isArabic
                ? "text-[120rem] max-[1025px]:text-[58rem]"
                : "text-[170rem] max-[1025px]:text-[70rem]"
            }`}
          >
            {copy.title}
          </h1>

          <div className="hero-about__abb flex w-[1100rem] items-center justify-between text-[40rem] leading-[.9] max-[1025px]:w-full max-[1025px]:text-[max(16px,20rem)]">
            <div
              dir="ltr"
              className="hero-about__abb-wrapper flex gap-[160rem] max-[1025px]:gap-[20rem]"
            >
              <span className="hero-about__abb-item">D.</span>
              <span className="hero-about__abb-item">I.</span>
            </div>

            <span className="hero-about__abb-text text-[40rem] leading-[.9] uppercase max-[1025px]:text-[max(16px,20rem)]">
              {copy.logistics}
            </span>
          </div>

          <span className="main-animated-line absolute bottom-0 left-0 h-[1rem] w-0 bg-white/30" />
        </div>

        <div className="hero-about__container-inner main-opacity-block ms-[740rem] flex max-w-[720rem] flex-col gap-[20rem] max-[1025px]:ms-0 max-[1025px]:max-w-none max-[1025px]:gap-[10rem]">
          <h2 className="text-[30rem] font-bold uppercase leading-[1.05] max-[1025px]:mb-[10rem] max-[1025px]:text-[max(16px,20rem)]">
            {copy.heading}
          </h2>

          {copy.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="font-['Inter'] text-[max(16px,20rem)] font-normal leading-[max(1.35em,27rem)] max-[1025px]:text-[max(14px,14rem)] max-[1025px]:leading-[max(1.35em,20rem)]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function PolicyDirectory({
  copy,
  sections,
  isArabic,
}: {
  copy: PrivacyCopy["directory"];
  sections: PolicySection[];
  isArabic: boolean;
}) {
  const Arrow = isArabic ? FiArrowLeft : FiArrowRight;

  return (
    <section className="relative overflow-hidden bg-white py-[130rem] max-[1025px]:py-[75rem]">
      <div className="di-container">
        <div className="grid grid-cols-[.72fr_1.28fr] gap-[120rem] max-[1025px]:grid-cols-1 max-[1025px]:gap-[55rem]">
          <div className="privacy-reveal privacy-reveal-left" data-reveal>
            <div className="mb-[28rem] flex items-center gap-[18rem]">
              <FiShield className="privacy-icon-reveal h-[30rem] w-[30rem] text-[var(--di-accent)]" />

              <span className="text-[max(13px,13rem)] font-medium uppercase tracking-[.12em] text-[var(--di-accent)]">
                {copy.label}
              </span>
            </div>

            <h2 className="max-w-[650rem] text-[82rem] font-bold uppercase leading-[.86] text-[var(--di-primary)] max-[1025px]:text-[48rem]">
              {copy.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>

            <p className="mt-[38rem] max-w-[580rem] font-['Inter'] text-[max(16px,19rem)] leading-[max(1.35em,29rem)] text-black/60">
              {copy.description}
            </p>
          </div>

          <div
            className="privacy-directory grid grid-cols-2 gap-x-[70rem] max-[700px]:grid-cols-1"
            data-reveal
          >
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="privacy-directory-item group flex min-h-[76rem] items-center justify-between gap-[25rem] border-b border-[var(--di-primary)]/15 py-[18rem] font-['Inter'] text-[max(16px,16rem)] font-medium leading-[max(1.35em,21rem)] text-[var(--di-primary)] transition-colors duration-300 hover:border-[var(--di-accent)] hover:text-[var(--di-accent)]"
                style={{
                  transitionDelay: `${index * 35}ms`,
                }}
              >
                <span>{section.title}</span>

                <Arrow
                  className={`h-[21rem] w-[21rem] shrink-0 transition-transform duration-300 ${
                    isArabic
                      ? "group-hover:-translate-x-[5rem]"
                      : "group-hover:translate-x-[5rem]"
                  }`}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PolicyBlock({
  section,
  index,
}: {
  section: PolicySection;
  index: number;
}) {
  const dark = (index + 1) % 4 === 0;

  return (
    <section
      id={section.id}
      className={`privacy-section relative scroll-mt-[110rem] overflow-hidden py-[95rem] max-[1025px]:py-[64rem] ${
        dark
          ? "bg-[var(--di-primary)] text-white"
          : "bg-[var(--di-light)] text-[var(--di-primary)]"
      }`}
    >
      <div className="di-container">
        <div className="grid grid-cols-[.74fr_1.26fr] gap-[120rem] max-[1025px]:grid-cols-1 max-[1025px]:gap-[38rem]">
          <div className="privacy-reveal privacy-reveal-left" data-reveal>
            <h2 className="max-w-[640rem] text-[58rem] font-bold uppercase leading-[.9] max-[1025px]:text-[39rem] max-[600px]:text-[34rem]">
              {section.title}
            </h2>
          </div>

          <div
            className="privacy-reveal privacy-reveal-right max-w-[800rem] font-['Inter']"
            data-reveal
          >
            <div
              className={`space-y-[22rem] text-[max(16px,18rem)] leading-[max(1.35em,29rem)] ${
                dark ? "text-white/72" : "text-black/68"
              }`}
            >
              {section.paragraphs?.map((paragraph, index) => (
                <p key={index} className="privacy-copy">
                  {paragraph}
                </p>
              ))}

              {section.bullets && (
                <div
                  className={`privacy-bullet-list mt-[32rem] overflow-hidden rounded-[10rem] border ${
                    dark
                      ? "border-white/15 bg-white/[0.035]"
                      : "border-[var(--di-primary)]/10 bg-white/45"
                  }`}
                >
                  {section.bullets.map((item, bulletIndex) => (
                    <div
                      key={bulletIndex}
                      className={`privacy-bullet-row flex items-start gap-[17rem] px-[22rem] py-[17rem] ${
                        bulletIndex !== section.bullets!.length - 1
                          ? dark
                            ? "border-b border-white/10"
                            : "border-b border-[var(--di-primary)]/10"
                          : ""
                      }`}
                    >
                      <FiCheckCircle className="privacy-check-icon mt-[2rem] h-[20rem] w-[20rem] shrink-0 text-[var(--di-accent)]" />

                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {section.afterBullets?.map((paragraph, index) => (
                <p key={index} className="privacy-copy pt-[5rem]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PrivacyStatement({ copy }: { copy: PrivacyCopy["statement"] }) {
  return (
    <section className="relative overflow-hidden bg-white py-[140rem] max-[1025px]:py-[85rem]">
      <div className="di-container">
        <div className="mx-auto max-w-[1540rem]">
          <div className="privacy-statement-title" data-reveal>
            <h2 className="max-w-[1350rem] text-[105rem] font-bold uppercase leading-[.84] text-[var(--di-primary)] max-[1025px]:text-[58rem]">
              {copy.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}

              <span className="block text-[var(--di-accent)]">
                {copy.accent}
              </span>
            </h2>
          </div>

          <div className="mt-[65rem] grid grid-cols-[1fr_.9fr] gap-[120rem] max-[1025px]:grid-cols-1">
            <div
              className="privacy-reveal privacy-reveal-left max-w-[680rem] font-['Inter'] text-[max(16px,20rem)] leading-[max(1.35em,29rem)] text-black/65"
              data-reveal
            >
              <p>{copy.description}</p>
            </div>

            <div className="privacy-principles grid gap-[16rem]" data-reveal>
              {copy.principles.map((item) => (
                <div
                  key={item}
                  className="privacy-principle flex items-center gap-[20rem] font-['Inter'] text-[max(16px,24rem)] font-semibold uppercase text-[var(--di-primary)]"
                >
                  <FiShield className="privacy-icon-reveal h-[28rem] w-[28rem] shrink-0 text-[var(--di-accent)]" />

                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PrivacyPolicyClient({
  lang,
}: PrivacyPolicyClientProps) {
  const isArabic = lang.toLowerCase().startsWith("ar");
  const copy = privacyCopy[isArabic ? "ar" : "en"];

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      elements.forEach((element) => {
        element.classList.add("is-visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [lang]);

  return (
    <>
      <main
        className={`privacy-page overflow-hidden ${
          isArabic ? "privacy-page--rtl" : ""
        }`}
        dir={isArabic ? "rtl" : "ltr"}
        lang={isArabic ? "ar" : "en"}
      >
        <PrivacyHero copy={copy.hero} isArabic={isArabic} />

        <PolicyDirectory
          copy={copy.directory}
          sections={copy.sections}
          isArabic={isArabic}
        />

        {copy.sections.slice(0, 7).map((section, index) => (
          <PolicyBlock key={section.id} section={section} index={index} />
        ))}

        <PrivacyStatement copy={copy.statement} />

        {copy.sections.slice(7).map((section, index) => (
          <PolicyBlock key={section.id} section={section} index={index + 7} />
        ))}
      </main>

      <style jsx global>{`
        .privacy-page--rtl {
          text-align: right;
        }

        .privacy-reveal {
          opacity: 0;
          transform: translateY(28rem);
          transition:
            opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .privacy-reveal.is-visible,
        .privacy-directory.is-visible,
        .privacy-statement-title.is-visible,
        .privacy-principles.is-visible {
          opacity: 1;
          transform: none;
        }

        .privacy-copy,
        .privacy-bullet-row,
        .privacy-check-icon,
        .privacy-icon-reveal,
        .privacy-principle {
          transition:
            opacity 0.7s ease,
            transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .privacy-check-icon,
        .privacy-icon-reveal {
          color: var(--di-accent);
        }

        @media (prefers-reduced-motion: reduce) {
          .privacy-reveal,
          .privacy-copy,
          .privacy-bullet-row,
          .privacy-check-icon,
          .privacy-icon-reveal,
          .privacy-principle,
          .privacy-statement-title {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}

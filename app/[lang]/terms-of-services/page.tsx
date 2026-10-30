"use client";

import { useLayoutEffect, useRef } from "react";
import { useParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight, FiCheckCircle, FiFileText } from "react-icons/fi";

import { PageTransition } from "@/components/ui/PageTransition";

type TermsSection = {
  id: string;
  number: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  afterBullets?: string[];
};

type TermsCopy = {
  hero: {
    titlePrimary: string;
    titleAccent: string;
    description: string;
    updated: string;
  };

  intro: {
    title: string;
    paragraphs: string[];
  };

  directoryTitle: string;

  sections: TermsSection[];
};

const termsCopy: Record<"en" | "ar", TermsCopy> = {
  en: {
    hero: {
      titlePrimary: "Website Terms",
      titleAccent: "of Service",
      description:
        "These Website Terms of Service govern your access to and use of https://differenceintegrated.sa, including its pages, content, forms, functions, and related online services.",
      updated: "Last Updated: 28 July 2026",
    },

    intro: {
      title: "Clear Terms for Website Use.",
      paragraphs: [
        "The website is owned and operated by Difference Integrated [insert full registered legal entity name], a logistics and heavy transport business operating in the Kingdom of Saudi Arabia.",
        "By accessing or using the website, you acknowledge that you have read, understood, and agreed to these Terms. If you do not agree to these Terms, you must discontinue your use of the website.",
      ],
    },

    directoryTitle: "On This Page",

    sections: [
      {
        id: "about-difference-integrated",
        number: "01",
        title: "About Difference Integrated",
        paragraphs: [
          "Difference Integrated provides logistics and heavy transport solutions supporting construction and infrastructure projects in Saudi Arabia.",
          "Our services may include:",
        ],
        bullets: [
          "Transportation of sand;",
          "Transportation of aggregates and fill materials;",
          "Bulk construction material transport;",
          "Heavy dumper logistics;",
          "Route planning;",
          "Transport scheduling;",
          "Loading and unloading coordination;",
          "Project-site coordination;",
          "Other related transport and logistics support.",
        ],
        afterBullets: [
          "The precise scope, price, availability, schedule, route, operational requirements, and contractual terms of any service will be determined through a separate quotation, purchase order, work order, contract, or service agreement.",
        ],
      },

      {
        id: "purpose-of-the-website",
        number: "02",
        title: "Purpose of the Website",
        paragraphs: [
          "The website is provided primarily for general information and business inquiry purposes.",
          "It allows visitors to:",
        ],
        bullets: [
          "Learn about Difference Integrated;",
          "Review our services and fleet capabilities;",
          "Submit service inquiries;",
          "Request further information;",
          "Discuss logistics requirements;",
          "Explore potential project or partnership opportunities.",
        ],
        afterBullets: [
          "The website does not, by itself, constitute a transportation booking platform, customer account portal, payment platform, or legally binding logistics agreement unless a specific website feature expressly states otherwise.",
        ],
      },

      {
        id: "no-automatic-service-contract",
        number: "03",
        title: "No Automatic Service Contract",
        paragraphs: [
          "Submitting a contact form, requesting a quotation, sending an email, calling our team, or otherwise contacting Difference Integrated does not automatically create a contract or require Difference Integrated to provide any service.",
          "A binding service relationship will arise only after the relevant parties have agreed to the applicable commercial and operational terms through an authorized written quotation, purchase order, work order, signed agreement, or other recognized contracting method.",
          "Website content does not override the terms of a separately signed agreement. Where these Website Terms conflict with an executed service contract, the executed service contract will govern the relevant logistics services.",
        ],
      },

      {
        id: "quotations-and-service-information",
        number: "04",
        title: "Quotations and Service Information",
        paragraphs: [
          "Any quotation, estimate, schedule, capacity statement, availability indication, or other commercial information provided through or following a website inquiry may be subject to:",
        ],
        bullets: [
          "Project location;",
          "Material type and quantity;",
          "Loading and unloading conditions;",
          "Route availability;",
          "Distance and travel time;",
          "Vehicle and driver availability;",
          "Site-access requirements;",
          "Road and weather conditions;",
          "Regulatory restrictions;",
          "Permitted operating hours;",
          "Load limits;",
          "Fuel and operating costs;",
          "Safety requirements;",
          "Taxes and government charges;",
          "Information provided by the customer;",
          "Other operational considerations.",
        ],
        afterBullets: [
          "Unless otherwise stated in writing, website information and preliminary discussions should not be treated as a final quotation or guaranteed commitment.",
          "Difference Integrated may correct errors, revise estimates, update availability, or withdraw a proposal before a binding agreement is concluded.",
        ],
      },

      {
        id: "customer-information-and-responsibilities",
        number: "05",
        title: "Customer Information and Responsibilities",
        paragraphs: [
          "When submitting an inquiry or requesting services, you agree to provide information that is accurate, current, complete, and not misleading.",
          "You are responsible for providing relevant details, including where applicable:",
        ],
        bullets: [
          "Your correct contact information;",
          "Company and project information;",
          "Material type and estimated quantity;",
          "Collection and delivery locations;",
          "Access limitations;",
          "Loading and unloading requirements;",
          "Required dates and operating windows;",
          "Site conditions;",
          "Required permits or approvals;",
          "Health, safety, environmental, or security requirements;",
          "Any unusual risks or operating conditions.",
        ],
        afterBullets: [
          "Difference Integrated will not be responsible for delays, additional costs, inability to perform, safety issues, or other consequences resulting from incomplete, inaccurate, delayed, or misleading information supplied by the customer or another party.",
        ],
      },

      {
        id: "operational-and-regulatory-requirements",
        number: "06",
        title: "Operational and Regulatory Requirements",
        paragraphs: [
          "Heavy transport operations are subject to operational, legal, safety, and regulatory requirements.",
          "Service availability and performance may be affected by matters including:",
        ],
        bullets: [
          "Saudi transport laws and regulations;",
          "Vehicle weight and load restrictions;",
          "Route restrictions;",
          "City-entry restrictions;",
          "Permitted transport hours;",
          "Road closures or diversions;",
          "Government or security instructions;",
          "Permit requirements;",
          "Construction-site procedures;",
          "Driver working-hour and fatigue-management requirements;",
          "Vehicle inspections and maintenance;",
          "Weather, visibility, and environmental conditions.",
        ],
        afterBullets: [
          "Difference Integrated reserves the right to modify, postpone, reroute, suspend, or decline an operation where reasonably necessary for legal compliance, public safety, driver safety, fleet protection, site safety, or operational feasibility.",
        ],
      },

      {
        id: "acceptable-use",
        number: "07",
        title: "Acceptable Use",
        paragraphs: [
          "You may use the website only for lawful and legitimate purposes.",
          "You must not:",
        ],
        bullets: [
          "Use the website in violation of any applicable law;",
          "Submit false, fraudulent, deceptive, or misleading information;",
          "Impersonate another person or organization;",
          "Attempt to gain unauthorized access to the website, server, network, or data;",
          "Introduce viruses, malware, harmful scripts, or malicious code;",
          "Interfere with the website’s operation, availability, or security;",
          "Use automated systems to scrape, copy, extract, or overload website content without authorization;",
          "Test or probe website vulnerabilities without written permission;",
          "Use website content to compete unfairly with or misrepresent Difference Integrated;",
          "Send spam, abusive messages, threats, or unlawful material;",
          "Infringe intellectual-property, confidentiality, privacy, or other legal rights;",
          "Use the website for unauthorized advertising or solicitation.",
        ],
        afterBullets: [
          "We may restrict or block access where we reasonably believe these Terms have been violated or the website is being misused.",
        ],
      },

      {
        id: "intellectual-property",
        number: "08",
        title: "Intellectual Property",
        paragraphs: [
          "Unless otherwise stated, all website content is owned by, licensed to, or lawfully used by Difference Integrated, including:",
        ],
        bullets: [
          "Company names and branding;",
          "Logos;",
          "Text;",
          "Graphics;",
          "Photographs;",
          "Videos;",
          "Icons;",
          "Designs;",
          "Page layouts;",
          "Documents;",
          "Website code and functionality.",
        ],
        afterBullets: [
          "Website content is protected by applicable intellectual-property laws.",
          "You may view and download limited website content for your own lawful, internal, and non-commercial evaluation of our services.",
          "You may not reproduce, republish, modify, distribute, sell, license, display, create derivative works from, or commercially exploit website content without prior written permission from Difference Integrated or the relevant rights holder.",
          "No ownership or intellectual-property rights are transferred to you through your use of the website.",
        ],
      },

      {
        id: "trademarks",
        number: "09",
        title: "Trademarks",
        paragraphs: [
          "The Difference Integrated name, logo, service names, designs, and associated branding may be trademarks or protected commercial identifiers.",
          "You may not use them in a manner that:",
        ],
        bullets: [
          "Suggests an unauthorized relationship or endorsement;",
          "Creates confusion regarding ownership or affiliation;",
          "Misrepresents our services;",
          "Damages our reputation;",
          "Violates applicable trademark or commercial laws.",
        ],
      },

      {
        id: "website-information-and-accuracy",
        number: "10",
        title: "Website Information and Accuracy",
        paragraphs: [
          "We aim to keep website information accurate and reasonably current. However:",
        ],
        bullets: [
          "Website content is provided for general information;",
          "Service descriptions may be summarized;",
          "Fleet specifications or capabilities may change;",
          "Images may be illustrative;",
          "Availability may change without notice;",
          "Technical, typographical, or administrative errors may occur.",
        ],
        afterBullets: [
          "Difference Integrated does not guarantee that all website information will always be complete, current, error-free, or applicable to every project.",
          "You should obtain written confirmation of all material service, technical, capacity, schedule, safety, and commercial requirements before relying on them.",
        ],
      },

      {
        id: "no-professional-or-project-specific-advice",
        number: "11",
        title: "No Professional or Project-Specific Advice",
        paragraphs: ["Website content does not constitute:"],
        bullets: [
          "Engineering advice;",
          "Legal advice;",
          "Regulatory advice;",
          "Safety certification;",
          "Route authorization;",
          "Project management advice;",
          "A transport feasibility assessment;",
          "A guarantee that a particular vehicle, load, route, or schedule is suitable.",
        ],
        afterBullets: [
          "Project-specific decisions should be based on an operational assessment and the terms agreed between the relevant parties.",
        ],
      },

      {
        id: "third-party-links-and-services",
        number: "12",
        title: "Third-Party Links and Services",
        paragraphs: [
          "The website may contain links to external websites or services, including:",
        ],
        bullets: [
          "Social media platforms;",
          "Mapping or navigation tools;",
          "Communication applications;",
          "Hosting or technology services;",
          "Government or industry websites.",
        ],
        afterBullets: [
          "Such links are provided for convenience only.",
          "Difference Integrated does not control and does not endorse or assume responsibility for the content, accuracy, availability, security, products, services, or privacy practices of third parties.",
          "Your use of third-party services is governed by their own terms and policies.",
        ],
      },

      {
        id: "privacy",
        number: "13",
        title: "Privacy",
        paragraphs: [
          "Personal data collected through the website will be processed in accordance with our Privacy Policy and applicable Saudi data-protection laws.",
          "By submitting personal data, you confirm that:",
        ],
        bullets: [
          "The information is accurate;",
          "You are authorized to provide it;",
          "Where you submit information relating to another individual, you have an appropriate lawful basis or authorization to do so.",
        ],
        afterBullets: ["Our Privacy Policy forms part of these Terms."],
      },

      {
        id: "website-availability",
        number: "14",
        title: "Website Availability",
        paragraphs: [
          "We aim to maintain the website’s availability but do not guarantee continuous, uninterrupted, secure, or error-free access.",
          "The website may be unavailable due to:",
        ],
        bullets: [
          "Maintenance;",
          "Updates;",
          "Hosting failures;",
          "Internet disruption;",
          "Cybersecurity incidents;",
          "Technical problems;",
          "Events beyond our reasonable control.",
        ],
        afterBullets: [
          "We may update, modify, suspend, withdraw, or discontinue any website feature or content without prior notice where reasonably necessary.",
        ],
      },

      {
        id: "disclaimer-of-warranties",
        number: "15",
        title: "Disclaimer of Warranties",
        paragraphs: [
          "To the extent permitted by applicable law, the website and its content are provided on an “as available” and “as is” basis.",
          "Difference Integrated does not make any express or implied warranty concerning:",
        ],
        bullets: [
          "Continuous website availability;",
          "Complete accuracy of website content;",
          "Suitability for a particular project;",
          "Compatibility with every browser or device;",
          "Freedom from all errors, defects, viruses, or harmful components;",
          "The availability of a particular vehicle, driver, route, capacity, or service;",
          "The outcome of submitting an inquiry.",
        ],
        afterBullets: [
          "Nothing in these Terms excludes any warranty or obligation that cannot lawfully be excluded under Saudi law.",
        ],
      },

      {
        id: "limitation-of-liability",
        number: "16",
        title: "Limitation of Liability",
        paragraphs: [
          "To the maximum extent permitted by applicable law, Difference Integrated and its directors, employees, representatives, contractors, and service providers will not be liable for indirect, incidental, special, consequential, or purely economic loss arising from website use, including:",
        ],
        bullets: [
          "Loss of opportunity;",
          "Loss of profit;",
          "Loss of data;",
          "Business interruption;",
          "Reliance on incomplete or outdated website information;",
          "Website unavailability;",
          "Third-party websites or services;",
          "Unauthorized access caused by circumstances beyond our reasonable control.",
        ],
        afterBullets: [
          "Nothing in these Terms excludes or limits liability where exclusion or limitation is prohibited by applicable law, including liability for fraud, wilful misconduct, or other liability that cannot legally be excluded.",
          "Liability relating to actual transport or logistics services will be governed by the applicable quotation, purchase order, work order, or service agreement.",
        ],
      },

      {
        id: "indemnification",
        number: "17",
        title: "Indemnification",
        paragraphs: [
          "To the extent permitted by applicable law, you agree to indemnify Difference Integrated against reasonable losses, claims, liabilities, damages, penalties, and expenses arising directly from:",
        ],
        bullets: [
          "Your unlawful use of the website;",
          "Your breach of these Terms;",
          "Information or material you submit through the website;",
          "Your infringement of another party’s rights;",
          "Your unauthorized or malicious interference with the website.",
        ],
        afterBullets: [
          "This provision does not apply to losses caused by the negligence, unlawful conduct, or wilful misconduct of Difference Integrated.",
        ],
      },

      {
        id: "force-majeure",
        number: "18",
        title: "Force Majeure",
        paragraphs: [
          "Difference Integrated will not be responsible for website disruption, communication delay, or inability to respond caused by circumstances outside its reasonable control, including:",
        ],
        bullets: [
          "Natural disasters;",
          "Severe weather;",
          "Fire or flood;",
          "Government restrictions;",
          "War, civil disturbance, or security incidents;",
          "Telecommunications or electricity failures;",
          "Cyberattacks;",
          "Labour disruption;",
          "Public-health emergencies;",
          "Failure of third-party infrastructure.",
        ],
        afterBullets: [
          "Force majeure affecting logistics services will be governed by the relevant service agreement.",
        ],
      },

      {
        id: "suspension-or-termination-of-access",
        number: "19",
        title: "Suspension or Termination of Access",
        paragraphs: [
          "Difference Integrated may suspend, restrict, or terminate access to the website where:",
        ],
        bullets: [
          "These Terms are breached;",
          "The website is used unlawfully or maliciously;",
          "Security or operational risks arise;",
          "A government or competent authority requires restriction;",
          "Maintenance or technical intervention is necessary.",
        ],
        afterBullets: [
          "Termination or suspension will not affect rights or obligations that arose before the effective date of the restriction.",
        ],
      },

      {
        id: "governing-law",
        number: "20",
        title: "Governing Law",
        paragraphs: [
          "These Terms and your use of the website are governed by the laws and regulations of the Kingdom of Saudi Arabia.",
          "Any dispute arising from these Terms or website use will be submitted to the competent courts or authorities of the Kingdom of Saudi Arabia, unless the parties agree to another lawful dispute-resolution process in writing.",
        ],
      },

      {
        id: "severability",
        number: "21",
        title: "Severability",
        paragraphs: [
          "If any provision of these Terms is found to be unlawful, invalid, or unenforceable, that provision will be interpreted or limited to the minimum extent necessary.",
          "The remaining provisions will continue in full force and effect.",
        ],
      },

      {
        id: "no-waiver",
        number: "22",
        title: "No Waiver",
        paragraphs: [
          "Failure by Difference Integrated to enforce a right or provision under these Terms does not constitute a waiver of that right or provision.",
          "Any waiver must be made in writing by an authorized representative of Difference Integrated.",
        ],
      },

      {
        id: "changes-to-these-terms",
        number: "23",
        title: "Changes to These Terms",
        paragraphs: [
          "Difference Integrated may update these Terms to reflect:",
        ],
        bullets: [
          "Changes to the website;",
          "Changes to our services or business operations;",
          "Legal or regulatory developments;",
          "Security requirements;",
          "Technology changes.",
        ],
        afterBullets: [
          "The updated Terms will be published on the website with a revised “Last Updated” date.",
          "Continued use of the website after an update constitutes acceptance of the revised Terms to the extent permitted by applicable law.",
        ],
      },

      {
        id: "contact-information",
        number: "24",
        title: "Contact Information",
        paragraphs: [
          "Questions regarding these Terms may be directed to:",
          "Difference Integrated",
          "Legal Entity Name: [insert full registered legal entity name]",
          "Commercial Registration Number: [insert CR number]",
          "Website: www.differenceintegrated.sa",
          "Email: info@differenceintegrated.sa",
          "Registered Address: Saudi Arabia",
        ],
      },
    ],
  },

  ar: {
    hero: {
      titlePrimary: "شروط استخدام",
      titleAccent: "الموقع",
      description:
        "تحكم شروط استخدام الموقع هذه وصولك إلى موقع differenceintegrated.sa واستخدامه، بما في ذلك صفحاته ومحتواه ونماذجه ووظائفه والخدمات الإلكترونية المرتبطة به.",
      updated: "آخر تحديث: 28 يوليو 2026",
    },

    intro: {
      title: "شروط واضحة لاستخدام الموقع.",
      paragraphs: [
        "يعود الموقع الإلكتروني إلى ديفرانس إنتيجريتد [أدخل الاسم القانوني الكامل للمنشأة المسجلة] ويتم تشغيله من قبلها، وهي شركة تعمل في مجال الخدمات اللوجستية والنقل الثقيل في المملكة العربية السعودية.",
        "باستخدام الموقع أو الوصول إليه، فإنك تقر بأنك قرأت هذه الشروط وفهمتها ووافقت عليها. وإذا لم توافق عليها، فيجب عليك التوقف عن استخدام الموقع.",
      ],
    },

    directoryTitle: "في هذه الصفحة",

    sections: [
      {
        id: "about-difference-integrated",
        number: "01",
        title: "عن ديفرانس إنتيجريتد",
        paragraphs: [
          "تقدم ديفرانس إنتيجريتد حلول الخدمات اللوجستية والنقل الثقيل لدعم مشاريع البناء والبنية التحتية في المملكة العربية السعودية.",
          "قد تشمل خدماتنا:",
        ],
        bullets: [
          "نقل الرمال؛",
          "نقل الركام ومواد الردم؛",
          "نقل مواد البناء السائبة؛",
          "خدمات نقل الشاحنات القلابة الثقيلة؛",
          "تخطيط المسارات؛",
          "جدولة عمليات النقل؛",
          "تنسيق التحميل والتفريغ؛",
          "التنسيق في مواقع المشاريع؛",
          "خدمات النقل والدعم اللوجستي الأخرى ذات الصلة.",
        ],
        afterBullets: [
          "يتم تحديد النطاق الدقيق والسعر والتوافر والجدول الزمني والمسار والمتطلبات التشغيلية والشروط التعاقدية لأي خدمة من خلال عرض سعر أو أمر شراء أو أمر عمل أو عقد أو اتفاقية خدمة منفصلة.",
        ],
      },

      {
        id: "purpose-of-the-website",
        number: "02",
        title: "الغرض من الموقع",
        paragraphs: [
          "يتم توفير الموقع بشكل أساسي لأغراض المعلومات العامة والاستفسارات التجارية.",
          "ويتيح للزوار:",
        ],
        bullets: [
          "التعرف على ديفرانس إنتيجريتد؛",
          "مراجعة خدماتنا وقدرات أسطولنا؛",
          "إرسال استفسارات عن الخدمات؛",
          "طلب معلومات إضافية؛",
          "مناقشة المتطلبات اللوجستية؛",
          "استكشاف فرص المشاريع أو الشراكات المحتملة.",
        ],
        afterBullets: [
          "لا يشكل الموقع بحد ذاته منصة لحجز خدمات النقل أو بوابة حساب للعملاء أو منصة دفع أو اتفاقية لوجستية ملزمة قانوناً، ما لم تنص إحدى ميزات الموقع صراحة على خلاف ذلك.",
        ],
      },

      {
        id: "no-automatic-service-contract",
        number: "03",
        title: "عدم إنشاء عقد خدمة تلقائياً",
        paragraphs: [
          "إن إرسال نموذج اتصال أو طلب عرض سعر أو إرسال بريد إلكتروني أو الاتصال بفريقنا أو التواصل معنا بأي طريقة أخرى لا ينشئ عقداً تلقائياً ولا يلزم ديفرانس إنتيجريتد بتقديم أي خدمة.",
          "تنشأ علاقة خدمة ملزمة فقط بعد اتفاق الأطراف المعنية على الشروط التجارية والتشغيلية المطبقة من خلال عرض سعر مكتوب معتمد أو أمر شراء أو أمر عمل أو اتفاقية موقعة أو طريقة تعاقد أخرى معترف بها.",
          "لا يحل محتوى الموقع محل شروط أي اتفاقية موقعة بشكل منفصل. وفي حال تعارض شروط الموقع مع عقد خدمة منفذ، تسود شروط عقد الخدمة فيما يتعلق بالخدمات اللوجستية المعنية.",
        ],
      },

      {
        id: "quotations-and-service-information",
        number: "04",
        title: "عروض الأسعار ومعلومات الخدمات",
        paragraphs: [
          "قد يخضع أي عرض سعر أو تقدير أو جدول زمني أو بيان قدرة أو إشارة إلى التوافر أو أي معلومات تجارية أخرى يتم تقديمها من خلال استفسار عبر الموقع أو بعده لما يلي:",
        ],
        bullets: [
          "موقع المشروع؛",
          "نوع المادة وكميتها؛",
          "ظروف التحميل والتفريغ؛",
          "توافر المسار؛",
          "المسافة ووقت الرحلة؛",
          "توافر المركبات والسائقين؛",
          "متطلبات الدخول إلى الموقع؛",
          "حالة الطرق والطقس؛",
          "القيود التنظيمية؛",
          "ساعات التشغيل المسموح بها؛",
          "حدود الحمولة؛",
          "تكاليف الوقود والتشغيل؛",
          "متطلبات السلامة؛",
          "الضرائب والرسوم الحكومية؛",
          "المعلومات التي يقدمها العميل؛",
          "الاعتبارات التشغيلية الأخرى.",
        ],
        afterBullets: [
          "ما لم يتم النص على خلاف ذلك كتابةً، لا ينبغي اعتبار معلومات الموقع والمناقشات الأولية عرض سعر نهائياً أو التزاماً مضموناً.",
          "يجوز لديفرانس إنتيجريتد تصحيح الأخطاء أو تعديل التقديرات أو تحديث التوافر أو سحب العرض قبل إبرام اتفاقية ملزمة.",
        ],
      },

      {
        id: "customer-information-and-responsibilities",
        number: "05",
        title: "معلومات العميل ومسؤولياته",
        paragraphs: [
          "عند إرسال استفسار أو طلب خدمة، فإنك توافق على تقديم معلومات دقيقة وحديثة وكاملة وغير مضللة.",
          "وتتحمل مسؤولية تقديم التفاصيل ذات الصلة عند الاقتضاء، بما في ذلك:",
        ],
        bullets: [
          "معلومات الاتصال الصحيحة؛",
          "معلومات الشركة والمشروع؛",
          "نوع المادة والكمية التقديرية؛",
          "مواقع الاستلام والتسليم؛",
          "قيود الوصول؛",
          "متطلبات التحميل والتفريغ؛",
          "التواريخ وفترات التشغيل المطلوبة؛",
          "ظروف الموقع؛",
          "التصاريح أو الموافقات المطلوبة؛",
          "متطلبات الصحة والسلامة والبيئة أو الأمن؛",
          "أي مخاطر أو ظروف تشغيلية غير معتادة.",
        ],
        afterBullets: [
          "لن تكون ديفرانس إنتيجريتد مسؤولة عن التأخير أو التكاليف الإضافية أو عدم القدرة على التنفيذ أو مشكلات السلامة أو النتائج الأخرى الناجمة عن معلومات ناقصة أو غير دقيقة أو متأخرة أو مضللة يقدمها العميل أو أي طرف آخر.",
        ],
      },

      {
        id: "operational-and-regulatory-requirements",
        number: "06",
        title: "المتطلبات التشغيلية والتنظيمية",
        paragraphs: [
          "تخضع عمليات النقل الثقيل لمتطلبات تشغيلية وقانونية ومتطلبات خاصة بالسلامة والتنظيم.",
          "وقد يتأثر توفر الخدمات وأداؤها بعوامل تشمل:",
        ],
        bullets: [
          "أنظمة ولوائح النقل السعودية؛",
          "قيود وزن المركبات والحمولات؛",
          "قيود المسارات؛",
          "قيود دخول المدن؛",
          "ساعات النقل المسموح بها؛",
          "إغلاق الطرق أو تحويلها؛",
          "تعليمات الجهات الحكومية أو الأمنية؛",
          "متطلبات التصاريح؛",
          "إجراءات مواقع البناء؛",
          "متطلبات ساعات عمل السائق وإدارة الإرهاق؛",
          "فحص المركبات وصيانتها؛",
          "ظروف الطقس والرؤية والبيئة.",
        ],
        afterBullets: [
          "تحتفظ ديفرانس إنتيجريتد بالحق في تعديل أو تأجيل أو تغيير مسار أو تعليق أو رفض أي عملية عندما يكون ذلك ضرورياً بشكل معقول للامتثال القانوني أو السلامة العامة أو سلامة السائق أو حماية الأسطول أو سلامة الموقع أو الجدوى التشغيلية.",
        ],
      },

      {
        id: "acceptable-use",
        number: "07",
        title: "الاستخدام المقبول",
        paragraphs: [
          "يجوز لك استخدام الموقع فقط للأغراض القانونية والمشروعة.",
          "ولا يجوز لك:",
        ],
        bullets: [
          "استخدام الموقع بالمخالفة لأي نظام معمول به؛",
          "تقديم معلومات كاذبة أو احتيالية أو خادعة أو مضللة؛",
          "انتحال شخصية فرد أو جهة أخرى؛",
          "محاولة الوصول غير المصرح به إلى الموقع أو الخادم أو الشبكة أو البيانات؛",
          "إدخال فيروسات أو برامج ضارة أو نصوص مؤذية أو أكواد خبيثة؛",
          "التدخل في تشغيل الموقع أو توافره أو أمنه؛",
          "استخدام أنظمة آلية لاستخراج أو نسخ أو تحميل محتوى الموقع دون تصريح؛",
          "اختبار أو فحص ثغرات الموقع دون إذن كتابي؛",
          "استخدام محتوى الموقع للمنافسة غير العادلة أو تحريف صورة ديفرانس إنتيجريتد؛",
          "إرسال رسائل مزعجة أو مسيئة أو تهديدات أو مواد غير قانونية؛",
          "انتهاك حقوق الملكية الفكرية أو السرية أو الخصوصية أو أي حقوق قانونية أخرى؛",
          "استخدام الموقع للإعلانات أو الاستدراج غير المصرح به.",
        ],
        afterBullets: [
          "يجوز لنا تقييد أو حظر الوصول إذا اعتقدنا بشكل معقول أن هذه الشروط قد تم انتهاكها أو أن الموقع يتم إساءة استخدامه.",
        ],
      },

      {
        id: "intellectual-property",
        number: "08",
        title: "الملكية الفكرية",
        paragraphs: [
          "ما لم يذكر خلاف ذلك، فإن جميع محتويات الموقع مملوكة أو مرخصة أو مستخدمة بشكل قانوني من قبل ديفرانس إنتيجريتد، بما في ذلك:",
        ],
        bullets: [
          "أسماء الشركة والعلامة التجارية؛",
          "الشعارات؛",
          "النصوص؛",
          "الرسومات؛",
          "الصور؛",
          "مقاطع الفيديو؛",
          "الأيقونات؛",
          "التصاميم؛",
          "تخطيطات الصفحات؛",
          "المستندات؛",
          "كود الموقع ووظائفه.",
        ],
        afterBullets: [
          "محتوى الموقع محمي بموجب قوانين الملكية الفكرية المعمول بها.",
          "يمكنك عرض وتنزيل محتوى محدود من الموقع للاستخدام القانوني والداخلي وغير التجاري بغرض تقييم خدماتنا.",
          "لا يجوز إعادة إنتاج أو نشر أو تعديل أو توزيع أو بيع أو ترخيص أو عرض أو إنشاء أعمال مشتقة أو استغلال محتوى الموقع تجارياً دون إذن كتابي مسبق.",
          "لا تنتقل إليك أي حقوق ملكية أو ملكية فكرية نتيجة استخدام الموقع.",
        ],
      },

      {
        id: "trademarks",
        number: "09",
        title: "العلامات التجارية",
        paragraphs: [
          "قد يكون اسم ديفرانس إنتيجريتد وشعارها وأسماء خدماتها وتصاميمها وهويتها التجارية علامات تجارية أو معرفات تجارية محمية.",
          "ولا يجوز استخدامها بطريقة:",
        ],
        bullets: [
          "توحي بعلاقة أو تأييد غير مصرح به؛",
          "تسبب التباساً حول الملكية أو الارتباط؛",
          "تحرف خدماتنا؛",
          "تضر بسمعتنا؛",
          "تخالف قوانين العلامات التجارية أو الأنظمة التجارية المعمول بها.",
        ],
      },

      {
        id: "website-information-and-accuracy",
        number: "10",
        title: "معلومات الموقع ودقتها",
        paragraphs: [
          "نسعى إلى الحفاظ على دقة معلومات الموقع وتحديثها بشكل معقول. ومع ذلك:",
        ],
        bullets: [
          "يتم توفير المحتوى لأغراض معلومات عامة؛",
          "قد تكون أوصاف الخدمات مختصرة؛",
          "قد تتغير مواصفات الأسطول أو قدراته؛",
          "قد تكون الصور توضيحية؛",
          "قد يتغير التوافر دون إشعار؛",
          "قد تحدث أخطاء تقنية أو مطبعية أو إدارية.",
        ],
        afterBullets: [
          "لا تضمن ديفرانس إنتيجريتد أن تكون جميع معلومات الموقع دائماً كاملة أو حديثة أو خالية من الأخطاء أو مناسبة لكل مشروع.",
          "ينبغي الحصول على تأكيد كتابي لجميع متطلبات الخدمة والقدرات الفنية والجداول الزمنية والسلامة والمتطلبات التجارية قبل الاعتماد عليها.",
        ],
      },

      {
        id: "no-professional-or-project-specific-advice",
        number: "11",
        title: "عدم تقديم استشارات مهنية أو خاصة بالمشروع",
        paragraphs: ["لا يشكل محتوى الموقع:"],
        bullets: [
          "استشارة هندسية؛",
          "استشارة قانونية؛",
          "استشارة تنظيمية؛",
          "شهادة سلامة؛",
          "تصريحاً لمسار النقل؛",
          "استشارة لإدارة المشاريع؛",
          "تقييماً لجدوى النقل؛",
          "ضماناً لملاءمة مركبة أو حمولة أو مسار أو جدول زمني معين.",
        ],
        afterBullets: [
          "ينبغي أن تستند القرارات الخاصة بالمشروع إلى تقييم تشغيلي والشروط المتفق عليها بين الأطراف المعنية.",
        ],
      },

      {
        id: "third-party-links-and-services",
        number: "12",
        title: "روابط وخدمات الأطراف الثالثة",
        paragraphs: [
          "قد يحتوي الموقع على روابط لمواقع أو خدمات خارجية، بما في ذلك:",
        ],
        bullets: [
          "منصات التواصل الاجتماعي؛",
          "أدوات الخرائط أو الملاحة؛",
          "تطبيقات الاتصال؛",
          "خدمات الاستضافة أو التقنية؛",
          "المواقع الحكومية أو المتخصصة.",
        ],
        afterBullets: [
          "يتم توفير هذه الروابط للتسهيل فقط.",
          "لا تتحكم ديفرانس إنتيجريتد في محتوى الأطراف الثالثة أو دقته أو توفره أو أمنه أو منتجاته أو خدماته أو ممارسات الخصوصية الخاصة به ولا تتحمل المسؤولية عنها.",
          "يخضع استخدامك لخدمات الأطراف الثالثة لشروطهم وسياساتهم الخاصة.",
        ],
      },

      {
        id: "privacy",
        number: "13",
        title: "الخصوصية",
        paragraphs: [
          "تتم معالجة البيانات الشخصية التي يتم جمعها عبر الموقع وفقاً لسياسة الخصوصية الخاصة بنا وأنظمة حماية البيانات السعودية المعمول بها.",
          "ومن خلال تقديم البيانات الشخصية، فإنك تؤكد أن:",
        ],
        bullets: [
          "المعلومات دقيقة؛",
          "لديك صلاحية تقديمها؛",
          "إذا قدمت معلومات تتعلق بشخص آخر، فلديك أساس قانوني مناسب أو تصريح للقيام بذلك.",
        ],
        afterBullets: ["تشكل سياسة الخصوصية الخاصة بنا جزءاً من هذه الشروط."],
      },

      {
        id: "website-availability",
        number: "14",
        title: "توافر الموقع",
        paragraphs: [
          "نسعى إلى الحفاظ على توافر الموقع، إلا أننا لا نضمن الوصول المستمر أو المتواصل أو الآمن أو الخالي من الأخطاء.",
          "قد يصبح الموقع غير متاح بسبب:",
        ],
        bullets: [
          "الصيانة؛",
          "التحديثات؛",
          "أعطال الاستضافة؛",
          "انقطاع الإنترنت؛",
          "حوادث الأمن السيبراني؛",
          "المشكلات التقنية؛",
          "الأحداث الخارجة عن سيطرتنا المعقولة.",
        ],
        afterBullets: [
          "يجوز لنا تحديث أو تعديل أو تعليق أو سحب أو إيقاف أي ميزة أو محتوى في الموقع دون إشعار مسبق عند الضرورة المعقولة.",
        ],
      },

      {
        id: "disclaimer-of-warranties",
        number: "15",
        title: "إخلاء المسؤولية عن الضمانات",
        paragraphs: [
          "إلى الحد الذي يسمح به النظام، يتم توفير الموقع ومحتواه على أساس «كما هو متاح» و«كما هو».",
          "لا تقدم ديفرانس إنتيجريتد أي ضمان صريح أو ضمني بشأن:",
        ],
        bullets: [
          "التوافر المستمر للموقع؛",
          "الدقة الكاملة لمحتوى الموقع؛",
          "الملاءمة لمشروع معين؛",
          "التوافق مع جميع المتصفحات أو الأجهزة؛",
          "الخلو من جميع الأخطاء أو العيوب أو الفيروسات أو المكونات الضارة؛",
          "توافر مركبة أو سائق أو مسار أو قدرة أو خدمة معينة؛",
          "نتيجة إرسال أي استفسار.",
        ],
        afterBullets: [
          "لا تستبعد هذه الشروط أي ضمان أو التزام لا يجوز استبعاده قانوناً بموجب الأنظمة السعودية.",
        ],
      },

      {
        id: "limitation-of-liability",
        number: "16",
        title: "تحديد المسؤولية",
        paragraphs: [
          "إلى أقصى حد يسمح به النظام، لا تتحمل ديفرانس إنتيجريتد ومديروها وموظفوها وممثلوها ومقاولوها ومقدمو خدماتها مسؤولية الخسائر غير المباشرة أو العرضية أو الخاصة أو التبعية أو الاقتصادية البحتة الناشئة عن استخدام الموقع، بما في ذلك:",
        ],
        bullets: [
          "فقدان الفرص؛",
          "فقدان الأرباح؛",
          "فقدان البيانات؛",
          "تعطل الأعمال؛",
          "الاعتماد على معلومات غير مكتملة أو قديمة؛",
          "عدم توافر الموقع؛",
          "مواقع أو خدمات الأطراف الثالثة؛",
          "الوصول غير المصرح به الناتج عن ظروف خارجة عن سيطرتنا المعقولة.",
        ],
        afterBullets: [
          "لا تستبعد هذه الشروط أو تحد المسؤولية في الحالات التي يحظر فيها النظام مثل الاحتيال أو سوء السلوك المتعمد أو أي مسؤولية أخرى لا يجوز استبعادها قانوناً.",
          "تخضع المسؤولية المتعلقة بخدمات النقل أو الخدمات اللوجستية الفعلية لعرض السعر أو أمر الشراء أو أمر العمل أو اتفاقية الخدمة المطبقة.",
        ],
      },

      {
        id: "indemnification",
        number: "17",
        title: "التعويض",
        paragraphs: [
          "إلى الحد الذي يسمح به النظام، فإنك توافق على تعويض ديفرانس إنتيجريتد عن الخسائر والمطالبات والمسؤوليات والأضرار والعقوبات والمصروفات المعقولة الناشئة مباشرة عن:",
        ],
        bullets: [
          "استخدامك غير القانوني للموقع؛",
          "انتهاكك لهذه الشروط؛",
          "المعلومات أو المواد التي ترسلها عبر الموقع؛",
          "انتهاكك لحقوق طرف آخر؛",
          "تدخلك غير المصرح به أو الضار في الموقع.",
        ],
        afterBullets: [
          "لا ينطبق هذا الحكم على الخسائر الناتجة عن إهمال أو تصرف غير قانوني أو سوء سلوك متعمد من جانب ديفرانس إنتيجريتد.",
        ],
      },

      {
        id: "force-majeure",
        number: "18",
        title: "القوة القاهرة",
        paragraphs: [
          "لن تكون ديفرانس إنتيجريتد مسؤولة عن تعطل الموقع أو تأخر الاتصالات أو عدم القدرة على الاستجابة بسبب ظروف خارجة عن سيطرتها المعقولة، بما في ذلك:",
        ],
        bullets: [
          "الكوارث الطبيعية؛",
          "الطقس القاسي؛",
          "الحريق أو الفيضانات؛",
          "القيود الحكومية؛",
          "الحرب أو الاضطرابات المدنية أو الحوادث الأمنية؛",
          "أعطال الاتصالات أو الكهرباء؛",
          "الهجمات الإلكترونية؛",
          "الاضطرابات العمالية؛",
          "حالات الطوارئ الصحية العامة؛",
          "تعطل البنية التحتية للأطراف الثالثة.",
        ],
        afterBullets: [
          "تخضع حالات القوة القاهرة التي تؤثر على الخدمات اللوجستية لاتفاقية الخدمة ذات الصلة.",
        ],
      },

      {
        id: "suspension-or-termination-of-access",
        number: "19",
        title: "تعليق أو إنهاء الوصول",
        paragraphs: [
          "يجوز لديفرانس إنتيجريتد تعليق أو تقييد أو إنهاء الوصول إلى الموقع في الحالات التالية:",
        ],
        bullets: [
          "انتهاك هذه الشروط؛",
          "استخدام الموقع بشكل غير قانوني أو ضار؛",
          "ظهور مخاطر أمنية أو تشغيلية؛",
          "طلب جهة حكومية أو مختصة فرض قيود؛",
          "الحاجة إلى الصيانة أو التدخل التقني.",
        ],
        afterBullets: [
          "لا يؤثر التعليق أو الإنهاء على الحقوق أو الالتزامات التي نشأت قبل تاريخ سريان التقييد.",
        ],
      },

      {
        id: "governing-law",
        number: "20",
        title: "القانون الحاكم",
        paragraphs: [
          "تخضع هذه الشروط واستخدامك للموقع لأنظمة ولوائح المملكة العربية السعودية.",
          "يتم عرض أي نزاع ينشأ عن هذه الشروط أو استخدام الموقع على المحاكم أو الجهات المختصة في المملكة العربية السعودية، ما لم يتفق الأطراف كتابة على عملية أخرى مشروعة لتسوية النزاعات.",
        ],
      },

      {
        id: "severability",
        number: "21",
        title: "قابلية الفصل",
        paragraphs: [
          "إذا تبين أن أي حكم من هذه الشروط غير قانوني أو غير صالح أو غير قابل للتنفيذ، فسيتم تفسيره أو تقييده بالحد الأدنى اللازم.",
          "وتظل بقية الأحكام سارية بكامل قوتها.",
        ],
      },

      {
        id: "no-waiver",
        number: "22",
        title: "عدم التنازل",
        paragraphs: [
          "إن عدم قيام ديفرانس إنتيجريتد بإنفاذ أي حق أو حكم من هذه الشروط لا يعتبر تنازلاً عن ذلك الحق أو الحكم.",
          "ويجب أن يكون أي تنازل مكتوباً وصادراً عن ممثل مخول من ديفرانس إنتيجريتد.",
        ],
      },

      {
        id: "changes-to-these-terms",
        number: "23",
        title: "التغييرات على هذه الشروط",
        paragraphs: ["يجوز لديفرانس إنتيجريتد تحديث هذه الشروط لتعكس:"],
        bullets: [
          "التغييرات في الموقع؛",
          "التغييرات في خدماتنا أو عملياتنا التجارية؛",
          "التطورات القانونية أو التنظيمية؛",
          "متطلبات الأمان؛",
          "التغييرات التقنية.",
        ],
        afterBullets: [
          "سيتم نشر الشروط المحدثة على الموقع مع تعديل تاريخ «آخر تحديث».",
          "يعد استمرار استخدام الموقع بعد التحديث قبولاً للشروط المعدلة إلى الحد الذي يسمح به النظام.",
        ],
      },

      {
        id: "contact-information",
        number: "24",
        title: "معلومات الاتصال",
        paragraphs: [
          "يمكن توجيه الأسئلة المتعلقة بهذه الشروط إلى:",
          "ديفرانس إنتيجريتد",
          "الاسم القانوني للمنشأة: [أدخل الاسم القانوني الكامل]",
          "رقم السجل التجاري: [أدخل رقم السجل التجاري]",
          "الموقع الإلكتروني: www.differenceintegrated.sa",
          "البريد الإلكتروني: info@differenceintegrated.sa",
          "العنوان المسجل: المملكة العربية السعودية",
        ],
      },
    ],
  },
};

function TermsSectionBlock({
  section,
  index,
}: {
  section: TermsSection;
  index: number;
}) {
  const dark = (index + 1) % 4 === 0;

  return (
    <section
      id={section.id}
      className={
        dark
          ? "terms-section scroll-mt-[120rem] bg-[var(--di-primary)] py-[95rem] text-white max-[1024px]:py-[65rem]"
          : "terms-section scroll-mt-[120rem] bg-white py-[95rem] text-[var(--di-primary)] max-[1024px]:py-[65rem]"
      }
    >
      <div className="di-container">
        <div className="terms-reveal grid grid-cols-[.72fr_1.28fr] gap-[110rem] max-[1024px]:grid-cols-1 max-[1024px]:gap-[38rem]">
          <div>
            <h2 className="max-w-[650rem] text-[56rem] font-bold uppercase leading-[.9] tracking-[-.015em] max-[1024px]:text-[40rem] max-[600px]:text-[34rem]">
              {section.title}
            </h2>
          </div>

          <div className="max-w-[840rem]">
            <div
              className={
                dark
                  ? "terms-body space-y-[22rem] text-[18rem] font-normal leading-[1.65] text-white/72 max-[1024px]:text-[16rem]"
                  : "terms-body space-y-[22rem] text-[18rem] font-normal leading-[1.65] text-[var(--di-primary)]/68 max-[1024px]:text-[16rem]"
              }
            >
              {section.paragraphs?.map((paragraph, paragraphIndex) => (
                <p key={`${section.id}-p-${paragraphIndex}`}>{paragraph}</p>
              ))}

              {section.bullets && (
                <div
                  className={
                    dark
                      ? "mt-[30rem] border-t border-white/15"
                      : "mt-[30rem] border-t border-[var(--di-primary)]/15"
                  }
                >
                  {section.bullets.map((item, bulletIndex) => (
                    <div
                      key={`${section.id}-bullet-${bulletIndex}`}
                      className={
                        dark
                          ? "flex items-start gap-[16rem] border-b border-white/10 py-[15rem]"
                          : "flex items-start gap-[16rem] border-b border-[var(--di-primary)]/10 py-[15rem]"
                      }
                    >
                      <FiCheckCircle className="mt-[3rem] h-[19rem] w-[19rem] shrink-0 text-[var(--di-accent)]" />

                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {section.afterBullets?.map((paragraph, paragraphIndex) => (
                <p key={`${section.id}-after-${paragraphIndex}`}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TermsOfServicesPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  const params = useParams<{
    lang?: string | string[];
  }>();

  const rawLang = Array.isArray(params?.lang) ? params.lang[0] : params?.lang;

  const isArabic = rawLang?.toLowerCase() === "ar";
  const copy = termsCopy[isArabic ? "ar" : "en"];

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const transitionPlug =
        root.querySelector<HTMLElement>(".transition-plug");

      const transitionInner = root.querySelector<HTMLElement>(
        ".transition-plug__inner",
      );

      if (reducedMotion) {
        if (transitionPlug) {
          gsap.set(transitionPlug, {
            yPercent: 105,
          });
        }

        if (transitionInner) {
          gsap.set(transitionInner, {
            height: "0%",
          });
        }

        gsap.set(
          [
            ".terms-hero-title",
            ".terms-hero-copy",
            ".terms-hero-image",
            ".terms-reveal",
          ],
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
          },
        );

        return;
      }

      if (transitionPlug) {
        gsap.set(transitionPlug, {
          yPercent: 0,
        });
      }

      if (transitionInner) {
        gsap.set(transitionInner, {
          top: "auto",
          bottom: 0,
          height: "100%",
        });
      }

      gsap.set(".terms-hero-image", {
        scale: 1.08,
      });

      gsap.set(".terms-hero-title", {
        opacity: 0,
        y: 55,
      });

      gsap.set(".terms-hero-copy", {
        opacity: 0,
        y: 35,
      });

      const entrance = gsap.timeline({
        paused: true,
      });

      if (transitionInner) {
        entrance.fromTo(
          transitionInner,
          {
            top: "auto",
            bottom: 0,
            height: "100%",
          },
          {
            height: "0%",
            duration: 1.6,
            ease: "power4.inOut",
          },
          0,
        );
      }

      if (transitionPlug) {
        entrance.to(
          transitionPlug,
          {
            yPercent: 105,
            duration: 1.6,
            ease: "power4.inOut",
          },
          0.05,
        );
      }

      entrance.to(
        ".terms-hero-image",
        {
          scale: 1,
          duration: 1.8,
          ease: "power3.out",
        },
        0.35,
      );

      entrance.to(
        ".terms-hero-title",
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out",
        },
        1.02,
      );

      entrance.to(
        ".terms-hero-copy",
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
        },
        1.3,
      );

      const startEntrance = () => {
        window.scrollTo(0, 0);

        requestAnimationFrame(() => {
          entrance.play(0);
        });
      };

      if (document.readyState === "complete") {
        startEntrance();
      } else {
        window.addEventListener("load", startEntrance, {
          once: true,
        });

        cleanups.push(() => {
          window.removeEventListener("load", startEntrance);
        });
      }

      gsap.utils.toArray<HTMLElement>(".terms-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 45,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      cleanups.push(() => {
        window.removeEventListener("resize", handleResize);
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, root);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, [isArabic]);

  return (
    <div
      ref={rootRef}
      className={isArabic ? "terms-page terms-page--rtl" : "terms-page"}
      dir={isArabic ? "rtl" : "ltr"}
      lang={isArabic ? "ar" : "en"}
    >
      <PageTransition initialCovered />

      <main>
        {/* HERO */}
        <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-[var(--di-primary)] text-white">
          <img
            src="/assets/img/about/about-hero.webp"
            alt=""
            aria-hidden="true"
            className="terms-hero-image pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
          />

          <div className="pointer-events-none absolute inset-0 bg-[var(--di-primary)]/72" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--di-primary)]/75 via-[var(--di-primary)]/42 to-black/15" />

          <div className="di-container relative z-[2] w-full pb-[95rem] pt-[180rem] max-[1024px]:pb-[60rem] max-[1024px]:pt-[150rem]">
            <div className="grid grid-cols-[1.08fr_.92fr] items-end gap-[110rem] max-[1024px]:grid-cols-1 max-[1024px]:gap-[50rem]">
              <div className="terms-hero-title">
                <h1 className="text-[138rem] font-bold uppercase leading-[.82] tracking-[-.035em] max-[1440px]:text-[115rem] max-[1024px]:text-[70rem] max-[600px]:text-[50rem]">
                  {copy.hero.titlePrimary}
                </h1>

                <h2 className="mt-[8rem] text-[138rem] font-bold uppercase leading-[.82] tracking-[-.035em] text-[var(--di-accent)] max-[1440px]:text-[115rem] max-[1024px]:text-[70rem] max-[600px]:text-[50rem]">
                  {copy.hero.titleAccent}
                </h2>
              </div>

              <div className="terms-hero-copy max-w-[690rem] justify-self-end max-[1024px]:justify-self-start">
                <div className="mb-[26rem] h-[1px] w-full bg-white/20" />

                <p className="terms-body text-[19rem] leading-[1.65] text-white/78 max-[1024px]:text-[16rem]">
                  {copy.hero.description}
                </p>

                <div className="mt-[30rem] flex items-center gap-[13rem]">
                  <FiFileText className="h-[20rem] w-[20rem] text-[var(--di-accent)]" />

                  <span className="terms-body text-[12rem] font-medium uppercase tracking-[.12em] text-white/60">
                    {copy.hero.updated}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="bg-white py-[125rem] max-[1024px]:py-[75rem]">
          <div className="di-container">
            <div className="terms-reveal grid grid-cols-[.78fr_1.22fr] gap-[110rem] max-[1024px]:grid-cols-1 max-[1024px]:gap-[45rem]">
              <div>
                <h2 className="max-w-[700rem] text-[82rem] font-bold uppercase leading-[.86] tracking-[-.025em] text-[var(--di-primary)] max-[1024px]:text-[50rem] max-[600px]:text-[40rem]">
                  {copy.intro.title}
                </h2>
              </div>

              <div className="terms-body max-w-[820rem] space-y-[22rem] text-[18rem] leading-[1.7] text-[var(--di-primary)]/65 max-[1024px]:text-[16rem]">
                {copy.intro.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DIRECTORY */}
        <section className="bg-[var(--di-light)] py-[110rem] max-[1024px]:py-[70rem]">
          <div className="di-container">
            <div className="terms-reveal mb-[55rem]">
              <h2 className="text-[72rem] font-bold uppercase leading-[.88] tracking-[-.025em] text-[var(--di-primary)] max-[1024px]:text-[48rem] max-[600px]:text-[40rem]">
                {copy.directoryTitle}
              </h2>
            </div>

            <div className="terms-reveal grid grid-cols-2 gap-x-[70rem] max-[800px]:grid-cols-1">
              {copy.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="group flex min-h-[74rem] items-center justify-between gap-[20rem] border-b border-[var(--di-primary)]/15 py-[16rem]"
                >
                  <span className="terms-body text-[16rem] font-medium leading-[1.35] text-[var(--di-primary)] transition-colors duration-300 group-hover:text-[var(--di-accent)]">
                    {section.title}
                  </span>

                  <FiArrowUpRight className="h-[20rem] w-[20rem] shrink-0 text-[var(--di-primary)]/30 transition-all duration-300 group-hover:-translate-y-[2rem] group-hover:translate-x-[2rem] group-hover:text-[var(--di-accent)]" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* TERMS */}
        {copy.sections.map((section, index) => (
          <TermsSectionBlock key={section.id} section={section} index={index} />
        ))}
      </main>

      <style jsx global>
        {`
          .terms-page:not(.terms-page--rtl) .terms-body {
            font-family: "Inter", sans-serif;
          }

          .terms-page--rtl {
            text-align: right;
          }

          .terms-page--rtl .terms-body {
            font-family: inherit;
          }

          .terms-hero-image {
            will-change: transform;
          }

          @media (max-width: 1024px) {
            .terms-hero-image {
              object-position: center center;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .terms-hero-title,
            .terms-hero-copy,
            .terms-hero-image,
            .terms-reveal {
              opacity: 1 !important;
              transform: none !important;
            }
          }
        `}
      </style>
    </div>
  );
}

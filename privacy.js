const langSelect = document.getElementById("lang-select");

const privacyTranslations = {
  en: {
    languageLabel: "Language",
    privacyTitle: "Privacy Policy",
    section1Title: "Information We Collect",
    section1Content:
      "We collect information you provide directly to us, such as when you create an account, make a transaction, or communicate with us. This includes transaction data, such as income and expense entries you record, and any other information you choose to provide.",
    section2Title: "How We Use Your Information",
    section2Content:
      "We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you about your account and our services.",
    section3Title: "Cookies and Tracking",
    section3Content:
      "We use cookies and similar tracking technologies to track activity on our website and store certain information.",
    section3Content2:
      "You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some parts of our service.",
    section4Title: "Data Storage and Security",
    section4Content:
      "We store your data locally on your device using browser localStorage. This means your data is stored on your own device and is not sent to our servers.",
    section5Title: "Your Rights",
    section5Content:
      "You have the right to access, correct, or delete your personal data stored in our application. You can manage your data through the application interface or by clearing your browser localStorage.",
    section6Title: "Contact Us",
    section6Content:
      "If you have any questions about this Privacy Policy, please contact us through our website.",
  },

  zh: {
    languageLabel: "语言选择",
    privacyTitle: "隐私政策",
    section1Title: "我们收集的信息",
    section1Content:
      "我们收集您直接向我们提供的信息，例如当您创建账户、进行交易或与我们沟通时。这包括您记录的收入和支出条目等交易数据，以及您选择提供的任何其他信息。",
    section2Title: "我们如何使用您的信息",
    section2Content:
      "我们使用收集的信息来提供、维护和改进我们的服务，处理交易，并就您的账户和我们的服务与您沟通。",
    section3Title: "Cookies 和追踪",
    section3Content:
      "我们使用 cookies 和类似的追踪技术来记录网站活动并存储某些信息。",
    section3Content2:
      "您可以设置浏览器拒绝所有 cookies，或者在发送 cookie 时提醒您。但是，如果您不接受 cookies，您可能无法使用服务的某些部分。",
    section4Title: "数据存储和安全",
    section4Content:
      "我们使用浏览器的 localStorage 将您的数据本地存储在您的设备上。这意味着您的数据保存在您自己的设备中，不会发送到我们的服务器。",
    section5Title: "您的权利",
    section5Content:
      "您有权访问、更正或删除存储在本应用中的个人数据。您可以通过应用界面管理数据，也可以清除浏览器的 localStorage。",
    section6Title: "联系我们",
    section6Content:
      "如果您对本隐私政策有任何疑问，请通过我们的网站与我们联系。",
  },

  ja: {
    languageLabel: "言語選択",
    privacyTitle: "プライバシーポリシー",
    section1Title: "収集する情報",
    section1Content:
      "私たちは、アカウントの作成、取引の記録、または連絡を行う際に、ユーザーが直接提供する情報を収集します。これには、収入や支出の記録などの取引データ、およびユーザーが提供するその他の情報が含まれます。",
    section2Title: "情報の利用方法",
    section2Content:
      "私たちは、収集した情報をサービスの提供、維持、改善、取引処理、およびアカウントやサービスに関する連絡のために使用します。",
    section3Title: "Cookie とトラッキング",
    section3Content:
      "私たちは、Web サイト上の活動を記録し、特定の情報を保存するために Cookie や類似の追跡技術を使用します。",
    section3Content2:
      "ブラウザの設定により、すべての Cookie を拒否したり、Cookie が送信される際に通知を受け取ったりできます。ただし、Cookie を受け入れない場合、サービスの一部を利用できない可能性があります。",
    section4Title: "データの保存とセキュリティ",
    section4Content:
      "私たちは、ブラウザの localStorage を使用して、ユーザーのデータを端末上に保存します。つまり、データはユーザー自身の端末に保存され、サーバーには送信されません。",
    section5Title: "ユーザーの権利",
    section5Content:
      "ユーザーは、本アプリに保存された個人データにアクセス、修正、削除する権利があります。アプリの画面またはブラウザの localStorage を削除することでデータを管理できます。",
    section6Title: "お問い合わせ",
    section6Content:
      "このプライバシーポリシーについてご質問がある場合は、Web サイトを通じてお問い合わせください。",
  },
};

let currentLanguage = localStorage.getItem("language") || "en";

function applyPrivacyLanguage(language) {
  if (!privacyTranslations[language]) {
    language = "en";
  }

  currentLanguage = language;
  localStorage.setItem("language", language);

  if (language === "zh") {
    document.documentElement.lang = "zh-CN";
  } else if (language === "ja") {
    document.documentElement.lang = "ja";
  } else {
    document.documentElement.lang = "en";
  }

  document.querySelectorAll("[data-i18n]").forEach(function (element) {
    const key = element.getAttribute("data-i18n");

    if (privacyTranslations[language][key]) {
      element.textContent = privacyTranslations[language][key];
    }
  });

  if (langSelect) {
    langSelect.value = language;
    langSelect.setAttribute(
      "aria-label",
      privacyTranslations[language].languageLabel
    );
  }
}

if (langSelect) {
  langSelect.addEventListener("change", function () {
    applyPrivacyLanguage(langSelect.value);
  });
}

applyPrivacyLanguage(currentLanguage);
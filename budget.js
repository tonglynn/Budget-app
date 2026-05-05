//SELECT ELEMENTS
const balanceEl = document.querySelector(".balance .value");
const incomeTotalEl = document.querySelector(".income-total");
const outcomeTotalEl = document.querySelector(".outcome-total");
const incomeEl = document.querySelector("#income");
const expenseEl = document.querySelector("#expense");
const allEl = document.querySelector("#all");
const incomeList = document.querySelector("#income .list");
const expenseList = document.querySelector("#expense .list");
const allList = document.querySelector("#all .list");

//SELECT BUTTONS
const expenseBtn = document.querySelector(".first-tab");
const incomeBtn = document.querySelector(".second-tab");
const allBtn = document.querySelector(".third-tab");

//LANGUAGE SELECT
const langSelect = document.getElementById("lang-select");

//INPUT BTS
const addExpense = document.querySelector(".add-expense");
const expenseTitle = document.getElementById("expense-title-input");
const expenseAmount = document.getElementById("expense-amount-input");

const addIncome = document.querySelector(".add-income");
const incomeTitle = document.getElementById("income-title-input");
const incomeAmount = document.getElementById("income-amount-input");

// I18N TRANSLATIONS
const translations = {
  en: {
    languageLabel: "Language",
    balance: "Balance",
    income: "Income",
    outcome: "Outcome",
    dashboard: "Dashboard",
    expenses: "Expenses",
    all: "All",
    titlePlaceholder: "title",
    titleRequired: "Please enter a title.",
    amountPositiveRequired: "Please enter a positive amount.",
    cookieMessage: "We use cookies to improve your experience. By continuing, you agree to our use of cookies.",
    privacyPolicy: "Privacy Policy",
    accept: "Accept",
    decline: "Decline",
    privacyTitle: "Privacy Policy",
    section1Title: "Information We Collect",
    section1Content: "We collect information you provide directly to us, such as when you create an account, make a transaction, or communicate with us. This includes: transaction data (income and expense entries you record), and any other information you choose to provide.",
    section2Title: "How We Use Your Information",
    section2Content: "We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you about your account and our services.",
    section3Title: "Cookies and Tracking",
    section3Content: "We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.",
    section3Content2: "You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.",
    section4Title: "Data Storage and Security",
    section4Content: "We store your data locally on your device using browser localStorage. This means your data is stored on your own device and is not transmitted to our servers. We implement appropriate security measures to protect your personal information.",
    section5Title: "Your Rights",
    section5Content: "You have the right to access, correct, or delete your personal data stored in our application. You can manage your data through the application's interface or by clearing your browser's localStorage.",
    section6Title: "Contact Us",
    section6Content: "If you have any questions about this Privacy Policy, please contact us through our website.",
  },
  zh: {
    languageLabel: "语言选择",
    balance: "余额",
    income: "收入",
    outcome: "支出",
    dashboard: "总览",
    expenses: "支出",
    all: "全部",
    titlePlaceholder: "标题",
    titleRequired: "请输入标题。",
    amountPositiveRequired: "请输入大于 0 的金额。",
    cookieMessage: "我们使用 cookies 来改善您的体验。继续使用即表示您同意我们使用 cookies。",
    privacyPolicy: "隐私政策",
    accept: "接受",
    decline: "拒绝",
    privacyTitle: "隐私政策",
    section1Title: "我们收集的信息",
    section1Content: "我们收集您直接向我们提供的信息，例如当您创建账户、进行交易或与我们沟通时。这包括：交易数据（您记录的收入和支出条目），以及您选择提供的任何其他信息。",
    section2Title: "我们如何使用您的信息",
    section2Content: "我们使用收集的信息来提供、维护和改进我们的服务，处理交易，以及就您的账户和我们的服务与您沟通。",
    section3Title: "Cookies 和追踪",
    section3Content: "我们使用 cookies 和类似的追踪技术来追踪网站上的活动并存储某些信息。Cookies 是包含少量数据的文件，其中可能包含匿名唯一标识符。",
    section3Content2: "您可以指示您的浏览器拒绝所有 cookies 或在发送 cookies 时进行指示。但是，如果您不接受 cookies，您可能无法使用我们服务的某些部分。",
    section4Title: "数据存储和安全",
    section4Content: "我们使用浏览器的 localStorage 将您的数据本地存储在您的设备上。这意味着您的数据存储在您自己的设备上，不会传输到我们的服务器。我们实施适当的安全措施来保护您的个人信息。",
    section5Title: "您的权利",
    section5Content: "您有权访问、更正或删除存储在我们应用程序中的您的个人数据。您可以通过应用程序的界面或通过清除浏览器的 localStorage 来管理您的数据。",
    section6Title: "联系我们",
    section6Content: "如果您对本隐私政策有任何疑问，请通过我们的网站与我们联系。",
  },
  ja: {
    languageLabel: "言語選択",
    balance: "残高",
    income: "収入",
    outcome: "支出",
    dashboard: "概要",
    expenses: "支出",
    all: "すべて",
    titlePlaceholder: "タイトル",
    titleRequired: "タイトルを入力してください。",
    amountPositiveRequired: "0より大きい金額を入力してください。",
    cookieMessage: "私たちはCookiesを使用してあなたの体験を向上させます。続行することで、Cookiesの使用に同意したものとみなされます。",
    privacyPolicy: "プライバシー Policy",
    accept: "同意する",
    decline: "拒否する",
    privacyTitle: "プライバシー Policy",
    section1Title: "私たちが収集する情報",
    section1Content: "私たちは、アカウントを作成したり、取引を行ったり、私たちと通信したりする際に、あなたが直接私たちに提供する情報を収集します。これには：取引データ（あなたが記録した収入と支出の記録）、以及あなたが提供するその他の情報が含まれます。",
    section2Title: "情報の使用方法",
    section2Content: "私たちは、収集した情報を使用して、サービスを提供し、維持し、改善し、取引を処理し、あなたのアカウントと私たちのサービスについてあなたと通信します。",
    section3Title: "Cookies とトラッキング",
    section3Content: "私たちは、Web サイト上のアクティビティを追跡し、特定の情報を保存するために、Cookies や同様のトラッキング技術を使用しています。Cookies は、小さな量のデータを含むファイルで、匿名の一意の識別子を含む場合があります。",
    section3Content2: "あなたは、ブラウザにすべての Cookies を拒否するか、Cookie が送信されているときを示すように指示できます。ただし、Cookies を受け入れない場合、サービスの一部を使用できない場合があります。",
    section4Title: "データの保存とセキュリティ",
    section4Content: "私たちはブラウザの localStorage を使用して、あなたのデータをあなたのデバイスにローカルに保存します。これは、あなたのデータがあなたのデバイスに保存され、私たちのサーバーに送信されないことを意味します。私たちはあなたの个人信息的保护するために適切なセキュリティ対策を実施しています。",
    section5Title: "あなたの権利",
    section5Content: "あなたは私たちのアプリケーションに保存されたあなたの个人データにアクセスしたり、更正したり、削除したりする権利があります。あなたはアプリケーションのインターフェースするか、ブラウザの localStorage をクリアすることでデータを管理できます。",
    section6Title: "お問い合わせ",
    section6Content: "このプライバシー Policy についてご質問がある場合は、Web サイトを通じて私たちにお問い合わせください。",
  },
};

//VARIABLES
let ENTRY_LIST;
let balance = 0,
  income = 0,
  outcome = 0;

let currentLanguage = localStorage.getItem("language") || "en";

const DELETE = "delete",
  EDIT = "edit";

// LOOK IF THERE IS DATA IN LOCAL STORAGE
ENTRY_LIST = JSON.parse(localStorage.getItem("entry_list")) || [];
updateUI();
applyLanguage(currentLanguage);

//EVENT LISTENERS
expenseBtn.addEventListener("click", function () {
  show(expenseEl);
  hide([incomeEl, allEl]);
  active(expenseBtn);
  inactive([incomeBtn, allBtn]);
});

incomeBtn.addEventListener("click", function () {
  show(incomeEl);
  hide([expenseEl, allEl]);
  active(incomeBtn);
  inactive([expenseBtn, allBtn]);
});

allBtn.addEventListener("click", function () {
  show(allEl);
  hide([incomeEl, expenseEl]);
  active(allBtn);
  inactive([incomeBtn, expenseBtn]);
});

addExpense.addEventListener("click", function () {
  const validExpense = validateEntryInput(expenseTitle, expenseAmount);

  if (!validExpense.isValid) {
    showValidationMessage(validExpense.messageKey);
    return;
  }

  let expense = {
    type: "expense",
    title: validExpense.title,
    amount: validExpense.amount,
  };

  ENTRY_LIST.push(expense);

  updateUI();
  clearInput([expenseTitle, expenseAmount]);
});

addIncome.addEventListener("click", function () {
  const validIncome = validateEntryInput(incomeTitle, incomeAmount);

  if (!validIncome.isValid) {
    showValidationMessage(validIncome.messageKey);
    return;
  }

  let income = {
    type: "income",
    title: validIncome.title,
    amount: validIncome.amount,
  };

  ENTRY_LIST.push(income);

  updateUI();
  clearInput([incomeTitle, incomeAmount]);
});

incomeList.addEventListener("click", deleteOrEdit);
expenseList.addEventListener("click", deleteOrEdit);
allList.addEventListener("click", deleteOrEdit);

if (langSelect) {
  langSelect.addEventListener("change", function () {
    applyLanguage(langSelect.value);
  });
}

// COOKIE BANNER LOGIC
const COOKIE_CONSENT_KEY = "cookie_consent";
const cookieBanner = document.getElementById("cookie-banner");
const cookieAccept = document.getElementById("cookie-accept");
const cookieDecline = document.getElementById("cookie-decline");

function checkCookieConsent() {
  const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
  return consent !== null;
}

function showCookieBanner(skipTimeout = false) {
  if (cookieBanner) {
    if (skipTimeout) {
      cookieBanner.classList.add("show");
    } else {
      setTimeout(() => {
        cookieBanner.classList.add("show");
      }, 500);
    }
  }
}

function hideCookieBanner() {
  if (cookieBanner) {
    cookieBanner.classList.remove("show");
    cookieBanner.classList.add("hide");
  }
}

function saveCookieConsent(accepted) {
  localStorage.setItem(COOKIE_CONSENT_KEY, accepted ? "accepted" : "declined");
}

if (!checkCookieConsent()) {
  showCookieBanner();
}

if (cookieAccept) {
  cookieAccept.addEventListener("click", function () {
    saveCookieConsent(true);
    hideCookieBanner();
  });
}

if (cookieDecline) {
  cookieDecline.addEventListener("click", function () {
    saveCookieConsent(false);
    hideCookieBanner();
  });
}

// I18N FUNCTION
function applyLanguage(language) {
  if (!translations[language]) {
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

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");

    if (translations[language][key]) {
      element.textContent = translations[language][key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");

    if (translations[language][key]) {
      element.setAttribute("placeholder", translations[language][key]);
    }
  });

  if (langSelect) {
    langSelect.value = language;
    langSelect.setAttribute("aria-label", translations[language].languageLabel);
  }
}

// HELPER FUNCS
function validateEntryInput(titleInput, amountInput) {
  const title = titleInput.value.trim();
  const amount = Number(amountInput.value);

  if (!title) {
    return {
      isValid: false,
      messageKey: "titleRequired",
    };
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    return {
      isValid: false,
      messageKey: "amountPositiveRequired",
    };
  }

  return {
    isValid: true,
    title: title,
    amount: amount,
  };
}

function showValidationMessage(messageKey) {
  const messages = translations[currentLanguage] || translations.en;
  alert(messages[messageKey] || translations.en[messageKey]);
}

function deleteOrEdit(event) {
  const targetBtn = event.target;
  const entry = targetBtn.parentNode;

  if (targetBtn.id == EDIT) {
    editEntry(entry);
  } else if (targetBtn.id == DELETE) {
    deleteEntry(entry);
  }
}

function deleteEntry(entry) {
  ENTRY_LIST.splice(entry.id, 1);
  updateUI();
}

function editEntry(entry) {
  const ENTRY = ENTRY_LIST[entry.id];

  if (ENTRY.type == "income") {
    incomeTitle.value = ENTRY.title;
    incomeAmount.value = ENTRY.amount;
  } else if (ENTRY.type == "expense") {
    expenseTitle.value = ENTRY.title;
    expenseAmount.value = ENTRY.amount;
  }

  deleteEntry(entry);
}

function updateUI() {
  income = calculateTotal("income", ENTRY_LIST);
  outcome = calculateTotal("expense", ENTRY_LIST);
  balance = Math.abs(calculateBalance(income, outcome));

  let sign = income >= outcome ? "$" : "-$";

  //UPDATE UI
  balanceEl.innerHTML = `<small>${sign}</small>${balance}`;
  outcomeTotalEl.innerHTML = `<small>$</small>${outcome}`;
  incomeTotalEl.innerHTML = `<small>$</small>${income}`;

  clearElement([expenseList, incomeList, allList]);

  ENTRY_LIST.forEach((entry, index) => {
    if (entry.type == "expense") {
      showEntry(expenseList, entry.type, entry.title, entry.amount, index);
    } else if (entry.type == "income") {
      showEntry(incomeList, entry.type, entry.title, entry.amount, index);
    }

    showEntry(allList, entry.type, entry.title, entry.amount, index);
  });

  updateChart(income, outcome);
  localStorage.setItem("entry_list", JSON.stringify(ENTRY_LIST));
}

// HELPER FUNC: Escape special HTML characters to prevent XSS attacks
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function showEntry(list, type, title, amount, id) {
  const safeTitle = escapeHTML(title);
  const safeAmount = escapeHTML(amount);
  const entry = `<li id="${id}" class="${type}">
                    <div class="entry">${safeTitle} : $${safeAmount}</div>
                    <div id="edit"></div>
                    <div id="delete"></div>
                  </li>`;

  const position = "afterbegin";
  list.insertAdjacentHTML(position, entry);
}

function clearElement(elements) {
  elements.forEach((element) => {
    element.innerHTML = "";
  });
}

function calculateTotal(type, list) {
  let sum = 0;

  list.forEach((entry) => {
    if (entry.type == type) {
      sum += entry.amount;
    }
  });

  return sum;
}

function calculateBalance(income, outcome) {
  return income - outcome;
}

function clearInput(inputs) {
  inputs.forEach((input) => {
    input.value = "";
  });
}

function show(element) {
  element.classList.remove("hide");
}

function hide(elements) {
  elements.forEach((element) => {
    element.classList.add("hide");
  });
}

function active(element) {
  element.classList.add("focus");
}

function inactive(elements) {
  elements.forEach((element) => {
    element.classList.remove("focus");
  });
}

// ── Exports for testing ──
if (typeof module !== "undefined") {
  module.exports = {
    calculateTotal,
    calculateBalance,
    show,
    hide,
    active,
    inactive,
    clearElement,
    clearInput,
    showEntry,
    deleteEntry,
    editEntry,
    validateEntryInput,
    escapeHTML,
    checkCookieConsent,
    showCookieBanner,
    hideCookieBanner,
    saveCookieConsent,
    applyLanguage,
    get ENTRY_LIST() {
      return ENTRY_LIST;
    },
    set ENTRY_LIST(v) {
      ENTRY_LIST = v;
    },
  };
}
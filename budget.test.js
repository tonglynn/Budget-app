/**
 * @jest-environment jsdom
 */

// ─── Minimal DOM skeleton ─────────────────────────────────────────────────────
document.body.innerHTML = `
  <div class="balance"><span class="value"></span></div>
  <span class="income-total"></span>
  <span class="outcome-total"></span>

  <section id="income" class="hide">
    <ul class="list"></ul>
    <input id="income-title-input" />
    <input id="income-amount-input" />
  </section>
  <section id="expense" class="hide">
    <ul class="list"></ul>
    <input id="expense-title-input" />
    <input id="expense-amount-input" />
  </section>
  <section id="all">
    <ul class="list"></ul>
  </section>

  <button class="first-tab"></button>
  <button class="second-tab"></button>
  <button class="third-tab"></button>
  <button class="add-expense"></button>
  <button class="add-income"></button>
`;

// Stub localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem:  (k)    => store[k] ?? null,
    setItem:  (k, v) => { store[k] = String(v); },
    clear:    ()     => { store = {}; },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Stub updateChart
global.updateChart = jest.fn();

// ─── Import module ────────────────────────────────────────────────────────────
const budget = require("./budget.js");

const {
  calculateTotal, calculateBalance,
  show, hide, active, inactive,
  clearElement, clearInput,
  showEntry, deleteEntry, editEntry,
} = budget;

function resetList(...items) {
  budget.ENTRY_LIST = [];
  items.forEach(i => budget.ENTRY_LIST.push(i));
}

// ─── Shorthand DOM getters ────────────────────────────────────────────────────
const $ = (sel) => document.querySelector(sel);

// ═══════════════════════════════════════════════════════════════════════════════
// UNIT TESTS
// ═══════════════════════════════════════════════════════════════════════════════

// ── 1. calculateTotal ─────────────────────────────────────────────────────────
describe("calculateTotal()", () => {
  const list = [
    { type: "income",  amount: 500 },
    { type: "income",  amount: 300 },
    { type: "expense", amount: 200 },
    { type: "expense", amount: 100 },
  ];

  test("sums all income entries correctly", () => {
    expect(calculateTotal("income", list)).toBe(800);
  });
  test("sums all expense entries correctly", () => {
    expect(calculateTotal("expense", list)).toBe(300);
  });
  test("returns 0 when list is empty", () => {
    expect(calculateTotal("income", [])).toBe(0);
  });
  test("returns 0 when no entries match the type", () => {
    expect(calculateTotal("income", [{ type: "expense", amount: 50 }])).toBe(0);
  });
  test("handles a single matching entry", () => {
    expect(calculateTotal("expense", [{ type: "expense", amount: 99 }])).toBe(99);
  });
});

// ── 2. calculateBalance ───────────────────────────────────────────────────────
describe("calculateBalance()", () => {
  test("returns positive value when income > outcome", () => {
    expect(calculateBalance(1000, 400)).toBe(600);
  });
  test("returns negative value when outcome > income", () => {
    expect(calculateBalance(200, 500)).toBe(-300);
  });
  test("returns 0 when income equals outcome", () => {
    expect(calculateBalance(250, 250)).toBe(0);
  });
  test("handles zero income", () => {
    expect(calculateBalance(0, 100)).toBe(-100);
  });
  test("handles zero outcome", () => {
    expect(calculateBalance(100, 0)).toBe(100);
  });
});

// ── 3. show / hide ────────────────────────────────────────────────────────────
describe("show() and hide()", () => {
  let el, el2;
  beforeEach(() => {
    el  = document.createElement("div");
    el2 = document.createElement("div");
    document.body.append(el, el2);
  });
  afterEach(() => { el.remove(); el2.remove(); });

  test("show() removes the 'hide' class", () => {
    el.classList.add("hide");
    show(el);
    expect(el.classList.contains("hide")).toBe(false);
  });
  test("show() is a no-op when element has no 'hide' class", () => {
    show(el);
    expect(el.classList.contains("hide")).toBe(false);
  });
  test("hide() adds 'hide' class to every element in array", () => {
    hide([el, el2]);
    expect(el.classList.contains("hide")).toBe(true);
    expect(el2.classList.contains("hide")).toBe(true);
  });
});

// ── 4. active / inactive ──────────────────────────────────────────────────────
describe("active() and inactive()", () => {
  let btn, btn2;
  beforeEach(() => {
    btn  = document.createElement("button");
    btn2 = document.createElement("button");
    document.body.append(btn, btn2);
  });
  afterEach(() => { btn.remove(); btn2.remove(); });

  test("active() adds 'focus' class", () => {
    active(btn);
    expect(btn.classList.contains("focus")).toBe(true);
  });
  test("inactive() removes 'focus' class from every element", () => {
    btn.classList.add("focus");
    btn2.classList.add("focus");
    inactive([btn, btn2]);
    expect(btn.classList.contains("focus")).toBe(false);
    expect(btn2.classList.contains("focus")).toBe(false);
  });
});

// ── 5. clearElement ───────────────────────────────────────────────────────────
describe("clearElement()", () => {
  test("empties innerHTML of every element in the array", () => {
    const a = document.createElement("ul");
    const b = document.createElement("ul");
    a.innerHTML = "<li>item</li>";
    b.innerHTML = "<li>item</li>";
    clearElement([a, b]);
    expect(a.innerHTML).toBe("");
    expect(b.innerHTML).toBe("");
  });
  test("handles an array with one element", () => {
    const el = document.createElement("div");
    el.innerHTML = "hello";
    clearElement([el]);
    expect(el.innerHTML).toBe("");
  });
});

// ── 6. clearInput ─────────────────────────────────────────────────────────────
describe("clearInput()", () => {
  test("sets value to empty string for each input", () => {
    const i1 = document.createElement("input");
    const i2 = document.createElement("input");
    i1.value = "Rent";
    i2.value = "500";
    clearInput([i1, i2]);
    expect(i1.value).toBe("");
    expect(i2.value).toBe("");
  });
});

// ── 7. showEntry ──────────────────────────────────────────────────────────────
describe("showEntry()", () => {
  let list;
  beforeEach(() => {
    list = document.createElement("ul");
    document.body.appendChild(list);
  });
  afterEach(() => list.remove());

  test("inserts a list item into the list", () => {
    showEntry(list, "income", "Salary", 3000, 0);
    expect(list.querySelectorAll("li").length).toBe(1);
  });
  test("rendered item contains the title and amount", () => {
    showEntry(list, "expense", "Rent", 800, 1);
    expect(list.innerHTML).toContain("Rent");
    expect(list.innerHTML).toContain("800");
  });
  test("rendered item carries correct id attribute", () => {
    showEntry(list, "income", "Bonus", 200, 5);
    expect(list.querySelector("li").id).toBe("5");
  });
  test("rendered item has correct type class", () => {
    showEntry(list, "expense", "Food", 50, 0);
    expect(list.querySelector("li").classList.contains("expense")).toBe(true);
  });
  test("inserts at beginning — last added appears first", () => {
    showEntry(list, "income", "First",  100, 0);
    showEntry(list, "income", "Second", 200, 1);
    expect(list.querySelectorAll("li")[0].innerHTML).toContain("Second");
  });
});

// ── 8. deleteEntry ────────────────────────────────────────────────────────────
describe("deleteEntry()", () => {
  beforeEach(() => {
    resetList(
      { type: "income",  title: "Salary", amount: 1000 },
      { type: "expense", title: "Rent",   amount: 500  },
    );
  });

  test("removes the entry at the given index", () => {
    deleteEntry({ id: 0 });
    expect(budget.ENTRY_LIST.length).toBe(1);
    expect(budget.ENTRY_LIST[0].title).toBe("Rent");
  });
  test("ENTRY_LIST length decreases by 1", () => {
    const before = budget.ENTRY_LIST.length;
    deleteEntry({ id: 1 });
    expect(budget.ENTRY_LIST.length).toBe(before - 1);
  });
});

// ── 9. editEntry ──────────────────────────────────────────────────────────────
describe("editEntry()", () => {
  const iTitle  = () => document.getElementById("income-title-input");
  const iAmount = () => document.getElementById("income-amount-input");
  const eTitle  = () => document.getElementById("expense-title-input");
  const eAmount = () => document.getElementById("expense-amount-input");

  beforeEach(() => {
    resetList(
      { type: "income",  title: "Freelance", amount: 750 },
      { type: "expense", title: "Groceries", amount: 120 },
    );
    [iTitle(), iAmount(), eTitle(), eAmount()].forEach(el => { if (el) el.value = ""; });
  });

  test("populates income inputs when editing an income entry", () => {
    editEntry({ id: 0 });
    expect(iTitle().value).toBe("Freelance");
    expect(iAmount().value).toBe("750");
  });
  test("populates expense inputs when editing an expense entry", () => {
    editEntry({ id: 1 });
    expect(eTitle().value).toBe("Groceries");
    expect(eAmount().value).toBe("120");
  });
  test("removes the edited entry from ENTRY_LIST", () => {
    const before = budget.ENTRY_LIST.length;
    editEntry({ id: 0 });
    expect(budget.ENTRY_LIST.length).toBe(before - 1);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// INTEGRATION TESTS — Event Listeners (covers lines 40-102)
// ═══════════════════════════════════════════════════════════════════════════════

// ── 10. Tab switching buttons ─────────────────────────────────────────────────
describe("Tab switching buttons", () => {
  const expenseSection = () => document.getElementById("expense");
  const incomeSection  = () => document.getElementById("income");
  const allSection     = () => document.getElementById("all");
  const expenseTab     = () => document.querySelector(".first-tab");
  const incomeTab      = () => document.querySelector(".second-tab");
  const allTab         = () => document.querySelector(".third-tab");

  test("clicking expense tab shows expense section and hides others", () => {
    expenseTab().click();
    expect(expenseSection().classList.contains("hide")).toBe(false);
    expect(incomeSection().classList.contains("hide")).toBe(true);
    expect(allSection().classList.contains("hide")).toBe(true);
  });

  test("clicking expense tab gives it 'focus' and removes focus from others", () => {
    expenseTab().click();
    expect(expenseTab().classList.contains("focus")).toBe(true);
    expect(incomeTab().classList.contains("focus")).toBe(false);
    expect(allTab().classList.contains("focus")).toBe(false);
  });

  test("clicking income tab shows income section and hides others", () => {
    incomeTab().click();
    expect(incomeSection().classList.contains("hide")).toBe(false);
    expect(expenseSection().classList.contains("hide")).toBe(true);
    expect(allSection().classList.contains("hide")).toBe(true);
  });

  test("clicking income tab gives it 'focus' and removes focus from others", () => {
    incomeTab().click();
    expect(incomeTab().classList.contains("focus")).toBe(true);
    expect(expenseTab().classList.contains("focus")).toBe(false);
    expect(allTab().classList.contains("focus")).toBe(false);
  });

  test("clicking all tab shows all section and hides others", () => {
    allTab().click();
    expect(allSection().classList.contains("hide")).toBe(false);
    expect(expenseSection().classList.contains("hide")).toBe(true);
    expect(incomeSection().classList.contains("hide")).toBe(true);
  });

  test("clicking all tab gives it 'focus' and removes focus from others", () => {
    allTab().click();
    expect(allTab().classList.contains("focus")).toBe(true);
    expect(expenseTab().classList.contains("focus")).toBe(false);
    expect(incomeTab().classList.contains("focus")).toBe(false);
  });
});

// ── 11. Add Expense button ────────────────────────────────────────────────────
describe("Add Expense button", () => {
  const addExpenseBtn = () => document.querySelector(".add-expense");
  const titleInput    = () => document.getElementById("expense-title-input");
  const amountInput   = () => document.getElementById("expense-amount-input");

  beforeEach(() => {
    resetList();
    titleInput().value  = "";
    amountInput().value = "";
  });

  test("does nothing when both inputs are empty", () => {
    const before = budget.ENTRY_LIST.length;
    addExpenseBtn().click();
    expect(budget.ENTRY_LIST.length).toBe(before);
  });

  test("does nothing when only title is filled", () => {
    titleInput().value = "Coffee";
    const before = budget.ENTRY_LIST.length;
    addExpenseBtn().click();
    expect(budget.ENTRY_LIST.length).toBe(before);
  });

  test("does nothing when only amount is filled", () => {
    amountInput().value = "5";
    const before = budget.ENTRY_LIST.length;
    addExpenseBtn().click();
    expect(budget.ENTRY_LIST.length).toBe(before);
  });

  test("adds an expense entry when both inputs are filled", () => {
    titleInput().value  = "Coffee";
    amountInput().value = "5";
    addExpenseBtn().click();
    const last = budget.ENTRY_LIST[budget.ENTRY_LIST.length - 1];
    expect(last.type).toBe("expense");
    expect(last.title).toBe("Coffee");
    expect(last.amount).toBe(5);
  });

  test("clears inputs after adding an expense", () => {
    titleInput().value  = "Coffee";
    amountInput().value = "5";
    addExpenseBtn().click();
    expect(titleInput().value).toBe("");
    expect(amountInput().value).toBe("");
  });
});

// ── 12. Add Income button ─────────────────────────────────────────────────────
describe("Add Income button", () => {
  const addIncomeBtn = () => document.querySelector(".add-income");
  const titleInput   = () => document.getElementById("income-title-input");
  const amountInput  = () => document.getElementById("income-amount-input");

  beforeEach(() => {
    resetList();
    titleInput().value  = "";
    amountInput().value = "";
  });

  test("does nothing when both inputs are empty", () => {
    const before = budget.ENTRY_LIST.length;
    addIncomeBtn().click();
    expect(budget.ENTRY_LIST.length).toBe(before);
  });

  test("does nothing when only title is filled", () => {
    titleInput().value = "Salary";
    const before = budget.ENTRY_LIST.length;
    addIncomeBtn().click();
    expect(budget.ENTRY_LIST.length).toBe(before);
  });

  test("adds an income entry when both inputs are filled", () => {
    titleInput().value  = "Salary";
    amountInput().value = "3000";
    addIncomeBtn().click();
    const last = budget.ENTRY_LIST[budget.ENTRY_LIST.length - 1];
    expect(last.type).toBe("income");
    expect(last.title).toBe("Salary");
    expect(last.amount).toBe(3000);
  });

  test("clears inputs after adding an income", () => {
    titleInput().value  = "Salary";
    amountInput().value = "3000";
    addIncomeBtn().click();
    expect(titleInput().value).toBe("");
    expect(amountInput().value).toBe("");
  });
});

// ── 13. deleteOrEdit via list click ──────────────────────────────────────────
describe("deleteOrEdit() — list click events", () => {
  beforeEach(() => {
    resetList(
      { type: "income",  title: "Salary",   amount: 1000 },
      { type: "expense", title: "Groceries", amount: 200  },
    );
    // Render entries so list items exist in DOM
    const incomeList  = document.querySelector("#income .list");
    const expenseList = document.querySelector("#expense .list");
    clearElement([incomeList, expenseList]);
    showEntry(incomeList,  "income",  "Salary",    1000, 0);
    showEntry(expenseList, "expense", "Groceries", 200,  1);
  });

  test("clicking delete button on income entry removes it", () => {
    const incomeList = document.querySelector("#income .list");
    const deleteBtn  = incomeList.querySelector("#delete");
    const before = budget.ENTRY_LIST.length;
    deleteBtn.click();
    expect(budget.ENTRY_LIST.length).toBe(before - 1);
  });

  test("clicking edit button on expense entry populates inputs", () => {
    const expenseList = document.querySelector("#expense .list");
    const editBtn     = expenseList.querySelector("#edit");
    editBtn.click();
    expect(document.getElementById("expense-title-input").value).toBe("Groceries");
    expect(document.getElementById("expense-amount-input").value).toBe("200");
  });
});
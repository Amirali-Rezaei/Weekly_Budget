// Classes
class Budget {
  constructor(budget) {
    this.budget = budget;
  }
}

class LocalStorageWorks {
  saveBudgetToLocalStorage(budget) {
    localStorage.setItem("weekBudget", budget);
  }

  getBudgetFromLocalStorage() {
    return localStorage.getItem("weekBudget");
  }

  getExpenseFromLocalStorage() {
    let expenses;

    // Checks If The LocalStorage Is Empty Or Not
    if (localStorage.getItem("expenses")) {
      expenses = JSON.parse(localStorage.getItem("expenses"));
    } else {
      expenses = [];
    }

    return expenses;
  }

  clearLocalStorage() {
    localStorage.removeItem("weekBudget");
    localStorage.removeItem("expenses");
  }

  saveExpenseToLocalStorage(expenseName, amount) {
    let expenses = this.getExpenseFromLocalStorage();
    const expense = {
      expenseName: expenseName,
      amount: amount,
    };

    // Adds The New Course To The Courses Array
    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));
  }
}

// Every thing related to the HTML
class Html {
  // Insert user budget to document method
  insertBudget(amount) {
    budgetTotal.innerHTML = `${amount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    budgetLeft.innerHTML = `${amount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }

  // Print all messages for user
  printMessage(message, className) {
    const div = document.createElement("div");
    div.classList.add("alert", "text-center", className);
    div.appendChild(document.createTextNode(message));
    const messageContainer = document.querySelector(".primary");
    messageContainer.insertBefore(div, addExpenseForm);
  }

  // Add expenses to the html
  insertExpenseToHtml(expenseName, amount) {
    const expensesUl = document.querySelector("#expenses ul");
    const expenseLi = document.createElement("li");
    expenseLi.className =
      "list-group-item d-flex justify-content-between align-items-center margin-5";
    expenseLi.innerHTML = `${expenseName} 
    <span class="badge badge-primary badge-pill p-2">${amount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان</span>`;
    expensesUl.appendChild(expenseLi);
  }
}

// Variables
let weekMoney;
let budget;
const clearBudget = document.querySelector("#clearBudget");
const budgetTotal = document.querySelector("span#total");
const budgetLeft = document.querySelector("span#left");
const html = new Html();
const localStorageWorks = new LocalStorageWorks();
const addExpenseForm = document.querySelector("#add-expense");

// Event Listeners
function eventListeners() {
  document.addEventListener("DOMContentLoaded", () => {
    // Getting the week budget from the user
    if (localStorage.getItem("weekBudget") == null) {
      weekMoney = parseInt(prompt("لطفاً بودجه هفته خود را وارد کنید!"));
      while (
        isNaN(weekMoney) ||
        weekMoney == 0 ||
        typeof parseInt(weekMoney) != "number"
      ) {
        weekMoney = parseInt(prompt("لطفاً بودجه هفته خود را وارد کنید!"));
      }
      budget = new Budget(weekMoney);
      html.insertBudget(budget.budget);
      localStorageWorks.saveBudgetToLocalStorage(budget.budget);
    } else {
      html.insertBudget(localStorageWorks.getBudgetFromLocalStorage());
    }

    if (localStorage.getItem("expenses") != null) {
      const expenses = localStorageWorks.getExpenseFromLocalStorage();
      expenses.forEach((expense) => {
        html.insertExpenseToHtml(expense.expenseName, expense.amount);
      });
    }
  });

  clearBudget.addEventListener("click", function () {
    localStorageWorks.clearLocalStorage();
    location.reload();
  });

  // Get form values on submit
  addExpenseForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Getting values of input fields
    const expense = document.querySelector("#expense").value;
    const amount = document.querySelector("#amount").value;

    if (expense === "" || amount === "") {
      html.printMessage("همه ی فیلد ها را پر کنید!", "alert-danger");
      setTimeout(() => {
        html.removeMessage("alert-danger");
      }, 1500);
    } else {
      html.insertExpenseToHtml(expense, amount);
      localStorageWorks.saveExpenseToLocalStorage(expense, amount);
    }
  });
}

eventListeners();

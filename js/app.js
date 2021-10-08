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

  clearLocalStorage() {
    localStorage.removeItem("weekBudget");
  }
}

// Every thing related to the HTML
class Html {
  // Insert user budget to document method
  insertBudget(amount) {
    budgetTotal.innerHTML = amount;
    budgetLeft.innerHTML = amount;
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
  insertExpenseToHtml(name, amount) {
    const expensesUl = document.querySelector("#expenses ul");
    const expenseLi = document.createElement("li");
    expenseLi.innerHTML = `${name}: ${amount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان`;
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
    }
  });
}

eventListeners();

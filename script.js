// Select elements
    const balanceEl = document.getElementById("balance");
    const incomeEl = document.getElementById("income");
    const expensesEl = document.getElementById("expenses");
    const transactionForm = document.getElementById("transaction-form");
    const transactionList = document.getElementById("transaction-list");
    const summaryBody = document.getElementById("summary-body");
    const themeToggle = document.getElementById("theme-toggle");
    
    let transactions = [];
    let categoryTotals = {};
    
    // Add Transaction
    transactionForm.addEventListener("submit", (e) => {
      e.preventDefault();
    
      const name = document.getElementById("name").value;
      const amount = parseFloat(document.getElementById("amount").value);
      const category = document.getElementById("category").value;
      const type = document.getElementById("type").value;
    
      const transaction = { name, amount, category, type, id: Date.now() };
    
      transactions.push(transaction);
      updateCategoryTotals();
      updateUI();
      transactionForm.reset();
    });
    
    // Update UI
    function updateUI() {
      // Clear list
      transactionList.innerHTML = "";
    
      let income = 0,
        expenses = 0;
    
      transactions.forEach((transaction) => {
        const li = document.createElement("li");
        li.classList.add(transaction.type);
        li.innerHTML = `
          ${transaction.name} - ₹${transaction.amount.toFixed(2)} (${transaction.category})
          <button onclick="deleteTransaction(${transaction.id})">X</button>
        `;
        transactionList.appendChild(li);
    
        if (transaction.type === "income") {
          income += transaction.amount;
        } else {
          expenses += transaction.amount;
        }
      });
    
      const balance = income - expenses;
    
      balanceEl.textContent = balance.toFixed(2);
      incomeEl.textContent = income.toFixed(2);
      expensesEl.textContent = expenses.toFixed(2);
    
      updateSummaryTable();
    }
    
    // Update Category Totals
    function updateCategoryTotals() {
      categoryTotals = {};
    
      transactions.forEach((transaction) => {
        const { category, type, amount } = transaction;
    
        if (!categoryTotals[category]) {
          categoryTotals[category] = { income: 0, expense: 0 };
        }
    
        categoryTotals[category][type] += amount;
      });
    }
    
    // Update Summary Table
    function updateSummaryTable() {
      summaryBody.innerHTML = "";
    
      Object.keys(categoryTotals).forEach((category) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${category}</td>
          <td class="income">₹${categoryTotals[category].income.toFixed(2)}</td>
          <td class="expense">₹${categoryTotals[category].expense.toFixed(2)}</td>
        `;
        summaryBody.appendChild(row);
      });
    }
    
    // Delete Transaction
    function deleteTransaction(id) {
      transactions = transactions.filter((transaction) => transaction.id !== id);
      updateCategoryTotals();
      updateUI();
    }
    
    // Dark Mode Toggle
    themeToggle.addEventListener("change", () => {
      document.body.classList.toggle("dark");
    });
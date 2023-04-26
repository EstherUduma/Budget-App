const transactionsEl = document.querySelector('.transactions');
const balanceNumberEl = document.querySelector('.balance-number');
const numberIncomeEl = document.querySelector('.number--income');
const numberExpensesEl = document.querySelector('.number--expenses');
const formEl = document.querySelector('.form');
const inputDescriptionEl = document.querySelector('.input--description');
const inputAmountEl = document.querySelector('.input--amount');


//for all input and submit functions
const submitHandler = (event) => {
    //prevent default behaviour
    event.preventDefault();
    
    //get input values
    const description = inputDescriptionEl.value;
    const amount = +inputAmountEl.value;
    
    //create transaction item HTML
    const transactionItemHTML = `
        <li class="transaction transaction--${amount > 0 ? 'income' : 'expense'}">
            <span class="transaction__text">${description}</span>
            <span class="transaction__amount">${amount > 0 ? '+' : ' '}${amount}</span>
            <button class="transaction__btn">X</button>
        </li>
    `;
    
    //insert new HTML
    transactionsEl.insertAdjacentHTML('beforeend', transactionItemHTML);
    
    //clear form inputs
    inputDescriptionEl.value = '';
    inputAmountEl.value = '';
    
    //unfocus (blur) form inputs
    inputDescriptionEl.blur();
    inputAmountEl.blur();
    
    //update income or expenses
    if (amount > 0) {
        const currentIncome = +numberIncomeEl.textContent;
        const updatedIncome = currentIncome + amount;
        numberIncomeEl.textContent = updatedIncome; 
    } else {
        const currentExpenses = +numberExpensesEl.textContent;
        const updatedExpenses = currentExpenses + amount * -1;
        numberExpensesEl.textContent = updatedExpenses;
    }
    
    //update balance
    const income = +numberIncomeEl.textContent;
    const expenses = +numberExpensesEl.textContent;
    balanceNumberEl.textContent = income - expenses;
    income - expenses < 0 ? balanceNumberEl.style.color = 'red' : balanceNumberEl.style.color = 'blue';    
}
formEl.addEventListener('submit', submitHandler);



//For clicked functions
const clickHandler = (event) => {
    //remove transaction item visually
    const clickedEl = event.target.parentNode;
    clickedEl.remove();
    
    //update income or expenses (change string to number)
    const amountEl = clickedEl.querySelector('.transaction__amount');
    const amount = +amountEl.textContent;
    
    //current income - updated income
    if (amount > 0) {
        const currentIncome = +numberIncomeEl.textContent;
        const updatedIncome = currentIncome - amount;
        numberIncomeEl.textContent = updatedIncome; 
    } else {
        const currentExpenses = +numberExpensesEl.textContent;
        const updatedExpenses = currentExpenses - amount * -1;
        numberExpensesEl.textContent = updatedExpenses;
    }
    
    //update balance
    const income = +numberIncomeEl.textContent;
    const expenses = +numberExpensesEl.textContent;
    balanceNumberEl.textContent = income - expenses;
    
    //make red if balance is negative
    /* if (income - expenses < 0) {
        balanceNumberEl.style.color = 'red';
    } else {
        balanceNumberEl.style.color = 'blue';
    }*/
    income - expenses < 0 ? balanceNumberEl.style.color = 'red' : balanceNumberEl.style.color = 'blue';
    
}
transactionsEl.addEventListener('click', clickHandler);


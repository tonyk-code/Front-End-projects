import { usersData } from "./usersData.js";

let transactionLength;
let collapseBar;
let sideBar ; 
let contentContainer ;
let menuItems ;
let myChart ;
let transactionViewAll;
let userIdNumber;

setUpContent("acc002");

function setUpContent(userId){
    userIdNumber = userId;
    usersData.forEach(user => {
        if(user.id === userId){
                transactionLength = user.transactions.length;
                let html = `
                <div class="header-account-topic">
                    <h4>Overview</h4>
                    <div class="account">
                    <i class="fa-regular fa-user" style="color: #201f24;"></i>
                    <span class="account-name">${user.name}</span>
                    </div>
                </div>

                <!-- Financial Summary -->
                <div class="summary-container">
                    <div class="current-balance-container">
                    <p class="current-balance-text">Current Balance</p>
                    <div class="current-balance-number-container">
                        $<span class="current-balance-number">${formatCurrency(user.currentBalance)}</span>
                    </div>
                    </div>

                    <div class="income-container">
                    <p class="income-text">Income</p>
                    <div class="income-number-container">
                        $<span class="income-number">${formatCurrency(user.income)}</span>
                    </div>
                    </div>

                    <div class="expenses-container">
                    <p class="expenses-text">Expenses</p>
                    <div class="expenses-number-container">
                        $<span class="expenses-number">${formatCurrency(user.expenses)}</span>
                    </div>
                    </div>
                </div>

                <!-- Overview Grid -->
                <div class="grid-overview">
                    <div class="pots-grid">
                    <div class="pots-header">
                        <span class="pots-title">Pots</span>
                        <span class="pots-details">
                        See Details <i class="fa-solid fa-play fa-2xs" style="color: #c2c2c2;"></i>
                        </span>
                    </div>

                    <div class="pots-content">
                        <div class="pots-total-saved">
                        <i class="fa-solid fa-sack-dollar fa-xl" title="Pots" style="color: #a5cbc8;"></i>
                        <div class="pots-total-info">
                            <p class="pots-label">Total Saved</p>
                            <p class="pots-amount">$<span class="pots-amount-number">${formatCurrency(user.pots.totalSaved)}</span></p>
                        </div>
                        </div>

                        <div class="pots-all-expenses">
                        <div class="saving-container">
                            <p class="pots-all-saving-text">Savings</p>
                            <p class="pots-all-saving-amount">$<span class="pots-all-saving-number">${formatCurrency(user.pots.saving)}</span></p>
                        </div>

                        <div class="gift-container">
                            <p class="pots-all-gift-text">Gift</p>
                            <p class="pots-all-gift-amount">$<span class="pots-all-gift-number">${formatCurrency(user.pots.gift)}</span></p>
                        </div>

                        <div class="concert-container">
                            <p class="pots-all-concert-text">Concert Ticket</p>
                            <p class="pots-all-concert-amount">$<span class="pots-all-concert-number">${formatCurrency(user.pots.concertTicket)}</span></p>
                        </div>

                        <div class="new-laptop-container">
                            <p class="pots-all-new-laptop-text">New Laptop</p>
                            <p class="pots-all-new-laptop-amount">$<span class="pots-all-new-laptop-number">${formatCurrency(user.pots.newLaptop)}</span></p>
                        </div>
                        </div>
                    </div>
                    </div>


                    <div class="budgets-grid">
                    <div class="budget-header">
                        <span class="budget-title">Budgets</span>
                        <span class="budget-details">
                        See Details <i class="fa-solid fa-play fa-2xs" style="color: #c2c2c2;"></i>
                        </span>
                    </div>

                    <div class="budget-content">
                        <div class="budget-chart">
                            <canvas id="myChart"></canvas>
                        </div>

                        <div class="budget-labels">
                        <div class="budget-label-item-1">
                            <p class="label-name">Entertainment</p>
                            <p class="label-amount">$<span class="label-amount-value">${formatCurrency(user.budgets[0].entertiment)}</span></p>
                        </div>

                        <div class="budget-label-item-2">
                            <p class="label-name">Bills</p>
                            <p class="label-amount">$<span class="label-amount-value">${formatCurrency(user.budgets[2].bills)}</span></p>
                        </div>

                        <div class="budget-label-item-3">
                            <p class="label-name">Dining Out</p>
                            <p class="label-amount">$<span class="label-amount-value">${formatCurrency(user.budgets[1].diningOut)}</span></p>
                        </div>

                        <div class="budget-label-item-4">
                            <p class="label-name">Personal Care</p>
                            <p class="label-amount">$<span class="label-amount-value">${formatCurrency(user.budgets[3].personalCare)}</span></p>
                        </div>
                        </div>
                    </div>
                    </div>


                    <div class="transactions-grid">
                    <div class="transactions-header">
                        <span class="transactions-title">Transactions</span>
                        <span class="transactions-view-all">
                        View All <i class="fa-solid fa-play fa-2xs" style="color: #c2c2c2;"></i>
                        </span>
                    </div>

                    <div class="transactions-list">
                        <div class="transaction">
                        <div class="transaction-person">
                            <img src="podmatch-GEnCnYhA1J4-unsplash.jpg" alt="" width="20" height="20">
                            <span class="transaction-name">${user.transactions[transactionLength-1].personName}</span>
                        </div>

                        <div class="transaction-details">
                            <p class="transaction-amount transaction-${transactionType(user.transactions[transactionLength-1].transactionType)}">${transactionSign(user.transactions[transactionLength-1].transactionType)}$${formatCurrency(user.transactions[transactionLength-1].transactionAmount)}</p>
                            <p class="transaction-date">${user.transactions[transactionLength-1].transactionDate}</p>
                        </div>
                        </div>

                        <div class="transaction">
                        <div class="transaction-person">
                            <img src="michael-dam-mEZ3PoFGs_k-unsplash.jpg" alt="" width="20" height="20">
                            <span class="transaction-name">${user.transactions[transactionLength-2].personName}</span>
                        </div>
                        <div class="transaction-details">
                            <p class="transaction-amount transaction-${transactionType(user.transactions[transactionLength-2].transactionType)}">${transactionSign(user.transactions[transactionLength-2].transactionType)}$${formatCurrency(user.transactions[transactionLength-2].transactionAmount)}</p>
                            <p class="transaction-date">${user.transactions[transactionLength-2].transactionDate}</p>
                        </div>
                        </div>

                        <div class="transaction">
                        <div class="transaction-person">
                            <img src="diego-hernandez-MSepzbKFz10-unsplash.jpg" alt="" width="20" height="20">
                            <span class="transaction-name">${user.transactions[transactionLength-3].personName}</span>
                        </div>
                        <div class="transaction-details">
                            <p class="transaction-amount transaction-${transactionType(user.transactions[transactionLength-3].transactionType)}">${transactionSign(user.transactions[transactionLength-3].transactionType)}$${formatCurrency(user.transactions[transactionLength-3].transactionAmount)}</p>
                            <p class="transaction-date">${user.transactions[transactionLength-3].transactionDate}</p>
                        </div>
                        </div>

                        <div class="transaction">
                        <div class="transaction-person">
                            <img src="joseph-gonzalez-iFgRcqHznqg-unsplash.jpg" alt="" width="20" height="20">
                            <span class="transaction-name">${user.transactions[transactionLength-4].personName}</span>
                        </div>
                        <div class="transaction-details">
                            <p class="transaction-amount transaction-${transactionType(user.transactions[transactionLength-4].transactionType)}">${transactionSign(user.transactions[transactionLength-4].transactionType)}$${formatCurrency(user.transactions[transactionLength-4].transactionAmount)}</p>
                            <p class="transaction-date">${user.transactions[transactionLength-4].transactionDate}</p>
                        </div>
                        </div>

                        <div class="transaction">
                        <div class="transaction-person">
                            <img src="jurica-koletic-7YVZYZeITc8-unsplash.jpg" alt="" width="20" height="20">
                            <span class="transaction-name">${user.transactions[transactionLength-5].personName}</span>
                        </div>
                        <div class="transaction-details">
                            <p class="transaction-amount transaction-${transactionType(user.transactions[transactionLength-5].transactionType)}">${transactionSign(user.transactions[transactionLength-5].transactionType)}$${formatCurrency(user.transactions[transactionLength-5].transactionAmount)}</p>
                            <p class="transaction-date">${user.transactions[transactionLength-5].transactionDate}</p>
                        </div>
                        </div>
                    </div>
                    </div>

                    <div class="recurring-bills-grid">
                    <div class="recurring-bills-header">
                        <span class="recurring-bills-title">Recurring Bills</span>
                        <span class="recurring-bills-details">
                        See Details <i class="fa-solid fa-play fa-2xs" style="color: #c2c2c2;"></i>
                        </span>
                    </div>

                    <div class="recurring-bills-content">
                        <div class="bill-summary paid-bills-summary">
                        <p class="bill-type">Paid Bills</p>
                        <p class="bill-amount">$<span class="bill-number">${formatCurrency(user.recurringBils.paidBills)}</span></p>
                        </div>

                        <div class="bill-summary upcoming-bills-summary">
                        <p class="bill-type">Upcoming Bills</p>
                        <p class="bill-amount">$<span class="bill-number">${formatCurrency(user.recurringBils.upcomingBills)}</span></p>
                        </div>

                        <div class="bill-summary due-bills-summary">
                        <p class="bill-type">Due Bills</p>
                        <p class="bill-amount">$<span class="bill-number">${formatCurrency(user.recurringBils.dueBills)}</span></p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            ` 
            contentContainer = document.querySelector('.content-container');
            contentContainer.innerHTML = html;
            initalizeVariables();
            initializeSidebarToggle();
            setupActiveMenuHandler();
            chartSetUp(user);
            transactionContainer();
            overviewContainer();

        }
        
    });  
}

function overviewContainer(){
    document.querySelector('.overview-list').addEventListener('click' , () => {
        setUpContent(userIdNumber);
    })
}

function transactionContainer(){
    transactionViewAll.addEventListener('click' , () => {
        setUpTransactionViewAll();
    })
}
function setUpTransactionViewAll(){
    let html = `
        <div class="transactions-grid">
            <div class="transactions-header">
                <span class="transactions-title">Transactions</span>
                <span class="transactions-view-all">
                    View All <i class="fa-solid fa-play fa-2xs" style="color: #c2c2c2;"></i>
                </span>
            </div>
            <div class="transactions-list transaction-list-js"></div>
        </div>
    `;

    contentContainer.innerHTML = html;

    // Delay the DOM query to allow innerHTML to render first
    setTimeout(() => {
        const transactionList = document.querySelector('.transactions-list-js');
        let x = 1;

        usersData.forEach(user => {
            let index = transactionLength - x;
            let transaction = user.transactions[index];
            let child = `
                <div class="transaction">
                    <div class="transaction-person">
                        <img src="jurica-koletic-7YVZYZeITc8-unsplash.jpg" alt="" width="20" height="20">
                        <span class="transaction-name">${transaction.personName}</span>
                    </div>
                    <div class="transaction-details">
                        <p class="transaction-amount transaction-${transactionType(transaction.transactionType)}">
                            ${transactionSign(transaction.transactionType)}$${formatCurrency(transaction.transactionAmount)}
                        </p>
                        <p class="transaction-date">${transaction.transactionDate}</p>
                    </div>
                </div>
            `;
            transactionList.insertAdjacentHTML("beforeend", child);
            x++;
        });
    }, 0);
}



function formatCurrency(number) {
  return (number / 100).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}


function transactionType(type){
    if( type === "credited" ){
        return "add";
    }

    else if( type === "debited"){
        return "remove"
    }
}

function transactionSign(type){
    if( type === "credited" ){
        return "+";
    }

    else if( type === "debited"){
        return "-"
    }
}




function initalizeVariables(){
    collapseBar = document.querySelector('.fa-bars');
    sideBar = document.querySelector('.sidebar-container');
    menuItems = document.querySelectorAll('.sidebar-menu li');
    myChart = document.getElementById('myChart');
    transactionViewAll = document.querySelector('.transactions-view-all');
}

function initializeSidebarToggle(){
    collapseBar.addEventListener('click', () => {
        if (sideBar.classList.contains('sidebar-colapse')) {
            sideBar.classList.remove('sidebar-colapse');
            contentContainer.classList.remove('side-bar-collapsed');
        } else {
            sideBar.classList.add('sidebar-colapse');
            contentContainer.classList.add('side-bar-collapsed');
        }
    });
}

function setupActiveMenuHandler(){
    // Handle active menu item click and style update
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active-list class from all items
            menuItems.forEach(i => i.classList.remove('active-list'));
            // Add active-list to the clicked item
            item.classList.add('active-list');
        });
    });
}



function chartSetUp(user) {
  let userData = [
    user.budgets[0].entertainment,
    user.budgets[2].bills,
    user.budgets[1].diningOut,
    user.budgets[3].personalCare
  ];

  new Chart(myChart, {
    type: "doughnut",
    data: {
      labels: ["Entertainment", "Bills", "Dining Out", "Personal Care"],
      datasets: [
        {
          label: "Budget",
          data: userData,
          backgroundColor: [
            "#2f9797",
            "#85c6d0",
            "#ebccaf",
            "#666470"
          ],
          borderWidth: 3
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}



window.addEventListener('resize' , () => {
    if(window.innerWidth < 1023 ){
        if(sideBar.classList.contains('sidebar-colapse')){
            sideBar.classList.remove('sidebar-colapse');
        }
    }
})



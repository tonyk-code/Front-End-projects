import { usersData } from "../data/usersData.js";
import { dashBoard } from "../scripts/dashboard.js";

let collapseBar;
let sideBar ; 
let contentContainer ;
let menuItems ;
let myChart ;
let btnLogout;

export function setUpHtml(id){
    document.body.innerHTML = `
        <div class="main-container">
            <button class="Btn">
                <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                <div class="text">Logout</div>
            </button>
            <!-- Sidebar -->
            <div class="sidebar-container">
            <div class="sidebar">
                <div class="sidebar-heading">
                <span class="brand-name">Finance</span>
                <i class="fa-solid fa-bars fa-sm" style="color: #e4e4e4;"></i>
                </div>
                <ul class="sidebar-menu">
                <li class="active-list">
                    <i class="fa-solid fa-house fa-xs" title="Overview"></i>
                    <span class="overview">Overview</span>
                </li>
                <li>
                    <i class="fa-solid fa-arrow-right-arrow-left fa-xs" title="Transactions"></i>
                    <span class="transactions">Transactions</span>
                </li>
                <li>
                    <i class="fa-solid fa-chart-pie fa-xs" title="Budgets"></i>
                    <span class="budgets">Budgets</span>
                </li>
                <li>
                    <i class="fa-solid fa-sack-dollar fa-xs" title="Pots"></i>
                    <span class="pots">Pots</span>
                </li>
                <li>
                    <i class="fa-solid fa-receipt fa-xs" title="Recurring Bills"></i>
                    <span class="recurring-bills">Recurring Bills</span>
                </li>
                </ul>
            </div>
            </div>

            <!-- Main Content -->
            <div class="content-container">
            </div> 
        </div>
    `
    if(document.body.classList.contains('dashboard-mode')){
        document.body.classList.remove('dashboard-mode');
    }

    else if(document.body.classList.contains('login-mode')){
        document.body.classList.remove('login-mode')
    }
    document.body.classList.add('main-mode');
    setUpContent(id);

}

function setUpContent(userId){
    usersData.forEach(user => {
        if(user.id === userId){
                let transactionLength = user.transactions.length;
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
                            <img src="../image/podmatch-GEnCnYhA1J4-unsplash.jpg" alt="" width="20" height="20">
                            <span class="transaction-name">${user.transactions[transactionLength-1].personName}</span>
                        </div>

                        <div class="transaction-details">
                            <p class="transaction-amount transaction-${transactionType(user.transactions[transactionLength-1].transactionType)}">${transactionSign(user.transactions[transactionLength-1].transactionType)}$${formatCurrency(user.transactions[transactionLength-1].transactionAmount)}</p>
                            <p class="transaction-date">${user.transactions[transactionLength-1].transactionDate}</p>
                        </div>
                        </div>

                        <div class="transaction">
                        <div class="transaction-person">
                            <img src="../image/michael-dam-mEZ3PoFGs_k-unsplash.jpg" alt="" width="20" height="20">
                            <span class="transaction-name">${user.transactions[transactionLength-2].personName}</span>
                        </div>
                        <div class="transaction-details">
                            <p class="transaction-amount transaction-${transactionType(user.transactions[transactionLength-2].transactionType)}">${transactionSign(user.transactions[transactionLength-2].transactionType)}$${formatCurrency(user.transactions[transactionLength-2].transactionAmount)}</p>
                            <p class="transaction-date">${user.transactions[transactionLength-2].transactionDate}</p>
                        </div>
                        </div>

                        <div class="transaction">
                        <div class="transaction-person">
                            <img src="../image/diego-hernandez-MSepzbKFz10-unsplash.jpg" alt="" width="20" height="20">
                            <span class="transaction-name">${user.transactions[transactionLength-3].personName}</span>
                        </div>
                        <div class="transaction-details">
                            <p class="transaction-amount transaction-${transactionType(user.transactions[transactionLength-3].transactionType)}">${transactionSign(user.transactions[transactionLength-3].transactionType)}$${formatCurrency(user.transactions[transactionLength-3].transactionAmount)}</p>
                            <p class="transaction-date">${user.transactions[transactionLength-3].transactionDate}</p>
                        </div>
                        </div>

                        <div class="transaction">
                        <div class="transaction-person">
                            <img src="../image/joseph-gonzalez-iFgRcqHznqg-unsplash.jpg" alt="" width="20" height="20">
                            <span class="transaction-name">${user.transactions[transactionLength-4].personName}</span>
                        </div>
                        <div class="transaction-details">
                            <p class="transaction-amount transaction-${transactionType(user.transactions[transactionLength-4].transactionType)}">${transactionSign(user.transactions[transactionLength-4].transactionType)}$${formatCurrency(user.transactions[transactionLength-4].transactionAmount)}</p>
                            <p class="transaction-date">${user.transactions[transactionLength-4].transactionDate}</p>
                        </div>
                        </div>

                        <div class="transaction">
                        <div class="transaction-person">
                            <img src="../image/jurica-koletic-7YVZYZeITc8-unsplash.jpg" alt="" width="20" height="20">
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
            logoutFunctionality();

        }
        
    });  
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
    btnLogout = document.querySelector('.Btn')

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

function logoutFunctionality(){
    btnLogout.addEventListener('click' , () => {
        dashBoard();
    })

}





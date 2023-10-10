let navLinks = document.getElementById("navLinks");
const transactionHistoryDiv = document.getElementById("transaction-history");

function openDashboardNav(){
    navLinks.style.left = "0";
}
function closeDashboardNav(){
    navLinks.style.left = "-200px";
}

function createTransactionHistory() {
    const transactions = [
        { name: "Aravinth", type: "Debited", amount: "- ₹ 36,577", imgSrc: "https://i.pravatar.cc/40?img=68" },
        { name: "Mohammed Sherif", type: "Credited", amount: "+ ₹ 16,760", imgSrc: "https://i.pravatar.cc/40?img=67" },
        { name: "Sree Valsan", type: "Credited", amount: "+ ₹ 6,700", imgSrc: "https://i.pravatar.cc/40?img=66" },
        { name: "Raghavan", type: "Debited", amount: "- ₹ 32,775", imgSrc: "https://i.pravatar.cc/40?img=65" },
    ];
    function createTransactionHTML(transaction, index) {
        return `
            <div class="person-${index + 1} person">
            <div class="transaction-info">
                <img src="${transaction.imgSrc}" alt="Avatar">
                <div class="transaction-detail">
                <h4 class="person-name">${transaction.name}</h4>
                <h6 class="transaction-type ${transaction.type.toLowerCase()}">${transaction.type}</h6>
                </div>
            </div>
            <div class="transaction-amount ${transaction.type.toLowerCase()}">
                <h4 class="${transaction.type.toLowerCase()}">${transaction.amount}</h4>
            </div>
            </div>
        `;
    }
    transactions.forEach((transaction, index) => {
        transactionHistoryDiv.innerHTML += createTransactionHTML(transaction, index);
    });
}

createTransactionHistory();

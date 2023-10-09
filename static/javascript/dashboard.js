var navLinks = document.getElementById("navLinks");

function openDashboardNav(){
    navLinks.style.left = "0";
}
function closeDashboardNav(){
    navLinks.style.left = "-200px";
}


const revenue_xValues = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];

new Chart("revenue-line-chart", {
    type: "line",
    data: {
        labels: revenue_xValues,
        datasets: [{
            label: "Revenue Generated",
            fill: true,
            hoverBackgroundColor: "#555",
            lineTension: 0,
            backgroundColor: "#8289e850",
            borderColor: "#45ADFF",
            data: revenue
        }]
        },
        options: {
            maintainAspectRatio: true,
            aspectRatio: 3,
            responsive: true,
            legend: {display: true},
            scales: {
            yAxes: [{ticks: {min: 6, max:16}}],
            }
    }
});

new Chart("payment-pie-chart", {
    type: 'pie',
        data: {
            labels: ["Credit", "Debit", "UPI"],
            datasets: [{
                data: payment_mode,
                backgroundColor: ['#45ADFF', '#00cccc', '#8289e8'],
                hoverOffset: 5
            }],
        },
        options: {
            maintainAspectRatio: true,
            aspectRatio: 2.5,
            responsive: true,
        },
})

new Chart("profit-bar-chart", {
    type: 'bar',
    data: {
        labels: revenue_xValues,
        datasets: [{
            label: "profit",
            data: profit,
        }]
    },
    options: {
        maintainAspectRatio: true,
        aspectRatio: 2,
        responsive: true
    }
})
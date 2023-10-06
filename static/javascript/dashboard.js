var navLinks = document.getElementById("navLinks");

function openDashboardNav(){
    navLinks.style.left = "0";
}
function closeDashboardNav(){
    navLinks.style.left = "-200px";
}


console.log(labels,values)
const data = {
    labels: labels,
    datasets: [{
        label: 'Data Points',
        backgroundColor: 'rgb(255, 99, 132,0.5)',
        borderColor: 'rgb(255, 99, 132)',
        fill: true,
        data: values,
    }]
};

const config = {
    type: 'line',
    data: data,
    options: { responsive: true}
};

const mychart = new Chart(
    document.getElementById('revenue-chart'),
    document.getElementById('pie-chart'),
    config
);

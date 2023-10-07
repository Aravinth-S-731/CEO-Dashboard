var navLinks = document.getElementById("navLinks");

function openDashboardNav(){
    navLinks.style.left = "0";
}
function closeDashboardNav(){
    navLinks.style.left = "-200px";
}


var revenue_data = {
    // A labels array that can contain any sort of values
    labels:  month,
    // Our series array that contains series objects or in this case series data arrays
    series: [revenue]
};

var expense_data = {
    series: [revenue]
}


var options = {
    onlyInteger: true,
    // width: 500,
    // height: 400,
    showArea: true,
    lineSmooth: true,
    axisX: {
        showGrid: false
    },
    axisY: {
        // offset: 50,
        showGrid: false,
        labelInterpolationFnc: function(value) {
            return '₹' + value ;
        }
    }
};

var responsiveOptions  = [
    ['screen and (min-width:770px) and (max-width: 1025px)',{
        axisX: {
            labelInterpolationFnc: function(value) {
                return value.slice(0,5);
            }
        }
    }],
    ['screen and (min-width: 485px) and (max-width: 770px)',{
        axisX: {
            labelInterpolationFnc: function(value) {
                return value.slice(0,3);
            }
        }
    }],
    ['screen and (max-width: 485px)', {
        axisX: {
            labelInterpolationFnc: function(value) {
                return value[0];
            }
        }
    }]
]

// Create a new line chart object where as first parameter we pass in a selector
// that is resolving to our chart container element. The Second parameter
// is the actual data object.
// new Chartist.Line('#chartLine', data,options);
new Chartist.Line('#chart-line', revenue_data, options, responsiveOptions);
// new Chartist.Pie('#chart-pie', data)
new Chartist.Pie('#chart-pie', {
    series: [revenue[0],revenue[1],revenue[2],revenue[3]]
} ,{
    chartPadding: 30,
    labelOffset: 50,
    labelDirection: 'explode'
  });

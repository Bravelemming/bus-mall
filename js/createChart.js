'use strict';
//create a chart for chart.JS
//jack daniel kinne
function makeBusChart(id) {

  var chartCanvas = document.getElementById(id);

  var percents = [];
  var names = [];
  var colors = [];

  for (var i = 0; i < Product.allItems.length; i++) {
    var p = Math.floor((Product.allItems[i].timesClicked / Product.allItems[i].timesShown) * 100);
    names.push(Product.allItems[i].name);
    percents.push(p);
  }

  var chartData = {
    labels: names,
    datasets: [{
      label: '# of Votes',
      data: percents,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]

  };

  var busChartObject = {
    type: 'line',
    data : chartData,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };

  var busChart = new Chart(busChartCanvas, busChartObject);

}
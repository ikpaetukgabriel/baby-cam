var soundChart; // Define soudChart as a global variable
var motionChart; // Define motionChart as a global variable

console.log("This is a test console.log from stats.js");

window.onload = function () {
  var soundcanvas = document.getElementById('soundChart').getContext('2d');
  var motioncanvas = document.getElementById('motionChart').getContext('2d');
  // ... code to draw on canvas ...
  soundChart = new Chart(soundcanvas, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: 'LIVE SOUND DATA',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: "rgba(0,0,255,0.1)",
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });


  motionChart = new Chart(motioncanvas, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        fill: true,
        label: 'LIVE MOTION DATA',
        data: [],
        backgroundColor: 'rgb(202,240,248,0.8)',
        borderColor: "rgb(3,4,94, 0.2)",
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
};


function updateChart() {
  var getFlagDataUrl = window.location.protocol + '//' + window.location.host + '/get_flag_data';

  console.log('Updating chart...');
  // Make an AJAX request to your Flask server to get the flag data

  $.ajax({
    url: getFlagDataUrl,
    success: function (response) {
      // Add the new data to the chart
      console.log(response);
      soundChart.data.labels.push(new Date().toLocaleTimeString());
      soundChart.data.datasets[0].data.push(response.sound);
      soundChart.update();

      motionChart.data.labels.push(new Date().toLocaleTimeString());
      motionChart.data.datasets[0].data.push(response.motion);
      motionChart.update();
    }
  });
}

$(document).ready(function () {
  // Call updateChart() every 2 seconds using setInterval()
  setInterval(function () {
    updateChart();
  }, 2000);
});
const bar = document.getElementById('barChart');
Chart.defaults.color = '#ffffff';

  new Chart(bar, {
    type: 'bar',
    data: {
      labels: ['First', '2:1', '2:2', '3rd', 'Fail', 'Not Eligible'],
      datasets: [{
        label: '# of Classifications',
        data: classificationBreakdown,
        backgroundColor: [
          'rgb(169, 237, 237)',
          'rgb(128, 219, 219)',
          'rgb(111, 210, 210)',
          'rgb(75, 192, 192)',
          'rgb(56, 169, 169)',
          'rgb(37, 129, 129)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Classification Distribution',
          font: {
            size: 20
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

const doughnut = document.getElementById('doughnutChart');

  new Chart(doughnut, {
    type: 'doughnut',
    data: {
      labels: ['Review Needed', 'Overriden', 'Approved'],
      datasets: [{
        label: 'Approval Status',
        data: [
          countData.reviewCount,
          countData.overrideCount,
          countData.approvedCount
        ],
        backgroundColor: [
          'rgb(205, 65, 65)',
          'rgb(167, 114, 214)',
          'rgb(56, 225, 112)'
        ],
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Approval Status',
            font: {
            size: 20
          }
        }
      }
    }
  });
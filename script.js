function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function () {
  const chartCanvas = document.getElementById("examProgressChart");
  if (chartCanvas) {
    const ctx = chartCanvas.getContext("2d");

    // Exams in order and your progress (1 = complete, 0 = not yet)
    const exams = ['FM', 'P', 'MAS-I', 'MAS-II', 'Exam 5', 
                   'Exam 6', 'Exam 7', 'Exam 8', 'Exam 9', 'FCAS'];
    const completion = [1, 1, 0, 0, 0, 0, 0, 0, 0, 0]; // Example completion data

    // Calculate cumulative progress percentage
    const totalExams = completion.length;
    const cumulativeProgress = completion.map((_, i) => {
      const completed = completion.slice(0, i + 1).reduce((a, b) => a + b, 0);
      return (completed / totalExams) * 100;
    });

    const examProgressChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: exams,
        datasets: [{
          label: 'Exam Progress (%)',
          data: cumulativeProgress,
          fill: false,
          borderColor: '#42A5F5',
          backgroundColor: '#42A5F5',
          tension: 0.1,
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: function (value) {
                return value + '%';
              }
            },
            title: {
              display: true,
              text: 'Cumulative Progress (%)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Exams'
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.raw.toFixed(0) + '% complete';
              }
            }
          },
          legend: {
            display: false
          }
        },
        animation: {
          duration: 1500,
          easing: 'easeOutQuart'
        }
      }
    });
  }
});
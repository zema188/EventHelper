//diagram
const ctx = document.getElementById('myChart');
const chartAreaBorder = {
  id: 'chartAreaBorder',
  beforeDraw(chart, args, options) {
    const {ctx, chartArea: {left, top, width, height,}} = chart;
    ctx.beginPath();
    ctx.strokeStyle = options.borderColor;
    ctx.lineWidth = options.borderWidth;
    ctx.setLineDash(options.borderDash || []);
    ctx.lineDashOffset = options.borderDashOffset;
    ctx.roundRect(left, top-10, width, height+20, [15]);
    ctx.stroke();
  }
};

const onRefresh = chart => {
  const now = Date.now();
  chart.data.datasets.forEach(dataset => {
    dataset.data.push({
      x: now,
      y: Utils.rand(-100, 100)
    });
  });
};

// Create chart bar numbers
function createBarChart(board, max) {
  let container = board.closest('.chart__container-w')
  let chart__bar = document.createElement('div')
  chart__bar.className = "chart__bar"
  for(let i = 0; i < 3; i++) {
    let chart__bar_item = document.createElement('div')
    if(i == 2) {
      max = 0
    }
    chart__bar_item.className = "chart__bar-item";
    chart__bar_item.innerHTML = max
    chart__bar.appendChild(chart__bar_item)
    max = max / 2
  }
  container.appendChild(chart__bar)
}

let schedule = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['29.11', '29.11', '29.11', '29.11', '29.11', '29.11', '29.11', '29.11', '29.11', '29.11', '29.11', '29.11'],
    datasets: [{
      data: [300, 100, 150, 200, 160, 130, 300, 100, 150, 200, 160, 130],
      borderWidth: 1,
      backgroundColor: 'rgba(41, 140, 255, 1)',
      barThickness: 10,
      borderRadius: 6,
      borderSkipped: false,
    },
    {
        data: [280, 70, 50, 150, 140, 100, 280, 70, 50, 150, 140, 100],
        borderWidth: 1,
        backgroundColor: 'rgba(255, 34, 34, 1)',
        barThickness: 10,
        borderRadius: 6,
        borderSkipped: false,
    }]
    
  },

  // callback : function(value,index,values){
  //   yAxesticks = value;
  //   console.log(this.options.scales.y)
  //   return value;
  // },
  options: {
    
    cutoutPercentage: 5,
    maintainAspectRatio: false,
    scales: {
      y: {
        display: false,
        beginAtZero: true,
        position: 'right',
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 20,
            family: 'HelveticaNeueCyr',
          }
        },

      },
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 90,
          padding: 10,
          font: {
            size: 20,
            family: 'HelveticaNeueCyr',
          }
        },
      },
    },
    plugins: {
      title: {
        display: false,
        text: 'Chart.js Horizontal Bar Chart',
        position: 'left',
        font: {
          size: 0,
      }
      },
      display: false,
      chartAreaBorder: {
        borderColor: 'rgba(41, 140, 255, 1)',
        borderWidth: 1,
      },
        legend: {
          display: false,
            labels: {
                font: {
                    family: 'HelveticaNeueCyr',
                    weight: 500,
                    size: 20,
                }
            }
        }
    }
  },
  // plugins: [chartAreaBorder]
});
let maxY = (Math.max(Math.max(...schedule.data.datasets[0].data),Math.max(...schedule.data.datasets[1 ].data)))
createBarChart(ctx,maxY)


// Statistics popup
let statiscticsBtn = document.querySelectorAll('.event-statistics-btn')
let statistics = document.querySelector('.statistics')
for(let i=0;i<statiscticsBtn.length;i++) {
  statiscticsBtn[i].addEventListener("click",
  function() {
    statistics.classList.add('active')
    bodyFixed()
  })
}
// Calendar
function calendar(id, year, month, parent) {
    var Dlast = new Date(year, month + 1, 0).getDate(),
      D = new Date(year, month, Dlast),
      DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay(),
      DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay(),
      calendar = '<tr>',
      month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    if (DNfirst != 0) {
      for (var i = 1; i < DNfirst; i++) calendar += '<td>';
    } else {
       for (var i = 0; i < 6; i++) calendar += '<td>';
    }
    for (var i = 1; i <= Dlast; i++) {
       if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
        calendar += '<td class="today number">' + i;
       } else {
         calendar += '<td class="number">' + i;
       }
       if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {
         calendar += '<tr>';
       }
    }
    for (var i = DNlast; i < 7; i++) calendar += '<td> ';
    parent.querySelector('.' + id + ' tbody').innerHTML = calendar;
    parent.querySelector('.' + id + ' thead td:nth-child(2)').innerHTML = month[D.getMonth()] + ' ' + D.getFullYear();
    parent.querySelector('.' + id + ' thead td:nth-child(2)').dataset.month = D.getMonth();
    parent.querySelector('.' + id + ' thead td:nth-child(2)').dataset.year = D.getFullYear();
    if (parent.querySelectorAll('.' + id + ' tbody tr').length < 6) { 
        // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
        parent.querySelector('.' + id + ' tbody').innerHTML += '<tr><td> <td> <td> <td> <td> <td> <td> ';
    }
  }


//Editing page calendar

let editing__end_btn = document.querySelector('.editing__end-btn')
    editing__end_btn.onclick = function() {
      let parent = editing__end_btn.parentElement.parentElement
      calendar("calendar", new Date().getFullYear(), new Date().getMonth(), parent);
      // переключатель минус месяц
      parent.querySelector('.calendar thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
        calendar("calendar", parent.querySelector('.calendar thead td:nth-child(2)').dataset.year, parseFloat(parent.querySelector('.calendar thead td:nth-child(2)').dataset.month) - 1, parent);
      }
            // переключатель плюс месяц
      parent.querySelector('.calendar thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
        calendar("calendar", parent.querySelector('.calendar thead td:nth-child(2)').dataset.year, parseFloat(parent.querySelector('.calendar thead td:nth-child(2)').dataset.month) + 1, parent);
      }
        editing__end_btn.classList.toggle('active')

        parent.querySelectorAll('.look-calendar')[0].classList.toggle('active')
}

let editing__start_btn = document.querySelector('.editing__start-btn')
  editing__start_btn.onclick = function() {
      let parent = editing__start_btn.parentElement.parentElement
      calendar("calendar", new Date().getFullYear(), new Date().getMonth(), parent);
      // переключатель минус месяц
      parent.querySelector('.calendar thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
        calendar("calendar", parent.querySelector('.calendar thead td:nth-child(2)').dataset.year, parseFloat(parent.querySelector('.calendar thead td:nth-child(2)').dataset.month) - 1,parent );
      }
      // переключатель плюс месяц
      parent.querySelector('.calendar thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
        calendar("calendar", parent.querySelector('.calendar thead td:nth-child(2)').dataset.year, parseFloat(parent.querySelector('.calendar thead td:nth-child(2)').dataset.month) + 1,parent);
      }
      editing__start_btn.classList.toggle('active')

      parent.querySelectorAll('.look-calendar')[0].classList.toggle('active')
}


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

if(document.querySelectorAll('.chart').length) {
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
}

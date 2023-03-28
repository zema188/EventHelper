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


//Create-event calendar
if(document.querySelectorAll('.event-creation__start-btn').length) {
  let eventStart = document.querySelector('.event-creation__start-btn')
  let eventEnd = document.querySelector('.event-creation__end-btn')
  eventStart.onclick = function() {
        let parent = eventStart.parentElement.parentElement
        calendar("calendar", new Date().getFullYear(), new Date().getMonth(), parent);
        // переключатель минус месяц
        parent.querySelector('.calendar thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
          calendar("calendar", parent.querySelector('.calendar thead td:nth-child(2)').dataset.year, parseFloat(parent.querySelector('.calendar thead td:nth-child(2)').dataset.month) - 1, parent);
        }
              // переключатель плюс месяц
        parent.querySelector('.calendar thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
          calendar("calendar", parent.querySelector('.calendar thead td:nth-child(2)').dataset.year, parseFloat(parent.querySelector('.calendar thead td:nth-child(2)').dataset.month) + 1, parent);
        }
        eventStart.classList.toggle('active')
        let lookCalendar = document.querySelectorAll('.look-calendar')
        for(let i = 0; i < lookCalendar.length; i++) {
          lookCalendar[i].classList.remove('active')
        }
        eventEnd.classList.remove('active')
        if(eventStart.classList.contains('active'))
          parent.querySelectorAll('.look-calendar')[0].classList.add('active')
        else
          parent.querySelectorAll('.look-calendar')[0].classList.remove('active')

  }
}

if(document.querySelectorAll('.event-creation__end-btn').length) {
  let eventEnd = document.querySelector('.event-creation__end-btn')
  let eventStart = document.querySelector('.event-creation__start-btn')
  eventEnd.onclick = function() {
        let parent = eventEnd.parentElement
        calendar("calendar", new Date().getFullYear(), new Date().getMonth(), parent);
        // переключатель минус месяц
        parent.querySelector('.calendar thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
          calendar("calendar", parent.querySelector('.calendar thead td:nth-child(2)').dataset.year, parseFloat(parent.querySelector('.calendar thead td:nth-child(2)').dataset.month) - 1, parent);
        }
              // переключатель плюс месяц
        parent.querySelector('.calendar thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
          calendar("calendar", parent.querySelector('.calendar thead td:nth-child(2)').dataset.year, parseFloat(parent.querySelector('.calendar thead td:nth-child(2)').dataset.month) + 1, parent);
        }
        eventEnd.classList.toggle('active')
        let lookCalendar = document.querySelectorAll('.look-calendar')
        for(let i = 0; i < lookCalendar.length; i++) {
          lookCalendar[i].classList.remove('active')
        }
        eventStart.classList.remove('active')
        if(eventEnd.classList.contains('active'))
          parent.querySelectorAll('.look-calendar')[0].classList.add('active')
        else
          parent.querySelectorAll('.look-calendar')[0].classList.remove('active')
  }
}


//Create-event popup

let createEventBtn = document.querySelectorAll('.create-event')
let eventCreation = document.querySelector('.event-creation')
for(let i=0;i<createEventBtn.length;i++) {
  createEventBtn[i].addEventListener("click",
  function() {
    eventCreation.classList.add('active')
    bodyFixed()
  })
}


//Edit-event popup

let editEventBtn = document.querySelectorAll('.profile__more-btn')
let editEvent = document.querySelector('.edit-event')
for(let i=0;i<editEventBtn.length;i++) {
  editEventBtn[i].addEventListener("click",
  function() {
    editEvent.classList.add('active')
    bodyFixed()
  })
}


//Create-catalog popup

let createCatalogBtn = document.querySelectorAll('.create-catalog')
let createCatalog = document.querySelector('.catalog-creation')
for(let i=0;i<createCatalogBtn.length;i++) {
  createCatalogBtn[i].addEventListener("click",
  function() {
    createCatalog.classList.add('active')
    bodyFixed()
  })
}


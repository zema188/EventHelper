function changerActive(list) {
    for(let i = 0; i < list.length; i++) {
        list[i].classList.remove('active')
    }
    list = 0
}

// scroll document false

function is_touch_device() {
  return ('ontouchstart' in window);
}

function bodyFixed() { //scroll - false
  if(is_touch_device()) {
  console.log(is_touch_device())
    document.body.classList.add('fixed')
  } else {
    let x=window.scrollX;
    let y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
  }
}

function bodyNotFixed() { // scroll - true
  if(is_touch_device()) {
    document.body.classList.remove('fixed')
  } else {
    window.onscroll=function(){window.scrollTo()};

  }
}


// Filter-form
if(document.querySelectorAll('.events__filter-title').length) {
    document.querySelector('.events__filter-title').onclick = function() {
        document.querySelector('.events__filter-form').classList.toggle('active')
    }
}
if(document.querySelectorAll('.partners__filter-title').length) {
    document.querySelector('.partners__filter-title').onclick = function() {
        document.querySelector('.partners__filter-form').classList.toggle('active')
    }
}


// Event-swiper
const swiper = new Swiper(".event__swiper", {
    pagination: {
      el: ".event__pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".event__prev",
      prevEl: ".event__next",
    },
  });


//Menu mobile
let nav_icon = document.querySelectorAll('.nav-icon')
//header
document.querySelector('.header__menu').onclick = function() {
  document.querySelector('.header__menu').classList.toggle('active')
  document.querySelector('.header-m').classList.toggle('active')
  for(let i = 0; i < nav_icon.length;i++) {
    nav_icon[i].classList.toggle('open')
  }
}
//footer
document.querySelector('.footer__menu').onclick = function() {
  document.querySelector('.footer__menu').classList.toggle('active')
  document.querySelector('.header-m').classList.toggle('active')
  for(let i = 0; i < nav_icon.length;i++) {
    nav_icon[i].classList.toggle('open')
  }
}

// Size-control
window.addEventListener('resize', function(event){
  if(window.innerWidth > 899) {
    document.querySelector('.header__menu').classList.remove('active')
    document.querySelector('.header-m').classList.remove('active')
    for(let i = 0; i < nav_icon.length;i++) {
      nav_icon[i].classList.remove('open')
    }
  }
})

//Popup close 
document.addEventListener("click",
function(event) {
  event = event || window.event;
  let target = event.target
  if(target.classList.contains('popup')) {
    target.classList.remove('active')
    bodyNotFixed()
  }
}
)

let closePopupBtn = document.querySelectorAll('.popup-close')

for(let i=0;i<closePopupBtn.length;i++) {
  closePopupBtn[i].addEventListener("click",
  function() {
    closePopupBtn[i].parentElement.parentElement.classList.remove('active')
    bodyNotFixed()
  })
}


function closeAllPopups() {
  let popups = document.querySelectorAll('.popup')
  for(let i=0;i<popups.length;i++) {
    popups[i].classList.remove('active')
  }
}

// Registration Popup
if(document.querySelectorAll('.header__registration').length) {
  let registrationBtn = document.querySelectorAll('.header__registration')
  let registration = document.querySelector('.registration')
  for(let i=0;i<registrationBtn.length;i++) {
    registrationBtn[i].addEventListener("click",
    function() {
      closeAllPopups()
      registration.classList.add('active')
      bodyFixed()
    })
  }
}


// Authorization Popup
if(document.querySelectorAll('.header__authorization').length) {
  let authorizationBtn = document.querySelectorAll('.header__authorization')
  let authorization = document.querySelector('.authorization')
  for(let i=0;i<authorizationBtn.length;i++) {
    authorizationBtn[i].addEventListener("click",
    function() {
      closeAllPopups()
      authorization.classList.add('active')
      bodyFixed()
    })
  }
}
// statistics blue items

let statisticsBlueItem = document.querySelectorAll('.statistics-item_blue')
for(let i = 0 ; i < statisticsBlueItem.length; i ++) {
  statisticsBlueItem[i].addEventListener("click",
  function(event) {
    event = event || window.event;
    let target = event.target
    removeActive(statisticsBlueItem)
    target.classList.add('active')
  })
}


// remove active
function removeActive(list) {
  for(let i = 0 ; i < list.length; i ++) {
    list[i].classList.remove('active')
  }
}

// Show password 

let passwordEye = document.querySelectorAll('.password-control')

for(let i = 0 ; i < passwordEye.length; i ++) {
  passwordEye[i].addEventListener("click",
  function(event) {
    event = event || window.event;
    let target = event.target
    target.parentElement.classList.toggle('active')
    if(target.parentElement.parentElement.firstElementChild.getAttribute('type') == "password") 
      target.parentElement.parentElement.firstElementChild.setAttribute('type', 'text')
    else
      target.parentElement.parentElement.firstElementChild.setAttribute('type', 'password')
  })
}


//Set day drom calendar

let calendars = document.querySelectorAll('.look-calendar')

for(let i = 0 ; i < calendars.length; i ++) {
  calendars[i].addEventListener("click",
  function(event) {
    event = event || window.event;
    let target = event.target
    if(target.classList.contains('number')) {
      let parent = target.parentElement.parentElement.parentElement.parentElement.parentElement
      let btnDate = parent.firstElementChild
      let day = target.innerHTML
      let month = parent.querySelector('.month').innerHTML
      btnDate.innerHTML = (day+" "+month+"<img src=\"img/icons/arrow_white.svg\" alt=\"arrow\">")
    }
  })
}


// Close sponsor role choice

if(document.querySelectorAll('.sponsor__role').length) {
  let sponsorBtnbtn = document.querySelectorAll('.sponsor__btn')
  let sponsorRole = document.querySelector('.sponsor__role')
  for(let i=0;i<sponsorBtnbtn.length;i++) {
    sponsorBtnbtn[i].addEventListener("click",
    function() {
      sponsorRole.classList.toggle('active')
    })
  }
}



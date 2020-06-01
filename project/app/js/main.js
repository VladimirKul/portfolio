
////////////////////////////////////////мобильное меню

let header_nav = document.getElementById("header-nav")
let header_menu = document.getElementById("header-menu")
let bool = true

let visible_menu = function() {
    if(bool) {
        header_nav.style.visibility = "visible"
        bool = false
    } else {
        header_nav.style.visibility = "hidden"
        bool = true
    }
}

////////////////////////////////////////мобильные слайдеры

let sliderMobile = {
  slidesObj: {
    slides_featured: document.getElementById("featured_catalog"),
    slides_trending: document.getElementById("trending_catalog")
  },
  
  counterObj: {
    counter_featured: 1,
    counter_trending: 1
  },
  img: document.getElementsByClassName("featured__figure"),
  
  stepObj: {
    step_featured: 0,
    step_trending: 0
  },
  
  
  f1: function(number, slides) {
    if (slides == 'featured') {
      slides = this.slidesObj.slides_featured
      counter = this.counterObj.counter_featured
      step = this.stepObj.step_featured
    }
  
    if(slides == 'trending') {
      slides = this.slidesObj.slides_trending
      counter = this.counterObj.counter_trending
      step = this.stepObj.step_trending
    }
  
    if(number == 0) {
      if (counter == 3) {
        step = 0
        slides.style.left = `${step}px`
        counter = 1
      } else {
        counter++
        step -=270
        slides.style.left = `${step}px`
      }
    } 
    else {
      counter--
      if(counter == 0) {
        step = -540
        slides.style.left = `${step}px`
        counter = 3
      } else {
        step +=270
        slides.style.left = `${step}px`
      }
    }
    
    if(slides == this.slidesObj.slides_featured) {
      this.counterObj.counter_featured = counter
      this.stepObj.step_featured = step
    }
  
    if(slides == this.slidesObj.slides_trending) {
      this.counterObj.counter_trending = counter
      this.stepObj.step_trending = step
    }
  }
}




////////////////////////////////////////остальные слайдеры
let idArr= [0, 1, 2]

let slidesExclusive = document.getElementsByClassName("exclusive__item"),
  slidesHeader = document.getElementsByClassName("header__slide"),
  slidesHotdeal = document.getElementsByClassName("hotdeal__slide")
let slidesArr = [slidesExclusive, slidesHeader, slidesHotdeal]

let pagExclusive = document.getElementsByClassName("exclusive__pag"),
  pagHeader = document.getElementsByClassName("header__pag"),
  pagHotdeal = document.getElementsByClassName("hotdeal__pag")
let pagArr = [pagExclusive, pagHeader, pagHotdeal]

let indexExclusive = 1,
  indexHeader = 1,
  indexHotdeal = 1
let indexArr = [indexExclusive, indexHeader, indexHotdeal]

let getObjs = function() {
  let arr = []
  for(let i = 0; i < indexArr.length; i++) {
    arr.push(getObj(idArr[i], slidesArr[i], pagArr[i], indexArr[i]))
  }
  return arr
}

let getObj = function(i, s, p, ind) {
 return {
   id: i,
   slides: s,
   pag: p,
   index: ind
 }
}

let slidersArr = getObjs()

let plusSlides = function(n, id) {
  let find = slidersArr.find(item => item.id == id)
  let index = find.index += n

  showSlides(find.id, find.slides, find.pag, index)
}

let currentSlide = function(n, id) {
  let find = slidersArr.find(item => item.id == id)
  let index = find.index = n

  showSlides(find.id, find.slides, find.pag, index)
}


let showSlides = function(id, item, paggination, index) {
  let i
  let slides = item
  let pag = paggination

  if (index < 1) {
    index = slides.length
  }

  if (index > slides.length) {
    index = 1
  }

  for(i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"
  }

  for(i = 0; i < pag.length; i++) {
    pag[i].className = pag[i].className.replace("active", "")
  }

  slides[index - 1].style.display = "block"
  pag[index - 1].className += " active"


  slidersArr[id].index = index
}

////////////////////////////////////////featured__nav переключение между featured__navitem
let arrNavItem = document.getElementsByClassName('featured__navitem')
let arrNavStick = document.getElementsByClassName('featured__stick')

let NavItemActive = function(n) {
  arrNavItem[n].style.color = "#212121"
  arrNavStick[n].style.visibility = "visible"

  for(let i = 0; i < arrNavItem.length; i++) {
    if(arrNavItem[i] != arrNavItem[n]) {
      arrNavItem[i].style.color = "#6c6c6c"
      arrNavStick[i].style.visibility = "hidden"
    }
  }
}

header_menu.addEventListener('click', visible_menu)


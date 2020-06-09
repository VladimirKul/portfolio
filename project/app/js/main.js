
////////////////////////////////////////мобильное меню
 //$(function() {
  let headerNav = $('#header-nav')
  let header_menu = $('#header-menu')[0]
  let bool = true

  if ($('.header__menu').css('display') == "flex") {
    headerNav.hide()
  }

  let visible_menu = function() {
      if(bool) {
          headerNav.show(500)
          bool = false
      } else {
          headerNav.hide(500)
          bool = true
      }
  }

  header_menu.addEventListener('click', visible_menu)
//})

////////////////////////////////////////мобильные слайдеры

let sliderMobile = {
  slidesObj: {
    slides_featured: $('#featured_catalog')[0],
    slides_trending: $('#trending_catalog')[0]
  },
  
  counterObj: {
    counter_featured: 1,
    counter_trending: 1
  },
  img: $('.featured__figure'),
  
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

let slidesExclusive = $('.exclusive__item'),
  slidesHeader = $('.header__slide'),
  slidesHotdeal = $('.hotdeal__slide')
let slidesArr = [slidesExclusive, slidesHeader, slidesHotdeal]

let pagExclusive = $('.exclusive__pag'),
  pagHeader = $('.header__pag'),
  pagHotdeal = $('.hotdeal__pag')
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

  slides.fadeOut(0)
  $(slides[index - 1]).fadeIn(500)

  pag.removeClass('active')
  $(pag[index - 1]).addClass('active')

  slidersArr[id].index = index
}

////////////////////////////////////////featured__nav переключение между featured__navitem
let arrNavItem = $('.featured__navitem')
let arrNavStick = $('.featured__stick')
$(arrNavStick[1]).hide()

let NavItemActive = function(n) {
  $(arrNavItem[n]).css('color', '#212121')
  $(arrNavStick[n]).show(500)

  for(let i = 0; i < arrNavItem.length; i++) {
    if(arrNavItem[i] != arrNavItem[n]) {
      $(arrNavItem[i]).css('color', '#6c6c6c')
      $(arrNavStick[i]).hide(500)
    }
  }
}




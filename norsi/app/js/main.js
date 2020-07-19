let search = $('input[type="search"]')
let activeSearch = function(evt) {
  if($(evt.target)[0] == $('.header__search')[0]) {
    if( $(search).css('visibility') == 'visible') {
      $(search).css('visibility', 'hidden')
    } else {
      $(search).css('visibility', 'visible')
    }
    
  }
}

$('body').click(activeSearch)
//////////////////////////////////////////////////////////////слайдер
  let indexSlide = 1

  let plusSlides = function(n) {
      showSlides(indexSlide += n)
  }

  let currentSlide = function(n) {
      showSlides(indexSlide = n)
  }

  let showSlides = function(n) {
      let i
      let slides = $('.header__wrap-content-slider')
      let pag = $('.header__pag-item')

      if (indexSlide < 1) {
          indexSlide = slides.length
        }
      
        if (indexSlide > slides.length) {
          indexSlide = 1
        }
      
        slides.fadeOut(0)
        $(slides[indexSlide - 1]).fadeIn(500)
      
        pag.removeClass('active')
        $(pag[indexSlide - 1]).addClass('active')
  }

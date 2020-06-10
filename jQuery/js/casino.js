let wrap = $('.wrap')
let btn = $('.btn')
let cell = $('.cell')
let wrapSlide = $('.wrapslid')

/////ф-ция случайного числа для случайной картинки
let random = function() {
    return Math.floor(Math.random() * 3) + 1;
}

/////ф-ция кнопки, для крутки барабана
let start = function() {

    let numRepet = Math.floor(Math.random() * (5 - 1) ) + 2 //случайное число - кол-во вращений  
    let attrnumber = 2 //атрибут-номер ячейки

    for(i = 0; i < numRepet; i++) { //создаем нужное кол-во ячеек, которые будут вращаться
        $(wrapSlide).append(`<div class="cell" data-atr="${attrnumber}">
                                <img class="img" src="img/${random()}.jpg" alt="cell">
                            </div>`)
        attrnumber++    
    }
    
    let rotationTime = 1000 * numRepet //время вращений
    $(wrapSlide).animate({'bottom': `${152 * numRepet}px`}, rotationTime) //анимация вращения
    
    let time = function() { //ф-ция удаляет ячейки, которые использовались во вращении, оставляет только последнюю для результата
        $('.cell').each(function(index) {
            if(numRepet == (index))
            {
                $(wrapSlide).css('bottom', '0')
            } else {
                this.remove()
            }
        })
        
    }
    let resTime = 1050 * numRepet //время, спустя которое все ячейки будут удалены, кроме последних результатов
    setTimeout(time, resTime)
}

$(btn).click(start)
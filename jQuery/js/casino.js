let wrap = $('.wrap')
let btn = $('.btn')
let cell = $('.cell')
let wrapSlide = $('.wrapslid')

/////ф-ция случайного числа для случайной картинки
let random = function() {
    return Math.floor(Math.random() * 3) + 1
}

/////ф-ция кнопки, для крутки барабана
let start = function() {

    let numRepet = Math.floor(Math.random() * 20) + 1 //случайное число - кол-во вращений  
    let attrnumber = 2 //атрибут-номер ячейки

    for(i = 0; i < numRepet; i++) { //создаем нужное кол-во ячеек, которые будут вращаться
        $(wrapSlide[0]).append(`<div class="cell" data-atr="${attrnumber}">
                                <img class="img" src="img/${random()}.jpg" alt="cell">
                            </div>`)
        attrnumber++    
    }
    for(i = 0; i < numRepet; i++) { //создаем нужное кол-во ячеек, которые будут вращаться
        $(wrapSlide[1]).append(`<div class="cell" data-atr="${attrnumber}">
                                <img class="img" src="img/${random()}.jpg" alt="cell">
                            </div>`)
        attrnumber++    
    }
    for(i = 0; i < numRepet; i++) { //создаем нужное кол-во ячеек, которые будут вращаться
        $(wrapSlide[2]).append(`<div class="cell" data-atr="${attrnumber}">
                                <img class="img" src="img/${random()}.jpg" alt="cell">
                            </div>`)
        attrnumber++    
    }
    
    let rotationTime = 250 * numRepet //время вращений
    $(wrapSlide).animate({'bottom': `${152 * numRepet}px`}, rotationTime) //анимация вращения
    
    let time = function() { //ф-ция удаляет ячейки, которые использовались во вращении, оставляет только последнюю для результата
        $(wrapSlide[0]).children().slice(0, numRepet).remove()
        $(wrapSlide[1]).children().slice(0, numRepet).remove()
        $(wrapSlide[2]).children().slice(0, numRepet).remove()
        $(wrapSlide[0]).css('bottom', '0')
        $(wrapSlide[1]).css('bottom', '0')
        $(wrapSlide[2]).css('bottom', '0')
        
    }
    let resTime = 300 * numRepet //время, спустя которое все ячейки будут удалены, кроме последних результатов
    setTimeout(time, resTime)
}

$(btn).click(start)
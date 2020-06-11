let btn = $('.btn')
let cell = $('.cell')
let wrapSlide = $('.wrapslid')

/////ф-ция случайного числа для случайной картинки
let random = function() {
    return Math.floor(Math.random() * 3) + 1
}

/////ф-ция для случайного числа - кол-ва вращений
let getNumRepets = function() {
    return  Math.floor(Math.random() * 20) + 1
}

let genCells = function() {
    let numRepet = getNumRepets() //случайное число - кол-во вращений

    $(wrapSlide).each(function() {
        let attrnumber = 2 //атрибут-номер ячейки
        for(i = 0; i < numRepet; i++) { //создаем нужное кол-во ячеек, которые будут вращаться
            $(this).append(`<div class="cell" data-atr="${attrnumber}">
                                <img class="img" src="img/${random()}.jpg" alt="cell">
                            </div>`)
            attrnumber++    
        }
    })

    return numRepet
}

let getRes =  function(numRepet) {
    let time = function() { //ф-ция удаляет ячейки, которые использовались во вращении, оставляет только последнюю для результата
        $(wrapSlide).each(function() {
            $(this).children().slice(0, numRepet).remove()
            $(this).css('bottom', '0')
        })        
    }
    let resTime = 300 * numRepet //время, спустя которое все ячейки будут удалены, кроме последних результатов
    setTimeout(time, resTime)
}

/////ф-ция кнопки, для крутки барабана
let start = function() {
    let numRepet = genCells() //случайное число - кол-во вращений и генерация новых ячеек для вращений
    
    let rotationTime = 250 * numRepet //время вращений
    $(wrapSlide).animate({'bottom': `${152 * numRepet}px`}, rotationTime) //анимация вращения
    
    getRes(numRepet)
}

$(btn).click(start)
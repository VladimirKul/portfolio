let btn = $('.btn');
let cell = $('.cell');
let wrapSlide = $('.wrapslid');

class Casino {
	constructor(wrapslider) {
		this.wrapSlide = wrapslider;
		this.numRepet = null;//кол-во вращений
        this.arrCellNum = [];//массив с результатами
        this.winOrLose = false//поражение или выигрыш
	}
	/////ф-ция для случайного числа - кол-ва вращений
	getNumRepets = function() {
		return Math.floor(Math.random() * 20) + 1;
	};

	genCells = function() {
		let numRepet = this.getNumRepets(); //случайное число - кол-во вращений

		$(this.wrapSlide).each(function() {
			let attrnumber = 2; //атрибут-номер ячейки
			for (let i = 0; i < numRepet; i++) {
				//создаем нужное кол-во ячеек, которые будут вращаться
				$(this).append(`<div class="cell" data-atr="${attrnumber}">
                                    <img class="img" src="img/${otherFun.random()}.jpg" alt="cell">
                                </div>`);
				attrnumber++;
			}
		});
		return numRepet;
	};

	getRes = function(numRepets) {
		let numRepet = numRepets;
		let time = function() {
			//ф-ция удаляет ячейки, которые использовались во вращении, оставляет только последнюю для результата
			$($('.wrapslid')).each(function() {
				$(this).children().slice(0, numRepet).remove();
				$(this).css('bottom', '0');
			});
		};
		let resTime = 300 * numRepet; //время, спустя которое все ячейки будут удалены, кроме последних результатов
        setTimeout(time, resTime);
        setTimeout(otherFun.fillCellNum, resTime);
        setTimeout(otherFun.getRes, resTime);
	};

	_init = function() {
		let numRepet = this.genCells(); //случайное число - кол-во вращений и генерация новых ячеек для вращений
        let rotationTime = 250 * numRepet; //время вращений
        
        $(this.wrapSlide).animate({ bottom: `${152 * numRepet}px` }, rotationTime); //анимация вращения
        
		this.getRes(numRepet);
		this.numRepet = numRepet + 1;
	};
}

let obj = new Casino(wrapSlide);

let otherFun = {
    /////ф-ция для заполнения объекста результатами
	fillCellNum: function() {
		let ob = [];
		$('img').each(function(index) {
			ob.push($(this).attr('src'));
        });

		obj.arrCellNum = ob;
    },
    
    //ф-ция определения проигрыша или выигрыша + вывод результата на экран
    getRes: function() {
        let object = obj.arrCellNum
        let score = 0
        for(let i = 0; i < object.length; i++) {
            if(object[0] == object[i]) {
                score++
            } else {
                score--
            }
        }
        if(score == 3) {
            obj.winOrLose = true
            $('.text').text('Вы выиграли!')
        } else {
            obj.winOrLose = false
            $('.text').text('Вы проиграли!')
        }
    },

	/////ф-ция случайного числа для случайной картинки
	random: function() {
		return Math.floor(Math.random() * 3) + 1;
	}
};

$('.btn').click(function() {
	obj._init();
});

let btnCart = document.querySelector('.header__cart')
let cartWrap = document.querySelector('.header__cartWrap')
let active = false

const API = 'https://raw.githubusercontent.com/VladimirKul/catalog/master/catalog'

class List {//супер класс списка товаров
    constructor(url, container) {
        //параметры, которые будут переназначаться при наследовании
        this.url = url
        this.container = container
        //общие
        this.items = []
        this.DTOarr = []
        this._init()
    }

    _init() {
        return false //заглушка, будет переопределятся
    }

    getJSON(url) {
        return fetch(url)
            .then(data => data.json())
    }

    render() {
        const block = document.querySelector(this.container)
        this.DTOarr.forEach(el => {
            let item = new lists[this.constructor.name](el)
            this.items.push(item)
            block.insertAdjacentHTML('beforeend', item.render())
        })
    }
}

class ListItem {
    constructor(el) {
        this.title = el.title
        this.price = el.price
        this.id = el.id
        this.img = el.img
    }

    render() {
        return `<div class="catalog__item">
                    <div class="catalog__blockimg">
                        <img src="img/${this.img}" alt="img" class="catalog__img">
                    </div>
                    <div class="catalog__title">${this.title}</div>
                    <div class="catalog__price">${this.price}<span> руб.</span></div>
                    <button class="catalog__btn" onclick="cart.addProduct(this)"
                        data-id="${this.id}"
                        data-title="${this.title}"
                        data-price="${this.price}"
                        data-img="${this.img}">
                        Добавить в корзину
                    </button>
                </div>`
    }
}

class ProductList extends List {
    constructor(url = '/catalogData.json', container = '.catalog') {
        super(url, container)
    }

    _init() {
        this.getJSON(API + this.url)
            .then(data => {this.DTOarr = data})
            .finally(() => {
                this.render()
            })
    }
}

let product = new ProductList()

class ProductItem extends ListItem {

}

class CartList extends List {
    constructor(url = '/getBasket.json', container = '.header__cartWrap') {
        super(url, container)
    }

    _init() {
        this.getJSON(API + this.url)
            .then(data => {this.DTOarr = data.contents})
            .finally(() => {
                this.render()
            })
    }

    addProduct (product) {
        let productId= +product.dataset['id']
        let find = this.DTOarr.find (element => element.id === productId)
        if(!find) {
            console.log(product.dataset['img'])
            let el = {
                title: product.dataset['title'],
                price: +product.dataset['price'],
                id: productId,
                img: product.dataset['img'],
                quantity: 1
            }
            this.DTOarr.push (new lists[this.constructor.name](el))
        } else {
            find.quantity++
            document.querySelectorAll('.header__quantity').forEach(item => {
                item.innerHTML = `Кол-во: ${find.quantity}`
            })
        }
        this.clear()
        this.render()
    }

    removeProduct (product) {
        let productId= +product.dataset['id']
        let find =this.DTOarr.find (element => element.id === productId)
    
        if(find.quantity > 1) {
            find.quantity--
        } else {
            console.log(productId)
            this.DTOarr.splice(this.DTOarr.indexOf(find), 1)
            document.querySelector(`.header__cartItem[data-id="${productId}"]`).remove()
        }
        this.clear()
        this.render()
    }

    clear() {
        const block = document.querySelector(this.container)
        block.innerHTML = ''
    }
}

let cart = new CartList()

class CartItem extends ListItem{
    constructor(el) {
        super(el)
        this.quantity = el.quantity
    }

    render() {
        return ` <div class="header__cartItem" data-id="${this.id}">
                    <div class="header__blockimg">
                        <img src="img/${this.img}" alt="img" class="header__img">
                    </div>
                    <div class="header__title">${this.title}</div>
                    <div class="header__price">${this.price}<span> руб.</span></div>
                    <div class="header__quantity">Кол-во: ${this.quantity}</div>
                    <div class="header__amount">Общая цена: ${this.quantity*this.price}</div>
                    <button class="header__btn" onclick="cart.addProduct(this)"
                        data-id="${this.id}"
                        data-title="${this.title}"
                        data-price="${this.price}"
                        data-img="${this.img}">
                        +
                    </button>
                    <button class="header__btn" onclick="cart.removeProduct(this)"
                        data-id="${this.id}"
                        data-title="${this.title}"
                        data-price="${this.price}"
                        data-img="${this.img}">
                        -
                    </button>
                </div>`
    }
}

const lists = {
    ProductList: ProductItem,
    CartList: CartItem
}

let activeCart = function() {
    if(active) {
        active = false
        cartWrap.style.visibility = "hidden"
    } else {
        active = true
        cartWrap.style.visibility = "visible"
    }
}

function removeProduct (product) {
    let productId= + product.dataset['id']
    let find = userCart.find (element => element.id === productId)

    if(find.quantity > 1) {
        find.quantity--
    } else {
        userCart.splice(userCart.indexOf(find), 1)
        document.querySelector(`.header__cartItem[data-id="${productId}"]`).remove()
    }
    renderCart()
}

btnCart.addEventListener('click', activeCart)
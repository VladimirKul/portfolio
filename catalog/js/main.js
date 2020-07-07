let app = new Vue({
    el: '#app',

    data: {
        url: 'https://raw.githubusercontent.com/VladimirKul/catalog/master/catalog',
        API: {
                catalog: '/catalogData.json',
                cart: '/getBasket.json'
            },
        items: [],
        DTOarr: [],
        cartArr: [],
        statusActiveCart: false
    },

    methods: {
        getJSON(url) {
            return fetch(url)
                .then(data => data.json())
                
        },

        getCatalog() {
            this.getJSON(this.url + this.API.catalog)
                .then(data => { this.DTOarr = data })
        },

        getCart() {
            this.getJSON(this.url + this.API.cart)
                .then(data => { this.cartArr = data.contents })
        },

        addProduct (idP, titleP, priceP, imgP) {
            let productId = idP
            let find = this.cartArr.find (element => element.id === productId)
            if(!find) {
                let el = {
                    title: titleP,
                    price: priceP,
                    id: productId,
                    img: imgP,
                    quantity: 1
                }
                this.cartArr.push (el)
            } else {
                find.quantity++
            }
        },

        removeProduct (idP) {
            let productId= idP
            let find =this.cartArr.find (element => element.id === productId)
        
            if(find.quantity > 1) {
                find.quantity--
            } else {
                this.cartArr.splice(this.cartArr.indexOf(find), 1)
            }
        },

        activeCart() {
            if(this.statusActiveCart) {
                return this.statusActiveCart = false
            } else {
                return this.statusActiveCart = true
            }
        }
    },

    

    mounted() {
        this.getCatalog()
        //this.getCart()
    }
})
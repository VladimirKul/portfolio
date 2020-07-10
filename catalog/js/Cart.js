Vue.component('cart', {
    data() {
        return {
            cartUrl: 'https://raw.githubusercontent.com/VladimirKul/catalog/master/catalog/getBasket.json',
            
        }
    },

    methods: {
        getCart() {
            this.$parent.getJSON(this.cartUrl)
                .then(data => { this.$parent.cart = data.contents })
        },

        addProduct (itemProduct) {
            let productId = itemProduct.id
            let find = this.$parent.cart.find (element => element.id === productId)
            if(!find) {
                let el = {
                    title: itemProduct.title,
                    price: itemProduct.price,
                    id: productId,
                    img: itemProduct.img,
                    quantity: 1
                }
                this.$parent.cart.push (el)
            } else {
                find.quantity++
            }
        },

        removeProduct (idP) {
            let productId= idP
            let find = this.$parent.cart.find (element => element.id === productId)
        
            if(find.quantity > 1) {
                find.quantity--
            } else {
                this.$parent.cart.splice(this.$parent.cart.indexOf(find), 1)
            }
        }
        
    },

    template: `<div class="header__cartWrap" :class="{ active_cart: $parent.statusActiveCart }">
                    <cart_item v-for="item of $parent.cart" :el="item" :key="item.id"></cart_item>
                </div>`
})
Vue.component('cart', {
    data() {
        return {
            items: [],
            cartUrl: 'https://raw.githubusercontent.com/VladimirKul/catalog/master/catalog/getBasket.json',
            addAproveUrl: 'https://raw.githubusercontent.com/VladimirKul/online-store-api/master/responses/addToBasket.json',
            delAproveUrl: 'https://raw.githubusercontent.com/VladimirKul/online-store-api/master/responses/deleteFromBasket.json',
        }
    },

    methods: {
        getCart() {
            this.$parent.getJSON(this.cartUrl)
                .then(data => { this.items = data.contents })
        },

        addProduct (itemProduct) {
            let find = this.items.find (item => item.id === itemProduct.id)

            if(find) {
                this.$parent.getJSON(this.addAproveUrl)
                    .then(answer => {
                        if(answer.result) {
                            find.quantity++
                        }
                    })
            } else {
                let pr = Object.assign({}, itemProduct, {quantity: 1})
                this.$parent.getJSON(this.addAproveUrl)
                    .then(answer => {
                        if(answer.result) {
                            this.items.push(pr)
                        }
                    }) 
            }
        },

        removeProduct (idP) {
            let productId= idP
            let find = this.items.find (element => element.id === productId)
        
            if(find.quantity > 1) {
                this.$parent.getJSON(this.delAproveUrl)
                    .then(answer => {
                        if(answer.result) {
                            find.quantity--
                        }
                    })
            } else {
                this.$parent.getJSON(this.delAproveUrl)
                    .then(answer => {
                        if(answer.result) {
                            this.items.splice(this.items.indexOf(find), 1)
                        }
                    })
            }
        }
        
    },

    template: `<div class="header__cartWrap" :class="{ active_cart: $parent.statusActiveCart }">
                    <cart_item v-for="item of items" :el="item" :key="item.id"></cart_item>
                </div>`
})
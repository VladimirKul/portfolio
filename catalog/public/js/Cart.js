Vue.component('cart', {
    data() {
        return {
            items: [],
            cartUrl: '/cart'
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
                this.$parent.putJSON(this.cartUrl + `/${find.id}`, 1)
                    .then(answer => {
                        if(answer.result) {
                            find.quantity++
                        }
                    })
            } else {
                let pr = Object.assign({}, itemProduct, {quantity: 1})
                this.$parent.postJSON(this.cartUrl, pr)
                    .then(answer => {
                        if(answer.result) {
                            this.items.push(pr)
                        }
                    }) 
            }
        },

        removeProduct (itemProduct) {       
            if(itemProduct.quantity > 1) {
                this.$parent.putJSON(this.cartUrl + `/${itemProduct.id}`, -1)
                    .then(answer => {
                        if(answer.result) {
                            itemProduct.quantity--
                        }
                    })
            } else {
                this.$parent.deleteJSON(this.cartUrl + `/${itemProduct.id}`)
                    .then(answer => {
                        if(answer.result) {
                            this.items.splice(this.items.indexOf(itemProduct), 1)
                        }
                    })
            }
        }
        
    },

    mounted() {
        this.getCart()
    },

    template: `<div class="header__cartWrap" :class="{ active_cart: $parent.statusActiveCart }">
                    <cart_item v-for="item of items" :el="item" :key="item.id"></cart_item>
                </div>`
})
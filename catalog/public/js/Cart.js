Vue.component('cart', {
    data() {
        return {
            items: [],
            cartUrl: '/api/cart',
            addAproveUrl: '/api/cart',
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
                // this.$parent.putJSON(this.addAproveUrl)
                //     .then(answer => {
                //         if(answer.result) {
                //             find.quantity++
                //         }
                //     })
                console.log('heh')
            } else {
                let pr = Object.assign({}, itemProduct, {quantity: 1})
                this.$parent.postJSON(this.addAproveUrl, pr)
                    .then(answer => {
                        if(answer.result) {
                            this.items.push(pr)
                        }
                    }) 
            }
        },

        removeProduct (itemProduct) {       
            if(itemProduct.quantity > 1) {
                this.$parent.getJSON(this.delAproveUrl)
                    .then(answer => {
                        if(answer.result) {
                            itemProduct.quantity--
                        }
                    })
            } else {
                this.$parent.getJSON(this.delAproveUrl)
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
Vue.component('catalog', {
    data() {
        return {
            catalogUrl: 'https://raw.githubusercontent.com/VladimirKul/catalog/master/catalog/catalogData.json',
            items: []
        }
    },

    methods: {
        getCatalog() {
            this.$parent.getJSON(this.catalogUrl)
                .then(data => { this.items = data })
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
    },

    mounted() {
        this.getCatalog()
    },

    template: `<div class="catalog">
                    <catalog_item v-for="item of items" :el="item" :key="item.id"></catalog_item>
                </div>`
})
Vue.component('catalog', {
    data() {
        return {
            catalogUrl: '/api/catalog',
            items: []
        }
    },

    methods: {
        getCatalog() {
            this.$parent.getJSON(this.catalogUrl)
                .then(data => { this.items = data })
        },
    },

    mounted() {
        this.getCatalog()
    },

    template: `<div class="catalog">
                    <catalog_item v-for="item of items" :el="item" :key="item.id"></catalog_item>
                </div>`
})
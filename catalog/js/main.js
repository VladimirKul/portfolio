let app = new Vue({
    el: '#app',

    data: {
        statusActiveCart: false
    },

    methods: {
        getJSON(url) {
            return fetch(url)
                .then(data => data.json())
        },

        activeCart() {
            if(this.statusActiveCart) {
                return this.statusActiveCart = false
            } else {
                return this.statusActiveCart = true
            }
        }
    }
})
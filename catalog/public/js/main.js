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

        postJSON(url, obj) {
            return fetch(url, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(obj)
            })
        },

        putJSON(url) {

        },

        deleteJSON(url) {

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
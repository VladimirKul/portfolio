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
                .then (data => data.json())
        },

        putJSON(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({some: data})
            })
                .then (data => data.json())
        },

        deleteJSON(url) {
            return fetch(url, {
                method: 'DELETE',
                headers: {"Content-Type": "application/json"},
            })
                .then (data => data.json())
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
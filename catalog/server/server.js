const express = require ('express')
const fs = require ('fs')
const cart = require ('./cartRouter')
const cartCore = require('./cart')

const app = express ()

app.use (express.json ())
app.use ('/', express.static ('public'))

app.get('/catalog', (req, res) => {
    fs.readFile ('server/db/catalogData.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            res.send (data)
        }
    })
})

app.get('/cart', (req, res) => {
    fs.readFile ('server/db/getBasket.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            res.send (data)
        }
    })
})

app.post ('/cart', (req, res) => {
    let file = 'server/db/getBasket.json'
    fs.readFile (file, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            let oldCart = JSON.parse(data)
            let newCart = cartCore.add (oldCart, req)
            fs.writeFile(file, newCart, (err) => {
                if (err) {
                    res.sendStatus (500, JSON.stringify({result: 0}))
                } else {
                    res.send(JSON.stringify({result: 1}))
                }
            })
        }
    })
}) 

app.put ('/cart/:id', (req, res) => {
    let file = 'server/db/getBasket.json'
    fs.readFile (file, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            let oldCart = JSON.parse(data)
            let newCart = cartCore.change (oldCart, req)
            fs.writeFile(file, newCart, (err) => {
                if (err) {
                    res.sendStatus (500, JSON.stringify({result: 0}))
                } else {
                    res.send(JSON.stringify({result: 1}))
                }
            })
        }
    })
}) 

app.delete ('/cart/:id', (req, res) => {
    let file = 'server/db/getBasket.json'
    fs.readFile (file, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            let oldCart = JSON.parse(data)
            let newCart = cartCore.delItem (oldCart, req)
            fs.writeFile(file, newCart, (err) => {
                if (err) {
                    res.sendStatus (500, JSON.stringify({result: 0}))
                } else {
                    res.send(JSON.stringify({result: 1}))
                }
            })
        }
    })
}) 

app.listen (8080, () => {
    console.log('server is started')
})
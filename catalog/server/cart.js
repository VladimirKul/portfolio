let add = (cart, req) => {
    cart.contents.push (req.body)
    return JSON.stringify(cart, null, 4)
}

let change = (cart, req) => {
    let find = cart.contents.find (cont => cont.id === +req.params.id)
    find.quantity += req.body.some //число 1 или -1
    return JSON.stringify(cart, null, 4)
}

let delItem = ( cart, req) => {
    let find = cart.contents.find (cont => cont.id === +req.params.id)
    cart.contents.splice (cart.contents.indexOf (find), 1)
    return JSON.stringify(cart, null, 4)
}

module.exports = {
    add, change, delItem
}
let add = (cart, req) => {
    console.log(cart)
    cart.contents.push (req.body)
    return JSON.stringify(cart, null, 4)
}

module.exports = {
    add
}
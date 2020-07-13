Vue.component('cart_item', {
    template: `<div class="header__cartItem">
                    <div class="header__blockimg">
                        <img :src="'img/' + el.img" alt="img" class="header__img">
                    </div>
                    <div class="header__title">{{ el.title }}</div>
                    <div class="header__price">{{ el.price }}<span> руб.</span></div>
                    <div class="header__quantity">Кол-во: {{ el.quantity }}</div>
                    <div class="header__amount">Общая цена: {{ el.quantity*el.price }}</div>
                    <button class="header__btn" @click="$parent.addProduct(el)">
                        +
                    </button>
                    <button class="header__btn"  @click="$parent.removeProduct(el)">
                        -
                    </button>
                </div>`,
    props: ['el']
})
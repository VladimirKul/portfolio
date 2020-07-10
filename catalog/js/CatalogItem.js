Vue.component('catalog_item', {
    template: `<div class="catalog__item">
                    <div class="catalog__blockimg">
                        <img :src="'img/' + el.img" alt="img" class="catalog__img">
                    </div>
                    <div class="catalog__title">{{ el.title }}</div>
                    <div class="catalog__price">{{ el.price }}<span> руб.</span></div>
                    <button class="catalog__btn" @click="$parent.addProduct(el)">
                        Добавить в корзину
                    </button>
                </div>`,
    props: ['el']
})
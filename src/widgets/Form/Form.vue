<script setup lang="ts">
import { extras, giftThumbnail } from '../../entities/catalog'
import { useOrderConstructor } from '../../features/order-constructor'
import { PictureImage } from '../../shared/ui/Picture'

const {
    selectedMain,
    selectedTab,
    couponOpen,
    coupon,
    installment,
    consent,
    name,
    phone,
    submitting,
    successOpen,
    formError,
    currentProducts,
    currentMain,
    selectedExtraProducts,
    isExtraSelected,
    regularPrice,
    price,
    discountPercent,
    comment,
    formatPrice,
    setProductList,
    toggleExtra,
    submitOrder,
} = useOrderConstructor()
</script>

<template>
    <section class="order">
        <header class="order__header">
            <h1 class="order__title">Оформление заказа</h1>
            <p class="order__description">
                Мы перезвоним Вам и уточним детали доставки
            </p>
        </header>

        <form class="order__layout" novalidate @submit.prevent="submitOrder">
            <div class="order__configuration">
                <div class="order__tabs" role="tablist" aria-label="Комплектация автоклава">
                    <button class="order__tab" :class="{ 'order__tab--active': selectedTab === 'control' }"
                        type="button" @click="setProductList('control')">
                        с блоком управления
                    </button>
                    <button class="order__tab" :class="{ 'order__tab--active': selectedTab === 'without' }"
                        type="button" @click="setProductList('without')">
                        без ТЭНа
                    </button>
                </div>

                <fieldset class="order__main-products" aria-label="Основные товары">
                    <label v-for="(product, index) in currentProducts" :key="product.id" class="main-product"
                        :class="{ 'main-product--selected': selectedMain === index }">
                        <input v-model="selectedMain" class="main-product__radio" type="radio" :value="index"
                            name="main-product">
                        <span class="main-product__volume">{{ product.liters }} л</span>
                        <span class="main-product__image-wrap">
                            <PictureImage :webp="product.thumbnail.webp" :png="product.thumbnail.png"
                                :alt="product.name" image-class="main-product__image" />
                        </span>
                        <span class="main-product__name">
                            {{ product.name }}
                        </span>
                        <span class="product-price">
                            <s>{{ formatPrice(product.price + 10000) }}</s>
                            <strong>{{ formatPrice(product.price) }}</strong>
                        </span>
                    </label>
                </fieldset>
            </div>

            <div class="order__customer">
                <label class="order__field">
                    <span class="visually-hidden">Имя</span>
                    <input v-model="name" autocomplete="name" name="name" placeholder="Имя" required>
                </label>
                <label class="order__field">
                    <span class="visually-hidden">Телефон</span>
                    <input v-model="phone" autocomplete="tel" name="phone" type="tel" placeholder="Телефон" required>
                </label>

                <button class="order__coupon-toggle" type="button" @click="couponOpen = !couponOpen">
                    Есть купон?
                </button>
                <label v-if="couponOpen" class="order__field order__field--coupon">
                    <span class="visually-hidden">Промокод</span>
                    <input v-model="coupon" name="coupon" placeholder="Введите промокод">
                </label>

                <div class="order__total">
                    <strong>{{ formatPrice(price) }}</strong>
                    <s>{{ formatPrice(regularPrice) }}</s>
                    <span class="order__discount">-{{ discountPercent }}%</span>
                </div>
                <label class="order__installment">
                    <input v-model="installment" class="extra-row__checkbox" type="checkbox">
                    <span>Хочу купить в рассрочку</span>
                </label>
                <input type="hidden" class="comment" name="comment" :value="comment">

                <p v-if="formError" class="order__error" role="alert">
                    {{ formError }}
                </p>
                <button class="order__submit" type="submit" :disabled="submitting">
                    <span v-if="submitting" class="order__spinner" aria-hidden="true"></span>
                    {{ submitting ? 'Отправляем…' : 'Заказать' }}
                </button>
                <label class="order__consent">
                    <input v-model="consent" class="extra-row__checkbox" type="checkbox" required>
                    <span>
                        Даю согласие на обработку персональных данных в&nbsp;соответствии с
                        условиями политики конфиденциальности. Подтверждаю ознакомление и&nbsp;согласие с условиями
                        Публичной оферты.
                    </span>
                </label>
            </div>

            <div class="order__preview" aria-label="Предпросмотр комплектации">
                <div class="order__stage-products">
                    <Transition name="main-product-fade">
                        <PictureImage :key="`${selectedTab}-${currentMain.id}`" :responsive="currentMain.image"
                            :alt="currentMain.name" picture-class="order__stage-main-picture"
                            image-class="order__stage-main" />
                    </Transition>

                    <TransitionGroup name="extra-product-pop" tag="div" class="order__stage-extras">
                        <PictureImage v-for="extra in selectedExtraProducts" :key="extra.id" :responsive="extra.image"
                            :alt="extra.name"
                            :picture-class="`order__stage-extra-picture order__stage-extra-picture--${extra.id}`"
                            :image-class="`order__stage-extra order__stage-extra--${extra.id}`" />
                    </TransitionGroup>
                </div>
            </div>

            <aside class="order__extras">
                <h2 class="order__section-title">Подарки:</h2>
                <div class="gift-row">
                    <input class="extra-row__checkbox" type="checkbox" checked disabled aria-label="Подарки включены">
                    <PictureImage :webp="giftThumbnail.webp" :png="giftThumbnail.png" alt="Подарки" />
                    <a href="#extras">6 подарков</a>
                    <span class="product-price">
                        <s>99 999 ₽</s>
                        <strong>99 999 ₽</strong>
                    </span>
                </div>

                <h2 id="extras" class="order__section-title order__section-title--extras">
                    Дополнительные товары:
                </h2>
                <label v-for="extra in extras" :key="extra.id" class="extra-row">
                    <input class="extra-row__checkbox" type="checkbox" :checked="isExtraSelected(extra.id)"
                        @change="toggleExtra(extra.id)">
                    <span class="extra-row__image">
                        <PictureImage :webp="extra.thumbnail.webp" :png="extra.thumbnail.png" :alt="extra.name" />
                    </span>
                    <span class="extra-row__name">{{ extra.description }}</span>
                    <span class="product-price">
                        <s>{{ formatPrice(extra.price + 500) }}</s>
                        <strong>{{ formatPrice(extra.price) }}</strong>
                    </span>
                </label>
            </aside>
        </form>

        <div v-if="successOpen" class="order-modal" role="dialog" aria-modal="true" aria-labelledby="order-modal-title"
            @click.self="successOpen = false">
            <div class="order-modal__card">
                <button class="order-modal__close" type="button" aria-label="Закрыть" @click="successOpen = false">
                    ×
                </button>
                <h2 id="order-modal-title">Спасибо за заказ!</h2>
                <p>Мы скоро свяжемся с вами.</p>
                <button class="order__submit" type="button" @click="successOpen = false">
                    Хорошо
                </button>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
.order {
    width: 100%;
    margin: 0 auto;
    padding: 80px 40px;
    border-radius: 0;
    color: #292929;
    background: #fff;
    border: 1px solid #d9e8f5;
    box-shadow: 0 8px 30px #263c4c0a;

    &__header {
        margin-bottom: 34px;
        text-align: center;
    }

    &__title {
        font-size: 27px;
        letter-spacing: 0.3px;
        line-height: 1.2;
        margin-bottom: 13px;
        font-family: "Manrope", Arial, sans-serif;
        font-weight: 600;
        letter-spacing: 0.5px;
    }

    &__description {
        font-family: "Manrope", Arial, sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 100%;
    }

    &__layout {
        display: grid;
        grid-template-columns: minmax(275px, 1fr) minmax(280px, 1.05fr) minmax(285px, 1fr);
        grid-template-areas:
            'configuration preview extras'
            'customer preview extras';
        gap: 22px;
        align-items: start;
    }

    &__configuration {
        grid-area: configuration;
        min-width: 0;
    }

    &__tabs {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
    }

    &__tab {
        font-family: "Roboto", sans-serif;
        padding: 8px 18px;
        font-weight: 600;
        font-size: 16px;
        line-height: 120%;
        letter-spacing: -1%;
        border: 2px solid #C8AC6C;
        border-radius: 20px;
        color: #bf9842;
        background: #fff;
        font-weight: 700;
        cursor: pointer;
        transition: background .2s, color .2s;
    }

    &__tab--active {
        color: #fff;
        background: #c9a34c;
    }

    &__main-products {
        display: flex;
        justify-content: center;
        gap: 10px;
        border: 0;

        .product-price {
            display: none;
        }
    }

    &__customer {
        grid-area: customer;
        display: grid;
        gap: 10px;
        margin-top: 20px;
    }

    &__field input {
        width: 100%;
        font-family: "Manrope", sans-serif;
        font-weight: 400;
        font-size: 18px;
        line-height: 100%;
        letter-spacing: 3%;
        background-color: #EFF3F5B2;
        color: #979797;
        min-height: 45px;
        border-radius: 25px;
        border: 1px solid;
        backdrop-filter: blur(12px);
        border-image-source: linear-gradient(135deg, #FFFFFF 0%, #B3D4EE 100%);
        padding: 0 18px;
    }

    &__field input:focus {
        border-color: #c9a34c;
    }

    &__coupon-toggle {
        justify-self: start;
        padding: 0;
        border: 0;
        background: transparent;
        font-weight: 600;
        font-size: 16px;
        line-height: 120%;
        letter-spacing: -1%;
        text-decoration: underline;
        cursor: pointer;
        color: #C8AC6C;
    }

    &__total {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    &__total>strong {
        font-family: "Montserrat", sans-serif;
        font-weight: 600;
        font-size: 36px;
        line-height: 120%;
    }

    &__total>s {
        font-family: "Roboto", sans-serif;
        font-weight: 400;
        font-size: 20px;
        line-height: 140%;
        letter-spacing: -1%;
        text-decoration: line-through;
    }

    &__discount {
        padding: 5px 10px;
        border-radius: 4px;
        color: #fff;
        background: #ff5555;
        font-weight: 600;
        font-size: 20px;
        line-height: 100%;
    }

    &__installment {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-size: 13px;
        cursor: pointer;
        display: none;
    }

    &__installment input {
        width: 17px;
        height: 17px;
        accent-color: #c9a34c;
    }

    &__error {
        color: #bd2424;
        font-size: 12px;
    }

    &__submit {
        display: flex;
        width: 100%;
        min-height: 56px;
        align-items: center;
        justify-content: center;
        border: 0;
        color: #fff;

        font-family: "Roboto", sans-serif;
        font-weight: 400;
        font-size: 20px;
        line-height: 140%;
        letter-spacing: -1%;
        cursor: pointer;
        border-radius: 10px;
        background-color: #34A848;
        transition: background .2s, transform .2s;
    }

    &__submit:hover:not(:disabled) {
        background: #238b3b;
        transform: translateY(-1px);
    }

    &__submit:disabled {
        cursor: wait;
        opacity: .75;
    }

    &__spinner {
        width: 16px;
        height: 16px;
        border: 2px solid #ffffff75;
        border-top-color: #fff;
        border-radius: 50%;
        animation: order-spin .7s linear infinite;
    }

    &__consent {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        color: #002745;
        font-size: 10px;
        line-height: 1.35;
        cursor: pointer;

        font-family: "Roboto";
        font-weight: 400;
        font-size: 14px;
        line-height: 120%;
    }

    &__consent input {
        flex: 0 0 auto;
        margin-top: 1px;
        accent-color: #c9a34c;
    }

    &__preview {
        position: relative;
        grid-area: preview;
        min-height: 500px;
        border-radius: 16px;
        background: transparent;
    }

    &__stage-products {
        position: absolute;
        inset: 0;
    }

    &__stage-main-picture {
        position: absolute;
        inset: 0;
        display: block;
    }

    &__stage-main-picture img {
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        width: 220px;
        height: 90%;
        object-fit: contain;
        transform: translate(-50%, -50%);
    }

    &__stage-main {
        will-change: opacity;
    }

    &__stage-extra {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
        filter: drop-shadow(0 4px 4px #0002);
    }

    &__stage-extra-picture--1 {
        left: 0%;
        bottom: 1%;
        width: 80px;
        height: 57px;
    }

    &__stage-extra-picture--2 {
        top: 46%;
        width: 45px;
        height: 80px;
        right: 22.3%;
    }

    &__stage-extra-picture--3 {
        top: 5%;
        left: 0%;
        width: 80px;
        height: 74px;
    }

    &__stage-extra-picture--4 {
        left: 10%;
        top: 42%;
        width: 80px;
        height: 50px;
    }

    &__stage-extra-picture--5 {
        bottom: 1%;
        right: 0%;
        width: 80px;
        height: 78px;
    }

    &__stage-extra-picture--6 {
        top: 5%;
        right: 0%;
        width: 80px;
        height: 75px;
    }

    &__extras {
        grid-area: extras;
        margin-bottom: 12px;
    }

    &__section-title {
        display: none;
        margin: 0 0 19px;
        font-family: "Roboto", sans-serif;
        font-weight: 600;
        font-size: 16px;
        line-height: 120%;
        letter-spacing: -1%;
    }

    &__section-title--extras {
        display: block;
        margin-top: 18px;
    }

    &__layout {
        grid-template-columns: minmax(0, 1fr);
        grid-template-areas:
            'configuration'
            'preview'
            'extras'
            'customer';
        gap: 18px;
    }

    &__tabs {
        justify-content: center;
    }

    &__main-products {
        display: flex;
        justify-content: center;
        gap: 20px;
    }

    &__preview {
        min-height: 235px;
        margin-bottom: 10px;
    }

    &__customer {
        margin-top: 0;
    }

    &__installment,
    &__total {
        justify-content: center;
    }

    &__stage-extras {
        position: absolute;
        inset: 0;
        pointer-events: none;
    }

    &__stage-extra-picture {
        position: absolute;
    }

    .main-product-fade {

        &-enter-active,
        &-leave-active {
            transition: opacity .18s ease;
        }

        &-enter-from,
        &-leave-to {
            opacity: 0;
        }
    }

    .extra-product-pop {

        &-enter-active,
        &-leave-active {
            transition: opacity .18s ease, transform .18s ease;
        }

        &-enter-from,
        &-leave-to {
            opacity: 0;
            transform: scale(.94);
        }
    }
}

.main-product,
.extra-row,
.gift-row {
    display: grid;
    grid-template-columns: 18px 42px minmax(0, 1fr) auto;
    gap: 15px;
    align-items: center;
}

.main-product {
    cursor: pointer;
}

.main-product__radio {
    appearance: none;
    width: 16px;
    height: 16px;
    border: 1px solid #c9a34c;
    border-radius: 50%;
    cursor: pointer;
}

.main-product__radio:checked {
    box-shadow: inset 0 0 0 4px #fff;
    background: #c9a34c;
}

.main-product__volume {
    display: none;
}

.main-product__image-wrap {
    width: 48px;
    height: 48px;
}

.main-product__image,
.main-product__image-wrap picture,
.extra-row__image img,
.extra-row__image picture,
.gift-row img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.main-product__name,
.extra-row__name {
    font-weight: 400;
    font-size: 16px;
    line-height: 120%;
    letter-spacing: -1%;
}

.product-price {
    display: grid;
    white-space: nowrap;
    text-align: right;
    font-size: 12px;
}

.product-price s {
    font-weight: 400;
    font-size: 20px;
    line-height: 140%;
    letter-spacing: -1%;
    color: #979797;
}

.product-price strong {
    font-weight: 600;
    font-size: 20px;
    line-height: 140%;
    letter-spacing: -1%;
}

.gift-row {
    grid-template-columns: 23px 60px minmax(0, 1fr) auto;
    font-size: 12px;
}

.gift-row img {
    height: 60px;
    width: 60px;
}

.gift-row a {
    color: #282828;
    font-weight: 400;
    font-size: 20px;
    line-height: 140%;
    letter-spacing: -1%;
    text-decoration-style: solid;
    text-decoration-thickness: 0%;
    text-decoration-skip-ink: auto;
}

.extra-row {
    min-height: 61px;
    cursor: pointer;
}

.extra-row__checkbox {
    appearance: none;
    width: 24px;
    height: 24px;
    border: 2px solid #c9a34c;
    border-radius: 4px;
    cursor: pointer;
}

.extra-row__checkbox:checked {
    box-shadow: inset 0 0 0 4px #fff;
    background: #c9a34c;
}

.extra-row__checkbox:disabled {
    cursor: default;
    opacity: 1;
}

.extra-row__image {
    display: block;
    width: 60px;
    height: 60px;
}

.extra-row__image picture {
    display: block;
    width: 100%;
    height: 100%;
}

.extra-row__image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.order-modal {
    position: fixed;
    z-index: 20;
    inset: 0;
    display: grid;
    place-items: center;
    padding: 20px;
    background: #0008;

    &__card {
        position: relative;
        width: min(100%, 360px);
        padding: 30px 24px 24px;
        border-radius: 14px;
        background: #fff;
        text-align: center;

        & h2 {
            margin-bottom: 8px;
        }

        & p {
            margin-bottom: 20px;
        }
    }
}

.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
}

@keyframes order-spin {
    to {
        transform: rotate(360deg);
    }
}

.main-product {
    display: flex;
    justify-content: center;
    padding: 7px 18px;
    border: 2px solid #C8AC6C;
    border-radius: 20px;
    color: #C8AC6C;
    font-family: "Roboto";
    font-weight: 600;
    font-size: 16px;
    line-height: 120%;
    letter-spacing: -1%;
}

.main-product--selected {
    color: #fff;
    background: #c9a34c;
}

.main-product__image-wrap,
.main-product__name,
.main-product__radio {
    display: none;
}

.main-product__volume {
    display: inline;
}

.extra-row {
    min-height: 62px;
    grid-template-columns: 23px 60px minmax(0, 1fr) auto;
    gap: 15px;
    margin-bottom: 18px;
}

.extra-row:last-child {
    margin-bottom: 0;
}

.product-price {
    font-size: 10px;
}



@media (min-width: 768px) {
    .order {
        padding: 120px 40px;

        &__title {
            font-weight: 600;
            font-size: 40px;
            line-height: 120%;
            letter-spacing: 0px;
            margin-bottom: 9px;
        }

        &__description {
            font-size: 20px;
            line-height: 140%;
            letter-spacing: -0.3%;
        }

        &__header {
            margin-bottom: 31px;
        }

        &__tab {
            font-size: 18px;
            line-height: 120%;
            letter-spacing: -1%;
        }

        &__preview {
            min-height: 270px;
            margin-bottom: 24px;
        }

        &__stage-main-picture img {
            width: 280px;
        }

        &__stage-extra-picture--1 {
            width: 100px;
            height: 71px;
            left: 8.6%;
            bottom: -5%;
        }

        &__stage-extra-picture--2 {
            width: 56px;
            height: 100px;
            top: 45.1%;
            right: 15.9%;
        }

        &__stage-extra-picture--3 {
            width: 90px;
            height: 83px;
            top: 4.8%;
            left: 8.6%;
        }

        &__stage-extra-picture--4 {
            width: 100px;
            height: 63px;
            left: 21.6%;
            top: 45%;
        }

        &__stage-extra-picture--5 {
            width: 102px;
            height: 100px;
            bottom: -1%;
            right: 24%;
        }

        &__stage-extra-picture--6 {
            width: 100px;
            height: 94px;
            top: 5%;
            right: 8.6%;
        }

        .gift-row,
        .extra-row {
            max-width: 532px;
            margin: 0 auto;
        }

        .extra-row {
            min-height: 60px;
            margin-bottom: 20px;
        }

        .extra-row:last-child {
            margin-bottom: 0;
        }

        &__section-title--extras {
            font-weight: 600;
            font-size: 18px;
            line-height: 120%;
            letter-spacing: -1%;
            max-width: 532px;
            margin: 9px auto 8px;
        }

        .extra-row__name {
            font-size: 18px;
            line-height: 120%;
            letter-spacing: -1%;
        }

        &__field input {

            max-width: 568px;
            font-size: 18px;
            line-height: 120%;
            letter-spacing: -1%;
            padding: 0 30px;
        }

        &__customer {
            gap: 15px;
            max-width: 608px;
            margin: 0 auto;
        }

        &__coupon-toggle {
            font-size: 18px;
            line-height: 120%;
            letter-spacing: -1%;
        }

    }

    .main-product {
        font-weight: 600;
        font-size: 18px;
        line-height: 120%;
        letter-spacing: -1%;
        padding: 8px 18px;
    }
}

@media (min-width: 1024px) {

    .order {
        &__stage-extra-picture--1 {
            left: 25.6%;
        }

        &__stage-extra-picture--2 {
            right: 28.9%;
        }

        &__stage-extra-picture--3 {
            left: 24.6%;
        }

        &__stage-extra-picture--4 {
            left: 28.6%;
        }

        &__stage-extra-picture--5 {
            right: 30%;
        }

        &__stage-extra-picture--6 {
            right: 25.6%;
        }
    }
}




@media (min-width: 1200px) {
    .order {
        margin: 150px auto;
        border-radius: 20px;
        border: 1px solid;
        border-image-source: linear-gradient(135deg, #FFFFFF 0%, #B3D4EE 100%);
        padding: 30px 24px;

        &__layout {
            grid-template-columns: minmax(275px, 1fr) minmax(280px, 1.05fr) minmax(285px, 1fr);
            grid-template-areas:
                'configuration preview extras'
                'customer preview extras';
            gap: 22px;
        }

        &__tabs {
            justify-content: flex-start;
        }

        &__main-products {
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            gap: 10px;

            .product-price {
                display: grid;
            }
        }

        &__title {
            font-family: "Montserrat", sans-serif;
            font-weight: 700;
            font-size: 48px;
            line-height: 120%;
        }

        &__tab {
            font-weight: 600;
            font-size: 20px;
            line-height: 100%;
            letter-spacing: 0%;
            padding: 10px 18px;
        }

        &__tabs {
            margin-bottom: 15px;
            justify-content: center;
        }

        &__layout {
            gap: 0 40px;
        }

        &__configuration {
            margin-bottom: 10px;
        }

        &__coupon-toggle {
            font-size: 20px;
            line-height: 140%;
            letter-spacing: -1%;
        }

        &__installment {
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: "Lexend", sans-serif;
            font-weight: 400;
            font-size: 20px;
            line-height: 100%;
            margin-block: -5px;
            letter-spacing: 0.6px;

            input {
                width: 24px;
                height: 24px;
            }
        }

        &__consent {
            margin-top: -5px;
        }

        &__preview {
            margin: 0;
            min-height: 800px;
        }

        &__stage-main-picture img {
            width: 400px;
        }

        &__stage-extra-picture--1 {
            width: 150px;
            height: 107px;
            left: -0.4%;
            bottom: 15%;
        }

        &__stage-extra-picture--2 {
            width: 84px;
            height: 150px;
            top: 0.1%;
            right: 40.9%;
        }

        &__stage-extra-picture--3 {
            width: 150px;
            height: 138px;
            top: 4.8%;
            left: initial;
            right: 0%;
        }

        &__stage-extra-picture--4 {
            width: 150px;
            height: 94px;
            left: initial;
            top: initial;
            right: -1%;
            bottom: 17%;
        }

        &__stage-extra-picture--5 {
            width: 153px;
            height: 150px;
            bottom: initial;
            right: 66%;
            top: 5%;
        }

        &__stage-extra-picture--6 {
            width: 150px;
            height: 140px;
            top: initial;
            right: 33.6%;
            bottom: 0%;
        }

        &__section-title {
            display: block;
            font-weight: 600;
            font-size: 20px;
            line-height: 120%;
            letter-spacing: 1%;

            &--extras {
                margin: 17px auto 20px;
                letter-spacing: 0;
            }
        }

        .extra-row {
            margin-bottom: 20px;

            &__name {
                font-weight: 400;
                font-size: 20px;
                line-height: 140%;
                letter-spacing: 0;
            }
        }
    }



    .main-product {
        display: grid;
        grid-template-columns: 24px 60px minmax(0, 1fr) auto;
        min-height: 62px;
        justify-content: initial;
        padding: 0;
        border: 0;
        border-radius: 0;
        color: inherit;
        background: transparent;
        font-size: inherit;
        min-height: 84px;
        margin-bottom: 5px;

        &__image {
            width: 60px;
            height: 60px;
        }

        &__name {
            font-weight: 400;
            font-size: 20px;
            line-height: 140%;
            letter-spacing: -1%;
        }

        &__radio {
            width: 24px;
            height: 24px;
        }
    }

    .main-product--selected {
        color: inherit;
        background: transparent;
    }

    .main-product__image-wrap,
    .main-product__name {
        display: initial;
    }

    .main-product__radio {
        display: block;
    }

    .main-product__volume {
        display: none;
    }

    .extra-row {
        min-height: 61px;
    }

    .order {


        &__installment,
        &__total {
            justify-content: center;
        }
    }
}
</style>

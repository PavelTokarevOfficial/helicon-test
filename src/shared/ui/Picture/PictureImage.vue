<script setup lang="ts">
import type { ProductImage } from '../../../entities/catalog'

withDefaults(defineProps<{
  webp?: string
  png?: string
  responsive?: {
    pc: ProductImage
    tablet: ProductImage
    mobile: ProductImage
  }
  alt: string
  imageClass?: string
  pictureClass?: string
}>(), {
  webp: undefined,
  png: undefined,
  responsive: undefined,
  imageClass: undefined,
  pictureClass: undefined,
})
</script>

<template>
  <picture :class="pictureClass">
    <template v-if="responsive">
      <source
        :srcset="responsive.mobile.webp"
        type="image/webp"
        media="(max-width: 760px)"
      >
      <source
        :srcset="responsive.mobile.png"
        media="(max-width: 760px)"
      >
      <source
        :srcset="responsive.tablet.webp"
        type="image/webp"
        media="(max-width: 1020px)"
      >
      <source
        :srcset="responsive.tablet.png"
        media="(max-width: 1020px)"
      >
      <source :srcset="responsive.pc.webp" type="image/webp">
      <img :class="imageClass" :src="responsive.pc.png" :alt="alt">
    </template>
    <template v-else>
      <source :srcset="webp" type="image/webp">
      <img :class="imageClass" :src="png" :alt="alt">
    </template>
  </picture>
</template>

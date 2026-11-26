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

function resolveAsset(path?: string) {
  if (!path) return ''

  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
</script>

<template>
  <picture :class="pictureClass">
    <template v-if="responsive">
      <source
        :srcset="resolveAsset(responsive.mobile.webp)"
        type="image/webp"
        media="(max-width: 760px)"
      >
      <source
        :srcset="resolveAsset(responsive.mobile.png)"
        media="(max-width: 760px)"
      >
      <source
        :srcset="resolveAsset(responsive.tablet.webp)"
        type="image/webp"
        media="(max-width: 1020px)"
      >
      <source
        :srcset="resolveAsset(responsive.tablet.png)"
        media="(max-width: 1020px)"
      >
      <source :srcset="resolveAsset(responsive.pc.webp)" type="image/webp">
      <img :class="imageClass" :src="resolveAsset(responsive.pc.png)" :alt="alt">
    </template>
    <template v-else>
      <source :srcset="resolveAsset(webp)" type="image/webp">
      <img :class="imageClass" :src="resolveAsset(png)" :alt="alt">
    </template>
  </picture>
</template>

export type ProductImage = { webp: string; png: string }

export type ResponsiveProductImage = {
  pc: ProductImage
  tablet: ProductImage
  mobile: ProductImage
}

export type MainProduct = {
  id: number
  liters: number
  name: string
  price: number
  thumbnail: ProductImage
  image: ResponsiveProductImage
}

export type ExtraProduct = {
  id: number
  name: string
  description: string
  price: number
  thumbnail: ProductImage
  image: ResponsiveProductImage
}

export type ProductList = 'control' | 'without'

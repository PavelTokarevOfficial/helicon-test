import type { ExtraProduct, MainProduct, ProductList } from './types'

export const mainProducts: Record<ProductList, MainProduct[]> = {
  control: [
    {
      id: 1,
      liters: 8,
      name: 'Автоклав “Крестьянка”, 8 литров',
      price: 29990,
      thumbnail: {
        webp: '/images/thumbnail/thumbnail-1.webp',
        png: '/images/thumbnail/thumbnail-1.png',
      },
      image: {
        pc: {
          webp: '/images/products/products-pc-1.webp',
          png: '/images/products/products-pc-1.png',
        },
        tablet: {
          webp: '/images/products/products-tablet-1.webp',
          png: '/images/products/products-tablet-1.png',
        },
        mobile: {
          webp: '/images/products/products-mob-1.webp',
          png: '/images/products/products-mob-1.png',
        },
      },
    },
    {
      id: 2,
      liters: 15,
      name: 'Автоклав “Крестьянка”, 15 литров',
      price: 34990,
      thumbnail: {
        webp: '/images/thumbnail/thumbnail-2.webp',
        png: '/images/thumbnail/thumbnail-2.png',
      },
      image: {
        pc: {
          webp: '/images/products/products-pc-2.webp',
          png: '/images/products/products-pc-2.png',
        },
        tablet: {
          webp: '/images/products/products-tablet-2.webp',
          png: '/images/products/products-tablet-2.png',
        },
        mobile: {
          webp: '/images/products/products-mob-2.webp',
          png: '/images/products/products-mob-2.png',
        },
      },
    },
    {
      id: 3,
      liters: 20,
      name: 'Автоклав “Крестьянка”, 20 литров',
      price: 39990,
      thumbnail: {
        webp: '/images/thumbnail/thumbnail-3.webp',
        png: '/images/thumbnail/thumbnail-3.png',
      },
      image: {
        pc: {
          webp: '/images/products/products-pc-3.webp',
          png: '/images/products/products-pc-3.png',
        },
        tablet: {
          webp: '/images/products/products-tablet-3.webp',
          png: '/images/products/products-tablet-3.png',
        },
        mobile: {
          webp: '/images/products/products-mob-3.webp',
          png: '/images/products/products-mob-3.png',
        },
      },
    },
    {
      id: 4,
      liters: 26,
      name: 'Автоклав “Крестьянка”, 26 литров',
      price: 44990,
      thumbnail: {
        webp: '/images/thumbnail/thumbnail-4.webp',
        png: '/images/thumbnail/thumbnail-4.png',
      },
      image: {
        pc: {
          webp: '/images/products/products-pc-4.webp',
          png: '/images/products/products-pc-4.png',
        },
        tablet: {
          webp: '/images/products/products-tablet-4.webp',
          png: '/images/products/products-tablet-4.png',
        },
        mobile: {
          webp: '/images/products/products-mob-4.webp',
          png: '/images/products/products-mob-4.png',
        },
      },
    },
  ],
  without: [
    {
      id: 5,
      liters: 8,
      name: 'Автоклав без ТЭНа, 8 литров',
      price: 27990,
      thumbnail: {
        webp: '/images/thumbnail/thumbnail-5.webp',
        png: '/images/thumbnail/thumbnail-5.png',
      },
      image: {
        pc: {
          webp: '/images/products/products-pc-5.webp',
          png: '/images/products/products-pc-5.png',
        },
        tablet: {
          webp: '/images/products/products-tablet-5.webp',
          png: '/images/products/products-tablet-5.png',
        },
        mobile: {
          webp: '/images/products/products-mob-5.webp',
          png: '/images/products/products-mob-5.png',
        },
      },
    },
    {
      id: 6,
      liters: 15,
      name: 'Автоклав без ТЭНа, 15 литров',
      price: 32990,
      thumbnail: {
        webp: '/images/thumbnail/thumbnail-6.webp',
        png: '/images/thumbnail/thumbnail-6.png',
      },
      image: {
        pc: {
          webp: '/images/products/products-pc-6.webp',
          png: '/images/products/products-pc-6.png',
        },
        tablet: {
          webp: '/images/products/products-tablet-6.webp',
          png: '/images/products/products-tablet-6.png',
        },
        mobile: {
          webp: '/images/products/products-mob-6.webp',
          png: '/images/products/products-mob-6.png',
        },
      },
    },
    {
      id: 7,
      liters: 20,
      name: 'Автоклав без ТЭНа, 20 литров',
      price: 37990,
      thumbnail: {
        webp: '/images/thumbnail/thumbnail-7.webp',
        png: '/images/thumbnail/thumbnail-7.png',
      },
      image: {
        pc: {
          webp: '/images/products/products-pc-7.webp',
          png: '/images/products/products-pc-7.png',
        },
        tablet: {
          webp: '/images/products/products-tablet-7.webp',
          png: '/images/products/products-tablet-7.png',
        },
        mobile: {
          webp: '/images/products/products-mob-7.webp',
          png: '/images/products/products-mob-7.png',
        },
      },
    },
    {
      id: 8,
      liters: 26,
      name: 'Автоклав без ТЭНа, 26 литров',
      price: 42990,
      thumbnail: {
        webp: '/images/thumbnail/thumbnail-7.webp',
        png: '/images/thumbnail/thumbnail-7.png',
      },
      image: {
        pc: {
          webp: '/images/products/products-pc-7.webp',
          png: '/images/products/products-pc-7.png',
        },
        tablet: {
          webp: '/images/products/products-tablet-7.webp',
          png: '/images/products/products-tablet-7.png',
        },
        mobile: {
          webp: '/images/products/products-mob-7.webp',
          png: '/images/products/products-mob-7.png',
        },
      },
    },
  ],
}

export const extras: ExtraProduct[] = [
  {
    id: 1,
    name: 'Зажимы для крышек СКО, 7 шт.',
    description: 'Зажимы для крышек СКО, 7 шт.',
    price: 990,
    thumbnail: {
      webp: '/images/thumbnail/thumbnail-8.webp',
      png: '/images/thumbnail/thumbnail-8.png',
    },
    image: {
      pc: {
        webp: '/images/products/extra-product-pc-1.webp',
        png: '/images/products/extra-product-pc-1.png',
      },
      tablet: {
        webp: '/images/products/extra-product-tablet-1.webp',
        png: '/images/products/extra-product-tablet-1.png',
      },
      mobile: {
        webp: '/images/products/extra-product-mob-1.webp',
        png: '/images/products/extra-product-mob-1.png',
      },
    },
  },
  {
    id: 2,
    name: 'Крышки вакуумные с насосом, 9 шт.',
    description: 'Крышки вакуумные с насосом, 9 шт.',
    price: 1490,
    thumbnail: {
      webp: '/images/thumbnail/thumbnail-10.webp',
      png: '/images/thumbnail/thumbnail-10.png',
    },
    image: {
      pc: {
        webp: '/images/products/extra-product-pc-2.webp',
        png: '/images/products/extra-product-pc-2.png',
      },
      tablet: {
        webp: '/images/products/extra-product-tablet-2.webp',
        png: '/images/products/extra-product-tablet-2.png',
      },
      mobile: {
        webp: '/images/products/extra-product-mob-2.webp',
        png: '/images/products/extra-product-mob-2.png',
      },
    },
  },
  {
    id: 3,
    name: 'Крышки винтовые (Крышки твист-офф), 10 шт.',
    description: 'Крышки винтовые (Крышки твист-офф), 10 шт.',
    price: 1190,
    thumbnail: {
      webp: '/images/thumbnail/thumbnail-11.webp',
      png: '/images/thumbnail/thumbnail-11.png',
    },
    image: {
      pc: {
        webp: '/images/products/extra-product-pc-3.webp',
        png: '/images/products/extra-product-pc-3.png',
      },
      tablet: {
        webp: '/images/products/extra-product-tablet-3.webp',
        png: '/images/products/extra-product-tablet-3.png',
      },
      mobile: {
        webp: '/images/products/extra-product-mob-3.webp',
        png: '/images/products/extra-product-mob-3.png',
      },
    },
  },
  {
    id: 4,
    name: 'Крышки СКО, 50 шт.',
    description: 'Крышки СКО, 50 шт.',
    price: 890,
    thumbnail: {
      webp: '/images/thumbnail/thumbnail-12.webp',
      png: '/images/thumbnail/thumbnail-12.png',
    },
    image: {
      pc: {
        webp: '/images/products/extra-product-pc-4.webp',
        png: '/images/products/extra-product-pc-4.png',
      },
      tablet: {
        webp: '/images/products/extra-product-tablet-4.webp',
        png: '/images/products/extra-product-tablet-4.png',
      },
      mobile: {
        webp: '/images/products/extra-product-mob-4.webp',
        png: '/images/products/extra-product-mob-4.png',
      },
    },
  },
  {
    id: 5,
    name: 'Набор реторт-пакетов, 10 шт.',
    description: 'Набор реторт-пакетов, 10 шт.',
    price: 1290,
    thumbnail: {
      webp: '/images/thumbnail/thumbnail-13.webp',
      png: '/images/thumbnail/thumbnail-13.png',
    },
    image: {
      pc: {
        webp: '/images/products/extra-product-pc-5.webp',
        png: '/images/products/extra-product-pc-5.png',
      },
      tablet: {
        webp: '/images/products/extra-product-tablet-5.webp',
        png: '/images/products/extra-product-tablet-5.png',
      },
      mobile: {
        webp: '/images/products/extra-product-mob-5.webp',
        png: '/images/products/extra-product-mob-5.png',
      },
    },
  },
  {
    id: 6,
    name: 'Прокладка для автоклава силикон',
    description: 'Прокладка для автоклава силикон',
    price: 690,
    thumbnail: {
      webp: '/images/thumbnail/thumbnail-15.webp',
      png: '/images/thumbnail/thumbnail-15.png',
    },
    image: {
      pc: {
        webp: '/images/products/extra-product-pc-6.webp',
        png: '/images/products/extra-product-pc-6.png',
      },
      tablet: {
        webp: '/images/products/extra-product-tablet-6.webp',
        png: '/images/products/extra-product-tablet-6.png',
      },
      mobile: {
        webp: '/images/products/extra-product-mob-6.webp',
        png: '/images/products/extra-product-mob-6.png',
      },
    },
  },
]


export const giftThumbnail = {
  webp: '/images/thumbnail/thumbnail-14.webp',
  png: '/images/thumbnail/thumbnail-14.png',
}


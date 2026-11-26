import { computed, ref } from 'vue'
import { extras, mainProducts } from '../../../entities/catalog'
import type { ProductList } from '../../../entities/catalog'

export function useOrderConstructor() {
  const selectedMain = ref(0)
  const selectedExtras = ref<number[]>(extras.map((extra) => extra.id))
  const selectedTab = ref<ProductList>('without')
  const couponOpen = ref(false)
  const coupon = ref('')
  const installment = ref(false)
  const consent = ref(false)
  const name = ref('')
  const phone = ref('')
  const submitting = ref(false)
  const successOpen = ref(false)
  const formError = ref('')

  const currentProducts = computed(() => mainProducts[selectedTab.value])
  const currentMain = computed(() => currentProducts.value[selectedMain.value]!)
  const selectedExtraProducts = computed(() => extras.filter((extra) => selectedExtras.value.includes(extra.id)))
  const regularPrice = computed(() => currentMain.value.price + selectedExtraProducts.value.reduce(
    (sum, extra) => sum + extra.price,
    0,
  ))
  const price = computed(() => coupon.value.trim().toUpperCase() === 'WELCOME'
    ? Math.round(regularPrice.value * 0.85)
    : Math.round(regularPrice.value * 0.9))
  const discount = computed(() => regularPrice.value - price.value)
  const discountPercent = computed(() => Math.round(discount.value / regularPrice.value * 100))
  const comment = computed(() => installment.value ? 'Купить в рассрочку' : '')
  const formatPrice = (value: number) => `${new Intl.NumberFormat('ru-RU', { useGrouping: false }).format(value)} ₽`

  function setProductList(list: ProductList) {
    selectedTab.value = list
    selectedMain.value = 0
  }

  function isExtraSelected(id: number) {
    return selectedExtras.value.includes(id)
  }

  function toggleExtra(id: number) {
    selectedExtras.value = selectedExtras.value.includes(id)
      ? selectedExtras.value.filter((item) => item !== id)
      : [...selectedExtras.value, id]
  }

  function resetForm() {
    selectedMain.value = 0
    selectedExtras.value = extras.map((extra) => extra.id)
    selectedTab.value = 'without'
    couponOpen.value = false
    coupon.value = ''
    installment.value = false
    consent.value = false
    name.value = ''
    phone.value = ''
    formError.value = ''
  }

  async function submitOrder() {
    formError.value = ''
    if (!name.value.trim() || !/^\+?[\d\s()\-]{10,}$/.test(phone.value.trim())) {
      formError.value = 'Укажите имя и корректный номер телефона.'
      return
    }
    if (!consent.value) {
      formError.value = 'Подтвердите согласие на обработку персональных данных.'
      return
    }

    submitting.value = true
    await new Promise((resolve) => window.setTimeout(resolve, 700))
    submitting.value = false
    successOpen.value = true
    resetForm()
  }

  return {
    selectedMain,
    selectedExtras,
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
  }
}

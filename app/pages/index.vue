<script setup lang="ts">
const $api = useApiFetch()

const NFTData = await $api("/api/v3/nft/items", {
  query: {
    address: ["kQD475mN6jBUyLWf9gXEH9g3IR7iD6RHvN7xNjtuXHYmNVVU"],
  },
})

const rawAddress = computed(() => {
  return NFTData.nft_items?.at(0)?.address
})

const metadata = computed(() => {
  return NFTData.metadata?.[rawAddress.value!]?.token_info?.at(0)
})

const imageUrl = computed(() => {
  return metadata.value?.image
})

const attributes = computed(() => {
  return metadata.value?.extra?.attributes as Array<{ trait_type: string, value: string }>
})
</script>

<template lang="pug">
img(:src="imageUrl" style="width: 100px;")
pre(v-for="attribute in attributes") {{ attribute.trait_type }}: {{ attribute.value }}
</template>

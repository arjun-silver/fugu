<script setup lang="ts">
import { backgroundColors } from "~/services"

const props = defineProps<{
  address: string
}>()

const $api = useApiFetch()

const NFTData = await $api("/api/v3/nft/items", {
  query: {
    address: [props.address],
  },
})

const rawAddress = computed(() => {
  return NFTData.nft_items?.at(0)?.address
})

const metadata = computed(() => {
  const data = NFTData.metadata?.[rawAddress.value!]?.token_info?.at(0)

  return {
    imageUrl: data?.image,
    attributes: data?.extra?.attributes as Array<{ trait_type: string, value: string }>,
  }
})

const background = computed(() => {
  return metadata.value.attributes.find(attribute => attribute.trait_type === "Background")?.value || "Sea"
})
const color = backgroundColors[background.value]
</script>

<template lang="pug">
.card(:style="{ 'background-color': color }")
  img.nft(:src="metadata.imageUrl")
  .attributes
    .attribute(v-for="(attribute, index) in metadata.attributes")
      .name(:mclass="{ 'round-top-left': index === 0, 'round-bottom-left': index === metadata.attributes.length - 1 }") {{ attribute.trait_type }}
      .value(:mclass="{ 'round-top-right': index === 0, 'round-bottom-right': index === metadata.attributes.length - 1 }") {{ attribute.value }}
</template>

<style module lang="scss">
.card {
  font-family: Inter, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 315px;
  gap: 30px;
  padding: 15px;
  border-radius: 35px;
  align-self: center;
}

.nft {
  width: 285px;
  height: 285px;
  border: 10px solid rgba(0 0 0 / 50%);
  border-radius: 20px;
}

.attributes {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
}

.attribute {
  display: flex;
  gap: 5px;
  color: white;
}

.name {
  padding-left: 20px;
  flex: 1;
  background-color: rgb(0 0 0 / 50%);
}

.value {
  padding-left: 20px;
  flex: 1;
  background-color: rgb(0 0 0 / 50%);
}

.round-top-left {
  border-top-left-radius: 20px;
}

.round-top-right {
  border-top-right-radius: 20px;
}

.round-bottom-left {
  border-bottom-left-radius: 20px;
}

.round-bottom-right {
  border-bottom-right-radius: 20px;
}
</style>

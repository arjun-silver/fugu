<script setup lang="ts">
import { Address, beginCell, toNano } from "@ton/ton"
import { useTonConnectUI } from "@townsquarelabs/ui-vue"

const $api = useApiFetch()

const { address } = useRoute().params as { address: string }

const NFTData = await $api("/api/v3/nft/items", {
  query: {
    address: [address],
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

const { tonConnectUI } = useTonConnectUI()

async function claim() {
  const body = beginCell()
    .storeUint(71678468, 32)
    .storeAddress(Address.parse(address))
    .endCell()
  const transaction = {
    validUntil: Math.floor(Date.now() / 1000) + 60,
    messages: [
      {
        address: "kQAEighrJmxKWyW3qmvPdLcy1zXonn3AGDCGOYhzve5j-fH3",
        amount: toNano("0.1").toString(),
        payload: body.toBoc().toString("base64"),
      },
    ],
  }

  await tonConnectUI.sendTransaction(transaction)
}
</script>

<template lang="pug">
img(:src="imageUrl" style="width: 100px;")
pre(v-for="attribute in attributes") {{ attribute.trait_type }}: {{ attribute.value }}
button(@click="claim") Claim!
</template>

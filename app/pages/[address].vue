<script setup lang="ts">
import { Address, beginCell, toNano } from "@ton/ton"
import { useTonConnectUI } from "@townsquarelabs/ui-vue"

const { address } = useRoute().params as { address: string }

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
.page
  card(:address="address" @click="claim")
  div 1. Connect your TON Wallet
  div 2. Click on the card to claim it!
</template>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
}
</style>

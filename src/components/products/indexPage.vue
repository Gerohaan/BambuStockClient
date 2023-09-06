<template>
  <div class="row q-pa-sm">
    <div class="col-12 q-pa-sm">
      <p class="text-h5 text-primary">Productos</p>
    </div>
    <div class="col-12 q-pl-md q-pr-md" align="right">
      <q-btn
        icon="add"
        color="primary"
        dense
        round
        :to="{ name: 'productAdd' }"
      ></q-btn>
    </div>
    <div class="col-12">
      <list></list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import list from 'src/components/products/listPage.vue';
import { usePaymentStore } from 'src/stores/payment';

const paymentStore = usePaymentStore();

onMounted(async () => {
  await paymentStore.paymentAll();
});
</script>

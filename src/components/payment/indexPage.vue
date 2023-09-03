<template>
  <div class="row q-pa-sm">
    <div class="col-12 q-pa-sm">
      <p class="text-h5 text-primary">Tipos de pago</p>
    </div>
    <div class="col-12 q-pl-md q-pr-md" align="right">
      <q-btn
        icon="add"
        color="primary"
        @click="openModalAdd()"
        dense
        round
      ></q-btn>
    </div>
    <div class="col-12">
      <list></list>
    </div>
    <modal-add v-if="paymentStore.modalAdd"></modal-add>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import list from 'src/components/payment/listPage.vue';
import modalAdd from 'src/components/payment/modalAdd.vue';
import { usePaymentStore } from 'src/stores/payment';

const paymentStore = usePaymentStore();

const openModalAdd = () => {
  paymentStore.manageModal(true);
};
onMounted(async () => {
  await paymentStore.paymentAll();
});
</script>

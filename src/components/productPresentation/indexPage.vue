<template>
  <div class="row q-pa-sm">
    <div class="col-12 q-pa-sm">
      <p class="text-h5 text-primary">Presentación del producto</p>
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
    <modal-add v-if="presentationStore.modalAdd"></modal-add>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import list from 'src/components/productPresentation/listPage.vue';
import modalAdd from 'src/components/productPresentation/modalAdd.vue';
import { useProductPresentationStore } from 'src/stores/productPresentation';
import { useUnitStore } from 'src/stores/unit';
const presentationStore = useProductPresentationStore();
const unitStore = useUnitStore();
const openModalAdd = () => {
  presentationStore.manageModal(true);
};

onMounted(async () => {
  await presentationStore.presentationAll();
  await unitStore.unitAll();
});
</script>

<template>
  <div class="row q-pa-sm">
    <div class="col-12 q-pa-sm">
      <p class="text-h5 text-primary">Almacen</p>
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
    <modal-add v-if="storePStore.modalAdd"></modal-add>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, inject, onMounted } from 'vue';
import list from 'src/components/storeP/listPage.vue';
import modalAdd from 'src/components/storeP/modalAdd.vue';
import { useStorePStore } from 'src/stores/storeP';

const storePStore = useStorePStore();

const openModalAdd = () => {
  storePStore.manageModal(true);
};
onMounted(async () => {
  await storePStore.storeAll();
});
</script>

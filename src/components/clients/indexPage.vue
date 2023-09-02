<template>
  <div class="row q-pa-sm">
    <div class="col-12 q-pa-sm">
      <p class="text-h5 text-primary">Clientes</p>
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
    <modal-add v-if="categoryStore.modalAdd"></modal-add>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, inject, onMounted } from 'vue';
import list from 'src/components/clients/listPage.vue';
import modalAdd from 'src/components/clients/modalAdd.vue';
import { useCategoryStore } from 'src/stores/category';

const categoryStore = useCategoryStore();

const openModalAdd = () => {
  categoryStore.manageModal(true);
};
onMounted(async () => {
  await categoryStore.CategoriaAll();
});
</script>

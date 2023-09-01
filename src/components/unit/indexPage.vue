<template>
  <div class="row q-pa-sm">
    <div class="col-12 q-pa-sm">
      <p class="text-h5 text-primary">Unidad de medida</p>
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
    <modal-add v-if="unitStore.modalAdd"></modal-add>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import list from 'src/components/unit/listPage.vue';
import modalAdd from 'src/components/unit/modalAdd.vue';
import { useUnitStore } from 'src/stores/unit';

const unitStore = useUnitStore();

const openModalAdd = () => {
  unitStore.manageModal(true);
};
onMounted(async () => {
  await unitStore.unitAll();
});
</script>

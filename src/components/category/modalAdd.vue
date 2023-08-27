<template>
  <q-dialog v-model="categoryStore.modalAdd" persistent>
    <q-card style="border-radius: 8px; width: 50%">
      <q-bar class="bg-secondary text-white">
        <div>Agregar categoría</div>

        <q-space />

        <q-btn
          dense
          flat
          color="white"
          icon="close"
          @click="categoryStore.manageModal(false)"
        >
          <q-tooltip class="bg-primary">Cerrar</q-tooltip>
        </q-btn>
      </q-bar>
      <q-form @submit.prevent="addCategory()" @reset="onReset">
        <q-card-section horizontal class="q-pa-md">
          <q-input
            v-model="nameCategory"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
            class="col q-pa-sm"
            input-class="text-black"
            dense
            label="Nombre *"
            standout
            bg-color="grey-2"
          ></q-input>
          <q-input
            v-model="descripcionCategory"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
            class="col-7 q-pa-sm"
            input-class="text-black"
            dense
            label="Descripción *"
            standout
            bg-color="grey-2"
          ></q-input>
        </q-card-section>
      </q-form>

      <q-card-actions align="right">
        <q-btn color="secondary" dense no-caps padding="1px 28px 1px 28px"
          >Agregar</q-btn
        >
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useCategoryStore } from 'src/stores/category';
const categoryStore = useCategoryStore();

const nameCategory = ref(null);
const descripcionCategory = ref(null);

const addCategory = async () => {
  const params = ref({
    nombre_categoria: nameCategory,
    detalle_categoria: descripcionCategory,
    status_categoria: 'ACTIVO',
  });
  await categoryStore.CategoryAdd(params.value);
};
const onReset = () => {
  nameCategory.value = null;
  descripcionCategory.value = null;
};
</script>

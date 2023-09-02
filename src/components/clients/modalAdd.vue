<template>
  <q-dialog v-model="categoryStore.modalAdd" persistent>
    <q-card :dark="configStore.darkMode" style="border-radius: 8px; width: 50%">
      <q-bar
        :class="configStore.darkMode ? 'text-white' : 'bg-secondary text-white'"
      >
        <div>
          {{ categoryStore.modalEdit ? 'Editar' : 'Agregar' }} categoría
        </div>

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
            :label-color="configStore.darkMode ? 'dark' : ''"
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
            :label-color="configStore.darkMode ? 'dark' : ''"
            standout
            bg-color="grey-2"
          ></q-input>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            :color="configStore.darkMode ? 'dark' : 'secondary'"
            type="submit"
            dense
            no-caps
            padding="1px 28px 1px 28px"
            >{{ categoryStore.modalEdit ? 'Editar' : 'Agregar' }}</q-btn
          >
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useCategoryStore } from 'src/stores/category';
import { useConfigUserStore } from 'src/stores/configUser';
const categoryStore = useCategoryStore();
const configStore = useConfigUserStore();
const categoryShow = ref({});
const nameCategoryEdit = ref('');
const descripcionCategoryEdit = ref('');
const statusCategoryEdt = ref('');

const nameCategory = categoryStore.modalEdit ? nameCategoryEdit : ref(null);
const descripcionCategory = categoryStore.modalEdit
  ? descripcionCategoryEdit
  : ref(null);

const statusCategory = categoryStore.modalEdit
  ? statusCategoryEdt
  : ref('ACTIVO');

const addCategory = async () => {
  const params = ref({
    nombre_categoria: nameCategory,
    detalle_categoria: descripcionCategory,
    status_categoria: statusCategory,
  });
  if (categoryStore.modalEdit) {
    await categoryStore
      .CategoriaUpdate(params.value, categoryStore.editCategID.id)
      .then(() => {
        categoryStore.manageModal(false);
        categoryStore.CategoriaAll();
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    await categoryStore
      .CategoryAdd(params.value)
      .then(() => {
        categoryStore.manageModal(false);
        categoryStore.CategoriaAll();
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const updateCategoria = async () => {
  const params = ref({
    nombre_categoria: categoryStore.CategoriaId.nombre_categoria,
    detalle_categoria: categoryStore.CategoriaId.detalle_categoria,
    status_categoria: categoryStore.CategoriaId.status_categoria,
  });
  await categoryStore.CategoriaUpdate(params.value, id.value);
};

const onReset = () => {
  nameCategory.value = null;
  descripcionCategory.value = null;
};
onMounted(async () => {
  if (categoryStore.modalEdit) {
    categoryStore.editCategID;
    categoryShow.value = JSON.parse(JSON.stringify(categoryStore.editCategID));
    nameCategoryEdit.value = categoryShow.value.nombre_categoria;
    descripcionCategoryEdit.value = categoryShow.value.detalle_categoria;
    statusCategoryEdt.value = categoryShow.value.status_categoria;
    return false;
  }
});
</script>

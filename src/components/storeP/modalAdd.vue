<template>
  <q-dialog v-model="storeStore.modalAdd" persistent>
    <q-card :dark="configStore.darkMode" style="border-radius: 8px; width: 50%">
      <q-bar
        :class="configStore.darkMode ? 'text-white' : 'bg-secondary text-white'"
      >
        <div>{{ storeStore.modalEdit ? 'Editar' : 'Agregar' }} almacén</div>

        <q-space />

        <q-btn
          dense
          flat
          color="white"
          icon="close"
          @click="storeStore.manageModal(false)"
        >
          <q-tooltip class="bg-primary">Cerrar</q-tooltip>
        </q-btn>
      </q-bar>
      <q-form @submit.prevent="addStore()" @reset="onReset">
        <q-card-section horizontal class="col-12 q-pa-md">
          <q-input
            v-model="nameStore"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Campo requerido']"
            class="col-4 q-pa-sm"
            input-class="text-black"
            dense
            label="Nombre *"
            :label-color="configStore.darkMode ? 'dark' : ''"
            standout
            bg-color="grey-2"
          ></q-input>
          <q-input
            v-model="descriptionStore"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Campo requerido']"
            class="col-4 q-pa-sm"
            input-class="text-black"
            dense
            label="Descripción *"
            :label-color="configStore.darkMode ? 'dark' : ''"
            standout
            bg-color="grey-2"
          ></q-input>
          <q-input
            v-model="ubicacionStore"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Campo requerido']"
            class="col-4 q-pa-sm"
            input-class="text-black"
            dense
            label="Ubicación *"
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
            >{{ storeStore.modalEdit ? 'Editar' : 'Agregar' }}</q-btn
          >
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useStorePStore } from 'src/stores/storeP';
import { useConfigUserStore } from 'src/stores/configUser';
const storeStore = useStorePStore();
const configStore = useConfigUserStore();
const storeShow = ref({});
const nameStoreEdit = ref('');
const ubicacionStoreEdit = ref('');
const statusStoreEdt = ref('');
const descripcionStoreEdit = ref('');

const nameStore = storeStore.modalEdit ? nameStoreEdit : ref(null);
const ubicacionStore = storeStore.modalEdit ? ubicacionStoreEdit : ref(null);
const descriptionStore = storeStore.modalEdit
  ? descripcionStoreEdit
  : ref(null);
const statusStore = storeStore.modalEdit ? statusStoreEdt : ref('ACTIVO');

const addStore = async () => {
  const params = ref({
    nombre_bodega: nameStore,
    ubicacion_bodega: ubicacionStore,
    status_bodega: statusStore,
    descripcion_bodega: descriptionStore
  });
  if (storeStore.modalEdit) {
    await storeStore
      .storeUpdate(params.value, storeStore.editStoreID.id)
      .then(() => {
        storeStore.manageModal(false);
        storeStore.storeAll();
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    await storeStore
      .storeAdd(params.value)
      .then(() => {
        storeStore.manageModal(false);
        storeStore.storeAll();
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const onReset = () => {
  nameStore.value = null;
  ubicacionStore.value = null;
  descriptionStore.value = null;
};
onMounted(async () => {
  if (storeStore.modalEdit) {
    storeStore.editStoreID;
    storeShow.value = JSON.parse(JSON.stringify(storeStore.editStoreID));
    nameStoreEdit.value = storeShow.value.nombre_bodega;
    ubicacionStoreEdit.value = storeShow.value.ubicacion_bodega;
    statusStoreEdt.value = storeShow.value.status_bodega;
    descripcionStoreEdit.value = storeShow.value.descripcion_bodega;
    return false;
  }
});
</script>

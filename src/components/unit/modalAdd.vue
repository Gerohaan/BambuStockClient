<template>
  <q-dialog v-model="unitStore.modalAdd" persistent>
    <q-card :dark="configStore.darkMode" style="border-radius: 8px; width: 50%">
      <q-bar
        :class="configStore.darkMode ? 'text-white' : 'bg-secondary text-white'"
      >
        <div>
          {{ unitStore.modalEdit ? 'Editar' : 'Agregar' }} unidad de medida
        </div>

        <q-space />

        <q-btn
          dense
          flat
          color="white"
          icon="close"
          @click="unitStore.manageModal(false)"
        >
          <q-tooltip class="bg-primary">Cerrar</q-tooltip>
        </q-btn>
      </q-bar>
      <q-form @submit.prevent="addUnit()" @reset="onReset">
        <q-card-section horizontal class="col-12 q-pa-md">
          <q-input
            v-model="nameUnit"
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
            v-model="descriptionUnit"
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
            v-model="cantidadUnit"
            min="0"
            type="number"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Campo requerido']"
            class="col-4 q-pa-sm"
            input-class="text-black"
            dense
            label="Cantidad *"
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
            >{{ unitStore.modalEdit ? 'Editar' : 'Agregar' }}</q-btn
          >
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useUnitStore } from 'src/stores/unit';
import { useConfigUserStore } from 'src/stores/configUser';
const unitStore = useUnitStore();
const configStore = useConfigUserStore();
const unitShow = ref({});
const nameUnitEdit = ref('');
const cantidadUnitEdit = ref('');
const descripcionUnitEdit = ref('');
const statusUnitEdt = ref('');

const nameUnit = unitStore.modalEdit ? nameUnitEdit : ref(null);
const cantidadUnit = unitStore.modalEdit ? cantidadUnitEdit : ref(null);
const descriptionUnit = unitStore.modalEdit ? descripcionUnitEdit : ref(null);
const statusUnit = unitStore.modalEdit ? statusUnitEdt : ref('ACTIVO');

const addUnit = async () => {
  const params = ref({
    nombre_unidad: nameUnit,
    descripcion_unidad: descriptionUnit,
    cantidad_unidad: cantidadUnit,
    status_unidad: statusUnit
  });
  if (unitStore.modalEdit) {
    await unitStore
      .unitUpdate(params.value, unitStore.editUnitID.id)
      .then(() => {
        unitStore.manageModal(false);
        unitStore.unitAll();
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    await unitStore
      .unitAdd(params.value)
      .then(() => {
        unitStore.manageModal(false);
        unitStore.unitAll();
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const onReset = () => {
  nameUnit.value = null;
  cantidadUnit.value = null;
  descriptionUnit.value = null;
};
onMounted(async () => {
  if (unitStore.modalEdit) {
    unitStore.editUnitID;
    unitShow.value = JSON.parse(JSON.stringify(unitStore.editUnitID));
    nameUnitEdit.value = unitShow.value.nombre_unidad;
    cantidadUnitEdit.value = unitShow.value.cantidad_unidad;
    descripcionUnitEdit.value = unitShow.value.descripcion_unidad;
    return false;
  }
});
</script>

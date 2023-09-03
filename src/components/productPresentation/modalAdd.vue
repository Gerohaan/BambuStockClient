<template>
  <q-dialog v-model="presentationStore.modalAdd" persistent>
    <q-card :dark="configStore.darkMode" style="border-radius: 8px; width: 50%">
      <q-bar
        :class="configStore.darkMode ? 'text-white' : 'bg-secondary text-white'"
      >
        <div>
          {{ presentationStore.modalEdit ? 'Editar' : 'Agregar' }} presentación
          del producto
        </div>

        <q-space />

        <q-btn
          dense
          flat
          color="white"
          icon="close"
          @click="presentationStore.manageModal(false)"
        >
          <q-tooltip class="bg-primary">Cerrar</q-tooltip>
        </q-btn>
      </q-bar>
      <q-form @submit.prevent="addPresentation()" @reset="onReset">
        <q-card-section horizontal class="col q-pa-md">
          <div class="row q-col-gutter-md">
            <q-input
              v-model="namePresentation"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Campo requerido']"
              class="col-6 q-pa-md"
              input-class="text-black"
              dense
              label="Nombre *"
              :label-color="configStore.darkMode ? 'dark' : ''"
              standout
              bg-color="grey-2"
            ></q-input>
            <q-input
              v-model="descriptionPresentation"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Campo requerido']"
              class="col-6 q-pa-md"
              input-class="text-black"
              dense
              label="Descripción *"
              :label-color="configStore.darkMode ? 'dark' : ''"
              standout
              bg-color="grey-2"
            ></q-input>
            <q-input
              v-model="abrevPresentation"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Campo requerido']"
              class="col-6 q-pa-md"
              input-class="text-black"
              dense
              label="Abreviatura *"
              :label-color="configStore.darkMode ? 'dark' : ''"
              standout
              bg-color="grey-2"
            ></q-input>
            <div class="col-6 q-pa-md">
              <q-select
                required
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                dense
                filled
                v-model="uniPresentation"
                :options="apilista"
                :option-label="
                  apilista =>
                    apilista === null ? null : apilista.nombre_unidad
                "
                :option-value="
                  apilista => (apilista === null ? null : apilista.id)
                "
                emit-value
                map-options
                standout
                label="Unidad de medida"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="ad_units" />
                </template>
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            :color="configStore.darkMode ? 'dark' : 'secondary'"
            type="submit"
            dense
            no-caps
            padding="1px 28px 1px 28px"
            >{{ presentationStore.modalEdit ? 'Editar' : 'Agregar' }}</q-btn
          >
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useProductPresentationStore } from 'src/stores/productPresentation';
import { useConfigUserStore } from 'src/stores/configUser';
import { useUnitStore } from 'src/stores/unit';
const unitStore = useUnitStore();
const presentationStore = useProductPresentationStore();
const configStore = useConfigUserStore();
const presentationShow = ref({});
const namePresentationEdit = ref('');
const uniPresentationEdit = ref('');
const abrevPresentationEdit = ref('');
const descripcionPresentationEdit = ref('');
const statusPresentationEdt = ref('');
const apilista = computed(() => unitStore.unit);
const namePresentation = presentationStore.modalEdit
  ? namePresentationEdit
  : ref(null);
const descriptionPresentation = presentationStore.modalEdit
  ? descripcionPresentationEdit
  : ref(null);
const uniPresentation = presentationStore.modalEdit
  ? uniPresentationEdit
  : ref(null);
const abrevPresentation = presentationStore.modalEdit
  ? abrevPresentationEdit
  : ref(null);
const statusPresentation = presentationStore.modalEdit
  ? statusPresentationEdt
  : ref('ACTIVO');

const addPresentation = async () => {
  const params = ref({
    nombre_present: namePresentation,
    descripcion_present: descriptionPresentation,
    unidadMedidadId: uniPresentation,
    abreviatura_present: abrevPresentation,
    status_present: statusPresentation
  });
  if (presentationStore.modalEdit) {
    await presentationStore
      .presentationUpdate(params.value, presentationStore.editPresentationID.id)
      .then(() => {
        presentationStore.manageModal(false);
        presentationStore.presentationAll();
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    await presentationStore
      .presentationAdd(params.value)
      .then(() => {
        presentationStore.manageModal(false);
        presentationStore.presentationAll();
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const onReset = () => {
  namePresentation.value = null;
  descriptionPresentation.value = null;
  uniPresentation.value = null;
  abrevPresentation.value = null;
};
onMounted(async () => {
  if (presentationStore.modalEdit) {
    presentationStore.editPresentationID;
    presentationShow.value = JSON.parse(
      JSON.stringify(presentationStore.editPresentationID)
    );
    namePresentationEdit.value = presentationShow.value.nombre_present;
    descripcionPresentationEdit.value =
      presentationShow.value.descripcion_present;
    uniPresentationEdit.value = presentationShow.value.unidadMedidadId;
    abrevPresentationEdit.value = presentationShow.value.abreviatura_present;
    return false;
  }
});
</script>

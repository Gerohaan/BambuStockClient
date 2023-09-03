<template>
  <q-dialog v-model="paymentStore.modalAdd" persistent>
    <q-card :dark="configStore.darkMode" style="border-radius: 8px; width: 50%">
      <q-bar
        :class="configStore.darkMode ? 'text-white' : 'bg-secondary text-white'"
      >
        <div>
          {{ paymentStore.modalEdit ? 'Editar' : 'Agregar' }} forma de pago
        </div>

        <q-space />

        <q-btn
          dense
          flat
          color="white"
          icon="close"
          @click="paymentStore.manageModal(false)"
        >
          <q-tooltip class="bg-primary">Cerrar</q-tooltip>
        </q-btn>
      </q-bar>
      <q-form @submit.prevent="addPayment()" @reset="onReset">
        <q-card-section horizontal class="col q-pa-md">
          <q-input
            v-model="namePayment"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Campo requerido']"
            class="col-6 q-pa-sm"
            input-class="text-black"
            dense
            label="Nombre *"
            :label-color="configStore.darkMode ? 'dark' : ''"
            standout
            bg-color="grey-2"
          ></q-input>
          <q-input
            v-model="descriptionPayment"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Campo requerido']"
            class="col-6 q-pa-sm"
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
            >{{ paymentStore.modalEdit ? 'Editar' : 'Agregar' }}</q-btn
          >
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { usePaymentStore } from 'src/stores/payment';
import { useConfigUserStore } from 'src/stores/configUser';
const paymentStore = usePaymentStore();
const configStore = useConfigUserStore();
const paymentShow = ref({});
const namePaymentEdit = ref('');
const descripcionPaymentEdit = ref('');
const statusPaymentEdt = ref('');

const namePayment = paymentStore.modalEdit ? namePaymentEdit : ref(null);
const descriptionPayment = paymentStore.modalEdit
  ? descripcionPaymentEdit
  : ref(null);
const statusPayment = paymentStore.modalEdit ? statusPaymentEdt : ref('ACTIVO');

const addPayment = async () => {
  const params = ref({
    nombre_pago: namePayment,
    descripcion_pago: descriptionPayment,
    status_pago: statusPayment
  });
  if (paymentStore.modalEdit) {
    await paymentStore
      .paymentUpdate(params.value, paymentStore.ediPaymentID.id)
      .then(() => {
        paymentStore.manageModal(false);
        paymentStore.paymentAll();
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    await paymentStore
      .paymentAdd(params.value)
      .then(() => {
        paymentStore.manageModal(false);
        paymentStore.paymentAll();
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const onReset = () => {
  namePayment.value = null;
  descriptionPayment.value = null;
};
onMounted(async () => {
  if (paymentStore.modalEdit) {
    paymentStore.ediPaymentID;
    paymentShow.value = JSON.parse(JSON.stringify(paymentStore.ediPaymentID));
    namePaymentEdit.value = paymentShow.value.nombre_pago;
    descripcionPaymentEdit.value = paymentShow.value.descripcion_pago;
    return false;
  }
});
</script>

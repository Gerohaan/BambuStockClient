<template>
  <div class="row q-pa-sm">
    <div class="col-12 q-pa-md">
      <q-table
        class="text-weight-regular"
        :rows="payment"
        :columns="columns"
        row-key="name"
        :filter="filter"
      >
        <template v-slot:top-right>
          <q-input
            outlined
            dense
            debounce="300"
            v-model="filter"
            placeholder="Busqueda..."
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" auto-width>
              {{ props.row.nombre_pago }}
            </q-td>
            <q-td key="description" auto-width>
              {{ props.row.descripcion_pago }}
            </q-td>
            <q-td key="actions" class="text-center" auto-width>
              <q-btn
                size="sm"
                flat
                icon="edit"
                dense
                padding="none"
                color="primary"
                round
                @click="openModalAdd(props.row)"
              ></q-btn>
              <q-btn
                size="sm"
                flat
                icon="delete"
                dense
                padding="none"
                color="primary"
                round
                @click="confirmDelete(props.row.id)"
              ></q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, inject } from 'vue';
import { Notify } from 'quasar';
import { usePaymentStore } from 'src/stores/payment';
const swal = inject('$swal');

const paymentStore = usePaymentStore();
const filter = ref('');
const payment = computed(() => paymentStore.payment);

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: (row) => row.nombre_pago,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'description',
    align: 'left',
    label: 'Descripción',
    field: (row) => row.descripcion_pago,
    sortable: true,
  },
  {
    name: 'actions',
    align: 'center',
    label: 'Acciones',
    field: '',
    sortable: true,
  },
];
const openModalAdd = (row = {}) => {
  paymentStore.manageModal(true, true, row);
};
const confirmDelete = (id = 1) => {
  swal
    .fire({
      title: '¿Esta seguro?',
      text: 'Eliminará el tipo de pago seleccionado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8dbc5c',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    })
    .then((result) => {
      if (result.isConfirmed) {
        deletePayment(id);
      }
    });
};
const deletePayment = async (id = 1) => {
  try {
    await paymentStore.paymentDelete(id);
    swal.fire('Eliminado!', 'El tipo de pago ha sido eliminado.', 'success');
  } catch (error) {
    Notify.create({
      type: 'warning',
      message: 'Error al intentar eliminar el tipo de pago',
      color: 'warning',
      position: 'bottom-right',
    });
  }
  await paymentStore.paymentAll();
};
</script>

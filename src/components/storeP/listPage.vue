<template>
  <div class="row q-pa-sm">
    <div class="col-12 q-pa-md">
      <q-table
        class="text-weight-regular"
        :rows="stores"
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
              {{ props.row.nombre_bodega }}
            </q-td>
            <q-td key="ubicacion" auto-width>
              {{ props.row.ubicacion_bodega }}
            </q-td>
            <q-td key="status" auto-width>
              {{ props.row.status_bodega }}
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
import { useStorePStore } from 'src/stores/storeP';
const swal = inject('$swal');

const storePStore = useStorePStore();
const filter = ref('');
const stores = computed(() => storePStore.store);

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: row => row.nombre_bodega,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'ubicacion',
    align: 'left',
    label: 'Ubicación',
    field: row => row.ubicacion_bodega,
    sortable: true
  },
  {
    name: 'status',
    align: 'left',
    label: 'Estatus',
    field: row => row.status_bodega,
    sortable: true
  },
  {
    name: 'actions',
    align: 'center',
    label: 'Acciones',
    field: '',
    sortable: true
  }
];
const openModalAdd = (row = {}) => {
  storePStore.manageModal(true, true, row);
};
const confirmDelete = (id = 1) => {
  swal
    .fire({
      title: '¿Esta seguro?',
      text: 'Eliminará el Almacen seleccionado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8dbc5c',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    })
    .then(result => {
      if (result.isConfirmed) {
        deleteStore(id);
      }
    });
};
const deleteStore = async (id = 1) => {
  try {
    await storePStore.storeDelete(id);
    swal.fire('Eliminada!', 'El almacen ha sido eliminado.', 'success');
  } catch (error) {
    Notify.create({
      type: 'warning',
      message: 'Error al intentar eliminar el Almacen',
      color: 'warning',
      position: 'bottom-right'
    });
  }
  await storePStore.storeAll();
};
</script>

<template>
  <div class="row q-pa-sm">
    <div class="col-12 q-pa-md">
      <q-table
        class="text-weight-regular"
        :rows="presentation"
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
              {{ props.row.nombre_present }}
            </q-td>
            <q-td key="uni" auto-width>
              {{ props.row.UnidadMedidad.nombre_unidad }}
            </q-td>
            <q-td key="abrev" auto-width>
              {{ props.row.abreviatura_present }}
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
import { useProductPresentationStore } from 'src/stores/productPresentation';
const swal = inject('$swal');

const presentationStore = useProductPresentationStore();
const filter = ref('');
const presentation = computed(() => presentationStore.presentation);

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: row => row.nombre_present,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'uni',
    align: 'left',
    label: 'Unidad de medida',
    field: row => row.UnidadMedidad.nombre_unidad,
    sortable: true
  },
  {
    name: 'abrev',
    align: 'left',
    label: 'Abreviatura',
    field: row => row.abreviatura_present,
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
  presentationStore.manageModal(true, true, row);
};
const confirmDelete = (id = 1) => {
  swal
    .fire({
      title: '¿Esta seguro?',
      text: 'Eliminará la presentación del producto seleccionada',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8dbc5c',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    })
    .then(result => {
      if (result.isConfirmed) {
        deletePresentation(id);
      }
    });
};
const deletePresentation = async (id = 1) => {
  try {
    await presentationStore.presentationDelete(id);
    swal.fire(
      'Eliminado!',
      'La presentación del producto ha sido eliminada.',
      'success'
    );
  } catch (error) {
    Notify.create({
      type: 'warning',
      message: 'Error al intentar eliminar la presentación del producto',
      color: 'warning',
      position: 'bottom-right'
    });
  }
  await presentationStore.presentationAll();
};
</script>

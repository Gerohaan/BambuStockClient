<template>
  <div class="row q-pa-sm">
    <div class="col-12 q-pa-md">
      <q-table
        class="text-weight-regular"
        :rows="unit"
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
              {{ props.row.nombre_unidad }}
            </q-td>
            <q-td key="description" auto-width>
              {{ props.row.descripcion_unidad }}
            </q-td>
            <q-td key="cantidad" auto-width>
              {{ props.row.cantidad_unidad }}
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
import { useUnitStore } from 'src/stores/unit';
const swal = inject('$swal');

const unitStore = useUnitStore();
const filter = ref('');
const unit = computed(() => unitStore.unit);

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: row => row.nombre_unidad,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'description',
    align: 'left',
    label: 'Descripción',
    field: row => row.descripcion_unidad,
    sortable: true
  },
  {
    name: 'cantidad',
    align: 'left',
    label: 'Cantidad',
    field: row => row.cantidad_unidad,
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
  unitStore.manageModal(true, true, row);
};
const confirmDelete = (id = 1) => {
  swal
    .fire({
      title: '¿Esta seguro?',
      text: 'Eliminará la unidad de medida seleccionado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8dbc5c',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    })
    .then(result => {
      if (result.isConfirmed) {
        deleteUnit(id);
      }
    });
};
const deleteUnit = async (id = 1) => {
  try {
    await unitStore.unitDelete(id);
    swal.fire(
      'Eliminado!',
      'La unidad de medida ha sido eliminado.',
      'success'
    );
  } catch (error) {
    Notify.create({
      type: 'warning',
      message: 'Error al intentar eliminar la unidad de medida',
      color: 'warning',
      position: 'bottom-right'
    });
  }
  await unitStore.unitAll();
};
</script>

<template>
  <div class="row q-pa-sm">
    <div class="col-12 q-pa-md">
      <q-table
        class="text-weight-regular"
        :rows="categories"
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
            <q-td key="names" auto-width>
              {{ props.row.nombre_categoria }}
            </q-td>
            <q-td key="document" auto-width>
              {{ props.row.detalle_categoria }}
            </q-td>
            <q-td key="phone" auto-width>
              {{ props.row.detalle_categoria }}
            </q-td>
            <q-td key="status" auto-width>
              {{ props.row.status_categoria }}
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
import { useCategoryStore } from 'src/stores/category';
const swal = inject('$swal');

const categoryStore = useCategoryStore();
const filter = ref('');
const categories = computed(() => categoryStore.Categoria);

const columns = [
  {
    name: 'names',
    required: true,
    label: 'Nombres',
    align: 'left',
    field: (row) => row.nombre_categoria,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'document',
    align: 'left',
    label: 'Documento de identidad',
    field: (row) => row.detalle_categoria,
    sortable: true,
  },
  {
    name: 'phone',
    align: 'left',
    label: 'Teléfono',
    field: (row) => row.detalle_categoria,
    sortable: true,
  },
  {
    name: 'status',
    align: 'left',
    label: 'Estatus',
    field: (row) => row.status_categoria,
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
  categoryStore.manageModal(true, true, row);
};
const confirmDelete = (id = 1) => {
  swal
    .fire({
      title: '¿Esta seguro?',
      text: 'Eliminará la categoría seleccionada',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8dbc5c',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    })
    .then((result) => {
      if (result.isConfirmed) {
        deleteCategoria(id);
      }
    });
};
const deleteCategoria = async (id = 1) => {
  try {
    await categoryStore.CategoriaDelete(id);
    swal.fire('Eliminada!', 'La categoría ha sido eliminada.', 'success');
  } catch (error) {
    Notify.create({
      type: 'warning',
      message: 'Error al intentar eliminar la categoria',
      color: 'warning',
      position: 'bottom-right',
    });
  }
  await categoryStore.CategoriaAll();
};
</script>

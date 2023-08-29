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
            <q-td key="name" auto-width>
              {{ props.row.nombre_categoria }}
            </q-td>
            <q-td key="description" auto-width>
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
              ></q-btn>
              <q-btn
                size="sm"
                flat
                icon="delete"
                dense
                padding="none"
                color="primary"
                round
                @click="deleteCategoria(props.row.id)"
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
import { useCategoryStore } from 'src/stores/category';

const categoryStore = useCategoryStore();
const filter = ref('');
const categories = computed(() => categoryStore.Categoria);

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: (row) => row.nombre_categoria,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'description',
    align: 'left',
    label: 'Descripción',
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

const deleteCategoria = async (id = 1) => {
  await categoryStore.CategoriaDelete(id);
  await categoryStore.CategoriaAll();
};
</script>

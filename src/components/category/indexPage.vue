<template>
  <div class="row q-pa-sm">
    <div class="col-12 q-pa-sm">
      <p class="text-h5 text-primary">Categorias</p>
    </div>
    <div class="col-12 q-pl-md q-pr-md" align="right">
      <q-btn
        icon="add"
        color="primary"
        @click="openModalAdd()"
        dense
        round
      ></q-btn>
    </div>
    <div class="col-12">
      <list></list>
    </div>
    <modal-add v-if="categoryStore.modalAdd"></modal-add>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, inject } from 'vue';
import { Todo, Meta } from '../models';
import list from 'src/components/category/listPage.vue';
import modalAdd from 'src/components/category/modalAdd.vue';
import { useCategoryStore } from 'src/stores/category';
const categoryStore = useCategoryStore();
const swal = inject('$swal');
interface Props {
  title: string;
  todos?: Todo[];
  meta: Meta;
  active: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  todos: () => [],
});

const options = {
  chart: {
    id: 'vuechart-example',
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
    },
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
  colors: ['#4caf50'],
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
};
const series = [
  {
    name: 'series-1',
    data: [30, 40, 45, 50, 49, 60, 70, 91],
  },
];

const seriesD = [44, 55, 41, 17, 15];

const seriesL = [
  {
    data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
  },
];

const optionsD = {
  chart: {
    type: 'donut',
    toolbar: {
      show: false,
    },
  },
  colors: ['#4caf50'],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
};

const optionsL = {
  chart: {
    type: 'bar',
    height: 350,
    toolbar: {
      show: false,
    },
  },
  colors: ['#4caf50'],
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [
      'Categoria 1',
      'Categoria 2',
      'Categoria 3',
      'Categoria 4',
      'Categoria 5',
      'Categoria 6',
      'Categoria 7',
      'Categoria 8',
      'Categoria 9',
      'Categoria 10',
    ],
  },
};

function showAlert() {
  swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    footer: '<a href="">Why do I have this issue?</a>',
  });
}
const openModalAdd = () => {
  categoryStore.manageModal(true);
};
const clickCount = ref(0);
function increment() {
  clickCount.value += 1;
  return clickCount.value;
}

const todoCount = computed(() => props.todos.length);
</script>

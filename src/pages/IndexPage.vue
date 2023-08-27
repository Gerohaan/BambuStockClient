<template>
  <q-page class="flex-center q-pa-md">
    <div class="row">
      <div class="col q-pa-md">
        <q-parallax>
          <div class="column items-center" style="">
            <q-icon name="compost" color="green-6" size="200px"></q-icon>
            <div class="text-h3 text-green-6 text-center">Bambú Stock</div>
            <div class="text-h6 text-green-6 text-center">v1.1</div>
          </div>
        </q-parallax>
      </div>
      <div class="col-4 q-pa-md">
        <q-form @submit.prevent="login()">
          <q-card class="q-pa-md shadow-2" bordered style="margin-top: 20%">
            <q-card-section class="text-center">
              <div class="text-primary text-h5 text-weight-bold">
                Iniciar sesión
              </div>
              <div class="text-primary">
                Inicie sesión a continuación para acceder a su cuenta
              </div>
            </q-card-section>
            <q-card-section>
              <q-input
                dense
                input-class="text-black"
                standout
                bg-color="grey-2"
                color="primary"
                v-model="email"
                label="Correo electrónico"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
              ></q-input>
              <q-input
                dense
                input-class="text-black"
                standout
                bg-color="grey-2"
                class="q-mt-md"
                v-model="password"
                type="password"
                label="Contraseña"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
              ></q-input>
            </q-card-section>
            <q-card-section>
              <q-btn
                style="border-radius: 8px"
                color="primary"
                type="submit"
                rounded
                size="md"
                label="Acceder"
                no-caps
                class="full-width"
              ></q-btn>
            </q-card-section>
            <q-card-section class="text-center q-pt-none">
              <div class="text-primary">
                ¿Aún no tienes una cuenta?
                <a
                  href="#"
                  class="text-primary text-weight-bold"
                  style="text-decoration: none"
                  >Contáctanos.</a
                >
              </div>
            </q-card-section>
          </q-card>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUsersStore } from 'src/stores/users';
const usersStore = useUsersStore();
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';
const router = useRouter();

const loading = ref(false);
const email = ref('');
const password = ref('');

const login = async () => {
  loading.value = true;
  const params = ref({
    usuario: email,
    password: password,
  });
  await usersStore
    .userLogin(params.value)
    .then(() => router.push('/app'))
    .catch((error) => {
      Notify.create({
        type: 'danger',
        message: error,
        color: 'negative',
        position: 'bottom-right',
        icon: 'warning',
      });
    });
  loading.value = false;
};
</script>

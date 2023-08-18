import { boot } from 'quasar/wrappers';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
const VueSweetalert2Use = VueSweetalert2;
export default boot(async ({ app }) => {
  app.use(VueSweetalert2);
});

export { VueSweetalert2Use };

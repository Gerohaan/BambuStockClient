import { boot } from 'quasar/wrappers';
import VueApexCharts from 'vue3-apexcharts';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
const VueApexChartsUse = VueApexCharts;
export default boot(async ({ app }) => {
  app.use(VueApexChartsUse);
});

export { VueApexChartsUse };

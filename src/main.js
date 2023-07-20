import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import VueMobileDetection from 'vue-mobile-detection'

createApp(App).use(Quasar, quasarUserOptions).use(store).use(router).use(VueMobileDetection).mount('#app')

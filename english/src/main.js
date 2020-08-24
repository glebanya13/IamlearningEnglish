import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebaseConfig from './config/firebase'
import firebase from 'firebase'
import 'firebase/firestore'
import VuetifyConfirm from 'vuetify-confirm'
import VueYouTubeEmbed from 'vue-youtube-embed'
import FormattedDate from './filters/formattedDate'
import { setupBus } from './infrastructure/eventBus'

Vue.use(VueYouTubeEmbed)

Vue.config.productionTip = false

Vue.use(VuetifyConfirm, {
  vuetify,
  buttonTrueText: 'Да',
  buttonFalseText: 'Нет',
  width: 350,
  property: '$confirm'
})

Vue.filter('formattedDate', FormattedDate)

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore()


Vue.$db = db

setupBus()

firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created(){
    let vm = this
    firebase.auth().onAuthStateChanged(function(user) {
      vm.$store.dispatch('STATE_CHANGED', user)
    });
    
    this.$store.dispatch('LOAD_BOOKS')
  }
}).$mount('#app')

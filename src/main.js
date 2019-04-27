import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state));
});

new Vue({
  store,
  beforeCreate() {
    this.$store.commit('initializeStore');
  },
  render: h => h(App)
}).$mount('#app')

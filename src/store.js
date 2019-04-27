import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Settings
    settings: {
      quoteFont: 'Source Serif Pro',
      authorFont: 'Source Sans Pro',
      alwaysShowTopSites: false,
      showBackgroundImage: true,
      autoRefreshQuote: false,
      backgroundColor: "#34495e",
      fontColor: "#ecf0f1"
    },

    // Available Fonts
    availableFonts: [
        "Abril Fatface",
        "Alegreya",
        "Alegreya Sans",
        "Anonymous Pro",
        "Archivo Narrow",
        "Arial",
        "Arvo",
        "Bitter",
        "Cabin",
        "Cardo",
        "Chivo",
        "Cormorant",
        "Crimson Text",
        "Domine",
        "Eczar",
        "Fira Sans",
        "Inconsolata",
        "Karla",
        "Libre Baskerville",
        "Libre Franklin",
        "Lato",
        "Lora",
        "Merriweather",
        "Montserrat",
        "Neuton",
        "Open Sans",
        "Playfair Display",
        "Poppins",
        "Proza Libre",
        "PT Sans",
        "PT Serif",
        "Source Sans Pro",
        "Source Serif Pro",
        "Space Mono",
        "Spectral",
        "Raleway",
        "Roboto",
        "Roboto Slab",
        "Rubik",
        "Work Sans",
    ],

    // Quote Model
    quote: null,
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('store')) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')))
        );
      }
    },
    updateSettings(state, payload) {
      state.settings[payload.setting] = payload.value;
    },
    setQuote(state, payload) {
      state.quote = payload;
    }
  }
});

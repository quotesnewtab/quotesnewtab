<template>
  <div id="app">
    <header>
      <!--<ShareQuote />-->
    </header>

    <Quote />
    <Settings />

    <footer>
      <div>

      </div>

      <a href="https://quotesnewtab.com/submit">Want to submit a quote?</a>
    </footer>
  </div>
</template>

<script>
import Quote from './components/Quote.vue'
import Settings from './components/Settings.vue'

export default {
  name: 'app',
  components: {
    Quote,
    Settings
  },
  methods: {
    setCssVariables() {
      const settings = this.$store.state.settings;

      document.documentElement.style.setProperty('--background-color', settings.backgroundColor)
      document.documentElement.style.setProperty('--font-color', settings.fontColor);
      document.documentElement.style.setProperty('--quote-font', settings.quoteFont);
      document.documentElement.style.setProperty('--author-font', settings.authorFont);
    }
  },
  beforeMount() {
    this.setCssVariables();
  }
}
</script>

<style lang="scss">
@import '@/scss/reset.scss';

* {
  box-sizing: border-box;
}

body {
  background: var(--background-color);
  color: var(--font-color);
  font-family: var(--base-font);
  height: 100vh;
  margin: 0;
  overflow: hidden;
  width: 100vw;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
}

header, footer {
  align-items: center;
  display: flex;
  height: 75px;
  justify-content: space-between;
  opacity: 0.25;
  padding: 0 25px;
  position: absolute;
  transition: opacity 0.25s ease;
  width: 100%;
  z-index: 2;

  &:hover {
    opacity: 1;
  }
}

a {
  border-bottom: 2px solid transparent;
  color: var(--font-color);
  font-weight: 600;
  padding: 0 1px 2px;
  text-decoration: none;
  transition: border-color 0.25s ease;

  &:hover {
    border-color: var(--font-color);
  }
}

header {
  top: 0;
}

footer {
  bottom: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

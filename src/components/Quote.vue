<template>
  <transition name="fade">
    <div id="quote-component" v-if="quote">
      <div id="quote-wrapper">
        <h1 id="quote">{{ quote.quote }}</h1>
        <h3 id="author">{{ quote.author }}</h3>
      </div>
      <div v-if="showBackgroundImage" id="img" :style="{ 'background-image': quote.img }"></div>
    </div>
  </transition>
</template>

<script>
const axios = require("axios");

export default {
  name: 'Quote',
  computed: {
    quote() {
      return this.$store.state.quote;
    },
    showBackgroundImage() {
      return this.$store.state.settings.showBackgroundImage;
    }
  },
  mounted() {
    this.getQuote();
  },
  methods: {
    getQuote() {
      axios
        .get(`${ process.env.VUE_APP_BASE_API_URL }quotes/random`)
        .then(response => {
          let quote = {
            id: response.data.id,
            author: response.data.author,
            quote: response.data.quote,
            submitter: response.data.submitter,
            img: response.data.img || this.getAuthorImageUrl(response.data.author),
          }
          this.$store.commit('setQuote', quote)
        });
    },
    getAuthorImageUrl(author) {
      return `url("${ process.env.VUE_APP_BASE_AUTHOR_IMG_URL + author.toLowerCase().replace(/\s+/g, "-").replace(/[, .]+/g, "") }.jpg")`
    }
  }
}
</script>

<style lang="scss" scoped>
#quote-component {
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;
}

#quote-wrapper {
  color: var(--font-color);
  max-width: 70%;
  position: relative;
  text-align: left;
  z-index: 10;

  #quote {
    font-family: var(--quote-font);
    font-size: 3vw;
    font-weight: 900;
    line-height: 1.4;
    margin-bottom: 30px;
  }

  #author {
    font-family: var(--author-font);
    font-size: 20px;

    &::before {
      content: '\2014';
      margin-right: 6px;
    }
  }
}

#img {
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  left: 0;
  opacity: 0.25;
  position: absolute;
  top: 0;
  width: 100vw;
  z-index: 1;
}
</style>

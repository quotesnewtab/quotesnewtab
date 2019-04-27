<template>
  <div id="settings" v-if="show">
    <label for="quoteFont">Quote Font</label>
    <!--<v-select inputId="quoteFont" :value="quoteFont" @input="updateSettings" :options="availableFonts" :clearable="false"></v-select>-->

    <label for="authorFont">Author Font</label>
    <!--<v-select inputId="authorFont" :value="authorFont" @input="updateSettings" :options="availableFonts" :clearable="false"></v-select>-->

    <div class="toggle-row">
      <label for="alwaysShowTopSites">Always show top sites</label>
      <ToggleButton id="alwaysShowTopSites" :value="alwaysShowTopSites" @input="updateSettings" />
    </div>

    <div class="toggle-row">
      <label for="showBackgroundImage">Show background image</label>
      <ToggleButton id="showBackgroundImage" :value="showBackgroundImage" @input="updateSettings" />
    </div>

    <div class="toggle-row">
      <label for="autoRefreshQuote">Auto-refresh new quotes</label>
      <ToggleButton id="autoRefreshQuote" :value="autoRefreshQuote" @input="updateSettings" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ToggleButton from './ToggleButton.vue'

export default {
  name: 'Settings',
  components: {
    ToggleButton
  },
  data() {
    return {
      show: true
    }
  },
  computed: {
    ...mapState({
      // Settings
      quoteFont:            state => state.settings.quoteFont,
      authorFont:           state => state.settings.authorFont,
      alwaysShowTopSites:   state => state.settings.alwaysShowTopSites,
      showBackgroundImage:  state => state.settings.showBackgroundImage,
      autoRefreshQuote:     state => state.settings.autoRefreshQuote,
      backgroundColor:      state => state.settings.backgroundColor,
      fontColor:            state => state.settings.fontColor,

      // Available Fonts
      availableFonts:       state => state.availableFonts
    })
  },
  methods: {
    updateSettings(e) {
      console.log({e});
      if (e.target.type !== 'checkbox') {
        this.$store.commit('updateSettings', { setting: e.target.id, value: e.target.value });
      } else {
        this.$store.commit('updateSettings', { setting: e.target.id, value: e.target.checked });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#settings {
  background: white;
  bottom: 20px;
  left: 20px;
  padding: 15px;
  position: absolute;
  text-align: left;
  z-index: 11;

  label {
    display: inline-block;
    font-size: 14px;
    font-weight: 600;
    margin: 0 0 2px 2px;
  }

  .toggle-row {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin: 15px 0 0;
  }
}
</style>

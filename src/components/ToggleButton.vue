<template>
  <div class="toggle-button">
    <input type="checkbox" :id="id" :checked="value" @input="$emit('input', $event)">
    <label :for="id" class="toggle"></label>
  </div>
</template>

<script>
export default {
  name: 'ToggleButton',
  props: ['id', 'value']
}
</script>

<style lang="scss" scoped>
input[type=checkbox] {
  height: 0;
  visibility: hidden;
  width: 0;

  &:checked + label {
    background: #2ecc71;
  }

  &:checked + label::after {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }
}

.toggle {
  $size: 16px;

  background: gray;
  border-radius: $size;
  cursor: pointer;
  display: block;
  text-indent: -9999px;
  height: $size;
  margin-top: 0;
  position: relative;
  width: #{ $size * 2 };

  &::after {
    $toggle-after-size: 12px;

    background: #fff;
    border-radius: $toggle-after-size;
    content: '';
    height: $toggle-after-size;
    left: 2px;
    position: absolute;
    top: 2px;
    transition: 0.3s;
    width: $toggle-after-size;
  }

  &:active:after {
    width: 18px;
  }
}
</style>

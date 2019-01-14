<template>
  <div class="button-wrapper">
    <button :style="`width: ${width};`" :disabled="disabled" @click="$emit('click')">{{value}}</button>
  </div>
</template>

<script>
export default {
  name: "mrButton",
  props: {
    width: String,
    value: String,
    disabled: String
  }
};
</script>

<style lang="scss" scoped>
.button-wrapper {
  -webkit-app-region: no-drag;
  display: inline-block;
  position: relative;
  font-family: "Source Sans Pro", sans-serif;

  button {
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 10px 22px;
    background-color: rgb(30, 39, 46);
    border-radius: 90px;
    color: rgb(211, 209, 209);
    font-family: "Source Sans Pro", sans-serif;
    cursor: pointer;
    overflow: hidden;
    display: inline-block;
    position: relative;

    &::after {
      content: "";
      height: 220%;
      width: 35%;
      position: absolute;
      z-index: 1;
      right: 0;
      top: 10%;
      margin: -5px 0 0 -5px;
      -webkit-transform-origin: 0 0;
      -webkit-transform: rotate(-20deg);
      -moz-transform-origin: 0 0;
      -moz-transform: rotate(-20deg);
      -ms-transform-origin: 0 0;
      -ms-transform: rotate(-20deg);
      transform-origin: 0 0;
      transform: rotate(-20deg);
      transition: all 0.3s ease-in-out;
      background: rgba(255, 255, 255, 0.02);
    }

    &:hover {
      color: #fff;

      &::after {
        width: 50%;
        background: rgba(255, 255, 255, 0.05);
      }
    }
  }
}
</style>

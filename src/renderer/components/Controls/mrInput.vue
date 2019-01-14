<template>
  <div class="input-wrapper">
    <label>{{label}}</label>
    <input
      :style="`width: ${width};`"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      v-model="content"
      @input="$emit('input', content)"
    >
  </div>
</template>

<script>
export default {
  name: "mrInput",
  props: {
    width: String,
    type: String,
    label: String,
    placeholder: String,
    disabled: String,
    value: String
  },
  data() {
    return {
      content: this.value
    };
  }
};
</script>

<style lang="scss" scoped>
.input-wrapper {
  display: inline-block;
  position: relative;
  font-family: "Source Sans Pro", sans-serif;

  label {
    position: absolute;
    background-color: rgb(30, 39, 46);
    color: white;
    font-size: 12px;
    top: -7px;
    left: 15px;
    padding: 0 8px;
  }
  input {
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 10px 22px;
    background-color: transparent;
    border-radius: 90px;
    color: white;
    font-family: "Source Sans Pro", sans-serif;

    &::-webkit-input-placeholder {
      color: rgba(255, 255, 255, 0.8);
      font-family: "Source Sans Pro", sans-serif;
      font-size: 13px;
    }
  }
}
</style>

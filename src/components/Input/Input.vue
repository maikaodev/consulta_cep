<template>
  <input :type="type" :value="value" />
</template>
<script>
export default {
  name: "AppInput",
  props: {
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: String,
      default: "",
    },
  },
};
</script>

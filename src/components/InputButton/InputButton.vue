<template>
  <input type="submit" :value="value" />
</template>
<script>
export default {
  name: "InputButton",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
};
</script>
<style></style>

<template>
  <span :class="classType" class="form-message">
    <span v-show="type === 'error'" class="ltk-error"></span>
    <span v-show="type === 'success'" class="ltk-success"></span>
    {{ message }}
  </span>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'error'
    },
    message: {
      type: String,
      required: true,
      default: 'Message'
    }
  },
  computed: {
    classType() {
      return `form-${this.type}-msg`
    }
  }
}
</script>

<style lang="scss" scoped>
.form-message {
  color: $danger;
  font-size: 12px;
}
</style>

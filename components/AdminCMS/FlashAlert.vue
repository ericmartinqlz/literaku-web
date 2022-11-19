<template>
  <div class="flash-alert" :class="type">
    <p class="mb-0">{{ message }}</p>
    <span class="ltk-icon-close" @click="$nuxt.$emit('unsetAlert')"></span>
  </div>
</template>

<script>
export default {
  name: 'AdminCMSFlashAlert',
  props: {
    type: {
      type: [String, null],
      default: 'success'
    },
    message: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.flash-alert {
  position: fixed;
  width: 100%;
  top: 60px;

  display: flex;
  justify-content: space-between;
  padding: 24px;

  @media #{$medium} {
    width: calc(100% - 250px);
    top: 75px;
  }

  & p {
    flex: 1;
    text-align: center;
  }

  & .ltk-icon-close {
    cursor: pointer;
    opacity: 0.5;

    &:hover {
      opacity: 0.8;
    }
  }

  &.success {
    background: $success;
    color: $white;
  }
  &.danger {
    background: $danger;
    color: $white;
  }
}
</style>

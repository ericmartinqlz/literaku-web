<template>
  <header>
    <div class="container d-flex h-full items-center">
      <button class="hamburger" @click="$emit('hamburger')">
        <span class="icon ltk-icon-hamburger"></span>
      </button>

      <div class="mb-0 ml-auto">USER001</div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AdminCMSHeader',
}
</script>

<style lang="scss" scoped>
.header {
  box-shadow: $shadow;
  background: $white;
  height: 60px;

  @media #{$medium} {
    height: 75px;
  }
}

.hamburger {
  display: flex;
  height: 100%;
  width: 40px;
  align-items: center;

  border: none;
  background: none;

  & > .icon {
    font-size: 24px;
  }

  @media #{$medium} {
    display: none;
  }
}
</style>

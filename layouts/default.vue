<template>
  <div id="app" class="app">
    <Header />
    <nuxt class="app-content"/>
    <Footer />
  </div>
</template>

<script>
  export default {
    name: 'DefaultLayout',
  }
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.app-content {
  flex: 1;
}
</style>
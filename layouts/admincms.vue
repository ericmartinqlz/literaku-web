<template>
  <div id="app" class="app">
    <Header />

    <div class="app-content">
      <AdminCMSSidenav />
      <nuxt/>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'AdminCMSLayout',
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
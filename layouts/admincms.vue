<template>
  <div id="app" class="app">
    <AdminCMSSidenav class="sidenav"/>

    <div class="--pushed">
      <AdminCMSHeader class="header"/>
      <nuxt class="app-content"/>
      <AdminCMSFooter class="footer"/>
    </div>
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
}

.sidenav {
  position: fixed;
  width: 250px;
  height: 100%;
  overflow-y: auto;
}

.--pushed {
  display: flex;
  flex-direction: column;
  margin-left: 250px;

  & > .app-content {
    flex: 1;
  }
}
</style>
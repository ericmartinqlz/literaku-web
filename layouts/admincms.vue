<template>
  <div id="app" class="app">
    <AdminCMSSidenav ref="sidenav" class="sidenav" />

    <div class="--pushed">
      <AdminCMSHeader class="header" @hamburger="hamburgerClicked" />
      <nuxt class="app-content" />
      <AdminCMSFooter class="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminCMSLayout',
  methods: {
    hamburgerClicked() {
      if (this.$refs.sidenav) {
        this.$refs.sidenav.isToggled = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  width: 100%;
  display: flex;
  background: $primary-t95;
}

.sidenav {
  height: 100%;
}

.--pushed {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: $primary-t95;

  & > .app-content {
    flex: 1;
  }

  @media #{$medium} {
    border-radius: 10px 0 0 10px;
    margin-left: 250px;
  }
}

.main-sect {
  padding: 36px;

  @media #{$medium} {
    padding: 48px;
  }
}
</style>

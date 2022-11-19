<template>
  <div id="app" class="app">
    <AdminCMSSidenav ref="sidenav" class="sidenav" />

    <div class="--pushed">
      <AdminCMSHeader class="header" @hamburger="hamburgerClicked" />
      <AdminCMSFlashAlert
        v-if="isAlertShow"
        :type="alertType"
        :message="alertMessage"
      />

      <nuxt class="app-content" />
      <AdminCMSFooter class="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminCMSLayout',
  data() {
    return {
      isAlertShow: false,
      alertType: null,
      alertMessage: ''
    }
  },
  mounted() {
    this.$nuxt.$on('setAlert', (type = 'success', message = '') => {
      this.alertType = type
      this.alertMessage = message
      this.isAlertShow = true
    })
    this.$nuxt.$on('unsetAlert', () => {
      this.alertType = null
      this.alertMessage = ''
      this.isAlertShow = false
    })
  },
  methods: {
    hamburgerClicked() {
      if (this.$refs.sidenav) {
        this.$refs.sidenav.isToggled = true
      }
    }
  }
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
  margin-top: 60px;
  background: $primary-t95;
  padding: 36px;

  @media #{$medium} {
    margin-top: 75px;
    padding: 48px;
  }
}
</style>

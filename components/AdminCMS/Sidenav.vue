<template>
  <aside>
    <div v-if="isToggled" class="overlay" @click="isToggled = false"></div>

    <nav class="navbar" :class="[{ active: isToggled }]">
      <div class="nav-head text-upp text-center text-white">
        <span class="icon ltk-icon-close" @click="isToggled = false"></span>
        <h1 class="mb-0">Literaku</h1>
        <p class="mb-0">Admin CMS</p>
      </div>

      <hr />

      <!-- Lv 0 - Categorize -->
      <ul class="nav-list lv-0">
        <li
          v-for="(item0, index0) in navTreeList"
          :key="index0"
          class="nav-item"
        >
          <span
            v-if="item0.title !== 'dashboard'"
            class="category-title text-upp"
            >{{ item0.title }}</span
          >

          <!-- Lv 1 - Nav -->
          <ul class="nav-list lv-1">
            <li
              v-for="(item1, index1) in item0.children"
              :key="index1"
              class="nav-item"
              @click="navClick"
            >
              <nuxt-link :to="`/admin-cms${item1.url}`" class="text-cap">
                <span
                  class="icon mr-8"
                  :class="[`ltk-icon-${item1.icon}`]"
                ></span
                >{{ item1.title }}
              </nuxt-link>
            </li>
          </ul>

          <hr v-if="index0 !== navTreeList.length - 1" />
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'AdminCMSSidenav',
  data() {
    return {
      navList: [],
      navTreeList: [],

      isToggled: false,
    }
  },
  async fetch() {
    try {
      const res = await this.$axios.get(`/json/nav-list.json`)
      const navList = res.data.data || []

      this.setNavList(navList)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  },
  methods: {
    async setNavList(navList) {
      this.navList = [...navList]
      this.navTreeList = await this.$groupArrayByValues(navList, 'category')
    },
    navClick() {
      this.isToggled = false
    },
  },
}
</script>

<style lang="scss" scoped>
.overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba($black, 60%);

  @media #{$medium} {
    display: none;
  }
}

.navbar {
  position: fixed;
  padding: 18px 0;
  width: 250px;
  height: 100%;
  background: $primary;
  overflow-y: auto;

  transition-duration: 0.25s;
  transform: translateX(-250px);

  &.active {
    transform: translateX(0px);
  }
  @media #{$medium} {
    transform: translateX(0px);
    padding: 32px 0;
  }
}

.nav-head {
  padding: 0 24px 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > .icon {
    font-size: 24px;
  }
  & > h1 {
    font-size: 20px;
  }
  & > p {
    display: none;
    letter-spacing: calc(16px * 0.25);
  }

  @media #{$medium} {
    display: block;
    padding-bottom: 16px;

    & > .icon {
      display: none;
    }
    & > p {
      display: block;
    }
    & > h1 {
      font-size: 32px;
    }
  }
}

.nav-list {
  &.lv-0 {
    & > .nav-item {
      & .category-title {
        display: none;
        color: rgba($white, 50%);
        font-size: 11px;
        font-weight: 700;
        letter-spacing: calc(16px * 0.25);

        padding: 8px 24px;
      }

      hr {
        display: none;
      }

      @media #{$medium} {
        & .category-title {
          display: block;
        }

        hr {
          display: block;
        }
      }
    }
  }

  :not(.lv-0) {
    & > .nav-item {
      a {
        display: flex;
        align-items: center;
        color: $white;

        padding: 12px 24px;

        &:hover {
          background: $dark-primary;
        }

        & .icon {
          font-size: 24px;
        }

        &.nuxt-link-exact-active {
          background: $dark-primary;
          font-weight: 600;
        }
      }
    }
  }
}

hr {
  border-top-color: rgba($light, 0.5);
  margin: 12px 24px;
}

.sidebar::-webkit-scrollbar {
  width: 10px;
}
.sidebar::-webkit-scrollbar-track {
  background: $light;
  // border-radius: 10px;
}
.sidebar::-webkit-scrollbar-thumb {
  background: $dark-primary;
  border-radius: 10px;
}
</style>

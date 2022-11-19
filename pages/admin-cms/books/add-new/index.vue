<template>
  <main class="main-sect">
    <div class="card p-24 md:p-36">
      <div class="flex justify-between">
        <h2 class="text-2xl md:text-4xl">Add New Book</h2>
      </div>

      <hr class="card-hr" />

      <div class="content">
        <form @submit.prevent="">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div class="form-input--cms">
              <label for="title">
                <span>Title</span>
                <input
                  id="title"
                  v-model="formData.title"
                  type="text"
                  name="title"
                  :class="[{ error: $v.formData.title.$error }]"
                />

                <div v-if="$v.formData.title.$error" class="">
                  <FormMessage
                    v-if="!$v.formData.title.required"
                    message="Field Title wajib diisi"
                  />
                  <FormMessage
                    v-else-if="!$v.formData.title.minLength"
                    :message="`Minimal ${$v.formData.title.$params.minLength.min} karakter`"
                  />
                </div>
              </label>
            </div>

            <div class="form-input--cms">
              <label for="author">
                <span>Author</span>
                <input
                  id="author"
                  v-model="formData.author"
                  type="text"
                  name="author"
                  :class="[{ error: $v.formData.author.$error }]"
                />

                <div v-if="$v.formData.author.$error" class="">
                  <FormMessage
                    v-if="!$v.formData.author.$required"
                    message="Field Author wajib diisi"
                  />
                </div>
              </label>
            </div>

            <div class="form-input--cms">
              <label for="year">
                <span>Year</span>
                <DatePicker
                  v-model="formData.year"
                  type="year"
                  value-type="format"
                  format="YYYY"
                  placeholder=""
                  :class="[{ error: $v.formData.year.$error }]"
                />

                <div v-if="$v.formData.year.$error" class="">
                  <FormMessage
                    v-if="!$v.formData.year.$required"
                    message="Field Year wajib diisi"
                  />
                </div>
              </label>
            </div>

            <div class="form-input--cms">
              <label for="url">
                <span>Book Url (.pdf)</span>
                <input
                  id="url"
                  v-model="formData.url"
                  type="text"
                  name="url"
                  :class="[{ error: $v.formData.url.$error }]"
                />

                <div v-if="$v.formData.url.$error" class="">
                  <FormMessage
                    v-if="!$v.formData.url.$required"
                    message="Field Book Url wajib diisi"
                  />
                </div>
              </label>
            </div>

            <div class="form-input--cms">
              <label for="cover">
                <span>Cover Url (.jpg)</span>
                <input
                  id="cover"
                  v-model="formData.cover"
                  type="text"
                  name="cover"
                  :class="[{ error: $v.formData.cover.$error }]"
                />

                <div v-if="$v.formData.cover.$error" class="">
                  <FormMessage
                    v-if="!$v.formData.cover.$required"
                    message="Field Cover Url wajib diisi"
                  />
                </div>
              </label>
            </div>

            <div class="form-input--cms col-span-2">
              <label for="synopsis">
                <span>Synopsis</span>
                <textarea
                  id="synopsis"
                  v-model="formData.synopsis"
                  type="text"
                  name="synopsis"
                  rows="4"
                  :class="[{ error: $v.formData.synopsis.$error }]"
                />

                <div v-if="$v.formData.synopsis.$error" class="">
                  <FormMessage
                    v-if="!$v.formData.synopsis.$required"
                    message="Field Synopsis wajib diisi"
                  />
                </div>
              </label>
            </div>
          </div>

          <div class="btn-cont">
            <button
              class="btn--ghost-primary"
              :disabled="!isChangedForm"
              @click="resetFormData"
            >
              Reset
            </button>
            <button
              class="btn--primary"
              :disabled="!isChangedForm"
              @click="onClickAdd"
            >
              + Add
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
const { required, minLength } = require('vuelidate/lib/validators')
export default {
  layout: 'admincms',
  data() {
    return {
      formData: {},
      backupFormData: '',

      confirmAdd: false
    }
  },
  validations: {
    formData: {
      title: {
        required,
        minLength: minLength(4)
      },
      author: {
        required
      },
      year: {
        required
      },
      url: {
        required
      },
      cover: {
        required
      },
      synopsis: {
        required
      }
    }
  },
  computed: {
    isChangedForm() {
      const formData = { ...this.formData }
      if (this.backupFormData !== JSON.stringify(formData)) return true
      return false
    }
  },
  mounted() {
    this.resetFormData()
  },
  methods: {
    resetFormData() {
      const formData = {
        title: '',
        author: '',
        year: '',
        url: '',
        cover: '',
        synopsis: ''
      }

      this.formData = { ...formData }
      this.backupFormData = JSON.stringify(formData)
    },

    onClickAdd(e) {
      // -- Next Feature - after have pop up component
      // if (this.isChangedForm) {
      //   this.confirmAdd = true
      // }

      this.addHandler()
    },
    async addHandler() {
      this.$v.formData.$touch()

      if (!this.$v.formData.$invalid) {
        const data = { ...this.formData }

        try {
          await this.$axios.post(`${this.$baseapi()}/ebook`, data)
          this.$nuxt.$emit(
            'setAlert',
            'success',
            'Berhasil menambah data buku!'
          )

          setTimeout(() => {
            this.$nuxt.$emit('unsetAlert')
            this.$router.push({
              path: `/admin-cms/books`
            })
          }, 4000)
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error)

          this.$nuxt.$emit('setAlert', 'danger', 'Gagal menambah data buku!')

          setTimeout(() => {
            this.$nuxt.$emit('unsetAlert')
          }, 4000)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;

  .btn-cont {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    gap: 16px;

    button {
      margin-top: 16px;
      width: 100%;

      @media #{$medium} {
        width: fit-content;
        min-width: 125px;
      }
    }
  }
}
</style>

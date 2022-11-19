<template>
  <main class="main-sect">
    <div class="card p-24 md:p-36">
      <div class="flex justify-between">
        <h2 class="text-2xl md:text-4xl">Books</h2>
        <nuxt-link to="/admin-cms/books/add-new" class="btn--primary btn-link"
          >+ Add New</nuxt-link
        >
      </div>

      <hr class="card-hr" />

      <div class="content">
        <table class="table-cms">
          <thead>
            <tr>
              <th v-for="(column, index0) in columns" :key="index0">
                {{ column.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="$fetchState.pending" class="tr-no-data">
              <td :colspan="columns.length"><LoadingSpinner /></td>
            </tr>

            <tr v-else-if="listData.length === 0" class="tr-no-data">
              <td :colspan="columns.length">No Data Available</td>
            </tr>

            <template v-else>
              <tr v-for="(row, index0) in listData" :key="index0">
                <td v-for="(column, index1) in columns" :key="index1">
                  <template
                    v-if="
                      column.fieldType === null ||
                      column.fieldType === undefined
                    "
                  >
                    {{ row[column.field] }}
                  </template>

                  <template v-else-if="column.fieldType === 'html'">
                    <div v-if="column.field === 'action'">
                      <span
                        class="btn--badge-primary"
                        @click="editHandler(row.id)"
                        >Edit</span
                      >
                      <span
                        class="btn--badge-danger"
                        @click="deleteHandler(row.id)"
                        >Delete</span
                      >
                    </div>
                  </template>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  layout: 'admincms',
  data() {
    return {
      listData: [],
      columns: [
        { field: 'id', key: 'a', title: 'ID', align: 'center' },
        { field: 'title', key: 'b', title: 'Title', align: 'left' },
        { field: 'author', key: 'c', title: 'Author', align: 'left' },
        { field: 'year', key: 'd', title: 'Year', align: 'center' },
        {
          field: 'action',
          key: 'e',
          title: 'Action',
          align: 'left',
          fieldType: 'html'
        }
      ]
    }
  },
  async fetch() {
    try {
      const res = await this.$axios.get(`${this.$baseapi()}/ebook`)
      this.listData = res.data || []
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  },
  methods: {
    async deleteHandler(index) {
      try {
        if (confirm('Yakin hapus buku?') === true) {
          await this.$axios.delete(`${this.$baseapi()}/ebook/${index}`)
          this.$nuxt.$emit(
            'setAlert',
            'success',
            'Berhasil menghapus data buku!'
          )

          setTimeout(() => {
            this.$nuxt.$emit('unsetAlert')
            this.$nuxt.refresh()
          }, 4000)
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)

        this.$nuxt.$emit('setAlert', 'danger', 'Gagal menghapus data buku!')

        setTimeout(() => {
          this.$nuxt.$emit('unsetAlert')
        }, 4000)
      }
    },
    editHandler(index) {
      this.$router.push({
        path: `/admin-cms/books/edit/${index}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
td {
  padding: 4px 8px;
}
</style>

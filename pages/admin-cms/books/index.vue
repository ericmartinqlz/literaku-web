<template>
  <main class="main-sect">
    <div class="card p-24 md:p-36">
      <div class="flex justify-between">
        <h2 class="text-2xl md:text-4xl">Books</h2>
        <button class="btn--primary">+ Add New</button>
      </div>

      <hr class="card-hr" />

      <div class="content"></div>
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
        { field: 'id', key: 'id', title: 'ID', align: 'center' },
        { field: 'title', key: 'title', title: 'Title', align: 'left' },
        { field: 'author', key: 'c', title: 'Author', align: 'left' },
        { field: 'year', key: 'd', title: 'Year', align: 'center' },
      ],
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
}
</script>

<style lang="scss" scoped></style>

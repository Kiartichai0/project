<template>
  <div>
    <v-card>
      <v-card-text>
        <v-text-field  v-model="search"  append-icon="mdi-magnify"  label="ค้นหา"  single-line  hide-details  ></v-text-field>
      </v-card-text>
      <section>
      <v-data-table :search="search" :headers="head" :items="discus" :page.sync="page" :items-per-page="itemsPerPage" hide-default-footer class="elevation-1" @page-count="pageCount = $event" >

        <template #item.title="{ item }">
          <nuxt-link :to="{ path: '/discuss/discuss_room', query: { id: item.id },}"> {{ item.title }} </nuxt-link>
        </template>
      
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
      </section>
    </v-card>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios }) {
      const discus = await $axios.$get("/discuss");
      return {discus};
    },
  data() {
    return {
      search:'',
      page: 1,
      pageCount: 0,
      itemsPerPage: 4,
      head:[ { text: "หัวข้อ", value: 'title' } ],
    };
  },
};
</script>
<template>
  <div>
    <section>
      <v-col>
        <v-card>
          <v-card-text align="center"> <v-btn text width="100%" color="success" v-if="loggedIn" to="/discuss/add_topic" > <v-icon> mdi-information </v-icon> เพิ่มหัวข้อ </v-btn></v-card-text>
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
      </v-col>
    </section>
  </div>
</template>
<script>
import Profile from '~/components/Profile.vue';
export default {
    async asyncData({ $axios }) {
        const discus = await $axios.$get("/discuss");
        return { discus };
    },
    data() {
        return {
            user: this.$auth.user,
            loggedIn: this.$auth.loggedIn,
            search: "",
            page: 1,
            pageCount: 0,
            itemsPerPage: 10,
            head: [{ text: "หัวข้อ", value: "title" }],
        };
    },
    methods: {
        async logout() {
            await this.$auth.logout();
            await this.$nuxt.refresh();
            //this.$router.push("/login/login");
        },
    },
    components: { Profile }
};
</script>

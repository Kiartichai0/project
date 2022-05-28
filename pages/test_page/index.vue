<template>
 <div>

    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"  append-icon="mdi-magnify"  label="ค้นหา"  single-line  hide-details  ></v-text-field>
      </v-card-title>
      <v-data-table v-model="selected" show-select :headers="head"  :items="users"  :search="search">
      </v-data-table>
      <v-card-text> 
        <center>
          <v-btn v-if="selected != '' " width="100%" large color="red lighten-2" text @click="DelUser()"> ลบ </v-btn> 
        </center>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
  export default {
    async asyncData({ $axios }) {
      const users = await $axios.$get("/users");
      const subject = await $axios.$get("/subject");
      const discus = await $axios.$get("/discuss");
      return {  users, subject, discus };
    },
    data () {
      return {
        search: '',
        tab:null,
        selected:[],
        head:[
          { text: 'Username', value: 'username' },
          { text: 'firstname', value: 'firstname' },
          { text: 'lastname', value: 'lastname' },
          { text: 'ID', value: 'id' },
          ],
      }
    },
    methods: {
      Del(){
        this.selected.forEach(i => {
          console.log(i.id);
        });
      }
    },
  }
</script>
<template>
  <div v-if="loggedIn">
    <v-row class="mx-auto">
      <v-col class="col-3" v-for="i in subject" :key="i._id">
        
          <v-card min-height="100%" :to="{  path: '/user/user_topic',  query: { id: i.id },  }">
            <br>
            <div align="center">
              <v-avatar color="primary" size="128"> 
                <img v-if="i.pic" :src="i.pic" alt="avatar"/>
                <span v-else class="white--text text-h1"> {{i.title[0]}} </span>
              </v-avatar>
              <h1> {{ i.title }} </h1>
            </div>
          </v-card>

      </v-col>
      <v-col>
      </v-col>
    </v-row>
  </div>

  <div v-else>
    <v-row class="my-5">
      <v-col class="col-3" v-for="i in subject" :key="i._id">
          <v-card min-height="100%"  to="/login/login">
            <br/>
            <div align="center">
                  <v-avatar color="primary" size="128"> 
                    <img v-if="i.pic" :src="i.pic" alt="avatar"/>
                    <span v-else class="white--text text-h1"> {{i.title[0]}} </span>
                  </v-avatar>
                  <h1> {{ i.title }} </h1>
            </div>
          </v-card>
      </v-col>
      <v-col>
      </v-col>
    </v-row>
  </div>
  
</template>
<script>
export default {
  async asyncData({ $axios }) {
    const subject = await $axios.$get("/subject");
    return { subject };
  },
  data() {
    return {
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
    };
  },
};
</script>
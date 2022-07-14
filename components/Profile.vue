<template>
      <section v-if="this.$auth.loggedIn">
       ผู้ใช้: {{user.username}}  
      <v-menu bottom min-width="200px" rounded offset-y >
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on" >
            <v-avatar size="48" >
              <img v-if="user.avatar" :src="user.avatar" alt="avatar"/>
              <v-icon v-else> mdi-account-circle-outline </v-icon>
            </v-avatar>
          </v-btn>
        </template>

        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar >
                <img v-if="user.avatar" :src="user.avatar" alt="avatar"/>
                <v-icon v-else> mdi-account-circle-outline </v-icon>
              </v-avatar>
              <h3>{{ user.username }}</h3>
              <p class="text-caption mt-1"> {{ user.firstname }} {{ user.lastname }}</p>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed text :to="{ path: '/login/profile', query: { id: this.$auth.user.id },}" > แก้ไขข้อมูลส่วนตัว </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed text @click="logout()"> ออกจากระบบ </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
      </section>
      <section v-else>
          <v-btn text color="primary" to="/login/login" > เข้าสู่ระบบ </v-btn>
      </section>

</template>
<script>
  export default {
    data() {
    return {
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
    };
  },
    methods:{
      async logout() {
        await this.$auth.logout();
      },
    }
  }
</script>
<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title v-text="title" />
      <v-spacer />
        <section v-if="this.$route.path != '/login/login' && this.$route.path != '/login/register' " align="right">
          <Profile/>
        </section>
    </v-app-bar>

    <v-main >
      <v-container>



        <!--content here-->
        <Nuxt />
        <!--content here-->

      </v-container>
    </v-main>
    
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>  &copy; Ubon Ratchathani University {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      user:this.$auth.user,
      loggedIn: this.$auth.loggedIn,
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        /*{
          icon: 'mdi-cog',
          title: 'Test',
          to: '/test_page'
        },*/
        {
          icon: 'mdi-account-circle',
          title: 'ผู้ใช้',
          to: '/user/user_main'
        },
        { 
          icon: 'mdi-book-open-variant',
          title: 'ผู้เขียนเนื้อหา',
          to: '/writer/writer_main'
        },
        {
          icon: 'mdi-account-tie-hat',
          title: 'ผู้ดูแลระบบ',
          to: '/admin/admin'
        },
        {
          icon: 'mdi-comment-question',
          title: 'กระดานสนทนา',
          to: '/discuss/discuss_main'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'แอปพลิเคชันเพื่อสนับสนุนการศึกษาด้วยตนเอง'
    }
  }
}
</script>

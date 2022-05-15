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

    <!--

      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>

      <v-btn icon @click.stop="fixed = !fixed" >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
    -->
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>

    <v-main>
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
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        /*{
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        },*/
        {
          icon: 'mdi-minus-thick',
          title: 'Photo',
          to: '/sub'
        },
        {
          icon: 'mdi-minus-thick',
          title: 'TEST',
          to: '/sub/test'
        },
        {
          icon: 'mdi-minus-thick',
          title: 'TEST2',
          to: '/sub/test2'
        },
        {
          icon: 'mdi-minus-thick',
          title: 'TEST3',
          to: '/sub/test3'
        },
        {
          icon: 'mdi-minus-thick',
          title: 'TEST4',
          to: '/sub/test4'
        },
        {
          icon: 'mdi-plus-thick',
          title: 'Add',
          to: '/sub/add'
        },
        {
          icon: 'mdi-account',
          title: 'USER',
          to: '/user/user_main'
        },
        { 
          icon: 'mdi-account',
          title: 'Writer',
          to: '/writer/writer_main'
        },
        {
          icon: 'mdi-plus-thick',
          title: 'Register',
          to: '/login/register'
        },
        {
          icon: 'mdi-plus-thick',
          title: 'Login',
          to: '/login/login'
        },
        {
          icon: 'mdi-plus-thick',
          title: 'Admin',
          to: '/admin/admin'
        },
        {
          icon: 'mdi-plus-thick',
          title: 'Discuss',
          to: '/discuss/discuss_main'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Project-Nuxt'
    }
  }
}
</script>

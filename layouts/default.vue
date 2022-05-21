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
        {
          icon: 'mdi-cog',
          title: 'Test',
          to: '/test_page'
        },
        {
          icon: 'mdi-account-circle',
          title: 'USER',
          to: '/user/user_main'
        },
        { 
          icon: 'mdi-book-open-variant',
          title: 'Writer',
          to: '/writer/writer_main'
        },
        {
          icon: 'mdi-account-tie-hat',
          title: 'Admin',
          to: '/admin/admin'
        },
        {
          icon: 'mdi-comment-question',
          title: 'Discuss',
          to: '/discuss/discuss_main'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'โปรเจค'
    }
  }
}
</script>

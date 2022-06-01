<template>
<v-col>
    <p> {{u}} </p>
    <v-card>
        <v-card-text align="center">
            <v-avatar color="primary" size="128"> 
                <img v-if = "u[0].avatar != '' " :src="u[0].avatar" alt="avatar"/>
                <span v-else class="white--text text-h1"> {{u[0].firstname[0]}} </span>
            </v-avatar>
            <br/>
        </v-card-text>
        <v-card-text align="center"><h3> {{u[0].firstname}} {{u[0].lastname}}  </h3> </v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-title>Tonight's availability</v-card-title>
        <section>  
            <v-row>
                <v-col  cols="6">
                    <v-card>
                        <v-card-title>  </v-card-title>
                    </v-card> 
                </v-col>
                <v-spacer></v-spacer>
                <v-col  cols="6">
                    <v-card>
                        <v-card-title> X </v-card-title>
                    </v-card> 
                </v-col>
            </v-row>
           
        </section>
            
        <v-btn class="ma-5" to="/user/user_main"> กลับไปหน้าแรก </v-btn>
    </v-card>
</v-col>

</template>
<script>
export default {
    async asyncData({ $axios, query }) {
      const u = await $axios.$get(`/users/${query.id}`);
      //const quiz = await $axios.$get(`/quiz/${query.id}`);
      return { u };
    },
    data() {
        return {
        user: this.$auth.user,
        id: this.$route.query.id,
        loggedIn: this.$auth.loggedIn,
        };
    },
    
}
</script>
<template>
    <div>
        <v-card >
            <v-card-title><h2> {{sub[0].chapters[current].title}} </h2></v-card-title>

            <div class="mx-5" v-html="sub[0].chapters[current].content"/>
            
            <v-card-actions class=" justify-center ">
                <v-btn class="ma-auto " width="25%" :to="{ path: '/user/user_topic', query: { id:id} }"> กลับไปหน้าแรก  </v-btn>
                <v-btn v-if = "this.current > 0" width="25%" class="ma-auto " @click="Back()" > กลับ  </v-btn>
                <v-btn v-else width="25%" class="ma-auto " :to="{ path: '/user/user_topic', query: { id:id} }"> กลับ </v-btn>
                <v-btn v-if=" this.current < sub[0].chapters.length-1" width="40%" class="ma-auto " @click="nextPage()" > ต่อไป </v-btn>
            </v-card-actions>
        </v-card>

    </div>
</template>
<script>
export default {
    async asyncData({ $axios, query }) {
      const sub = await $axios.$get(`/subject/${query.id}`);
      //const quiz = await $axios.$get(`/quiz/${query.id}`);
      return { sub };
    },
    data() {
        return {
        user: this.$auth.user,
        loggedIn: this.$auth.loggedIn,
        current: this.$route.query.current,
        id: this.$route.query.id,

        };
    },
    methods:{
        async nextPage(){
            await this.current++ ;
            await window.scrollTo(0,0);
        },
        async Back(){
            await this.current-- ;
            await window.scrollTo(0,0);
        },
    }
}
</script>
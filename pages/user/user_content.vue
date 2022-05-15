<template>
    <div>
        <v-card class="ma-auto">
            <v-card-title> {{content[current].title}} </v-card-title>
            <div class="ma-5" v-html="content[current].content"/>

            <v-card-actions class=" justify-center ">

                <v-btn width="80%" class="ma-5 pa-5" :to="{ path: '/user/user_topic', query: { id:id} }"> back </v-btn>

            </v-card-actions>

        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
        user: this.$auth.user,
        loggedIn: this.$auth.loggedIn,
        content: this.$route.query.content,
        current: this.$route.query.current,
        id: this.$route.query.id,

        };
    },
}
</script>
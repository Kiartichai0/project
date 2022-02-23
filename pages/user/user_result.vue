<template>
    <v-card>
        <v-card-title class="justify-center"> RESULT </v-card-title>

        <v-row v-for="i in 10" :key="i" >
            <v-card-text> Questions {{i}} </v-card-text>
            <v-card-text> Your choice is X </v-card-text>
            <v-card-text> Correct answer is Y </v-card-text>
        </v-row>
        <v-card-text> Summary : 9/10 </v-card-text>
        <v-card-actions>
            <v-btn to="/user/user_main"> back </v-btn>
        </v-card-actions>
    </v-card>
</template>
<template>
    <div>
        <v-row class=" col-6 " v-for=" x in 10 " :key="x">
            <center>
        <v-card>
            <v-card-title> Question #{{x}} </v-card-title>
            <v-card-text> questions is what is this </v-card-text>
            <v-card-actions>
                <v-row>
                    <v-col class=" col-6 " v-for=" i in 4 " :key="i">
                        <v-btn class=" ma-5 " to="/user/user_result"> choice {{i}} </v-btn>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
        </center>
        </v-row>
        <v-btn class=" ma-5 primary" to="/user/user_result"> submit </v-btn>
        <v-btn class=" ma-5 " to="/user/user_main"> back </v-btn>

    </div>
</template>
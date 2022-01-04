<template>
    <div>
        <v-row>
            <v-col class="col-4" v-for="i in 10" :key="i">
                <v-card>
                    <router-link to="/user/user_topic">
                        <v-card-text> subject {{i}} </v-card-text>
                    </router-link>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
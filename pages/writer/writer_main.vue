<template>
    <div>
        <v-row>
            <v-col class="col-4" v-for="i in 10" :key="i">
                <v-card>
                    <router-link to="/writer/writer_topic">
                        <v-card-text> subject {{i}} </v-card-text>
                    </router-link>
                </v-card>
            </v-col>
            <v-col class="col-4">
                <v-card>
                    <router-link to="/writer/add_subject">
                        <v-card-text> <v-icon > mdi-plus-thick </v-icon> add subject </v-card-text>
                    </router-link>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
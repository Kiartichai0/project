<template>
    <div>
        <v-row class="col-12 justify-center" v-for="i in 5" :key="i">
            <v-card>
                <v-card-title> TOPIC {{i}} </v-card-title>              
                <v-card-subtitle> This is {{i}} </v-card-subtitle>
                <v-card-text> Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ipsum risus, viverra vel elementum vitae, commodo feugiat massa. Maecenas in dui ultrices nisl fermentum blandit. Phasellus maximus velit ut nisl luctus, sodales dignissim ligula sagittis. Vestibulum nec velit ut diam pharetra dapibus malesuada at risus. Quisque posuere vehicula velit. Maecenas ullamcorper tellus eros, venenatis aliquet leo eleifend a. Fusce cursus lorem at volutpat porttitor. In aliquet eu tellus in imperdiet. Fusce tincidunt urna magna. Proin tempus tellus et arcu convallis rutrum. Fusce non venenatis lorem. Proin libero est, consectetur non diam et, accumsan iaculis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque consequat mi risus, nec tincidunt ante fringilla vitae. </v-card-text>
                <v-card-actions>
                    <v-btn to="/writer/edit_topic"> EDIT </v-btn>
                    <v-btn> DELETE </v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
        <v-row class="col-12 justify-center">
            <v-card class=" mr-5 ">
                <router-link to="/writer/add_topic">
                    <v-card-title> ADD TOPIC </v-card-title>
                </router-link>                
            </v-card>

            <v-card>
                <router-link to="/writer/writer_quiz">
                    <v-card-title> quiz </v-card-title>
                </router-link>                
            </v-card>
            
        </v-row>
    </div>
</template>
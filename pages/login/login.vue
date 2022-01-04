<template>
    <div>
        <v-card>
            <v-card-title class="justify-center ma-5"> Login </v-card-title>
            <center>
            <v-form class="col-10">
               <v-text-field label="username" />
                <v-text-field label="password" />
                <v-select :items="items" label="Role"></v-select>
                
                <v-btn> Login </v-btn>
                <v-btn> Back </v-btn>
                <br/>
                <br/>    
                <router-link to="/login/register">
                    <v-text > Register? </v-text>
                </router-link>           
            </v-form>
            </center>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items:[
                'Normal user',
                'Writer'
            ]
            
        }
    },
}
</script>


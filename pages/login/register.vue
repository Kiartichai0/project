<template>
    <div>
        <v-card>
            <v-card-title class="justify-center ma-5"> Register </v-card-title>
            <center>
            <v-form class="col-10 justify-center">
               <v-text-field label="username" />
                <v-text-field label="password" />
                <v-text-field label="password again" />
                <v-select :items="items" label="Role"></v-select>
                
                <v-checkbox label="Do you agree term of service?"/>

                <v-btn to="/login/login"> Register </v-btn>
                <v-btn> back </v-btn>
                <br/>
                <br/>    
                <router-link to="/login/login">
                    <v-text > Login? </v-text>
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


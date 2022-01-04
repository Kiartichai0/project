<template>
    <div>
        <v-card>
            <v-card-title class="justify-center ma-5"> ADD Subject </v-card-title>
            <center>
            <v-form class="col-10">
               <v-textarea label="question" />
                <v-text-field label="choice 1" />
                <v-text-field label="choice 2" />
                <v-text-field label="choice 3" />
                <v-text-field label="choice 4" />
                <v-btn to="/writer/writer_topic" > Save </v-btn>
                <v-btn to="/writer/writer_topic"> Back </v-btn>         
            </v-form>
            </center>
        </v-card>
    </div>
</template>

<script>
</script>

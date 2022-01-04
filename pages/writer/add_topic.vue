<template>
    <div>
        <v-card>
            <v-card-title class="justify-center ma-5"> ADD Topic </v-card-title>
            <center>
            <v-form class="col-10">
               <v-text-field label="Topic" />
                <v-textarea label="Descriptions" />
                
                <v-btn to="/writer/writer_topic" > Save </v-btn>
                <v-btn to="/writer/writer_topic"> Back </v-btn>         
            </v-form>
            </center>
        </v-card>
    </div>
</template>

<script>
</script>


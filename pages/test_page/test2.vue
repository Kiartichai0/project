<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="12" md="6" offset-md="3">
        <v-card>
          <v-card-text style="height: 300px" class="grey lighten-5 text-center">
          </v-card-text>
          <v-card-text style="height: 100px; position: relative">
            <v-fab-transition>
              <v-btn  color="pink" dark absolute top right fab>
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-fab-transition>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
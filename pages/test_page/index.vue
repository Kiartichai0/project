<template>
<div>
  <h1> {{user}} </h1>
  <v-card class="mx-auto" max-width="80%">
    <v-card-title>
    </v-card-title>

    <v-card-text class="text-h5 font-weight-bold">
      "Turns out semicolon-less style is easier and safer in TS because most
      gotcha edge cases are type invalid as well."
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img class="elevation-6" alt="" :src = "user.avatar"  ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title> {{user.firstname}} {{user.lastname}} </v-list-item-title>
        </v-list-item-content>

        <v-row align="center" justify="end">
          <v-icon v-if="thumb" class="mr-1" @click="doSomethings(),thumb = !thumb "> mdi-thumb-up-outline </v-icon>
          <v-icon v-else class="mr-1" @click="doSomethings(),thumb = !thumb"> mdi-thumb-up </v-icon>
          <span class="subheading mr-2"> {{like}} </span>
          <span class="mr-1">·</span>
          <v-icon class="mr-1"> mdi-share-variant </v-icon>
          <span class="subheading">45</span>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</div>
</template>

<script>
  export default {
    data(){
      return{
        user: this.$auth.user,
        loggedIn: this.$auth.loggedIn,
        like:0,
        thumb:true,
      }

    },
    methods:{ 
      async doSomethings(){
        if(this.thumb){
          await this.like ++;
        }
        else{
          await this.like --;
        }
        
        //await alert("You just clicked!!");
      }
      
    }
  }
  </script>
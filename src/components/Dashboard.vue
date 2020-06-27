<template>
  <v-app>
    <AppBar />
    <v-main class="mt-10">
      <v-card
        class="mx-auto"
        max-width="800"
        outlined
        elevation="4"
      >
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="display-1">{{`${name} ${lastName}`}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-card-text>
          <v-row align="center">

            <NavigationPanel />

            <v-col class="display-3" cols="8">
              
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

    </v-main>
  </v-app>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import AppBar from "./elements/AppBar";
  import NavigationPanel from "./elements/NavigationPanel";

  Vue.use(VueAxios, axios);

  const token = window.localStorage.getItem('token');
  const userId = window.localStorage.getItem('userId');

  export default {
    name: 'Home',
    components: {
      AppBar,
      NavigationPanel
    },
    data: () => ({
      name: '',
      lastName: '',
    }),
    created() {
      if(token === null) {
        this.$router.push('/login').catch(err => (err));
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        this.axios.get(`user/show/${userId}`)
          .then(response => {
            this.name = response.data.data.name.toUpperCase();
            this.lastName = response.data.data.lastname.toUpperCase();
          })
          .catch(err => {this.$router.push('/login').catch(error => (error)); console.log(err)});
      },
    }
  }
</script>
<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="mt-10">
      <v-card
        class="mx-auto"
        max-width="500"
        outlined
      >
        <v-tabs
          background-color="indigo"
          class="elevation-2"
          dark
          :grow="true"
        >
          <v-tabs-slider></v-tabs-slider>
          <v-tab href="#tab-1">
            Regístrate
          </v-tab>
          <v-tab href="#tab-2">
            Iniciar sesión
          </v-tab>

          <v-tab-item value="tab-1">
            <v-card flat tile>
              <v-container>
                <Register />
              </v-container>
            </v-card>
          </v-tab-item>

          <v-tab-item value="tab-2">
            <v-card flat tile>
              <v-container>
                <Login />
              </v-container>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>

    </v-main>
  </v-app>
</template>

<script>
import Login from './components/Login';
import Register from './components/Register';

const token = window.localStorage.getItem('token');

export default {
  name: 'App',

  components: {
    Login,
    Register
  },

  data: () => ({
    //
  }),
  created() {
    if(token !== null) {
      this.$router.push('dashboard').catch(err => {console.log('err', err)});
    }
  }
};
</script>

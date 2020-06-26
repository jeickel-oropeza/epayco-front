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

            <v-col cols="8">
              <div v-if="amount !== null" class="balance-text display-1">
                Su saldo es: {{amount}}$
              </div>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                class="d-flex flex-column"
                @submit="checkBalance"
              >
                <v-text-field
                  v-model="dni"
                  :rules="validateRules"
                  label="DNI"
                  required
                ></v-text-field>
                
                <v-text-field
                  v-model="phone"
                  :rules="validateRules"
                  label="Teléfono"
                  required
                ></v-text-field>

                <v-btn
                  color="success"
                  class="mx-auto"
                  type="submit"
                >
                  Consultar
                </v-btn>
              </v-form>
              <p v-if="error" class="display-0 mt-5 red--text">
                Información no encontrada
              </p>
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
    name: 'Check',
    components: {
      AppBar,
      NavigationPanel
    },
    data: () => ({
      valid: true,
      amount: null,
      error: false,
      name: '',
      lastName: '',
      dni: '',
      phone: '',
      validateRules: [
        v => !!v || 'El campo es requerido',
      ],
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
            this.amount = response.data.data.wallet.amount;
          })
          .catch(err => (err));
      },
      checkBalance(e) {
        e.preventDefault();
        if(this.$refs.form.validate() === true) {
          this.axios.get(`user/check/${userId}/${this.dni}/${this.phone}`)
            .then(response => {
              this.amount = response.data.data.amount;
              this.error = false;
            })
            .catch(err => {this.error = true; console.log(err)})
        }
      },
    }
  }
</script>
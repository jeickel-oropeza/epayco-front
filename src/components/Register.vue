<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    class="d-flex flex-column"
    @submit="sendData"
  >
    <v-text-field
      v-model="name"
      :rules="nameRules"
      label="Nombre"
      required
    ></v-text-field>

    <v-text-field
      v-model="lastname"
      :rules="nameRules"
      label="Apellido"
      required
    ></v-text-field>
    
    <v-text-field
      v-model="dni"
      :rules="nameRules"
      label="DNI"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Email"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[passwordRules.required, passwordRules.min]"
      :type="show1 ? 'text' : 'password'"
      name="input-10-1"
      label="Contraseña"
      hint="Al menos 8 carácteres"
      counter
      required
      @click:append="show1 = !show1"
    ></v-text-field>

    <v-text-field
      v-model="phone"
      :rules="nameRules"
      label="Teléfono"
      required
    ></v-text-field>

    <v-btn
      color="success"
      class="mx-auto"
    >
      Registrarse
    </v-btn>
  </v-form>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'

  Vue.use(VueAxios, axios);

  export default {
    name: 'Register',
    data: () => ({
      valid: true,
      name: '',
      lastname: '',
      dni: '',
      email: '',
      password: '',
      phone: '',
      show1: false,

      nameRules: [
        v => !!v || 'El campo es requerido',
      ],

      emailRules: [
        v => !!v || 'El campo es requerido',
        v => /.+@.+\..+/.test(v) || 'El email debe ser válido',
      ],

      passwordRules: {
        required: value => !!value || 'El campo es requerido.',
        min: v => v.length >= 8 || 'Min 8 characters',
      },
    }),
    methods: {
      sendData(e) {
        e.preventDefault();
        if(this.$refs.form.validate() === true) {
          let data = {
            name: this.name,
            lastname: this.lastname,
            dni: this.dni,
            email: this.email,
            password: this.password,
            phone: this.phone,
          }

          this.axios.post('register', data)
            .then(response => {
              window.localStorage.setItem('token', response.data.data.token);
              window.localStorage.setItem('userId', response.data.data.id);
              this.$router.push('/dashboard');
            })
            .catch(err => {console.log('err', err)})
          
        }
      },
    }
  }
</script>
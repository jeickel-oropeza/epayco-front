<template>
  <v-col class="display-3" cols="4">

    <v-list-item link to="/check-balance">
      <v-list-item-avatar>
        <v-icon left>mdi-magnify</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title >Consultar saldo</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    
    <v-list-item link to="/add-balance">
      <v-list-item-avatar>
        <v-icon left>mdi-pencil</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title >Recargar saldo</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    
    <v-list-item link to="/pay">
      <v-list-item-avatar>
        <v-icon left>mdi-cart</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title >Pagar</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

  </v-col>
</template>

<script>
export default {
    name: 'NavigationPanel',
    data: () => ({

    }),
}
</script>
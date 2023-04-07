<template>
  <v-app>
    <v-main>
      <v-toolbar>
        <v-toolbar-title :style="{ color: '#702b4f' }"
          >Employee Management</v-toolbar-title
        >
      </v-toolbar>
        <v-container>
          <Nuxt />
        </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {};
  },
};
</script>

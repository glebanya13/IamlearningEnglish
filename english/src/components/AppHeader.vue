<template>
  <div>
    <v-navigation-drawer absolute temporary v-model="drawer" class="hidden-md-and-up">
      <v-list>
        <v-list-item v-for="(item, i) in menuItems" :key="`navdrawer${i}`">
          <v-list-item-icon>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>

      <router-link to="/" tag="span" style="cursor:pointer">
        <v-toolbar-title>Learn English</v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="(item, i) in menuItems" text :key="`menuitem${i}`" :to="item.route">
          <v-icon left v-html="item.icon"></v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    menuItems() {
      return [
        {
          icon: "mdi-eye",
          title: "Читать",
          route: "/books",
        },
        {
          icon: "mdi-domain",
          title: "Учить слова",
          route: "/words",
        },
        {
          icon: "mdi-account",
          title: "Профиль",
          route: "/profile",
        },
        {
          icon: "mdi-exit-run",
          title: "Выйти",
          route: "/logout",
        },
        {
          icon: "mdi-exit-to-app",
          title: "Войти",
          route: "/singin",
        },
        {
          icon: "mdi-lock-open",
          title: "Регистрация",
          route: "/singup",
        },
      ];
    },
  },
};
</script>
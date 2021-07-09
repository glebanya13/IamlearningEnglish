<template>
  <div>
    <v-navigation-drawer
      absolute
      temporary
      v-model="drawer"
      class="hidden-md-and-up"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in menuItems"
          :key="`navdrawer${i}`"
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-btn text @click.prevent="signout()" v-if="isUserAuthenticated">
          <v-icon left>mdi-exit-run</v-icon>
          Выйти
        </v-btn>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>

      <router-link to="/" tag="span" style="cursor: pointer">
        <v-toolbar-title>
          <v-btn fab x-small text class="hidden-sm-and-down">
            <img
              src="data:image/png;base64,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"
              height="20"
            />
          </v-btn>

          Ich Lerne Deutsch</v-toolbar-title
        >
      </router-link>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="(item, i) in menuItems"
          text
          :key="`menuitem${i}`"
          :to="item.route"
        >
          <v-icon left v-html="item.icon"></v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn text @click.prevent="signout()" v-if="isUserAuthenticated">
          <v-icon left>mdi-exit-run</v-icon>
          Выйти
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
    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated;
    },
    menuItems() {
      return this.isUserAuthenticated
        ? [
            {
              icon: "mdi-book",
              title: "Читать",
              route: "/books",
            },
            {
              icon: "mdi-account",
              title: "Профиль",
              route: "/profile",
            },
          ]
        : [
            {
              icon: "mdi-book",
              title: "Читать",
              route: "/books",
            },
            {
              icon: "mdi-exit-to-app",
              title: "Войти",
              route: "/signin",
            },
            {
              icon: "mdi-lock-open",
              title: "Регистрация",
              route: "/signup",
            },
          ];
    },
  },
  methods: {
    signout() {
      this.$confirm("На сегодня хватит английского? Я вернусь завтра").then(
        (res) => {
          if (res) this.$store.dispatch("SIGNOUT");
          this.$router.push({ name: "home" });
        }
      );
    },
  },
};
</script>
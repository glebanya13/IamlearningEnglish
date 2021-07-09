<template>
  <div>
    <v-container fluid>
      <span class="display-1">Слова</span>
      <v-data-iterator
        :items="words"
        hide-default-footer
        content-tag="v-layout"
        row
        wrap
      >
        <v-flex slot="item" slot-scope="props" xs12 sm12 md6 lg6>
          <v-card>
            <v-card-title>
              <div class="headline">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-avatar
                      v-on="on"
                      v-if="props.item.type == 1"
                      color="teal"
                      size="40"
                    >
                      <span class="white--text">EW</span>
                    </v-avatar>
                  </template>
                  <span>Английское слово</span>
                </v-tooltip>
                {{ getFullOriginalWord(props.item) }}
              </div>
              <h4></h4>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <div class="headline">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-avatar
                      v-on="on"
                      v-if="props.item.type == 2"
                      color="indigo"
                      size="40"
                    >
                      <span class="white--text">DW</span>
                    </v-avatar>
                  </template>
                  <span>Немецкое слово</span>
                </v-tooltip>
                {{ props.item.transText }}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                fab
                dark
                small
                color="primary"
                @click="addWord(props.item)"
                :disabled="checking || processing"
              >
                <v-icon>add</v-icon>
              </v-btn>

              <v-snackbar v-model="snackbar" bottom light color="error">
                <v-icon>warning</v-icon>{{ snackbarText }}
              </v-snackbar>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-data-iterator>
    </v-container>
  </div>
</template>

<script>
import { getFullOriginalWord } from "../helpers/words";
export default {
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  computed: {
    words() {
      if (!this.data) return [];

      let words = [];

      for (var property in this.data) {
        // if(this.data.hasOwnProperty.call(property)){
        let word = this.data[property];
        word.key = property;
        words.push(word);
        // }
      }

      return words;
    },
    processing() {
      return this.$store.getters.getProcessing;
    },
  },
  data() {
    return {
      snackbar: false,
      snackbarText: null,
      checking: false,
    };
  },
  methods: {
    getFullOriginalWord: getFullOriginalWord,
    addWord(entity) {
      this.checking = true;
      let userWords = this.$store.getters.userData.words;
      let wordAdded = userWords[entity.key];
      if (wordAdded) {
        this.snackbar = true;
        this.snackbarText = "Вы уже добавили слово для изучения";
      } else if (Object.keys(userWords).length > 100) {
        this.snackbar = true;
        this.snackbarText = "Вы уже добавили слишком много слов для изучения";
      } else {
        this.$store.dispatch("ADD_USER_WORD", entity);
      }
      this.checking = false;
    },
  },
};
</script>
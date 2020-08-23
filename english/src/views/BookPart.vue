<template>
  <v-container grid-list-md v-if="part">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm-1 v-if="finishedDate">
        <v-card>
          <v-responsive>
              <v-img
                src="https://firebasestorage.googleapis.com/v0/b/english-2a59c.appspot.com/o/%D0%91%D0%B5%D0%B7%20%D0%BD%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F.jfif?alt=media&token=43b84ec4-639f-47c7-a2fa-51e543f8d3d2"
                height="200px"
              ></v-img>
            </v-responsive>
            <v-card-title primary-title>
              <div class="headline">Я закончил читать эту часть! {{finishedDate | formattedDate}}</div>
            </v-card-title>
            <v-card-actions>
              <span>Моя оценка</span>
              <v-rating v-model="savedRating" readonly large></v-rating>
            </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm10 offset-sm-1>
        <book-part-content :part="part"></book-part-content>
      </v-flex>
      <v-flex xs12 sm10 offset-sm-1>
        <book-part-words :words="part.words"></book-part-words>
      </v-flex>
      <v-flex xs12 sm10 offset-sm-1 class="text-xs-center">
        <v-dialog v-if="!finishedDate" v-model="finishDialog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="success" dark @click="finishDialog = true">
              <v-icon>check</v-icon>Готово
            </v-btn>
          </template>
          <v-card>
            <v-responsive>
              <v-img
                src="https://firebasestorage.googleapis.com/v0/b/english-2a59c.appspot.com/o/%D0%91%D0%B5%D0%B7%20%D0%BD%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F.jfif?alt=media&token=43b84ec4-639f-47c7-a2fa-51e543f8d3d2"
                height="200px"
              ></v-img>
            </v-responsive>
            <v-card-title primary-title>
              <div class="headline">Я закончил читать эту часть!</div>
            </v-card-title>
            <v-card-text>
              <span>Моя оценка</span>
              <v-rating v-model="rating" half-increments large></v-rating>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" dark text @click.native="finishDialog = false">
                <v-icon>close</v-icon>Закрыть
              </v-btn>
              <v-btn color="primary" dark text @click.native="finishWork()">
                <v-icon>check</v-icon>Готово
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from "vue";
import BookPartContent from "../components/BookPartContent";
import BookPartWords from "../components/BookPartWords";

export default {
  props: {
    "bookId": {
      type: String,
      required: true,
    },
    "partId": {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      part: null,
      finishDialog: false,
      rating: 0,
    };
  },
  computed: {
    finishedDate() {
      return this.$store.getters.userData.books[this.bookId].parts[this.partId].finishedDate;
    },
    savedRating(){
      return this.$store.getters.userData.books[this.bookId].parts[this.partId].rating;
    }
  },
  created() {
    Vue.$db.collection("bookParts")
      .where("bookId", "==", this.bookId)
      .where("bookPartId", "==", this.partId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((s) => {
          this.part = s.data();
        });
      })
      .then(() => {
        this.$store.dispatch("UPDATE_USER_BOOK_PART_STATS", {
          bookId: this.bookId,
          partId: this.partId,
        });
      })
      .catch((error) => console.log(error));
  },
  methods: {
    finishWork() {
      this.$store.dispatch("FINISH_USER_BOOK_PART", {
        bookId: this.bookId,
        partId: this.partId,
        rating: this.rating,
      });
      this.finishDialog = false;
    },
  },
  components: {
    BookPartContent,
    BookPartWords,
  },
};
</script>

<style>
</style>
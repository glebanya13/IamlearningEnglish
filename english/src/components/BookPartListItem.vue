<template>
  <v-card color="accent" class="white--text">
    <v-card-title primary-title class="headline">{{ part.title }}</v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <div v-if="finishedDate()" class="mr-2">
        <v-icon dark>check</v-icon>
        Прочитано {{ finishedDate() | formattedDate }}
      </div>
      <v-btn
        text
        class="primary"
        v-if="isUserBookLoaded"
        :to="{ name: 'bookPart', params: { bookId: bookId, partId: part.id } }"
        >Открыть</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    part: {
      type: Object,
      required: true,
    },
    bookId: {
      required: true,
    },
  },
  computed: {
    ...mapGetters(["isUserAuthenticated", "userData", "getProcessing"]),
    isUserBookLoaded() {
      return (
        this.isUserAuthenticated &&
        !this.getProcessing &&
        !!this.userData.books[this.bookId]
      );
    },
  },
  methods: {
    finishedDate() {
      if (!this.isUserBookLoaded) return false;

      let book = this.userData.books[this.bookId];
      if (book && book.parts[this.part.id])
        return book.parts[this.part.id].finishedDate;
    },
  },
};
</script>
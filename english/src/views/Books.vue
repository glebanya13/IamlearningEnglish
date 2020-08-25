<template>
<v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm-1>
      <books-list></books-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import BooksList from '../components/BooksList'
export default {
  components:{
    BooksList
  }
}
</script>

<style>

</style>
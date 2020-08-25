<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm-1>
        <v-tabs v-model="tabMode" fixed-tabs>
          <v-tab :key="'data'" ripple>
              Мои данные
          </v-tab>
          <v-tab :key="'books'">
              Мои книги
          </v-tab>
          <v-tab :key="'words'">
              Мои слова
          </v-tab>
          <v-tab-item :key="'data'">
            <user-profile-data></user-profile-data>
          </v-tab-item>
          <v-tab-item :key="'books'">
            <books-list :onlyMy="true"></books-list>
          </v-tab-item>
          <v-tab-item :key="'words'">
            <user-profile-words></user-profile-words>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import userProfileData from '../components/UserProfileData'
import userProfileWords from '../components/UserProfileWords'
import booksList from '../components/BooksList'

export default {
  data(){
    return {
      tabMode: 'data'
    }
  },
  components:{
    userProfileData,
    userProfileWords,
    booksList
  }
}
</script>

<style>

</style>
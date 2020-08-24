<template>
  <div class="headline">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
        <v-avatar v-on="on" v-if="word.type == 1" color="indigo" size="size">
            <span class="white--text">W</span>
        </v-avatar>
        </template>
        <span>Слово</span>
    </v-tooltip>
    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
        <v-avatar v-on="on" v-if="word.type == 2" color="teal" size="size">
            <span class="white--text">RW</span>
        </v-avatar>
        </template>
        <span>Выражение</span>
    </v-tooltip>
    {{getFullOriginalWord(word) }} <v-icon v-if="canPronounceWord" @click="pronounce(word)">music_note</v-icon>
    </div>
</template>

<script>
import { getFullOriginalWord } from "../helpers/words";

export default {
    props:{
        word: Object,
        size: Number,
        showAudio: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            canPronounceWord: false,
            voice: null,
        }
    },
    methods:{
        getFullOriginalWord: getFullOriginalWord,
        pronounce(word){
            let msg = new SpeechSynthesisUtterance()
            msg.voice = this.voice
            msg.rate = 1
            msg.pitch = 1
            msg.value = 1
            msg.text = this.getFullOriginalWord(word)

            speechSynthesis.speak(msg)
        }
    },
    created(){
        if(this.showAudio)
            if('speechSynthesis' in window){
                let germanVoices = speechSynthesis.getVoices().filter(v => v.name.toLowerCase().indexOf('deutsch') >=1)
                if(germanVoices.length)
                    this.canPronounceWord = true
                    this.voice = germanVoices[0]
            }
    }
}
</script>

<style>

</style>
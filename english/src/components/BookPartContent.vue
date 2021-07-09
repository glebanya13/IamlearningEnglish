<template>
  <v-card class="pa-2">
    <div>
      <div class="display-1">{{ part.bookTitle }}</div>
      <div class="headline">{{ part.partTitle }}</div>
      <v-divider class="black"></v-divider>
    </div>
    <div class="text-center mt-2 mb-2 primary">
      <youtube :video-id="part.youtube_id"></youtube>
    </div>
    <div class="mt-2">
      <v-slider
        v-model="fontSize"
        :label="`Размер шрифта (${fontSize})`"
        step="1"
        max="30"
        min="10"
        tick-size="5"
      ></v-slider>
      <v-tabs v-model="tabMode" fixed-tabs>
        <v-tab :key="'english'" ripple> Текст с подсказками </v-tab>
        <v-tab :key="'sidebyside'"> Параллельно </v-tab>
        <v-tab-item :key="'english'">
          <div v-for="(paragraph, i) in part.content" :key="`par1${i}`">
            <span>&nbsp;&nbsp;</span>
            <span
              v-for="(sentence, y) in paragraph.sentences"
              :key="`par1${i}sen1${y}_orig`"
              :style="textStyle"
            >
              <span>
                {{ sentence.origText }}
              </span>
              <v-icon @click.prevent="toggleVisibility(i, y)" :size="fontSize"
                >help</v-icon
              >
              <span
                v-if="getVisibilityFlag(i, y).value"
                class="primary--text"
                style="font-weight: bold"
              >
                {{ sentence.transText }}
              </span>
            </span>
          </div>
        </v-tab-item>
        <v-tab-item :key="'sidebyside'">
          <v-container>
            <v-layout
              row
              wrap
              v-for="(paragraph, i) in part.content"
              :key="`par2${i}`"
            >
              <v-flex xs6>
                <span>&nbsp;&nbsp;</span>
                <span
                  v-for="(sentence, y) in paragraph.sentences"
                  :key="`par2${i}sen2${y}_orig`"
                  :style="textStyle"
                >
                  <span>
                    {{ sentence.origText }}
                  </span>
                </span>
              </v-flex>
              <v-flex xs6>
                <span>&nbsp;&nbsp;</span>
                <span
                  v-for="(sentence, y) in paragraph.sentences"
                  :key="`par2${i}sen2${y}_trans`"
                  :style="textStyle"
                >
                  <span>
                    {{ sentence.transText }}
                  </span>
                </span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-tab-item>
      </v-tabs>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      tabMode: "english",
      visibilityKeys: [],
      fontSize: 18,
    };
  },
  props: {
    part: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getVisibilityFlag(i, y) {
      return this.visibilityKeys.find((k) => k.key == `${i}${y}`);
    },
    toggleVisibility(i, y) {
      let flag = this.getVisibilityFlag(i, y);
      flag.value = !flag.value;
    },
  },
  created() {
    for (var i = 0; i < this.part.content.length; i++) {
      for (var y = 0; y < this.part.content[i].sentences.length; y++) {
        this.visibilityKeys.push({
          key: `${i}${y}`,
          value: false,
        });
      }
    }
  },
  computed: {
    textStyle() {
      return { fontSize: `${this.fontSize}px` };
    },
  },
};
</script>
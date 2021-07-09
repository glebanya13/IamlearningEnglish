<template>
  <div>
    <section>
      <v-parallax :src="require('../assets/4.jpg')" height="450">
        <v-layout column align-center justify-center class="white--text">
          <img src="../assets/3.png" alt="Ich Lerne Deutsch" height="200" />
          <h1 class="white--text mb-2 display-2 text-xs-center">
            Я учу Немецкий Язык!
          </h1>
        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-layout column wrap class="my-2" aligh-center>
        <v-flex xs12 sm4 class="my-3">
          <div class="text-xs-center">
            <h2 class="headline">Учи немецкий с удовольствием!</h2>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2"
                      >book</v-icon
                    >
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Читай книги</div>
                  </v-card-title>
                  <v-card-text class="layout justify-center">
                    Читай адаптированные и неадаптированные немецкие книги,
                    слушай песни и сказки, учи пословицы и поговорки. Выбирай
                    то, что нравится лично тебе!
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2"
                      >spellcheck</v-icon
                    >
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Учи слова</div>
                  </v-card-title>
                  <v-card-text class="layout justify-center">
                    Учи новые слова и выражения: каждый текст содержит набор
                    самых интересных и важных слов, которые Вы можете добавить в
                    свой личный список для изучения
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2"
                      >devices</v-icon
                    >
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">
                      Учись на любом устройстве
                    </div>
                  </v-card-title>
                  <v-card-text class="layout justify-center">
                    Этот веб-сайт оптимизирован для работы на любом устройстве:
                    учись со своего стационарного компьютера, планшета или
                    мобильного телефона
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>

    <section class="mt-8">
    <v-row>
        <v-col class="layout ml-16 justify-center">
      <v-card class="elevation-0 transparent" width="420px">
        <v-card-title primary-title class="layout justify-center">
          <div class="headline">О проекте</div>
        </v-card-title>
        <v-card-text>
          Этот веб-сайт является дополнением к YouTube-каналу. С любыми
          вопросами или предложениями обращайтесь сюда
        </v-card-text>
        <v-list class="transparent">
          <v-list-item>
            <v-list-item-action>
              <v-icon class="blue--text text-lighten-2">email</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                >glebshershniow006.glu@gmail.com</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
        </v-col>
        <v-col>
      <v-card class="elevation-0 transparent" width="420px">
        <v-card-title primary-title class="layout justify-center">
          <div class="headline">Помощь проекту</div>
        </v-card-title>
        <v-card-text>
             Если этот ресурс был Вам полезен и Вы хотели бы отблагодарить автора, то Вы можете сделать это тут:
        </v-card-text>
        <v-card-actions>
            <v-btn rounded small class="black--text ml-8" color="warning">Donate</v-btn>
        </v-card-actions>
      </v-card>
        </v-col>
    </v-row>
    </section>
  </div>
</template>

<script>
export default {};
</script>
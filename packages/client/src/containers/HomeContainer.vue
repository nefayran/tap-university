<template>
  <v-card class="mx-auto">
    <template v-slot:title> Project Description </template>

    <v-card-text>
      <p>For the entrance examination of Tap University, which emphasizes comprehensive ability,</p>
      <p>
        applicants will be selected in two stages based on the results of the first examination (5 subjects: English, mathematics, science, Japanese,
        and Geography/History,
      </p>
      <p>each with a maximum score of 100 points).</p>
      <br />
      <h2>Key features:</h2>
      <v-list>
        <v-list-item> <b>Divisions Dashboard:</b> You can manipulate and configure system through CRUD operations with divisions </v-list-item>
        <v-list-item> <b>Subjects Dashboard:</b> You can manipulate and configure system through CRUD operations with subjects </v-list-item>
        <v-list-item> <b>Conditions Dashboard:</b> You can manipulate and configure system through flexible wizard of conditions </v-list-item>
        <v-list-item>
          <b>Examine Dashboard:</b> You can input examine results through user friendly data table and see your results on fly
        </v-list-item>
      </v-list>
      <h2>Tech stack:</h2>
      <v-list>
        <v-list-item> <b>Frontend:</b> VueJS 3, Vuetify 3, Pinia </v-list-item>
        <v-list-item> <b>Backend:</b> NestJS, Swagger, CORS, Mongoose </v-list-item>
        <v-list-item> <b>Database:</b> MongoDB </v-list-item>
        <v-list-item> <b>Docker:</b> Docker, Docker compose </v-list-item>
        <v-list-item> <b>Testing:</b> Unit, E2E tests </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup></script>

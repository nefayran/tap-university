<template>
  <v-container class="fill-height">
    <v-card width="100%">
      <v-tabs v-model="tab">
        <v-tab value="one">Divisions</v-tab>
        <v-tab value="two">Subjects</v-tab>
        <v-tab value="three">Conditions</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="one">
            <DivisionsContainer />
          </v-window-item>

          <v-window-item value="two">
            <SubjectsContainer />
          </v-window-item>

          <v-window-item value="three"> Three </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import { computed, onMounted } from 'vue'
// import { useSubjectStore } from '../store/subject'
import DivisionsContainer from './configuration/DivisionsContainer.vue'
import SubjectsContainer from './configuration/SubjectsContainer.vue'
// const store = useSubjectStore()

const tab = ref(0)
// const dialogDelete = ref(false)

// const dialog = ref(false)

// const editedItem = ref({
//   id: '64bfbbf64b8edde7753388df',
//   title: 'Common',
//   subjects: ['English']
// })

// const close = () => {
//   dialog.value = false
//   // this.$nextTick(() => {
//   //     this.editedItem = Object.assign({}, this.defaultItem)
//   //     this.editedIndex = -1
//   // })
// }

// const save = () => {
//   // if (this.editedIndex > -1) {
//   //     Object.assign(this.desserts[this.editedIndex], this.editedItem)
//   // } else {
//   //     this.desserts.push(this.editedItem)
//   // }
//   close()
// }

// const getSubjects = computed(() => {
//   return store.getSubjects
// })

// const closeDelete = () => {
//   dialogDelete.value = false
//   // this.$nextTick(() => {
//   //   this.editedItem = Object.assign({}, this.defaultItem)
//   //   this.editedIndex = -1
//   // })
// }

// const editItem = (item) => {
//   // this.editedIndex = this.desserts.indexOf(item)
//   // this.editedItem = Object.assign({}, item)
//   dialog.value = true
// }

// const deleteItemConfirm = () => {
//   // this.desserts.splice(this.editedIndex, 1)
//   closeDelete()
// }

// onMounted(() => {
//   store.fetchSubjects()
// })
</script>

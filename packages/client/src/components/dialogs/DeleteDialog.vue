<template>
  <v-dialog :value="dialog" max-width="500px">
    <v-card>
      <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="black-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
        <v-btn color="black-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
// Props:
defineProps({
  dialog: Boolean
})

// Emits
const emit = defineEmits(['update:modelValue', 'deleteSubmit'])

const closeDelete = () => {
  emit('update:modelValue', false)
}

const deleteItemConfirm = () => {
  closeDelete()
  emit('deleteSubmit', true)
}
</script>

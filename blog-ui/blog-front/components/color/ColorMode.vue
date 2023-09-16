<script lang="ts" setup>
const colorMode = useColorMode()
function changePreference() {
  if (colorMode.value === 'light') {
    colorMode.preference = 'dark'
  } else {
    colorMode.preference = 'light'
  }
}
</script>

<template>
  <div class="cursor-pointer inline-block select-none">
    <div @click="changePreference">
      <Icon name="solar:sun-2-outline" />
    </div>
  </div>
</template>

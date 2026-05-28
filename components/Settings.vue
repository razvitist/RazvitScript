<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useSettings } from '@/composables/useSettings';
import Protection from '@/components/Protection.vue';
import ProtectionSettings from '@/components/ProtectionSettings.vue';

const { settings, isSaved, loadSettings, saveSettings } = useSettings();

const isLocked = ref(false);

onMounted(async () => {
  await loadSettings();
  if (settings.value.protection.protectionType !== 'NO') {
    isLocked.value = true;
  }
});
</script>

<template>
  <Protection
    v-if="isLocked"
    :protection="settings.protection"
    @unlocked="isLocked = false"
  />

  <div v-else>
    <h3>Script</h3>
    <textarea
      v-model="settings.contentScript"
      cols="30"
      rows="5"
      id="content"
      placeholder="// This script will be injected into the page"
    ></textarea>

    <ProtectionSettings v-model="settings.protection" />

    <button
      @click="saveSettings"
      id="saveBtn"
      :disabled="
        (settings.protection.protectionType === 'PASSWORD' &&
          !settings.protection.password) ||
        (settings.protection.protectionType === 'TEXT' &&
          !settings.protection.customText) ||
        isSaved
      "
    >
      {{ isSaved ? 'Saved!' : 'Save' }}
    </button>
  </div>
</template>

<style scoped>
textarea {
  font-size: 0.8rem !important;
  font-family:
    Consolas,
    Monaco,
    Lucida Console,
    Liberation Mono,
    DejaVu Sans Mono,
    Bitstream Vera Sans Mono,
    Courier New,
    monospace;
}
</style>

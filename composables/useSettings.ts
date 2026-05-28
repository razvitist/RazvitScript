import { ref } from 'vue';
import { browser } from 'wxt/browser';
import type { SettingsData } from '@/utils/types';

export function useSettings() {
  const settings = ref<SettingsData>({
    contentScript: '',
    protection: {
      protectionType: 'NO',
      password: '',
      customText: 'Am I really doing what I am supposed to be doing right now?',
      mathLevel: 3,
      morseLength: 3,
    },
  });

  const isSaved = ref(false);

  const loadSettings = async () => {
    const res = await browser.storage.local.get(['settings']);
    if (res.settings) {
      settings.value = { ...settings.value, ...(res.settings as SettingsData) };
    }
  };

  const saveSettings = () => {
    browser.storage.local.set({ settings: settings.value }, () => {
      browser.runtime.sendMessage({ type: 'UPDATE_BACKGROUND' });
      isSaved.value = true;
      setTimeout(() => {
        isSaved.value = false;
      }, 2000);
    });
  };

  return {
    settings,
    isSaved,
    loadSettings,
    saveSettings,
  };
}

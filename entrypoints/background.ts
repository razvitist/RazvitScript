import type { SettingsData } from '@/utils/types';

export default defineBackground(() => {
  async function runBackgroundScript() {
    browser.storage.local.get(['settings'], async (res) => {
      const settings = res.settings as SettingsData | undefined;
      const contentScript = settings?.contentScript;

      if (contentScript) {
        try {
          if (browser.userScripts.configureWorld) {
            await browser.userScripts.configureWorld({
              messaging: true,
            });
          }
          await browser.userScripts.unregister().catch(() => {});
          await browser.userScripts.register([
            {
              id: 'dynamicContentScript',
              matches: ['<all_urls>'],
              js: [{ code: contentScript }],
              runAt: 'document_end',
            },
          ]);
        } catch (e) {
          console.error('User script registration error:', e);
        }
      }
    });
  }

  runBackgroundScript();

  browser.runtime.onMessage.addListener((message) => {
    if (message.type === 'UPDATE_BACKGROUND') {
      runBackgroundScript();
    }
  });
});

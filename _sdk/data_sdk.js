// =======================================
//  DATA SDK — Basic storage for config
//  (Standalone Version for GitHub Pages)
// =======================================

(function (global) {
  const STORAGE_KEY = "ds_portfolio_config";

  const DataSDK = {
    loadConfig(defaultConfig) {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          console.log("%cLoaded config from localStorage", "color: #f59e0b");
          return { ...defaultConfig, ...JSON.parse(saved) };
        }
      } catch (e) {
        console.warn("Failed to load config:", e);
      }
      return defaultConfig;
    },

    saveConfig(config) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
        console.log("%cConfig saved to localStorage", "color: #10b981");
      } catch (e) {
        console.warn("Failed to save config:", e);
      }
    }
  };

  // Listen updates from elementSdk
  Object.defineProperty(global, "elementSdk", {
    set(value) {
      global.__elementSdk = value;

      // wrap setConfig so it also saves to storage
      const originalSetConfig = value.setConfig.bind(value);

      value.setConfig = function (newConfig) {
        originalSetConfig(newConfig);
        DataSDK.saveConfig(value.getConfig());
      };
    },
    get() {
      return global.__elementSdk;
    }
  });

  global.dataSdk = DataSDK;

})(window);

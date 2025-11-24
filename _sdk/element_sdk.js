// =======================================
//  ELEMENT SDK — Standalone Frontend SDK
//  (By ChatGPT Custom Version)
// =======================================

(function (global) {
  const ElementSDK = {
    config: {},
    listeners: {
      onConfigChange: null,
      mapToCapabilities: null,
      mapToEditPanelValues: null,
    },

    init({ defaultConfig, onConfigChange, mapToCapabilities, mapToEditPanelValues }) {
      this.config = { ...defaultConfig };
      this.listeners.onConfigChange = onConfigChange;
      this.listeners.mapToCapabilities = mapToCapabilities;
      this.listeners.mapToEditPanelValues = mapToEditPanelValues;

      // Run first update
      if (typeof onConfigChange === "function") {
        onConfigChange(this.config);
      }

      console.log("%cElementSDK initialized", "color: #3b82f6; font-weight: bold;");
    },

    getConfig() {
      return this.config;
    },

    setConfig(newConfig) {
      this.config = { ...this.config, ...newConfig };

      console.log("%cElementSDK config updated:", "color: #22c55e", newConfig);

      if (typeof this.listeners.onConfigChange === "function") {
        this.listeners.onConfigChange(this.config);
      }
    },

    getCapabilities() {
      if (typeof this.listeners.mapToCapabilities === "function") {
        return this.listeners.mapToCapabilities(this.config);
      }
      return {};
    },

    getEditPanelValues() {
      if (typeof this.listeners.mapToEditPanelValues === "function") {
        return this.listeners.mapToEditPanelValues(this.config);
      }
      return new Map();
    }
  };

  global.elementSdk = ElementSDK;

})(window);

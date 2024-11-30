const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {wrapWithReanimatedMetroConfig} = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */

// Varsayılan Metro yapılandırmasını alın
const defaultConfig = getDefaultConfig(__dirname);

// Özel yapılandırmanızı ekleyin (gerekirse buraya özel kurallar ekleyebilirsiniz)
const customConfig = {
  resolver: {
    assetExts: [...defaultConfig.resolver.assetExts, 'png', 'jpg', 'jpeg', 'gif'],
  },
};

// Varsayılan ve özel yapılandırmaları birleştirin
const mergedConfig = mergeConfig(defaultConfig, customConfig);

// `react-native-reanimated` ile uyumlu hale getirin
const reanimatedConfig = wrapWithReanimatedMetroConfig(mergedConfig);

// Son yapılandırmayı dışa aktarın
module.exports = reanimatedConfig;

import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent chama AppRegistry.registerComponent('main', () => App);
// Também garante que, se você carregar o aplicativo no Expo Go ou em uma compilação nativa,
// o ambiente está configurado adequadamente
registerRootComponent(App);

Vue.use(Localize);
 
let localize = Localize.config({
  default: 'en',
  available: ['en-US', 'es-SP', 'pr-BR'],
  fallback: '?',
  localizations: {
    "en-US": {
      header: {
        title: 'English'
      }
    },
    "es-SP": {
      header: {
        title: 'Spanish'
      }
    },
    "pr-BR": {
      header: {
        title: 'Portuguese'
      }
    }
  }
});
 
 new Vue({
   el: '#app',
   localize
 });
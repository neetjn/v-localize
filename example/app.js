Vue.use(Localize);

let localize = Localize.config({
	default: 'en',
	available: ['en', 'sp', 'pr', 'ch'],
	not_found: '?',
	localizations: {
		en: {
			header: {
				title: 'English'
			}
		},
		sp: {
			header: {
				title: 'Spanish'
			}
		},
		pr: {
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

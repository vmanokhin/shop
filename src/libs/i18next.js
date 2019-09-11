import i18next from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

export const languages = ['en', 'ru'];

i18next
  .use(Backend)
  .use(LanguageDetector)
	.use(initReactI18next)
	.init({
		lowerCaseLng: true,
		whitelist: languages,
		preload: ['en'],
		fallbackLng: 'en',
		returnNull: false, // from env
		debug: true, // from env
		backend: {
			loadPath: '/locales/{{lng}}.json'
		},
		detection: {
			order: ['localStorage', 'navigator']
		},
		react: {
			wait: true
		}
	});

	export default i18next;
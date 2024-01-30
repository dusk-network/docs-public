import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.dusk.network',
	integrations: [
		starlight({
			title: 'Wiki',
			logo: {
				light: './src/assets/logo-light.svg',
				dark: './src/assets/logo-dark.svg',
			},
			social: {
				'github': 'https://github.com/dusk-network',
				'x.com': 'https://x.com/duskfoundation',
				'discord': 'https://discord.com/invite/dusknetwork',
				'linkedin': 'https://www.linkedin.com/company/dusknetwork/',
				'telegram': 'https://t.me/DuskNetwork',
				'youtube': 'https://www.youtube.com/c/DuskNetwork',
				'reddit': 'https://www.reddit.com/r/dusknetwork',
			},
			customCss: [
				// Relative path to your custom CSS file
				'./src/styles/custom.css',
			],
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', link: '/guides/example/' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});

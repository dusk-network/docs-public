import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
	site: "https://docs.dusk.network",
	integrations: [
		starlight({
			title: "Documentation",
			logo: {
				light: "./src/assets/logo-light.svg",
				dark: "./src/assets/logo-dark.svg",
			},
			components: {
				PageFrame: "./src/components/PageFrame.astro",
				Header: "./src/components/Header.astro",
				ContentPanel: "./src/components/ContentPanel.astro",
			},
			social: {
				github: "https://github.com/dusk-network",
				"x.com": "https://x.com/duskfoundation",
				discord: "https://discord.com/invite/dusknetwork",
				linkedin: "https://www.linkedin.com/company/dusknetwork/",
				telegram: "https://t.me/DuskNetwork",
				youtube: "https://www.youtube.com/c/DuskNetwork",
				reddit: "https://www.reddit.com/r/dusknetwork",
			},
			customCss: ["./src/fonts/font-face.css", "./src/styles/custom.css"],
			pagination: false,
			tableOfContents: false,
			sidebar: [
				{
					label: 'Learn Dusk',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Welcome', link: '/start' },
						{ label: 'Vision', link: '/learn/vision/' },
                        { 
                            label: 'Overview',
                            items: [
                                {label: "Introduction", link: 'learn/overview'},
                                {label: "Tech Primer", link: 'learn/overview'},
                                {label: "Resources", link: 'learn/additional-resources'},
                            ],
                        },
                        { 
                            label: 'Economic Info',
                            items: [
                                {label: "Tokenomics", link: 'learn/tokenomics'},
                                {label: "Gas", link: 'learn/overview'},
                                {label: "Economic Protocol", link: 'learn/overview'},
                            ],
                        }
					],
				},
				{
					label: "Getting Started",
					items: [
						{
							label: "Node Setup",
							items: [
								{ label: "Build from source", link: 'node-setup/source' },
								{ label: "Docker image", link: 'node-setup/docker' },
								{ label: "Installer", link: 'node-setup/installer' },
							],
						},
						{ label: "Piecrust And Contracts on Dusk", link: "/guides/example/" },
						{ 
						    label: "Wallets", 
                            items: [
                                {label: "Introduction", link: 'wallets/overview'},
                                {label: "dusk-wallet.js", link: 'wallets/dusk-wallet-js'},
                                {label: "wallet core", link: 'wallets/wallet-core'},
                            ],
                        },
					],
				},
				{
					label: "ITN",
					items: [
						{ label: "Dusk-ERC20 Staking", link: "/itn/ethereum-staking/" },
						{ label: "ITN Node Running", link: "/wallets/overview/" },
						{ label: "Get Support", link: "/wallets/overview/" },
					],
				},
				{
					label: "Community",
					items: [
						{ label: "Ecosystem Information", link: "community/overview" },
					],
				},
			],
		}),
	],
});

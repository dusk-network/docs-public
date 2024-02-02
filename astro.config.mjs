import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';

// https://astro.build/config
export default defineConfig({
	site: "https://docs.dusk.network",
	markdown: {
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeMathjax],
	},
	integrations: [
		starlight({
			title: "Documentation",
			favicon: "./src/assets/favicon.svg",
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
						{ label: 'Welcome', link: 'learn/welcome' },
						{
							label: 'Overview',
							items: [
								{ label: "Introduction", link: 'learn/overview/intro/' },
								{ label: 'Vision', link: 'learn/overview/vision/' },
								{ label: "Resources", link: 'learn/overview/additional-resources' },
							],
						},
						{
							label: 'Economic Info',
							items: [
								{ label: "Tokenomics", link: 'learn/economy/tokenomics' },
								{ label: "Gas", link: 'learn/economy/gas' },
								{ label: "Economic Protocol", link: 'learn/economy/economic-protocol' },
								{ label: "Succinct Attestation", link: 'learn/economy/succinct-attestation' },
							],
						},
						{
							label: 'Digital Assets',
							items: [
								{ label: "MiCA", link: 'learn/digital-assets/mica' },
								{ label: "Security Lifecycle", link: 'learn/digital-assets/security-tokens' },
								{ label: "Security Dematerialization", link: 'learn/digital-assets/dematerialization' },
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
						{
							label: "VM And Contracts",
							items: [
								{ label: "Piecrust Overview", link: '/getting-started/vm/overview/' },
								{ label: "Smart Contract Example: Counter", link: '/getting-started/vm/counter-example/' },
								{ label: "Piecrust vs RuskVM1.0", link: '/getting-started/vm/comparison-with-vm1/' },
							],
						},
						{ label: "", link: "/guides/example/" },
						{
							label: "Wallets",
							items: [
								{ label: "Introduction", link: '/getting-started/wallets/overview' },
								{ label: "dusk-wallet.js", link: '/getting-started/wallets/dusk-wallet-js' },
								{ label: "wallet core", link: '/getting-started/wallets/wallet-core' },
							],
						},
					],
				},
				{
					label: "ITN",
					items: [
						{ label: "Dusk-ERC20 Staking", link: "/itn/erc20-staking/" },
						/*
						{ label: "ITN Node Running", link: "/wallets/overview/" },
						{ label: "Get Support", link: "/wallets/overview/" },
						*/
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

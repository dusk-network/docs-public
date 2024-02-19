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
			title: "DOCUMENTATION",
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
				{ label: 'Welcome', link: 'welcome' },
				{
					label: 'Learn Dusk',
					items: [
						// Each item here is one entry in the navigation menu.
						{
							label: 'Dusk Protocol',
							items: [
								{ label: "Overview", link: 'learn/dusk-protocol/overview' },
								{ label: 'Core Values', link: 'learn/dusk-protocol/core-values' },
								{ label: "Resources", link: 'learn/dusk-protocol/additional-resources' },
							],
						},
						{
							label: 'Economic Information',
							items: [
								{ label: "Tokenomics", link: 'learn/economic-information/tokenomics' },
								{ label: "Gas Management", link: 'learn/economic-information/gas-management' },
								{ label: "Economic Protocol", link: 'learn/economic-information/economic-protocol' },
								{ label: "Succinct Attestation Consensus", link: 'learn/economic-information/succinct-attestation' },
							],
						},
						{
							label: 'Digital Assets',
							items: [
								{ label: "MiCA", link: 'learn/digital-assets/mica' },
								{ label: "Security Lifecycle", link: 'learn/digital-assets/lifecycle' },
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
								{ label: "Overview", link: '/getting-started/node-setup/overview' },
								{ label: "Node Requirements", link: '/getting-started/node-setup/node-requirements' },
								{ label: "Build from Source", link: '/getting-started/node-setup/build-from-source' },
								{ label: "Docker Image", link: '/getting-started/node-setup/docker-image' },
								{ label: "Manual Resync", link: '/getting-started/node-setup/manual-resync' },
							],
						},
						{
							label: "Smart Contracts",
							items: [
								{ label: "Piecrust VM and Smart Contracts", link: '/getting-started/vm/piecrust' },
								{ label: "Smart Contract Example", link: '/getting-started/vm/counter-example' },
								{ label: "Piecrust vs Rusk VM 1.0", link: '/getting-started/vm/comparison-with-vm1' },
							],
						},
						{
							label: "Wallets",
							items: [
								{ label: "The Wallet Stack", link: '/getting-started/wallet/wallet-stack' },
								{ label: "Wallet Core Library", link: '/getting-started/wallet/wallet-core' },
								//{ label: "Wallet JS Library", link: '/getting-started/wallet/wallet-js' },
							],
						},
						{
							label: "Digital Identity",
							items: [
								{ label: "Citadel Protocol", link: '/getting-started/digital-identity/protocol' },
								{ label: "Citadel SDK", link: '/getting-started/digital-identity/sdk' },
							],
						},
					],
				},
				{
					label: "ITN",
					items: [
						{ label: "Dusk-ERC20 Staking", link: "/itn/erc20-staking/" },
						{ label: "ITN Node Running", link: "/itn/node-running-guide/" },
						{ label: "Testnet Faucet", link: "/itn/testnet-faucet/" },
						{ label: "Node upgrading", link: "/itn/upgrade-node/" },
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

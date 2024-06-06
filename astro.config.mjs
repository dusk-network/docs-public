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
	redirects: {
		'/itn/fast-sync': '/nocturne/fast-sync',
		'/itn/node-running-guide': '/nocturne/node-running-guide',
		'/itn/testnet-faucet': '/nocturne/testnet-faucet',
		'/itn/upgrade-node': '/nocturne/upgrade-node',
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
				Sidebar: './src/overrides/Sidebar.astro',
				SiteTitle: './src/overrides/SiteTitle.astro',
			},
			social: {
				github: "https://github.com/dusk-network",
				"x.com": "https://x.com/duskfoundation",
				discord: "https://discord.com/invite/dusk-official",
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
								{ label: "Introduction", link: '/getting-started/vm/introduction-sc' },
								{
									label: "Smart Contracts on Dusk",
									items: [
										{ label: "Overview", link: '/getting-started/vm/01-sc-on-dusk/01-smart_contracts_on_dusk' },
										{ label: "Transactions", link: '/getting-started/vm/01-sc-on-dusk/02-transactions' },
										{ label: "Keys", link: '/getting-started/vm/01-sc-on-dusk/03-keys' },
										{ label: "Functions", link: '/getting-started/vm/01-sc-on-dusk/04-functions' },
										{ label: "Token Standards", link: '/getting-started/vm/01-sc-on-dusk/05-token_standards' },
									],
								},
								{
									label: "Components",
									items: [
										{ label: "Piecrust", link: '/getting-started/vm/02-components/01-piecrust' },
										{ label: "Rusk", link: '/getting-started/vm/02-components/02-rusk' },
										{ label: "Rues", link: '/getting-started/vm/02-components/03-rues' },
									],
								},
								{
									label: "Getting Started",
									items: [
										{ label: "Dependencies", link: '/getting-started/vm/04-getting-started/01-dependencies' },
										{ label: "IDE", link: '/getting-started/vm/04-getting-started/02-ide' },
									],
								},
								{
									label: "Guides",
									items: [
										{ label: "Debugging", link: '/getting-started/vm/05-guides/01-debugging' },
										{ label: "Testing", link: '/getting-started/vm/05-guides/02-testing' },
										{ label: "Compiling", link: '/getting-started/vm/05-guides/03-compiling' },
										{ label: "Deploying", link: '/getting-started/vm/05-guides/04-deploying' },
										{ label: "Upgrades", link: '/getting-started/vm/05-guides/05-upgrades' },
										{ label: "Troubleshooting", link: '/getting-started/vm/05-guides/06-troubleshooting' },
									],
								},

								{
									label: "Examples",
									items: [
										{ label: "Counter Example", link: '/getting-started/vm/03-examples/01-counter-example' },
										{ label: "Comparison with VM1", link: '/getting-started/vm/03-examples/02-comparison-with-vm1' },
										{ label: "Token Example", link: '/getting-started/vm/03-examples/03-token-example' },
										{ label: "Multisig", link: '/getting-started/vm/03-examples/04-multisig' },
									],
								},
								
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
					label: "Nocturne",
					items: [
						{ label: "Node Running", link: "/nocturne/node-running-guide/" },
						{ label: "Faucet", link: "/nocturne/testnet-faucet/" },
						{ label: "Node upgrading", link: "/nocturne/upgrade-node/" },
						{ label: "Fast syncing", link: "/nocturne/fast-sync/" },
					],
				},
				{
					label: "Pre-Mainnet",
					items: [
						{ label: "Dusk-ERC20 Staking", link: "/pre-mainnet/erc20-staking/" },
						{ label: "BEP2 migration", link: "/pre-mainnet/bep2-migration/" },
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

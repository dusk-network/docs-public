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
					label: 'Start Here',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Welcome', link: '/start' },
						{ label: 'About Dusk', link: '/learn/vision/' },
					],
				},
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Example Guide", link: "/guides/example/" },
            { label: "Wallets", link: "/wallets/overview/" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],
});

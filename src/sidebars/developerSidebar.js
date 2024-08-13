import { createGroup, createLink } from "../helpers/sidebarEntryHelpers";

export default function sidebar(currentPath) {
    return [
        createLink("Overview", "/developer/overview", currentPath),
        createGroup("Smart Contracts", currentPath, [
            {
                type: "link",
                label: "Introduction",
                href: "/developer/smart-contract/introduction",
            },
            {
                type: "link",
                label: "Getting Started",
                href: "/developer/smart-contract/getting-started",
            },
            {
                type: "group",
                label: "Guides",
                entries: [
                    { label: "My first contract", href: '/developer/smart-contract/02-guides/01-my-first-contract' },
                    { label: "Compiling", href: '/developer/smart-contract/02-guides/02-compiling' },
                    { label: "Deploying", href: '/developer/smart-contract/02-guides/03-deploying' },
                    { label: "Debugging", href: '/developer/smart-contract/02-guides/04-debugging' },
                    { label: "Testing", href: '/developer/smart-contract/02-guides/05-testing' },
                    { label: "Upgrades", href: '/developer/smart-contract/02-guides/06-upgrades' },
                    { label: "Interacting", href: '/developer/smart-contract/02-guides/07-interacting' }
                ],
                collapsed: true,
            },
            {
                type: "link",
                label: "Core Concepts",
                href: "/developer/smart-contract/core-concepts",
            },
            {
                type: "link",
                label: "FAQ",
                href: '/developer/smart-contract/faq'
            },
            {
                type: "link",
                label: "Cheat Sheet",
                href: "/developer/smart-contract/cheat-sheet",
            }
        ], false),
        createGroup("Integrations", currentPath, [
            { label: "Introduction", href: '/developer/integrations/introduction' },
            { label: "The Wallet Stack", href: '/developer/integrations/wallet-stack' },
            { label: "Wallet Core Library", href: '/developer/integrations/wallet-core' },
            { label: "Execution Core", href: '/developer/integrations/execution-core' },
        ],
            false),
        createGroup("Digital Identity", currentPath, [
            { label: "Citadel Protocol", href: '/developer/digital-identity/protocol' },
            { label: "Citadel SDK", href: '/developer/digital-identity/sdk' },
        ],
            false),
        createLink("Dusk Improvement Proposals", "/developer/dips", currentPath),
    ];
}
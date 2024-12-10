import { createGroup, createLink } from "../helpers/sidebarEntryHelpers";

export default function sidebar(currentPath) {
    return [
        createLink("Overview", "/developer/overview", currentPath),
        createGroup("Develop Smart Contracts", currentPath, [
            {
                type: "link",
                label: "Learn the Basics",
                href: "/developer/smart-contract/introduction",
            },
            {
                type: "link",
                label: "Get Started",
                href: "/developer/smart-contract/getting-started",
            },
            {
                type: "group",
                label: "Guides",
                entries: [
                    { label: "Develop", href: '/developer/smart-contract/guides/01-my-first-contract' },
                    { label: "Compile", href: '/developer/smart-contract/guides/02-compiling' },
                    { label: "Deploy", href: '/developer/smart-contract/guides/03-deploying' },
                    { label: "Debug", href: '/developer/smart-contract/guides/04-debugging' },
                    { label: "Test", href: '/developer/smart-contract/guides/05-testing' },
                    { label: "Upgrade", href: '/developer/smart-contract/guides/06-upgrades' },
                    { label: "Interact", href: '/developer/smart-contract/guides/07-interacting' },
                    { label: "Multisig", href: '/developer/smart-contract/guides/08-multisig' }
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
        createGroup("Integrate with Dusk", currentPath, [
            { label: "Introduction", href: '/developer/integrations/introduction' },
            { label: "The Wallet Stack", href: '/developer/integrations/wallet-stack' },
            { label: "Wallet Core Library", href: '/developer/integrations/wallet-core' },
            //{ label: "Execution Core", href: '/developer/integrations/execution-core' },
            { label: "W3sper SDK", href: '/developer/integrations/w3sper' },
            { label: "RUES", href: '/developer/integrations/rues' },
            { label: "Integrate with Exchanges", href: '/developer/integrations/exchanges' },
        ],
            false),
        createGroup("Use Digital Identity", currentPath, [
            { label: "Citadel Protocol", href: '/developer/digital-identity/protocol' },
            { label: "Citadel SDK", href: '/developer/digital-identity/sdk' },
        ],
            false),
        createLink("Contribute to Dusk", "/developer/dips", currentPath),
    ];
}

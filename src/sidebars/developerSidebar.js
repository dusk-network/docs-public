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
                    { label: "Develop", href: '/developer/smart-contract/guides/my-first-contract' },
                    { label: "Compile", href: '/developer/smart-contract/guides/compiling' },
                    { label: "Deploy", href: '/developer/smart-contract/guides/deploying' },
                    { label: "Debug", href: '/developer/smart-contract/guides/debugging' },
                    { label: "Test", href: '/developer/smart-contract/guides/testing' },
                    { label: "Upgrade", href: '/developer/smart-contract/guides/upgrades' },
                    { label: "Interact", href: '/developer/smart-contract/guides/interacting' },
                    { label: "Multisig", href: '/developer/smart-contract/guides/multisig' }
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
            { label: "Transaction Lifecycle", href: '/developer/integrations/tx-lifecycle' },
            { label: "Wallet Core Library", href: '/developer/integrations/wallet-core' },
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

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
                type: "link",
                label: "Core Concepts",
                href: "/developer/smart-contract/core-concepts",
            },
            {
                type: "group",
                label: "Components",
                entries: [
                    { label: "Rusk", href: '/developer/smart-contract/01-components/02-rusk' },
                    { label: "Rues", href: '/developer/smart-contract/01-components/03-rues' },
                ],
                collapsed: true,
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
                type: "group",
                label: "Examples",
                entries: [
                    { label: "Examples Overview", href: '/developer/smart-contract/03-examples/examples' },
                    
                    { label: "Comparison with smart-contract1", href: '/developer/smart-contract/03-examples/02-comparison-with-vm1' },
                    { label: "Token Example", href: '/developer/smart-contract/03-examples/03-token-example' },
                    { label: "Multisig", href: '/developer/smart-contract/03-examples/04-multisig' },
                    { label: "Sessions Example", href: '/developer/smart-contract/03-examples/05-sessions-example' },
                    { label: "Contract Calls", href: '/developer/smart-contract/03-examples/06-contracts-calls' },
                    { label: "Host Calls", href: '/developer/smart-contract/03-examples/07-host-calls' },
                    { label: "Persistence", href: '/developer/smart-contract/03-examples/08-persistance' },
                    { label: "Metadata", href: '/developer/smart-contract/03-examples/09-sc-metadata' },
                    { label: "Gas Usage", href: '/developer/smart-contract/03-examples/10-spender' }
                ],
                collapsed: true,
            },
            {
                type: "group",
                label: "Smart Contracts on Dusk",
                entries: [
                    { label: "Overview", href: '/developer/smart-contract/04-sc-on-dusk/01-smart_contracts_on_dusk' },
                    { label: "Transactions", href: '/developer/smart-contract/04-sc-on-dusk/02-transactions' },
                    { label: "Keys", href: '/developer/smart-contract/04-sc-on-dusk/03-keys' },
                    { label: "Built-in Functions", href: '/developer/smart-contract/04-sc-on-dusk/04-builtin-functions' },
                    { label: "Token Standards", href: '/developer/smart-contract/04-sc-on-dusk/05-token_standards' },
                    { label: "Circuits", href: '/developer/smart-contract/04-sc-on-dusk/06-circuits' },
                    { label: "Sessions", href: '/developer/smart-contract/04-sc-on-dusk/07-sessions' },
                    { label: "Hashing", href: '/developer/smart-contract/04-sc-on-dusk/08-hashing' },
                    { label: "Semantics", href: '/developer/smart-contract/04-sc-on-dusk/09-semantics' },
                    { label: "Serialization", href: '/developer/smart-contract/04-sc-on-dusk/10-serialization' },
                ],
                collapsed: true,
            },
            {
                type: "group",
                label: "FAQs and issues",
                entries: [
                    { label: "FAQs", href: '/developer/smart-contract/06-faqs-issues/01-faqs' },
                    { label: "Troubleshooting", href: '/developer/smart-contract/06-faqs-issues/02-troubleshooting' },
                ],
                collapsed: true,
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
            { label: "Execution Core", href: '404' },
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
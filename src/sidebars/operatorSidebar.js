import { createGroup, createLink } from "../helpers/sidebarEntryHelpers";

export default function sidebar(currentPath) {
    return [
        createLink("Overview", "/operator/overview"),
        createGroup("Introduction", currentPath, [
            { label: "Introduction", href: "/operator/introduction/introduction" },
            { label: "Types of nodes", href: "/operator/introduction/node_types" },
            { label: "Requirements", href: "/operator/introduction/requirements" },
            { label: "Slashing", href: "/operator/introduction/slashing" },
            { label: "Tips", href: "/operator/introduction/tips" },
            //{ label: "Upgrades history", href: "/operator/introduction/history" },
        ], false),
        createGroup("Node Installation", currentPath, [
            { label: "Getting Started", href: "/operator/node-installation/getting-started" },
            { label: "Build from source", href: "/operator/node-installation/build-from-source" },
            { label: "Installer Script", href: "/operator/node-installation/installer-script" },
            { label: "Docker Image", href: "/operator/node-installation/docker-image" },
        ], false),
        createGroup("Node Setup", currentPath, [
            { label: "Configure Rusk", href: "/operator/node-setup/configure_rusk" },
            { label: "Staking DUSK", href: "/operator/node-setup/staking-dusk" },
            { label: "Fast syncing", href: "/operator/node-setup/fast-sync" },
            { label: "Manual Resync", href: "/operator/node-setup/manual-resync" },
            { label: "Node upgrading", href: "/operator/node-setup/upgrade-node" },
            //{ label: "Troubleshooting", href: "404" },
        ], false),
        createGroup("Guides", currentPath, [
            { label: "Nocturne testnet", href: "/operator/guides/node-running-guide" },
            { label: "Nocturne Faucet", href: "/operator/guides/testnet-faucet" },

        ], false),
    ];
}
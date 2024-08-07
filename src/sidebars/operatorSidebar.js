import { createGroup, createLink } from "../helpers/sidebarEntryHelpers";

export default function sidebar(currentPath) {
    return [
        createLink("Overview", "/operator/overview"),
        createGroup("Node Setup", currentPath, [
            { label: "Getting Started", href: "/operator/node-setup/getting-started" },
            { label: "Build from Source", href: "/operator/node-setup/build-from-source" },
            { label: "Docker Image", href: "/operator/node-setup/docker-image" },
            { label: "Manual Resync", href: "/operator/node-setup/manual-resync" },
            { label: "Troubleshooting", href: "404" },
            { label: "Slashing", href: "/operator/node-setup/slashing" },
        ], false),
        createGroup("Testnet", currentPath, [
            { label: "Node Running", href: "/operator/nocturne/node-running-guide" },
            { label: "Faucet", href: "/operator/nocturne/testnet-faucet" },
            { label: "Node upgrading", href: "/operator/nocturne/upgrade-node" },
            { label: "Fast syncing", href: "/operator/nocturne/fast-sync" },
        ], false),
    ];
}
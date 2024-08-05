import { createGroup } from "./helpers";

export default function sidebar(currentPath) {
    return [
        createGroup("Node Setup", currentPath, [
            { label: "Overview", href: "/operator/node-setup/overview" },
            { label: "Node Requirements", href: "/operator/node-setup/node-requirements" },
            { label: "Build from Source", href: "/operator/node-setup/build-from-source" },
            { label: "Docker Image", href: "/operator/node-setup/docker-image" },
            { label: "Manual Resync", href: "/operator/node-setup/manual-resync" },
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
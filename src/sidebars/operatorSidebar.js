import { createGroup, createLink } from "../helpers/sidebarEntryHelpers";

export default function sidebar(currentPath) {
    return [
        createLink("Overview", "/operator/overview"),

        createGroup("Run a node", currentPath, [
            { label: "Install Rusk", href: "/operator/01-installation/" },
            { label: "Run a Provisioner", href: "/operator/02-provisioner" },
            { label: "Run an Archiver", href: "/operator/03-archiver" },
            { label: "Run a Prover", href: "/operator/04-prover" },
            { label: "Choose a Network", href: "/operator/05-networks" },
            //{ label: "Upgrades history", href: "/operator/introduction/history" },
        ], false),

        createGroup("Guides", currentPath, [
            { label: "Run a Provisioner on Nocturne", href: "/operator/guides/01-nocturne-node" },
            { label: "Fast-sync a node", href: "/operator/guides/02-fast-sync" },
            { label: "Manually re-sync a node", href: "/operator/guides/03-manual-resync" },
            { label: "Upgrade a node", href: "/operator/guides/04-upgrade-node" },
        ], false),
    ];
}
import { createGroup, createLink } from "../helpers/sidebarEntryHelpers";

export default function sidebar(currentPath) {
    return [
        createLink("Overview", "/operator/overview"),

        createGroup("Run a node", currentPath, [
            { label: "Install Node Software", href: "/operator/installation/" },
            { label: "Hardware Requirements", href: "/operator/hardware" },
            { label: "Run a Provisioner", href: "/operator/provisioner" },
            { label: "Run an Archive Node", href: "/operator/archive-node" },
            { label: "Run a Prover", href: "/operator/prover" },
            { label: "Choose a Network", href: "/operator/networks" },
            { label: "Maintenance & Monitoring", href: "/operator/maintenance-monitoring" },
            { label: "FAQ", href: "/operator/faq" },
            //{ label: "Upgrades history", href: "/operator/introduction/history" },
        ], false),

        createGroup("Guides", currentPath, [
            { label: "Run a Provisioner on Nocturne", href: "/operator/guides/nocturne-node" },
            { label: "Fast-Sync a Node", href: "/operator/guides/fast-sync" },
            { label: "Manually Re-Sync a Node", href: "/operator/guides/manual-resync" },
            { label: "Upgrade a Node", href: "/operator/guides/upgrade-node" },
        ], false),
    ];
}

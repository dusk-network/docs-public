import { createLink, createGroup } from "../helpers/sidebarEntryHelpers";

export default function sidebar(currentPath) {
    return [
        createLink("Apply for a Grant", "/grants/", currentPath),
        createLink("Learn about RFPs", "/grants/what-is-rfp", currentPath),
        createGroup("Discover active RFPs", currentPath, [
            { label: "Archival Nodes APIs", href: "/grants/rfps/archival-node" },
            { label: "Hardware Wallet", href: "/grants/rfps/hardware-wallet" },
        ], false),
    ];
}
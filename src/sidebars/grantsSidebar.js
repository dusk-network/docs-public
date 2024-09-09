import { createLink, createGroup } from "../helpers/sidebarEntryHelpers";

export default function sidebar(currentPath) {
    return [
        createLink("Grants", "/grants/", currentPath),
        createLink("What is a RFP?", "/grants/what-is-rfp", currentPath),
        createGroup("Active RFPs", currentPath, [
            { label: "Archival Nodes APIs", href: "/grants/rfps/archival-node" },
            { label: "Hardware Wallet", href: "/grants/rfps/hardware-wallet" },
        ], false),
    ];
}
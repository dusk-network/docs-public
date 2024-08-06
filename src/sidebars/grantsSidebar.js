import { createLink, createGroup } from "../helpers/sidebarEntryHelpers";

export default function sidebar(currentPath) {
    return [
        createLink("Grants", "/grants/", currentPath),
        createGroup("Thesan", currentPath, [
            { label: "What is it", href: "/grants/#what-is-thesan" },
            { label: "How to apply", href: "/grants/#how-to-apply" },
            { label: "Selection workflow", href: "/grants/#selection-process" },
        ], false),
        createGroup("Request for Proposals", currentPath, [
            { label: "Overview", href: "/grants/rfps/rfps_overview" },
            { label: "Archival Nodes APIs", href: "/grants/rfps/archival_node" },
            { label: "Hardware Wallet", href: "/grants/rfps/hardware_wallet" },
        ], false),
    ];
}
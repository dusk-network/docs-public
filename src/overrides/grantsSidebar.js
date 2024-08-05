export default function sidebar(currentPath) {
    return [
        {
            label: "Grants",
            href: "/grants/",
            type: "link",
            isCurrent: currentPath === "/grants",
            badge: undefined,
            attrs: {},
        },
        {
            label: "Thesan",
            type: "group",
            badge: undefined,
            entries: [
                {
                    label: "What is it",
                    href: "/grants/#what-is-thesan",
                    type: "link",
                    isCurrent: currentPath === "/grants/#what-is-thesan",
                    badge: undefined,
                    attrs: {},
                },
                {
                    label: "How to apply",
                    href: "/grants/#how-to-apply",
                    type: "link",
                    isCurrent: currentPath === "/grants/#how-to-apply",
                    badge: undefined,
                    attrs: {},
                },
                {
                    label: "Selection workflow",
                    href: "/grants/#selection-process",
                    type: "link",
                    isCurrent: currentPath === "/grants/#selection-process",
                    badge: undefined,
                    attrs: {},
                },
            ],
            collapsed: false,
        },
        {
            label: "Request for Proposals",
            type: "group",
            badge: undefined,
            entries: [
                {
                    label: "Overview",
                    href: "/grants/rfps/rfps_overview",
                    type: "link",
                    isCurrent: currentPath === "/grants/rfps/rfps_overview",
                    badge: undefined,
                    attrs: {},
                },
                {
                    label: "Archival Nodes APIs",
                    href: "/grants/rfps/archival_node",
                    type: "link",
                    isCurrent: currentPath === "/grants/rfps/archival_node",
                    badge: undefined,
                    attrs: {},
                },
                {
                    label: "Hardware Wallet",
                    href: "/grants/rfps/hardware_wallet",
                    type: "link",
                    isCurrent: currentPath === "/grants/rfps/hardware_wallet",
                    badge: undefined,
                    attrs: {},
                },
            ],
            collapsed: false,
        },
    ];
}
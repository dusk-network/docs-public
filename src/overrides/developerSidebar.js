export default function sidebar(currentPath) {
    return [
        {
            label: "UPDATE ME",
            type: "group",
            badge: undefined,
            entries: [
                {
                    label: "UPDATE ME",
                    href: "/404",
                    type: "link",
                    isCurrent: currentPath === "/404",
                    badge: undefined,
                    attrs: {},
                },
            ],
            collapsed: true,
        },
    ];
}
import { createGroup } from "./helpers";

export default function sidebar(currentPath) {
    return [
        createGroup("UPDATE ME", currentPath, [
            { label: "UPDATE ME", href: "/404" },
        ]),
    ];
}
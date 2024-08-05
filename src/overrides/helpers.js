/**
 * Creates a link object for the sidebar
 *
 * @param {string} label - The label for the link
 * @param {string} href - The href for the link
 * @param {string} currentPath - Determines if the link is active
 * @returns {Object} The link object
 */
export const createLink = (label, href, currentPath) => ({
    label,
    href,
    type: "link",
    isCurrent: currentPath === href,
    badge: undefined,
    attrs: {},
});

/**
 * Creates a group object for the sidebar
 *
 * @param {string} label - The label for the group
 * @param {string} currentPath - Determines if the link is active
 * @param {Array<Object>} entries - An array of entry/link objects for the group
 * @param {boolean} [collapsed=true] - Whether the group should be collapsed, true by default
 * @returns {Object} The group object
 */
export const createGroup = (label, currentPath, entries, collapsed = true) => ({
    label,
    type: "group",
    badge: undefined,
    entries: entries.map(entry => createLink(entry.label, entry.href, currentPath)),
    collapsed,
});
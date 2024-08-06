/**
 * Flattens the sidebar structure and returns the next and previous links based on the current path.
 * If there's no prev and next, like in the situation of a first and last entry, it will return null and be omitted.
 *
 * @param {Array<Object>} sidebar - The sidebar structure containing links and groups
 * @param {string} currentPath - The current path, to determine the active link
 * @returns {{nextLink: Object|null, prevLink: Object|null}} An object containing the next and previous links, that can be either the link object or null
 */
export const getNextPrevLinks = (sidebar, currentPath) => {
    let flatLinks = [];

    // We need to flatten the sidebar structure because links can be nested in groups.
    // In the case of a nested group, we recursively call `flattenSidebar` and only push its links.
    // By flattening the sidebar we can easily find the neighboring links.
    const flattenSidebar = (entries) => {
        entries.forEach(entry => {
            if (entry.type === "link") {
                flatLinks.push(entry);
            } else if (entry.type === "group") {
                flattenSidebar(entry.entries);
            }
        });
    };

    flattenSidebar(sidebar);

    // Find the current path (active page) and find its neighbors
    const currentIndex = flatLinks.findIndex(link => link.href === currentPath);
    const nextLink = currentIndex >= 0 && currentIndex < flatLinks.length - 1 ? flatLinks[currentIndex + 1] : null;
    const prevLink = currentIndex > 0 ? flatLinks[currentIndex - 1] : null;

    return { nextLink, prevLink };
};

let beforeText = ''

export const RenderContentItem = ({ content, index, allItems}) => {
    const currentItem = content
    const nextItem = allItems[index + 1]

    if (typeof currentItem === 'string' && typeof nextItem !== 'object') {
        return (
            <li>{currentItem}</li>
        )
    }

    if (typeof currentItem === 'string' && typeof nextItem === 'object') {
        beforeText = currentItem
        return null;
    }

    if (typeof currentItem === "object" && currentItem.list) {
        return (
            <li>
                {beforeText}
                <ul>
                    {currentItem.list.map((it, i) => (
                        <li key={i}>{it}</li>
                    ))}
                </ul>
                {currentItem.nextPartText && currentItem.nextPartText}
            </li>
        )
    }

    return null;
};
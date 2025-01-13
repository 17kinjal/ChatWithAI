export const getUniqueTitles = <T>(
	items: T[],
	keyExtractor: (item: T) => string
): string[] => {
	if (!items || items.length === 0) {
		return [];
	}
	const reversedItems = [...items].reverse();
	const map = new Map<string, string>();
	for (const item of reversedItems) {
		const key = keyExtractor(item);
		if (!map.has(key)) {
			map.set(key, key);
		}
	}

	return Array.from(map.values());
};

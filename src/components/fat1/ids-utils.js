export function standardizeId(id) {
    return typeof id === "number" ? { min: id, max: id } : id;
}

export function displayIds(value) {
    if (value.min === value.max) {
        return value.min.toLocaleString();
    } else {
        return `${value.min.toLocaleString()} to ${value.max.toLocaleString()}`;
    }
}

export function sortIds(ids) {
    return ids.slice().sort((a, b) => a.min - b.min);
}

export function availableTokens(allTokensList, selectedTokensList) {

    const availableTokens = {};
    const selectedTokens = {};
    selectedTokensList.forEach(s => selectedTokens[computeId(s)] = { ...s });

    // Handle case of exact match
    for (const t of allTokensList) {
        const id = computeId(t);
        if (selectedTokens[id]) {
            delete selectedTokens[id];
        } else {
            availableTokens[id] = { ...t };
        }
    }

    // Handle remaining cases of sub-ranges
    outer:
    for (const st of Object.values(selectedTokens)) {
        for (const id in availableTokens) {
            const r = availableTokens[id];
            if (isInRange(st, r)) {
                delete availableTokens[id];
                const split = rangeSubstract(r, st);
                split.forEach(s => availableTokens[computeId(s)] = s);

                continue outer;
            }
        }
        throw new Error(`Illegal state: ${JSON.stringify(st)} not found in ${JSON.stringify(availableTokens)}`);
    }

    return sortIds(Object.values(availableTokens));
}

function computeId(e) {
    return `${e.min}-${e.max}`;
}

function isInRange(element, range) {
    return range.min <= element.min && element.max <= range.max;
}

function rangeSubstract(range, sub) {
    if (sub.min === range.min && sub.max === range.max) {
        return [];
    } else if (sub.min === range.min) {
        return [createRange(sub.max + 1, range.max)];
    } else if (sub.max === range.max) {
        return [createRange(range.min, sub.min - 1)];
    } else {
        return [createRange(range.min, sub.min - 1), createRange(sub.max + 1, range.max)];
    }
}

function createRange(min, max) {
    return {
        min, max
    }
}
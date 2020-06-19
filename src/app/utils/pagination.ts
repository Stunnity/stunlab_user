export function paginate(type, page, total) {
    if (type === 'previous') {
        return previousPage(page);
    }
    if (type === 'next') {
        return nextPage(page, total);
    }
    if (type === 'first') {
        return firstPage(page);
    }
    if (type === 'last') {
        return lastPage(page, total);
    }
}

function previousPage(page) {
    if (page === 1) {
        return;
    }
    return page -= 1;

}

function nextPage(page, total) {
    if (page === total) {
        return;
    }
    return page += 1;
}
function firstPage(page) {
    if (page === 1) {
        return page;
    }
    page = 1;
    return page;
}
function lastPage(page, total) {
    if (page === total) {
        return;
    }
    return page = total;
}

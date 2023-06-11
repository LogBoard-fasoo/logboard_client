export function formatDate(date) {
    const _date = date instanceof Date ? date : new Date(date);
    const year = _date.getFullYear();
    const month = String(_date.getMonth() + 1).padStart(2, "0");
    const day = String(_date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

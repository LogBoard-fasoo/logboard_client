export default function getDateDifference(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000; // 1일 in ms

    const firstDate = new Date(date1);
    const secondDate = new Date(date2);

    const dateDiff = Math.round(Math.abs(firstDate - secondDate) / oneDay);

    return dateDiff;
}

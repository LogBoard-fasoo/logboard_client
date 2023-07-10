export default function getDateRangeFromToday() {
    const endDate = new Date();

    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(endDate.getDate() - 14);

    const _startDate = twoWeeksAgo.toISOString().substring(0, 10);
    const _endDate = endDate.toISOString().substring(0, 10);

    return [_startDate, _endDate];
}

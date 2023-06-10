export default function getDefaultTimeline() {
    const today = new Date();
    const daysUntilPreviousFriday = (today.getDay() - 5 + 7) % 7; // 오늘부터 금요일까지 요일차

    // 가장 가까운 과거 금요일
    const closestPreviousFriday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - daysUntilPreviousFriday,
    );
    // 그 전주 금요일
    const previousFriday = new Date(
        closestPreviousFriday.getFullYear(),
        closestPreviousFriday.getMonth(),
        closestPreviousFriday.getDate() - 14,
    );

    const defaultStartDate = previousFriday.toISOString().split("T")[0];
    const defaultEndDate = closestPreviousFriday.toISOString().split("T")[0];

    return [defaultStartDate, defaultEndDate];
}

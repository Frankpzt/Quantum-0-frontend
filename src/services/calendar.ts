const getMonth = (date: Date) => date.getMonth();

const getYear = (date: Date) => date.getFullYear();

const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

const getFirstDayInMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

const getLastDateInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

const getCalendarDates = (year: number, month: number) => {
    const firstDay = getFirstDayInMonth(year, month);
    const daysInMonth = getDaysInMonth(year, month);
    const daysInPrevMonth = getDaysInMonth(year, month - 1);

    const calendar = [];
    for (let i = 1; i <= daysInMonth; i += 1) {
        calendar.push({
            label: i,
            value: new Date(year, month, i).toDateString(),
        });
    }
    // insert date in prev month
    for (let i = 0; i < firstDay; i += 1) {
        calendar.unshift({
            label: daysInPrevMonth - i,
            value: new Date(
                year,
                month - 1,
                daysInPrevMonth - i
            ).toDateString(),
        });
    }
    // insert date in next month
    const calendarLength = calendar.length;

    for (let i = 1; i < 43 - calendarLength; i += 1) {
        calendar.push({
            label: i,
            value: new Date(year, month + 1, i).toDateString(),
        });
    }
    return calendar;
};

export {
    getMonth,
    getYear,
    getCalendarDates,
    getFirstDayInMonth,
    getLastDateInMonth,
};

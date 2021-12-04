const getCurrentDate = () => {
    const monthNames: string[] = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
    ];
    const newDate: any = new Date();
    const date = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();
    const currentDate = `${date}th, ${monthNames[month]}, ${year}`;
    return currentDate;
};
export default getCurrentDate;

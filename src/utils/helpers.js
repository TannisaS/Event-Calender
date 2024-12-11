export const getCalendarDays = (currentDate) => {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
    const days = [];
    for (let d = startOfMonth; d <= endOfMonth; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
  
    return days;
  };
  
  export const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d
      .getDate()
      .toString()
      .padStart(2, '0')}`;
  };
  
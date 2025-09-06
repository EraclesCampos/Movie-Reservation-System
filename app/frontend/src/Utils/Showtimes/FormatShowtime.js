export const FormatShowtime = (isoStr) => {
    const date = new Date(isoStr);

    const weekdays = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sáb'];
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    const dayName = weekdays[date.getUTCDate() ? date.getUTCDay() : 0];
    const day = date.getUTCDate();
    const monthName = months[date.getUTCMonth()];
    const hours = date.getUTCHours().toString().padStart(2,'0');
    const minutes = date.getUTCMinutes().toString().padStart(2,'0');

    return `${dayName}, ${day} ${monthName} · ${hours}:${minutes}`;
}
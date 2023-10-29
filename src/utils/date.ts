export const padLeft = (value: number, count = 2) => value.toString().padStart(count, '0');

export const getDateString = (date = new Date()) => `\
${date.getFullYear()}.${date.getMonth()}.${date.getDay()}\
/${padLeft(date.getHours())}:${padLeft(date.getMinutes())}:${padLeft(date.getSeconds())}\
.${padLeft(date.getMilliseconds(), 3)}`;

export const getTimezoneString = () => new Date()
    .toLocaleDateString(undefined, { day: '2-digit', timeZoneName: 'long' })
    .substring(4);

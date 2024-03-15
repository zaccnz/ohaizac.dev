export const pad = (value: number, count = 2) =>
    value.toString().padStart(count, '0');

export const getDateString = (date = new Date()) => `\
${date.getFullYear() - 2000}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}\
/${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}\
.${pad(date.getMilliseconds(), 3)}`;

export const getTimezoneString = () => new Date()
    .toLocaleDateString(undefined, { day: '2-digit', timeZoneName: 'long' })
    .substring(4);

export const getMyAge = () => Math.round(
    (new Date().getTime() - 1.0123884e+12)
    * 3.16887646e-11);
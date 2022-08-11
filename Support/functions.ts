import {
    daysToWeeks,
    differenceInBusinessDays,
    differenceInCalendarWeeks,
    differenceInDays,
    format,
    formatDistance,
    formatISO, getDate, getDay, getMonth, getYear, lightFormat, maxTime, minTime, parseISO, sub, subDays
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import pt from 'date-fns/locale/pt-BR';
import React from 'react';

enum retorno {
    "IsoDateExtended",
    "IsoDate",
    "IsoTime",
    "light",
    "ExtendUS",
    "ExtendBR"
}

export function getDateFormat(date: Date, myret?: keyof typeof retorno, debug?: boolean) {

    const formattedDate = format(date, "'Dia' dd 'de' MMMM', às 'HH:mm:ss", { locale: pt });
    if (debug) {
        console.log('Chamou a função ✅', formatISO(date)); //string 2022-08-06T07:25:55-03:00
        console.log('Chamou a função ✔️', formatISO(date, { representation: 'date' })); //string 2022-08-06
        console.log('Chamou a função ✔️', formatISO(date, { representation: 'time' })); //string 07:25:55-03:00
        console.log('Chamou a função ✔️', lightFormat(date, 'dd/MM/yyyy')); // string 06/08/2022
        console.log('Chamou a função ✔️', parseISO(date.toISOString())); // object Sat Aug 06 2022 07:25:55 GMT-0300 (Horário Padrão de Brasília)
        console.log('Chamou a função ✔️', formattedDate); // string Dia 06 de agosto, às 07:25:55  
        console.log(format(new Date(getYear(new Date()), getMonth(new Date()), getDay(new Date())), 'MM/dd/yyyy')); //string 08/06/2022
    }
    console.log(isAllowedTime(new Date()), maxTime, minTime);
    const result = formatDistance(
        new Date(2016, 1, 1),
        new Date(2019, 9, 20),
        { locale: pt } // Pass the locale as an option
    );
    console.log(result);

    /* SET DATA ATUAL, DATA ANtERIOR e DATA POSTERIOR */
    var dataatual = new Date();
    var dataanterior = subDays(dataatual, 3);
    console.log(dataatual, typeof dataatual);
    console.log(dataanterior, typeof dataanterior);

    console.log(differenceInCalendarWeeks(dataatual, dataanterior, { locale: pt }), '🔥');
    console.log(differenceInBusinessDays(dataatual, dataanterior), '🔥');
    console.log(differenceInDays(dataatual, dataanterior), '🔥');

    console.log("MES ATUAL", getMonthName(dataatual));
    console.log(getDayNumber(dataatual));
    console.log(getDayOfWeek(dataatual));
    console.log(getFullDate(dataatual));

    /* eachWeekOfInterval;

    endOfWeek;

    format;

    formatDistance;

    formatDistanceStrict;

    formatRelative;

    getWeek;

    getWeekOfMonth;

    getWeeksInMonth;

    getWeekYear;

    isMatch;

    isSameWeek;

    isThisWeek;

    lastDayOfWeek;

    parse;

    setDay;

    setWeek;

    setWeekYear;

    startOfWeek;

    startOfWeekYear
 */


    if (myret === 'IsoDateExtended') { return formatISO(date); }
    if (myret === 'IsoDate') { return formatISO(date, { representation: 'date' }); }
    if (myret === 'IsoTime') { return formatISO(date, { representation: 'time' }); }
    if (myret === 'light') { return lightFormat(date, 'dd/MM/yyyy'); }
    if (myret === 'ExtendUS') { return parseISO(date.toISOString()); }
    if (myret === 'ExtendBR') { return formattedDate; }


}

function isAllowedTime(time: any) {
    return time <= maxTime && time >= minTime;
}



function getMonthName(mydate: Date): string {
    console.log(mydate, "🥴");

    switch (getMonth(mydate)) {
        case 0:
            return 'Janeiro';
        case 1:
            return 'Fevereiro';
        case 2:
            return 'Março';
        case 3:
            return 'Abril';
        case 4:
            return 'Maio';
        case 5:
            return 'Junho';
        case 6:
            return 'Julho';
        case 7:
            return 'Agosto';
        case 8:
            return 'Setembro';
        case 9:
            return 'Outubro';
        case 10:
            return 'Novembro';
        case 10:
            return 'Dezembro';
        default:
            return "Not Defined";
    }
}
function getDayNumber(mydate: Date): string {



    switch (getDate(mydate)) {
        case 1:
            return '01';
        case 2:
            return '02';
        case 3:
            return '03';
        case 4:
            return '04';
        case 5:
            return '05';
        case 6:
            return '06';
        case 7:
            return '07';
        case 8:
            return '08';
        case 9:
            return '09';
        default:
            return getDate(mydate).toString();
    }
}
function getDayOfWeek(mydate: Date): string {
    console.log(getDay(mydate));
    switch (getDay(mydate)) {
        case 0:
            return 'Domingo';
        case 1:
            return 'Segunda-feira';
        case 2:
            return 'Terça-feira';
        case 3:
            return 'Quarta-feira';
        case 4:
            return 'Quinta-feira';
        case 5:
            return 'Sexta-feira';
        case 6:
            return 'Sábado';
        default:
            return 'Not Defined';
    }
}
export function getFullDate(mydate: Date): string {
    console.log("DATA QUEESCOLHEU...", "☢️", mydate);

    return getDayOfWeek(mydate) + ", " + getDayNumber(mydate) + " de " + getMonthName(mydate) + " de " + getYear(mydate);
}
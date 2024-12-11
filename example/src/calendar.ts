import {Bikram} from 'bikram-js';
import {Tithi }from 'bikram-js';

let currentYear: number;
let currentMonth: number;
let currentDay: number;

interface Event {
    date: string; // Format: "YYYY/MM/DD"
    event: string;
    detail: string;
    startYear?: number;
    endYear?: number;
    showOnDay?: boolean;
}

declare var bikramFixedEvents: Event[];
declare var gregorianEvents: Event[];
declare var bikramRecurringEvents: Event[];

export function showCurrentMonth(): void {
    const today: Date = new Date();
    const bikram: Bikram = new Bikram();
    bikram.fromGregorian(today.getFullYear(), today.getMonth() + 1, today.getDate());
    
    currentYear = bikram.getYear();
    currentMonth = bikram.getMonth();
    currentDay = bikram.getDay();

    (document.getElementById('yearInput') as HTMLInputElement).value = currentYear.toString();
    (document.getElementById('monthSelector') as HTMLSelectElement).value = currentMonth.toString();
    loadEventsForYear(currentYear, (events: any[]) => {
        generateCalendar(currentYear, currentMonth, events);
    });
}

export function getfirstWeekday(year: number, month: number): number {
    const bikram: Bikram = new Bikram();
    const firstGregorianDate = bikram.toGregorian(year, month, 1);
    const timeinfo: Date = new Date(firstGregorianDate.year, firstGregorianDate.month - 1, firstGregorianDate.day);
    const weekdayIndex: number = timeinfo.getDay();
    return weekdayIndex;
}

export function convertToDevanagari(number: number): string {
    const devanagariDigits: string[] = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    return number.toString().split('').map(digit => devanagariDigits[parseInt(digit, 10)]).join('');
}

export function generateCalendar(year: number, month: number, events?: any[]): void {
    const calendarDiv: HTMLElement = document.getElementById('calendar') as HTMLElement;
    calendarDiv.innerHTML = '';

    const daysInMonth: number = new Bikram().daysInMonth(year, month);
    const bikram: Bikram = new Bikram();
    
    const today: Date = new Date();
    const todayBikram: Bikram = new Bikram();
    todayBikram.fromGregorian(today.getFullYear(), today.getMonth() + 1, today.getDate());
    const todayBikramYear: number = todayBikram.getYear();
    const todayBikramMonth: number = todayBikram.getMonth();
    const todayBikramDay: number = todayBikram.getDay();

    const defaultLanguage: string = "nepali";
    const monthName: string = getMonthNameWithDefaultLanguage(month, defaultLanguage);
    const gregorianStart: any = getGregorianDate(year, month, 1);
    const gregorianEnd: any = getLastDayOfGregorian(year, month);

    const gregorianMonthDisplay: string = formatGregorianMonthDisplay(gregorianStart, gregorianEnd);

    let calendarHTML: string = `<h2>${monthName} ${convertToDevanagari(year)} <span class="gregorian-month-display">${gregorianMonthDisplay}</span></h2><table><tr>`;
    
    const weekdays: string[] = ['आइतवार', 'सोमवार', 'मङ्गलवार', 'बुधवार', 'बिहीवार', 'शुक्रवार', 'शनिवार'];
    
    weekdays.forEach(day => {
        calendarHTML += `<th>${day}</th>`;
    });
    calendarHTML += '</tr><tr>';

    const firstDayOfMonth: number = getfirstWeekday(year, month);

    for (let i: number = 0; i < firstDayOfMonth; i++) {
        calendarHTML += '<td class="empty"></td>';
    }

    for (let day: number = 1; day <= daysInMonth; day++) {
        const isToday: boolean = (day === todayBikramDay && month === todayBikramMonth && year === todayBikramYear);
        const className: string = isToday ? 'today' : '';
        
        const saturdayClass: string = (firstDayOfMonth + day - 1) % 7 === 6 ? 'saturday' : '';
        const finalClass: string = className ? ` ${className}` : '';
        
        const tithiCalculate: Tithi = new Tithi();
        const gregorianDate: any = bikram.toGregorian(year, month, day);
        const tithi: any = tithiCalculate.calculateTithi(gregorianDate.year, gregorianDate.month, gregorianDate.day);
        
        let tithiImage: string = '';
        if (tithi.tithi === 'पूर्णिमा') {
            tithiImage = '<img src="assets/purnima.png" alt="Purnima" style="width:30px;height:30px;">';
        } else if (tithi.tithi === 'अमावस्या') {
            tithiImage = '<img src="assets/amawasya.png" alt="Amawasya" style="width:30px;height:30px;">';
        }

        let eventText: string = '';
        let eventDetail: string = '';
        const hasEvent: boolean = checkEvent(bikramFixedEvents, year, month, day, 'bikram') ||
                                 checkEvent(gregorianEvents, gregorianDate.year, gregorianDate.month, gregorianDate.day, 'gregorian') ||
                                 checkEvent(bikramRecurringEvents, year, month, day, 'brecurring');

        if (hasEvent) {
            eventText = getEventText(bikramFixedEvents, year, month, day, 'bikram') ||
                        getEventText(gregorianEvents, gregorianDate.year, gregorianDate.month, gregorianDate.day, 'gregorian') ||
                        getEventText(bikramRecurringEvents, year, month, day, 'brecurring');

            eventDetail = getEventDetail(bikramFixedEvents, year, month, day, 'bikram') ||
                         getEventDetail(gregorianEvents, gregorianDate.year, gregorianDate.month, gregorianDate.day, 'gregorian') ||
                         getEventDetail(bikramRecurringEvents, year, month, day, 'brecurring');
        }

        calendarHTML += `<td class="${finalClass} ${saturdayClass}" onclick="showEventDetails('${convertToDevanagari(day)}/${convertToDevanagari(month)}/${convertToDevanagari(year)}', '${tithi.tithi}', '${tithi.paksha}', '${gregorianDate.day}/${gregorianDate.month}/${gregorianDate.year}', '${year}', '${month}', '${day}', '${eventText.replace(/'/g, "\\'")}', '${eventDetail.replace(/'/g, "\\'")}')">
            <div class="day-content">
                <div>${convertToDevanagari(day)}</div>
                <div class="tithi">
                    ${hasEvent ? '' : tithi.tithi}
                    ${tithiImage}
                </div>
                ${hasEvent ? `<div class="event">${eventText}</div>` : ''}
                <div class="gregorian">${gregorianDate.day}</div>
            </div>
        </td>`;
        if ((firstDayOfMonth + day) % 7 === 0 && day !== daysInMonth) {
            calendarHTML += '</tr><tr>';
        }
    }

    const remainingCells: number = (firstDayOfMonth + daysInMonth) % 7;
    if (remainingCells !== 0) {
        for (let i: number = 0; i < 7 - remainingCells; i++) {
            calendarHTML += '<td class="empty"></td>';
        }
    }

    calendarHTML += '</tr></table>';
    calendarDiv.innerHTML = calendarHTML;
}

// loads yearly bikramFixedEvents from files
export function loadEventsForYear(year: number, callback: (events: any[]) => void): void {
    // Declare the scriptUrl variable with type string
    let scriptUrl: string;

    // Determine the script URL based on the year
    if (year === 2081) {
        scriptUrl = 'events/events-2081.js';
        console.log(`Loading events for the year ${year}`);
    } else if (year === 2082) {
        scriptUrl = 'events/events-2082.js';
        console.log(`Loading events for the year ${year}`);
    } else if (year === 2083) {
        scriptUrl = 'events/events-2083.js';
        console.log(`Loading events for the year ${year}`);
    } else {
        scriptUrl = 'events/noevents.js'; // Load default if year is not recognized
        console.log(`No events for the year ${year}`);
    }

    // Load the events.js script
    const eventScriptElement = document.createElement('script');
    eventScriptElement.src = 'events/events.js';
    eventScriptElement.onload = () => {
        // Load the yearly events script
        const yearScriptElement = document.createElement('script');
        yearScriptElement.src = scriptUrl;
        yearScriptElement.onload = () => {
            callback([]); // Assuming you want to call the callback with an empty array
        };
        yearScriptElement.onerror = () => {
            console.error(`Error loading script: ${scriptUrl}`);
            callback([]);
        };

        document.head.appendChild(yearScriptElement);
    };
    eventScriptElement.onerror = () => {
        console.error('Error loading events.js');
        callback([]);
    };

    document.head.appendChild(eventScriptElement);
}


export function checkEvent(events: any[], year: number, month: number, day: number, dateType: string): boolean {
    let hasEvent: boolean = false;
    events.forEach(event => {
        if ((event.startYear && year < event.startYear) || (event.endYear && year > event.endYear)) {
            return;
        }

        if (event.showOnDay === false) {
            return;
        }

        if (dateType === 'bikram') {
            const [eventYear, eventMonth, eventDay]: number[] = event.date.split('/').map(Number);
            if (year === eventYear && month === eventMonth && day === eventDay) {
                hasEvent = true;
            }
        } else if (dateType === 'gregorian' || dateType === 'brecurring') {
            const [eventMonth, eventDay]: number[] = event.date.split('/').map(Number);
            if (month === eventMonth && day === eventDay) {
                hasEvent = true;
            }
        }
    });
    return hasEvent;
}

export function getEventText(events: any[], year: number, month: number, day: number, dateType: string): string {
    let eventText: string = '';
    events.forEach(event => {
        if ((event.startYear && year < event.startYear) || (event.endYear && year > event.endYear)) {
            return;
        }

        if (event.showOnDay === false) {
            return;
        }

        if (dateType === 'bikram') {
            const [eventYear, eventMonth, eventDay]: number[] = event.date.split('/').map(Number);
            if (year === eventYear && month === eventMonth && day === eventDay) {
                eventText += `<div>${event.event}</div>`;
            }
        } else if (dateType === 'gregorian' || dateType === 'brecurring') {
            const [eventMonth, eventDay]: number[] = event.date.split('/').map(Number);
            if (month === eventMonth && day === eventDay) {
                eventText += `<div>${event.event}</div>`;
            }
        }
    });
    return eventText;
}

export function getEventDetail(events: any[], year: number, month: number, day: number, dateType: string): string {
    let eventDetail: string = '';
    events.forEach(event => {
        if ((event.startYear && year < event.startYear) || (event.endYear && year > event.endYear)) {
            return;
        }

        if (dateType === 'bikram') {
            const [eventYear, eventMonth, eventDay]: number[] = event.date.split('/').map(Number);
            if (year === eventYear && month === eventMonth && day === eventDay) {
                eventDetail += `<div>${event.detail}</div>`;
            }
        } else if (dateType === 'gregorian' || dateType === 'brecurring') {
            const [eventMonth, eventDay]: number[] = event.date.split('/').map(Number);
            if (month === eventMonth && day === eventDay) {
                eventDetail += `<div>${event.detail}</div>`;
            }
        }
    });
    return eventDetail;
}

export function showEventDetails(day: string, tithi: string, paksha: string, gregorianDate: string, bikramYear: string, bikramMonth: string, bikramDay: string, eventText: string, eventDetail: string): void {
    const modal: HTMLElement = document.getElementById('tithiModal') as HTMLElement;
    const tithiInfo: HTMLElement = document.getElementById('tithiInfo') as HTMLElement;

    const weekday: string = getWeekdayFromGregorianDate(gregorianDate);
    const bikramDateFormatted: string = `${convertToDevanagari(parseInt(bikramYear))} ${getMonthNameWithDefaultLanguage(parseInt(bikramMonth), 'nepali')} ${convertToDevanagari(parseInt(bikramDay))} गते ${weekday}`;
    const gregorianDateFormatted: string = `${gregorianDate.split('/')[2]} ${getGregorianMonthName(parseInt(gregorianDate.split('/')[1]))} ${gregorianDate.split('/')[0]}`;

    let content: string = `
        <div class="bikram-date"><strong>${bikramDateFormatted}</strong></div>
        <div class="tithi-paksha"><strong>${paksha}, ${tithi}</strong></div>
        <div class="gregorian-date">${gregorianDateFormatted}</div>
    `;

    if (eventText && eventDetail) {
        content += `
            <div class="event-text"><strong>Event:</strong> ${eventText}</div>
            <div class="event-detail">${eventDetail.replace(/\n/g, '<br>')}</div>
        `;
    }

    tithiInfo.innerHTML = content;
    modal.style.display = "block";
}

export function getWeekdayFromGregorianDate(gregorianDate: string): string {
    const [day, month, year]: number[] = gregorianDate.split('/').map(Number);
    const date: Date = new Date(year, month - 1, day);
    const weekdays: string[] = ['आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहिबार', 'शुक्रबार', 'शनिबार'];
    return weekdays[date.getDay()];
}

export function closeModal(): void {
    const tithiModal: HTMLElement = document.getElementById('tithiModal') as HTMLElement;
    tithiModal.style.display = 'none';
}

export function handleModalClick(event: MouseEvent): void {
    const modal = document.getElementById('tithiModal') as HTMLElement;
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

export function getMonthNameWithDefaultLanguage(month: number, language: string): string {
    const bikram: Bikram = new Bikram();
    const originalGetMonthName = bikram.getMonthName.bind(bikram);
    bikram.getMonthName = function(month: number): string {
        const nepaliMonths: string[] = ["बैसाख", "जेष्ठ", "आषाढ", "श्रावण", "भाद्र", "आश्विन", "कार्तिक", "मंसिर", "पौष", "माघ", "फागुन", "चैत"];
        return nepaliMonths[month - 1];
    }

    const monthName: string = bikram.getMonthName(month);
    return monthName;
}

export function previousYear(): void {
    currentYear--;
    (document.getElementById('yearInput') as HTMLInputElement).value = currentYear.toString();
    generateCalendar(currentYear, currentMonth);
    loadEventsForYear(currentYear, (events: any[]) => {
        generateCalendar(currentYear, currentMonth, events);
    });
}

export function nextYear(): void {
    currentYear++;
    (document.getElementById('yearInput') as HTMLInputElement).value = currentYear.toString();
    generateCalendar(currentYear, currentMonth);
    loadEventsForYear(currentYear, (events: any[]) => {
        generateCalendar(currentYear, currentMonth, events);
    });
}

export function changeMonth(): void {
    currentMonth = parseInt((document.getElementById('monthSelector') as HTMLSelectElement).value);
    generateCalendar(currentYear, currentMonth);
    loadEventsForYear(currentYear, (events: any[]) => {
        generateCalendar(currentYear, currentMonth, events);
    });
}

export function changeYear(): void {
    currentYear = parseInt((document.getElementById('yearInput') as HTMLInputElement).value);
    loadEventsForYear(currentYear, (events: any[]) => {
        generateCalendar(currentYear, currentMonth, events);
        loadEventsForYear(currentYear, (events: any[]) => {
            generateCalendar(currentYear, currentMonth, events);
        });
    });
}

export function goToToday(): void {
    const today: Date = new Date();
    const bikram: Bikram = new Bikram();
    bikram.fromGregorian(today.getFullYear(), today.getMonth() + 1, today.getDate());
    currentYear = bikram.getYear();
    currentMonth = bikram.getMonth();
    (document.getElementById('yearInput') as HTMLInputElement).value = currentYear.toString();
    (document.getElementById('monthSelector') as HTMLSelectElement).value = currentMonth.toString();
    loadEventsForYear(currentYear, (events: any[]) => {
        generateCalendar(currentYear, currentMonth, events);
    });
}

export function getGregorianDate(year: number, month: number, day: number): any {
    const bikram: Bikram = new Bikram();
    return bikram.toGregorian(year, month, day);
}

export function getLastDayOfGregorian(year: number, month: number): any {
    const bikram: Bikram = new Bikram();
    const nextMonthFirstDay: any = bikram.toGregorian(year, month + 1, 1);
    const lastDayOfMonth: Date = new Date(nextMonthFirstDay.year, nextMonthFirstDay.month - 1, nextMonthFirstDay.day - 1);
    return {
        day: lastDayOfMonth.getDate(),
        month: lastDayOfMonth.getMonth() + 1,
        year: lastDayOfMonth.getFullYear()
    };
}

export function getGregorianMonthName(month: number): string {
    const gregorianMonths: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return gregorianMonths[month - 1];
}

export function formatGregorianMonthDisplay(gregorianStart: any, gregorianEnd: any): string {
    if (gregorianStart.year === gregorianEnd.year) {
        if (gregorianStart.month === gregorianEnd.month) {
            return `${gregorianStart.year} ${getGregorianMonthName(gregorianStart.month)}`;
        } else {
            return `${gregorianStart.year} ${getGregorianMonthName(gregorianStart.month)}/${getGregorianMonthName(gregorianEnd.month)}`;
        }
    } else {
        return `${gregorianStart.year}/${gregorianEnd.year} ${getGregorianMonthName(gregorianStart.month)}/${getGregorianMonthName(gregorianEnd.month)}`;
    }
}

window.onload = showCurrentMonth;
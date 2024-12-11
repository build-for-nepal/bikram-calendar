import { 
    toggleConverter, 
    populateDateDropdowns, 
    translations, 
    changeLanguage, 
    convertToBikram, 
    convertToGregorian 
} from './converter';

import { 
    showCurrentMonth,
    getfirstWeekday,
    convertToDevanagari,
    generateCalendar,
    loadEventsForYear,
    checkEvent,
    getEventText,
    getEventDetail,
    showEventDetails,
    getWeekdayFromGregorianDate,
    closeModal,
    handleModalClick,
    getMonthNameWithDefaultLanguage,
    previousYear,
    nextYear,
    changeMonth,
    changeYear,
    goToToday,
    getGregorianDate,
    getLastDayOfGregorian,
    getGregorianMonthName,
    formatGregorianMonthDisplay
} from './calendar';

// Attach functions to the window object
(window as any).toggleConverter = toggleConverter;
(window as any).populateDateDropdowns = populateDateDropdowns;
(window as any).changeLanguage = changeLanguage;
(window as any).convertToBikram = convertToBikram;
(window as any).convertToGregorian = convertToGregorian;
(window as any).showCurrentMonth = showCurrentMonth;
(window as any).getfirstWeekday = getfirstWeekday;
(window as any).convertToDevanagari = convertToDevanagari;
(window as any).generateCalendar = generateCalendar;
(window as any).loadEventsForYear = loadEventsForYear;
(window as any).checkEvent = checkEvent;
(window as any).getEventText = getEventText;
(window as any).getEventDetail = getEventDetail;
(window as any).showEventDetails = showEventDetails;
(window as any).getWeekdayFromGregorianDate = getWeekdayFromGregorianDate;
(window as any).closeModal = closeModal;
(window as any).handleModalClick = handleModalClick;
(window as any).getMonthNameWithDefaultLanguage = getMonthNameWithDefaultLanguage;
(window as any).previousYear = previousYear;
(window as any).nextYear = nextYear;
(window as any).changeMonth = changeMonth;
(window as any).changeYear = changeYear;
(window as any).goToToday = goToToday;
(window as any).getGregorianDate = getGregorianDate;
(window as any).getLastDayOfGregorian = getLastDayOfGregorian;
(window as any).getGregorianMonthName = getGregorianMonthName;
(window as any).formatGregorianMonthDisplay = formatGregorianMonthDisplay;

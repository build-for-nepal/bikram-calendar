import {Bikram, Tithi} from 'bikram-js';


let currentLanguage = 'nepali';
document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById("language") as HTMLSelectElement;
    if (languageSelect) {
        languageSelect.value = 'nepali';
        changeLanguage();
    }
});

export function toggleConverter(): void {
    const gregorianToBikramContainer = document.getElementById('gregorianToBikramContainer');
    const bikramToGregorianContainer = document.getElementById('bikramToGregorianContainer');
    const converterToggle = document.getElementById('converterToggle') as HTMLInputElement;
    if (converterToggle?.checked) {
        gregorianToBikramContainer?.classList.remove('active');
        bikramToGregorianContainer?.classList.add('active');
    } else {
        gregorianToBikramContainer?.classList.add('active');
        bikramToGregorianContainer?.classList.remove('active');
    }
}

export function populateDateDropdowns(): void {
    const today = new Date();
    const gYear = today.getFullYear();
    const gMonth = today.getMonth() + 1;
    const gDay = today.getDate();
    
    const yearSelect = document.getElementById("gYear") as HTMLSelectElement;
    yearSelect.innerHTML = "";
    for (let year = gYear - 10; year <= gYear + 10; year++) {
        const option = document.createElement("option");
        option.value = year.toString();
        option.textContent = year.toString();
        yearSelect.appendChild(option);
    }
    yearSelect.value = gYear.toString();

    const monthSelect = document.getElementById("gMonth") as HTMLSelectElement;
    monthSelect.innerHTML = "";
    translations[currentLanguage].gMonths.forEach((month, index) => {
        const option = document.createElement("option");
        option.value = (index + 1).toString();
        option.textContent = month;
        monthSelect.appendChild(option);
    });
    monthSelect.value = gMonth.toString();

    const daySelect = document.getElementById("gDay") as HTMLSelectElement;
    daySelect.innerHTML = "";
    const daysInMonth = new Date(gYear, gMonth, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
        const option = document.createElement("option");
        option.value = day.toString();
        option.textContent = day.toString();
        daySelect.appendChild(option);
    }
    daySelect.value = gDay.toString();

    const bikram = new Bikram();
    bikram.fromGregorian(gYear, gMonth, gDay);
    const bsYear = bikram.getYear();
    const bsMonth = bikram.getMonth();
    const bsDay = bikram.getDay();

    const bsYearSelect = document.getElementById("bsYear") as HTMLSelectElement;
    bsYearSelect.innerHTML = "";
    for (let year = bsYear - 10; year <= bsYear + 10; year++) {
        const option = document.createElement("option");
        option.value = year.toString();
        option.textContent = year.toString();
        bsYearSelect.appendChild(option);
    }
    bsYearSelect.value = bsYear.toString();

    const bsMonthSelect = document.getElementById("bsMonth") as HTMLSelectElement;
    bsMonthSelect.innerHTML = "";
    translations[currentLanguage].bsMonths.forEach((month, index) => {
        const option = document.createElement("option");
        option.value = (index + 1).toString();
        option.textContent = month;
        bsMonthSelect.appendChild(option);
    });
    bsMonthSelect.value = bsMonth.toString();

    const bsDaySelect = document.getElementById("bsDay") as HTMLSelectElement;
    bsDaySelect.innerHTML = "";
    const bsDaysInMonth = bikram.daysInMonth(bsYear, bsMonth);
    for (let day = 1; day <= bsDaysInMonth; day++) {
        const option = document.createElement("option");
        option.value = day.toString();
        option.textContent = day.toString();
        bsDaySelect.appendChild(option);
    }
    bsDaySelect.value = bsDay.toString();
}

interface Translations {
    [key: string]: {
        title: string;
        english: string;
        nepali: string;
        languageLabel: string;
        convertToBikramTitle: string;
        gYearLabel: string;
        gMonthLabel: string;
        gDayLabel: string;
        convertToBikramButton: string;
        convertToGregorianTitle: string;
        bsYearLabel: string;
        bsMonthLabel: string;
        bsDayLabel: string;
        convertToGregorianButton: string;
        gMonths: string[];
        bsMonths: string[];
    }
}

export const translations: Translations = {
    english: {
        title: "Date Converter",
        english: "English",
        nepali: "Nepali",
        languageLabel: "Select Language:",
        convertToBikramTitle: "Convert to Bikram Sambat",
        gYearLabel: "Year:",
        gMonthLabel: "Month:",
        gDayLabel: "Day:",
        convertToBikramButton: "Convert to Bikram Sambat",
        convertToGregorianTitle: "Convert to Gregorian",
        bsYearLabel: "Year:",
        bsMonthLabel: "Month:",
        bsDayLabel: "Day:",
        convertToGregorianButton: "Convert to Gregorian",
        gMonths: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        bsMonths: ["Baisakh", "Jestha", "Ashadh", "Shrawan", "Bhadra", "Ashwin", "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"]
    },
    nepali: {
        title: "मिति रूपान्तरण",
        english: "अङ्ग्रेजी",
        nepali: "नेपाली",
        languageLabel: "भाषा चयन गर्नुहोस्:",
        convertToBikramTitle: "विक्रम सम्बतमा रूपान्तरण",
        gYearLabel: "वर्ष:",
        gMonthLabel: "महिना:",
        gDayLabel: "दिन:",
        convertToBikramButton: "विक्रम सम्बतमा रूपान्तरण गर्नुहोस्",
        convertToGregorianTitle: "इसवि सम्बतमा रूपान्तरण",
        bsYearLabel: "वर्ष:",
        bsMonthLabel: "महिना:",
        bsDayLabel: "दिन:",
        convertToGregorianButton: "इसवि सम्बतमा रूपान्तरण गर्नुहोस्",
        gMonths: ["जनवरी", "फेब्रुअरी", "मार्च", "अप्रिल", "मे", "जुन", "जुलाई", "अगस्ट", "सेप्टेम्बर", "अक्टोबर", "नोभेम्बर", "डिसेम्बर"],
        bsMonths: ["बैसाख", "जेष्ठ", "आषाढ", "श्रावण", "भाद्र", "आश्विन", "कार्तिक", "मंसिर", "पौष", "माघ", "फागुन", "चैत"]
    }
};


export function changeLanguage(): void {
    currentLanguage = (document.getElementById("language") as HTMLSelectElement).value;
    const lang = translations[currentLanguage];
    document.getElementById("title")!.innerText = lang.title;
    document.getElementById("nepali")!.innerText = lang.nepali;
    document.getElementById("english")!.innerText = lang.english;
    document.getElementById("languageLabel")!.innerText = lang.languageLabel;
    document.getElementById("convertToBikramTitle")!.innerText = lang.convertToBikramTitle;
    document.getElementById("gYearLabel")!.innerText = lang.gYearLabel;
    document.getElementById("gMonthLabel")!.innerText = lang.gMonthLabel;
    document.getElementById("gDayLabel")!.innerText = lang.gDayLabel;
    document.getElementById("convertToBikramButton")!.innerText = lang.convertToBikramButton;
    document.getElementById("convertToGregorianTitle")!.innerText = lang.convertToGregorianTitle;
    document.getElementById("bsYearLabel")!.innerText = lang.bsYearLabel;
    document.getElementById("bsMonthLabel")!.innerText = lang.bsMonthLabel;
    document.getElementById("bsDayLabel")!.innerText = lang.bsDayLabel;
    document.getElementById("convertToGregorianButton")!.innerText = lang.convertToGregorianButton;
    populateDateDropdowns();
    document.getElementById("bikramResult")!.innerText = "";
    document.getElementById("gregorianResult")!.innerText = "";
}

export function convertToBikram(): void {
    const gYear = parseInt((document.getElementById("gYear") as HTMLSelectElement).value);
    const gMonth = (document.getElementById("gMonth") as HTMLSelectElement).selectedIndex + 1;
    const gDay = parseInt((document.getElementById("gDay") as HTMLSelectElement).value);

    const bikram = new Bikram();
    bikram.fromGregorian(gYear, gMonth, gDay);
    const bikramYear = bikram.getYear();
    const bikramMonth = bikram.getMonth();
    const bikramMonthName = bikram.getMonthName(bikramMonth);
    const bikramDay = bikram.getDay();
    const weekdayName = bikram.getWeekdayName(gYear, gMonth, gDay);
    const tithi = new Tithi();
    const tithiInfo = tithi.calculateTithi(gYear, gMonth, gDay);
   

    document.getElementById("bikramResult")!.innerText = `${bikramYear} ${bikramMonthName} ${bikramDay} ${weekdayName} (${tithiInfo.paksha}, ${tithiInfo.tithi})`;
}

export function convertToGregorian(): void {
    const bsYear = parseInt((document.getElementById("bsYear") as HTMLSelectElement).value);
    const bsMonth = parseInt((document.getElementById("bsMonth") as HTMLSelectElement).value);
    const bsDay = parseInt((document.getElementById("bsDay") as HTMLSelectElement).value);

    const bikram = new Bikram();
    bikram.fromNepali(bsYear, bsMonth, bsDay);
    const gYear = bikram.getYear();
    const gMonth = bikram.getMonth();
    const gDay = bikram.getDay();

    const gMonthName = translations[currentLanguage].gMonths[gMonth - 1];
    const weekdayName = bikram.getWeekdayName(gYear, gMonth, gDay);

    document.getElementById("gregorianResult")!.innerText = `${gYear} ${gMonthName} ${gDay} ${weekdayName}`;
};

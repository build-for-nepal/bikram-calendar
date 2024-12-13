/*
 * Copyright (C) 2024 Khumnath CG , Build-for-Nepal and contributors (https://github.com/build-for-nepal/bikram-calendar/graphs/contributors)
 * Khumnath(nath.khum@gmail.com)
 *
 * The Bikram Sambat and Tithi functionalities are implemented using calculations from 
 * port of the Perl script Pancanga library by M. Fushimi and M. Yano. For detailed information, consult the original documentation:
 * 
 * http://www.cc.kyoto-su.ac.jp/~yanom/pancanga/message314.html
 * http://www.cc.kyoto-su.ac.jp/~yanom/sanskrit/pancanga/pancanga3.14
 * 
 * All bikram sambat calculations are based on surya siddanta(ancient astronomy book).
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

export class Bikram {
    Year: number;
    Month: number;
    Day: number;
    YugaRotation_star: number;
    YugaRotation_sun: number;
    YugaCivilDays: number;
    PlanetApogee_sun: number;
    PlanetCircumm_sun: number;
    rad: number;

    constructor() {
        this.Year = 0;
        this.Month = -1;
        this.Day = 0;
        this.YugaRotation_star = 1582237828;
        this.YugaRotation_sun = 4320000;
        this.YugaCivilDays = this.YugaRotation_star - this.YugaRotation_sun;
        this.PlanetApogee_sun = 77 + (17 / 60);
        this.PlanetCircumm_sun = 13 + (50 / 60);
        this.rad = 57.2957795; // = 180/pi
    }

        /**
     * Calculate the Julian date for a given Gregorian date.
     * @param year - Gregorian year
     * @param month - Gregorian month (1-12)
     * @param day - Gregorian day (1-31)
     * @returns Julian date
     */
    getJulianDate(year: number, month: number, day: number): number {
        if (month <= 2) {
            year -= 1;
            month += 12;
        }
        const a = Math.floor(year / 100);
        const b = 2 - a + Math.floor(a / 4);
        return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5;
    }

        /**
     * Convert a Julian date to a Gregorian date.
     * @param julian_date - Julian date
     * @returns Object containing year, month, and day
     */
    fromJulianDate(julian_date: number): { year: number; month: number; day: number } {
        const a = Math.floor(julian_date + 0.5);
        const b = a + 1537;
        const c = Math.floor((b - 122.1) / 365.25);
        const d = Math.floor(365.25 * c);
        const e = Math.floor((b - d) / 30.6001);
        const f = b - d - Math.floor(30.6001 * e) + (julian_date + 0.5 - a);
        const day = Math.floor(f);
        const month = e < 14 ? e - 1 : e - 13;
        const year = month > 2 ? c - 4716 : c - 4715;
        return { year, month, day };
    }

        /**
     * Get the Saura Masa month and day for a given Ahargana.
     * @param ahar - Ahargana (days since epoch)
     * @returns Object containing month and day
     */
    getSauraMasaDay(ahar: number): { month: number; day: number } {
        let month: number, day: number;
        if (this.todaySauraMasaFirstP(ahar)) {
            day = 1;
            const tslong_tomorrow = this.getTslong(ahar + 1);
            month = (Math.floor(tslong_tomorrow / 30) % 12 + 12) % 12;
        } else {
            const previous = this.getSauraMasaDay(ahar - 1);
            day = previous.day + 1;
            month = previous.month;
        }
        return { month, day };
    }

        /**
     * Check if today is the first day of the Saura Masa month.
     * @param ahar - Ahargana (days since epoch)
     * @returns 1 if true, 0 otherwise
     */
    todaySauraMasaFirstP(ahar: number): number {
        const tslong_today = this.getTslong(ahar);
        const tslong_tomorrow = this.getTslong(ahar + 1);
        const today_mod = tslong_today - Math.floor(tslong_today / 30) * 30;
        const tomorrow_mod = tslong_tomorrow - Math.floor(tslong_tomorrow / 30) * 30;
        return (25 < today_mod && tomorrow_mod < 5) ? 1 : 0;
    }

        /**
     * Get the true solar longitude for a given Ahargana.
     * @param ahar - Ahargana (days since epoch)
     * @returns True solar longitude
     */
    getTslong(ahar: number): number {
        const t1 = (this.YugaRotation_sun * ahar / this.YugaCivilDays) % 1;
        const mslong = 360 * t1;
        const x1 = mslong - this.PlanetApogee_sun;
        const y1 = this.PlanetCircumm_sun / 360;
        const y2 = Math.sin(x1 / this.rad);
        const y3 = y1 * y2;
        const x2 = Math.asin(y3) * this.rad;
        return mslong - x2;
    }

        /**
     * Get the number of days in a given Bikram Sambat month.
     * @param bsYear - Bikram Sambat year
     * @param bsMonth - Bikram Sambat month (1-12)
     * @returns Number of days in the month
     */
    daysInMonth(bsYear: number, bsMonth: number): number {
        let { year: gYear, month: gMonth, day: gDay } = this.toGregorian(bsYear, bsMonth, 1);
        let julian_date_start = this.getJulianDate(gYear, gMonth, gDay);
        let nextMonth = (bsMonth % 12) + 1;
        let nextYear = (bsMonth === 12) ? bsYear + 1 : bsYear;
        let { year: gYearNext, month: gMonthNext, day: gDayNext } = this.toGregorian(nextYear, nextMonth, 1);
        let julian_date_end = this.getJulianDate(gYearNext, gMonthNext, gDayNext);
        return Math.floor(julian_date_end - julian_date_start);
    }

        /**
     * Convert a Gregorian date to a Bikram Sambat date.
     * @param y - Gregorian year
     * @param m - Gregorian month (1-12)
     * @param d - Gregorian day (1-31)
     */
    fromGregorian(y: number, m: number, d: number): void {
        const julian = this.getJulianDate(y, m, d);
        const ahar = julian - 588465.5;
        const { month: saura_masa_num, day: saura_masa_day } = this.getSauraMasaDay(ahar);
        const YearKali = Math.floor(ahar * this.YugaRotation_sun / this.YugaCivilDays);
        const YearSaka = YearKali - 3179;
        const nepalimonth = saura_masa_num % 12;
        this.Year = YearSaka + 135 + Math.floor((saura_masa_num - nepalimonth) / 12);
        this.Month = (saura_masa_num + 12) % 12;
        this.Day = saura_masa_day;
    }

        /**
     * Convert a Bikram Sambat date to a Gregorian date.
     * @param bsYear - Bikram Sambat year
     * @param bsMonth - Bikram Sambat month (1-12)
     * @param bsDay - Bikram Sambat day (1-31)
     * @returns Object containing year, month, and day
     */
        toGregorian(bsYear: number, bsMonth: number, bsDay: number): { year: number; month: number; day: number } {
        const YearSaka = bsYear - 135;
        const YearKali = YearSaka + 3179;
        let ahar = Math.floor((YearKali * this.YugaCivilDays) / this.YugaRotation_sun);
        let { month: saura_masa_num, day: saura_masa_day } = this.getSauraMasaDay(ahar);
        bsMonth = (bsMonth + 11) % 12;

        while (saura_masa_num !== bsMonth || saura_masa_day !== bsDay) {
            ahar += (saura_masa_num < bsMonth || (saura_masa_num === bsMonth && saura_masa_day < bsDay)) ? 1 : -1;
                ({ month: saura_masa_num, day: saura_masa_day } = this.getSauraMasaDay(ahar));
            }
        
            const julian_date = ahar + 588465.5;
        return this.fromJulianDate(julian_date);
    }

        /**
 * Convert a Bikram Sambat date to a Gregorian date and store it in the instance.
 * @param bsYear - Bikram Sambat year
 * @param bsMonth - Bikram Sambat month (1-12)
 * @param bsDay - Bikram Sambat day (1-32)
 * 
 * Example Usage:
 * // Create an instance of the Bikram class
 * const bikram = new Bikram();
 * 
 * // Bikram Sambat date to convert
 * const bsYear = 2080;
 * const bsMonth = 5;
 * const bsDay = 15;
 * 
 * // Convert to Gregorian date and store in the instance
 * bikram.fromNepali(bsYear, bsMonth, bsDay);
 * 
 * // Access the stored Gregorian date
 * console.log(`Gregorian Year: ${bikram.Year}`);
 * console.log(`Gregorian Month: ${bikram.Month + 1}`); // Adjust back to 1-based month
 * console.log(`Gregorian Day: ${bikram.Day}`);
 */
fromNepali(bsYear: number, bsMonth: number, bsDay: number): void {
    const { year, month, day } = this.toGregorian(bsYear, bsMonth, bsDay);
    this.Year = year;
    this.Month = month - 1; // Adjust for 0-based month
    this.Day = day;
}



        /**
     * Get the Bikram Sambat year.
     * @returns Bikram Sambat year
     */
    getYear(): number {
        return this.Year;
    }

        /**
     * Get the Bikram Sambat month.
     * @returns Bikram Sambat month (1-12)
     */
    getMonth(): number {
        return this.Month + 1; // Return 1-based month
    }

        /**
     * Get the Bikram Sambat day.
     * @returns Bikram Sambat day (1-31)
     */
    getDay(): number {
        return this.Day;
    }

/**
 * Get the name of the weekday for a given date in Nepali.
 * @param year - Gregorian year
 * @param month - Gregorian month (1-12)
 * @param day - Gregorian day (1-31)
 * @returns Name of the weekday in Nepali
 */
    getWeekdayName(year: number, month: number, day: number): string {
        const nepaliDays = ["आइतबार", "सोमबार", "मंगलबार", "बुधबार", "बिहीबार", "शुक्रबार", "शनिबार"];
        const timeinfo = new Date(year, month - 1, day);
        const weekdayIndex = timeinfo.getDay();
        return nepaliDays[weekdayIndex];
    }

    /**
 * Get the name of the Nepali month.
 * @param month - Bikram Sambat month (1-12)
 * @returns Name of the Nepali month
 */
    getMonthName(month: number): string {
        const nepaliMonths = ["बैसाख", "जेष्ठ", "आषाढ", "श्रावण", "भाद्र", "आश्विन", "कार्तिक", "मंसिर", "पौष", "माघ", "फागुन", "चैत"];
        if (month < 1 || month > 12) {
            throw new Error('Invalid month number');
        }
        return nepaliMonths[month - 1];
    }
}

/**
 * Tithi Calculation Utilities
 */
export class Tithi {

    /**
     * Calculate the Tithi for a given Gregorian date and longitude.
     * @param year - Gregorian year
     * @param month - Gregorian month (1-12)
     * @param day - Gregorian day (1-31)
     * @param longitude - Longitude for calculation (default: 86.25)
     * @returns Object containing the tithi name and paksha
     */
    calculateTithi(year: number, month: number, day: number, longitude: number = 86.25): { tithi: string; paksha: string } {
        const nepalTimeOffset = 5.75; // 5 hours and 45 minutes
        const julianDate = this.getJulianDate(year, month, day);
        const tdays = julianDate - 2451545.0; // Days since J2000.0
        const t = tdays / 36525.0; // Julian centuries since J2000

        let moonLongitude = this.getMoonLongitude(t);
        let sunLongitude = this.getSunLongitude(t);

        const localTimeAdjustment = (nepalTimeOffset - (longitude / 360) * 24);
        moonLongitude = this.adjustLongitude(moonLongitude, localTimeAdjustment);
        sunLongitude = this.adjustLongitude(sunLongitude, localTimeAdjustment);

        let difference = moonLongitude - sunLongitude;
        if (difference < 0) difference += 360.0;

        let tithiIndex = Math.floor(difference / 12.0);
        tithiIndex = (tithiIndex + 30) % 30;

        const tithiName = this.getTithiName(tithiIndex);
        const paksha = this.getPaksha(tithiIndex);

        return {
            tithi: tithiName || "अज्ञात",
            paksha: paksha
        };
    }

    /**
     * Adjust the longitude based on the time adjustment for nepal.
     * @param longitude - Longitude to adjust
     * @param timeAdjustment - Time adjustment in hours
     * @returns Adjusted longitude
     */
    adjustLongitude(longitude: number, timeAdjustment: number): number {
        longitude += timeAdjustment * 15;
        return (longitude + 360) % 360;
    }

    /**
     * Calculate Julian Date from Gregorian date.
     * @param year - Gregorian year
     * @param month - Gregorian month (1-12)
     * @param day - Gregorian day (1-31)
     * @returns Julian date
     */
    getJulianDate(year: number, month: number, day: number): number {
        if (month <= 2) {
            year -= 1;
            month += 12;
        }
        const a = Math.floor(year / 100);
        const b = 2 - a + Math.floor(a / 4);
        return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5;
    }

    /**
     * Calculate the moon's longitude at a given time.
     * @param t - Julian centuries since J2000
     * @returns Moon's longitude in degrees
     */
    getMoonLongitude(t: number): number {
        const L1 = 218.316 + 481267.8813 * t;
        const D = 297.8502 + 445267.1115 * t;
        const M = 357.5291 + 35999.0503 * t;
        const M1 = 134.963 + 477198.8671 * t;
        const F = 93.272 + 483202.0175 * t;

        const moonLongitude = L1 
            + (6.289 * Math.sin(M1 * Math.PI / 180)) 
            - (1.274 * Math.sin((2 * D - M1) * Math.PI / 180)) 
            - (0.658 * Math.sin(2 * D * Math.PI / 180)) 
            - (0.214 * Math.sin(2 * M1 * Math.PI / 180)) 
            + (0.11 * Math.sin(D * Math.PI / 180));

        return moonLongitude % 360;
    }

    /**
     * Calculate the sun's longitude at a given time.
     * @param t - Julian centuries since J2000
     * @returns Sun's longitude in degrees
     */
    getSunLongitude(t: number): number {
        const l0 = 280.4665 + 36000.7698 * t;
        const m = 357.5291 + 35999.0503 * t;
        const c = (1.9146 - 0.004817 * t - 0.000014 * t * t) * Math.sin(m * Math.PI / 180)
                  + (0.019993 - 0.000101 * t) * Math.sin(2 * m * Math.PI / 180) 
                  + 0.000289 * Math.sin(3 * m * Math.PI / 180);

        const sunLongitude = l0 + c;
        return sunLongitude % 360;
    }

    /**
     * Get the name of the Tithi based on its index.
     * @param tithiIndex - Index of the Tithi (0-29)
     * @returns Name of the Tithi
     */
    getTithiName(tithiIndex: number): string {
        const tithiNames = [
            "प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पञ्चमी", 
            "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी", 
            "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "पूर्णिमा", 
            "प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पञ्चमी", 
            "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी", 
            "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "अमावस्या"
        ];
        return tithiNames[tithiIndex];
    }

    /**
     * Get the Paksha based on the Tithi index.
     * @param tithiIndex - Index of the Tithi (0-29)
     * @returns Name of the Paksha ("शुक्ल" or "कृष्ण")
     */
    getPaksha(tithiIndex: number): string {
        return tithiIndex < 15 ? "शुक्ल" : "कृष्ण";
    }
}

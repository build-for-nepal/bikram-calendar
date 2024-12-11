declare module 'bikram-js' {
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

    constructor();

    getJulianDate(year: number, month: number, day: number): number;
    fromJulianDate(julianDate: number): { year: number; month: number; day: number };
    getSauraMasaDay(ahar: number): { month: number; day: number };
    todaySauraMasaFirstP(ahar: number): number;
    getTslong(ahar: number): number;
    daysInMonth(bsYear: number, bsMonth: number): number;
    fromGregorian(y: number, m: number, d: number): void;
    toGregorian(bsYear: number, bsMonth: number, bsDay: number): { year: number; month: number; day: number };
    fromNepali(bsYear: number, bsMonth: number, bsDay: number): void;
    getYear(): number;
    getMonth(): number;
    getDay(): number;
    getWeekdayName(year: number, month: number, day: number): string;
    getMonthName(month: number): string;
  }

  export class Tithi {
    calculateTithi(
      year: number,
      month: number,
      day: number,
      longitude?: number
    ): { tithi: string; paksha: string };
    adjustLongitude(longitude: number, timeAdjustment: number): number;
    getJulianDate(year: number, month: number, day: number): number;
    getMoonLongitude(t: number): number;
    getSunLongitude(t: number): number;
    getTithiName(tithiIndex: number): string;
    getPaksha(tithiIndex: number): string;
  }
}
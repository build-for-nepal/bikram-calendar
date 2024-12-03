// tests/Bikram.test.ts
import { Bikram, Tithi } from '../src/index';

describe('Bikram Date Conversion and tithi test', () => {
    it('should convert Gregorian date 2024-01-01 to Bikram Sambat', () => {
        const bikram = new Bikram();
        bikram.fromGregorian(2024, 1, 1);
        
        expect(bikram.getYear()).toBe(2080); 
        expect(bikram.getMonth()).toBe(9);
        expect(bikram.getDay()).toBe(16);
    });

    it('should pasas correct tithi', () => {
        const testTithi = new Tithi();
        const tithiResult = testTithi.calculateTithi(2024, 1, 1);

        expect(tithiResult.tithi).toBe("पञ्चमी"); 
        expect(tithiResult.paksha).toBe("कृष्ण");
    });

    it('should convert Bikram Sambat date 2081-01-01 to Gregorian', () => {
        const bikram = new Bikram();
        const gregorianDate = bikram.toGregorian(2081, 1, 1);
        
        expect(gregorianDate.year).toBe(2024);
        expect(gregorianDate.month).toBe(4); 
        expect(gregorianDate.day).toBe(13);
    });
});

describe('Days in bikram month', () => {
    it('should calculate total days in bikram month 2081 08 to 30', () => {
        const bikram = new Bikram();
        const totalDays = bikram.daysInMonth(2081, 8);
        expect(totalDays).toBe(30);
    });
});

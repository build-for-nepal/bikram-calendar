/*
 * Copyright (C) 2024 Khumnath CG, Build-for-Nepal and contributors
 * Email: nath.khum@gmail.com
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

function calculateTithi(year, month, day) {
    // Nepal Time Offset (UTC+5:45) in minutes
    const nepalTimeOffsetMinutes = 5 * 60 + 45; // 5 hours and 45 minutes in minutes
    const localOffsetMinutes = new Date().getTimezoneOffset(); // This is negative for UTC+ and positive for UTC-
    const totalOffsetMinutes = nepalTimeOffsetMinutes - localOffsetMinutes;

    // Adjust for the day based on timezone offset
    const adjustedDate = new Date(Date.UTC(year, month - 1, day));
    adjustedDate.setUTCDate(adjustedDate.getUTCDate() + Math.floor(totalOffsetMinutes / (60 * 24)));
    
    const adjustedYear = adjustedDate.getUTCFullYear();
    const adjustedMonth = adjustedDate.getUTCMonth() + 1; // Months are zero-based in JavaScript
    const adjustedDay = adjustedDate.getUTCDate();

    const tdays = Math.floor(calculateDaysSinceJ2000(adjustedYear, adjustedMonth, adjustedDay)); // Use Math.floor to ensure whole number
    const t = tdays / 36525.0; // t is in Julian centuries since J2000
    let tithiIndex = calculateTithiIndex(t);
    
    // Handle negative Tithi index
    if (tithiIndex < 0) {
        tithiIndex = Math.abs(tithiIndex);
    }
    
    // Wrap around and round according to the specified rules
    tithiIndex = Math.round(tithiIndex) % 30; // Round and wrap to ensure valid index

 // Debugging output
 // console.log(`Year: ${year}, Month: ${month}, Day: ${day}`);
 // console.log(`Adjusted Year: ${adjustedYear}, Adjusted Month: ${adjustedMonth}, Adjusted Day: ${adjustedDay}`);
 // console.log(`Days Since J2000: ${tdays}, t: ${t}, Tithi Index: ${tithiIndex}`);
    
    const tithiName = getTithiName(tithiIndex);
    
    return {
        tithi: tithiName || "अज्ञात", // Return "अज्ञात" if tithi is undefined
        paksha: getPaksha(tithiIndex)
    };
}

function calculateDaysSinceJ2000(year, month, day) {
    const julianDate = getJulianDate(year, month, day);
    return Math.floor(julianDate - 2451545.0); // J2000.0 Julian date
}

function getJulianDate(year, month, day) {
    // Adjust for January and February
    if (month <= 2) {
        year -= 1;
        month += 12;
    }
    const a = Math.floor(year / 100);
    const b = 2 - a + Math.floor(a / 4);
    return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5;
}

function calculateTithiIndex(t) {
    const moonLongitude = getMoonLongitude(t);
    const sunLongitude = getSunLongitude(t);

    let difference = moonLongitude - sunLongitude;
    if (difference < 0) difference += 360.0;

    // Calculate the Tithi index based on the difference
    const tithiIndex = difference / 12.0; // This will be a floating-point number
    return tithiIndex; // Return without wrapping, to handle negative cases later
}

function getSunLongitude(t) {
    const l0 = 280.4665 + 36000.7698 * t;
    const m = 357.5291 + 35999.0503 * t;
    const c = (1.9146 - 0.004817 * t - 0.000014 * t * t) * Math.sin(m * Math.PI / 180)
              + (0.019993 - 0.000101 * t) * Math.sin(2 * m * Math.PI / 180)
              + 0.00029 * Math.sin(3 * m * Math.PI / 180);
    const theta = l0 + c;
    const lambda = theta - 0.00569 - 0.00478 * Math.sin((125.04 - 1934.136 * t) * Math.PI / 180);
    return lambda % 360;
}

function getMoonLongitude(t) {
    const L1 = 218.316 + 481267.8813 * t;
    const M1 = 134.963 + 477198.8676 * t;

    const longitude = (L1 + 6.289 * Math.sin(M1 * Math.PI / 180) - 1.274 * Math.sin((2 * L1 - M1) * Math.PI / 180) + 0.658 * Math.sin(2 * L1 * Math.PI / 180)) % 360;
    return longitude;
}

function getTithiName(tithiIndex) {
    const tithiNames = [
        "प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पञ्चमी", "षष्ठी", "सप्तमी", "अष्टमी", 
        "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "पूर्णिमा", 
        "प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पञ्चमी", "षष्ठी", "सप्तमी", 
        "अष्टमी", "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "अमावस्या"
    ];
    return tithiNames[tithiIndex];
}

function getPaksha(tithiIndex) {
    return tithiIndex < 15 ? "शुक्ल" : "कृष्ण"; 
} 
/* Example usage:
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1; // Months are zero-based in JavaScript
const day = today.getDate();

const result = calculateTithi(year, month, day);

console.log(`Tithi: ${result.tithi}, Paksha: ${result.paksha}, Today: ${year}-${month}-${day}`); */

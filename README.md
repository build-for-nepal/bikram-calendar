> [!IMPORTANT]  
> Now calculations doesn't follow time adjustments for nepal timezone.
> finding first day of month may have 1 day off or 1 day more since julian day and ahar(julian apoach) is in Greenwich Mean Time ‎(UTC)‎.
> thanks [@aj3sh](https://github.com/aj3sh) for testing those discrepancies. [conversation 🔗](https://github.com/opensource-nepal/node-nepali-datetime/issues/82#issuecomment-2559146283)

# Bikram-JS
[![Package Documentation](https://img.shields.io/badge/docs-Documentation-blue.svg)](https://build-for-nepal.github.io/bikram-calendar/docs/)
![License](https://img.shields.io/badge/License-GPLv3-blue.svg)
![NPM Version](https://img.shields.io/npm/v/bikram-js.svg)
![Build Status](https://img.shields.io/github/actions/workflow/status/build-for-nepal/bikram-calendar/test.yml)

Bikram-js is an npm package for converting Gregorian dates to Bikram Sambat dates, calculating Tithis, and providing various functionalities related to the Bikram Sambat calendar. This package is useful for developers needing accurate Nepali date conversions and Tithi calculations in their applications.

## Repository Structure

- **Root Folder**: Contains the source code for the `bikram-js` npm package.
- **example Folder**: Contains an example implementation of a calendar and date converter to demonstrate the use of the `bikram-js` package.


## Features

- Convert Gregorian dates to Bikram Sambat dates and vice versa
- Calculate Tithi (lunar day) for a given Gregorian date and longitude
- Retrieve Nepali month and weekday names


## Installation

You can install the package via npm:

```bash
npm install bikram-js
# Or for development purposes:
npm install bikram-js --save-dev
```


## Usage

### Bikram and Tithi Class

The `Bikram` class provides methods for converting between Gregorian and Bikram Sambat dates and retrieving Nepali month and weekday names.

#### Example


## Usage Examples *(these examples are in test section of this package too)*

Here are some examples of how to use the `bikram-js` package:

### Convert Gregorian Date to Bikram Sambat

```typescript
import { Bikram } from 'bikram-js';

const bikram = new Bikram();
bikram.fromGregorian(2024, 1, 1);

console.log(bikram.getYear());  // 2080
console.log(bikram.getMonth()); // 9
console.log(bikram.getDay());   // 16
```

### Calculate Tithi

```typescript
import { Tithi } from 'bikram-js';

const testTithi = new Tithi();
const tithiResult = testTithi.calculateTithi(2024, 1, 1);

console.log(tithiResult.tithi); // "पञ्चमी"
console.log(tithiResult.paksha); // "कृष्ण"
```

### Convert Bikram Sambat Date to Gregorian

```typescript
import { Bikram } from 'bikram-js';

const bikram = new Bikram();
const gregorianDate = bikram.toGregorian(2081, 1, 1);

console.log(gregorianDate.year);  // 2024
console.log(gregorianDate.month); // 4
console.log(gregorianDate.day);   // 13
```

### Calculate Total Days in Bikram Month

```typescript
import { Bikram } from 'bikram-js';

const bikram = new Bikram();
const totalDays = bikram.daysInMonth(2081, 8);
console.log(totalDays); // 30

const totalDaysFebruary = bikram.daysInMonth(2081, 2);
console.log(totalDaysFebruary); // 32
```

### Calculate Tithi for Leap Year

```typescript
import { Tithi } from 'bikram-js';

const testTithi = new Tithi();
const tithiResult = testTithi.calculateTithi(2020, 2, 29);

console.log(tithiResult.tithi); // "पञ्चमी"
console.log(tithiResult.paksha); // "शुक्ल"
```

### Get Nepali Weekday Name from Gregorian Date

```typescript
import { Bikram } from 'bikram-js';

const bikram = new Bikram();
console.log(bikram.getWeekdayName(2024, 12, 5)); // 'बिहीबार'
console.log(bikram.getWeekdayName(2024, 12, 6)); // 'शुक्रबार' 
console.log(bikram.getWeekdayName(2024, 12, 7)); // 'शनिबार'
console.log(bikram.getWeekdayName(2024, 12, 8)); // 'आइतबार'
```

### Get Nepali Weekday Name from Bikram Sambat Date

```typescript
import { Bikram } from 'bikram-js';

const bikram = new Bikram();
const gregorianDate = bikram.toGregorian(2081, 8, 20);
const testDay = bikram.getWeekdayName(gregorianDate.year, gregorianDate.month, gregorianDate.day);
console.log(testDay); // "बिहीबार"
```

### Handle Leap Years Correctly

```typescript
import { Bikram } from 'bikram-js';

const bikram = new Bikram();
console.log(bikram.getWeekdayName(2020, 2, 29)); // 'शनिबार'
```

### Handle Edge Cases Correctly

```typescript
import { Bikram } from 'bikram-js';

const bikram = new Bikram();
console.log(bikram.getWeekdayName(2024, 1, 1)); // 'सोमबार'
console.log(bikram.getWeekdayName(2024, 12, 31)); // 'मंगलबार'
```

### Get Nepali Month Name for a Given Gregorian Date

```typescript
import { Bikram } from 'bikram-js';

const bikram = new Bikram();
bikram.fromGregorian(2024, 12, 5);
const testMonthName = bikram.getMonthName(bikram.getMonth());
console.log(testMonthName); // 'मंसिर'
```

### Handle Invalid Month Numbers Gracefully

```typescript
import { Bikram } from 'bikram-js';

const bikram = new Bikram();
try {
    bikram.getMonthName(0);
} catch (error) {
    console.error(error);
}
try {
    bikram.getMonthName(13);
} catch (error) {
    console.error(error);
}
```

## Documentation

Detailed documentation of functions are available in the `docs/docs` folder or here [![Package Documentation](https://img.shields.io/badge/docs-Documentation-blue.svg)](https://build-for-nepal.github.io/bikram-calendar/docs/)
. You can find comprehensive guides and examples on using the `bikram-js` library.

To view the documentation:

1. Navigate to the `docs/docs` folder.
2. Open the markdown files to read the documentation.

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for more details.

## Contributing

Contributions are welcome! you can fork this repo, create modifications and send pull request.


## Acknowledgements

The Bikram Sambat and Tithi functionalities are implemented using calculations from a port of the Perl script Pancanga library by M. Fushimi and M. Yano. For detailed information, consult the original documentation:

- [Documentation](http://www.cc.kyoto-su.ac.jp/~yanom/pancanga/message314.html)
- [Pancanga Library](http://www.cc.kyoto-su.ac.jp/~yanom/sanskrit/pancanga/pancanga3.14)

Special thanks to Samar Dhwoj Acharya ([techgaun](https://github.com/techgaun)), Kapil Karki ([kapil-31](https://github.com/kapil-31)), and the Build For Nepal team for their encouragement.


## Author

Khumnath CG (nath.khum@gmail.com)

## Contributors

Special thanks to all [contributors](https://github.com/build-for-nepal/bikram-calendar/graphs/contributors).

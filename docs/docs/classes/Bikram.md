[**bikram-js**](../README.md)

***

[bikram-js](../README.md) / Bikram

# Class: Bikram

## Constructors

### new Bikram()

> **new Bikram**(): [`Bikram`](Bikram.md)

#### Returns

[`Bikram`](Bikram.md)

#### Defined in

[index.ts:38](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L38)

## Properties

### Day

> **Day**: `number`

#### Defined in

[index.ts:30](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L30)

***

### Month

> **Month**: `number`

#### Defined in

[index.ts:29](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L29)

***

### PlanetApogee\_sun

> **PlanetApogee\_sun**: `number`

#### Defined in

[index.ts:34](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L34)

***

### PlanetCircumm\_sun

> **PlanetCircumm\_sun**: `number`

#### Defined in

[index.ts:35](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L35)

***

### rad

> **rad**: `number`

#### Defined in

[index.ts:36](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L36)

***

### Year

> **Year**: `number`

#### Defined in

[index.ts:28](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L28)

***

### YugaCivilDays

> **YugaCivilDays**: `number`

#### Defined in

[index.ts:33](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L33)

***

### YugaRotation\_star

> **YugaRotation\_star**: `number`

#### Defined in

[index.ts:31](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L31)

***

### YugaRotation\_sun

> **YugaRotation\_sun**: `number`

#### Defined in

[index.ts:32](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L32)

## Methods

### daysInMonth()

> **daysInMonth**(`bsYear`, `bsMonth`): `number`

Get the number of days in a given Bikram Sambat month.

#### Parameters

##### bsYear

`number`

Bikram Sambat year

##### bsMonth

`number`

Bikram Sambat month (1-12)

#### Returns

`number`

Number of days in the month

#### Defined in

[index.ts:139](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L139)

***

### fromGregorian()

> **fromGregorian**(`y`, `m`, `d`): `void`

Convert a Gregorian date to a Bikram Sambat date.

#### Parameters

##### y

`number`

Gregorian year

##### m

`number`

Gregorian month (1-12)

##### d

`number`

Gregorian day (1-31)

#### Returns

`void`

#### Defined in

[index.ts:155](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L155)

***

### fromJulianDate()

> **fromJulianDate**(`julian_date`): `object`

Convert a Julian date to a Gregorian date.

#### Parameters

##### julian\_date

`number`

Julian date

#### Returns

`object`

Object containing year, month, and day

##### day

> **day**: `number`

##### month

> **month**: `number`

##### year

> **year**: `number`

#### Defined in

[index.ts:72](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L72)

***

### fromNepali()

> **fromNepali**(`bsYear`, `bsMonth`, `bsDay`): `void`

Get the Nepali date as a string.

#### Parameters

##### bsYear

`number`

##### bsMonth

`number`

##### bsDay

`number`

#### Returns

`void`

Nepali date in YYYY-MM-DD format

#### Defined in

[index.ts:194](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L194)

***

### getDay()

> **getDay**(): `number`

Get the Bikram Sambat day.

#### Returns

`number`

Bikram Sambat day (1-31)

#### Defined in

[index.ts:221](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L221)

***

### getJulianDate()

> **getJulianDate**(`year`, `month`, `day`): `number`

Calculate the Julian date for a given Gregorian date.

#### Parameters

##### year

`number`

Gregorian year

##### month

`number`

Gregorian month (1-12)

##### day

`number`

Gregorian day (1-31)

#### Returns

`number`

Julian date

#### Defined in

[index.ts:57](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L57)

***

### getMonth()

> **getMonth**(): `number`

Get the Bikram Sambat month.

#### Returns

`number`

Bikram Sambat month (1-12)

#### Defined in

[index.ts:213](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L213)

***

### getMonthName()

> **getMonthName**(`month`): `string`

Get the name of the Nepali month.

#### Parameters

##### month

`number`

Bikram Sambat month (1-12)

#### Returns

`string`

Name of the Nepali month

#### Defined in

[index.ts:244](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L244)

***

### getSauraMasaDay()

> **getSauraMasaDay**(`ahar`): `object`

Get the Saura Masa month and day for a given Ahargana.

#### Parameters

##### ahar

`number`

Ahargana (days since epoch)

#### Returns

`object`

Object containing month and day

##### day

> **day**: `number`

##### month

> **month**: `number`

#### Defined in

[index.ts:90](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L90)

***

### getTslong()

> **getTslong**(`ahar`): `number`

Get the true solar longitude for a given Ahargana.

#### Parameters

##### ahar

`number`

Ahargana (days since epoch)

#### Returns

`number`

True solar longitude

#### Defined in

[index.ts:122](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L122)

***

### getWeekdayName()

> **getWeekdayName**(`year`, `month`, `day`): `string`

Get the name of the weekday for a given date in Nepali.

#### Parameters

##### year

`number`

Gregorian year

##### month

`number`

Gregorian month (1-12)

##### day

`number`

Gregorian day (1-31)

#### Returns

`string`

Name of the weekday in Nepali

#### Defined in

[index.ts:232](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L232)

***

### getYear()

> **getYear**(): `number`

Get the Bikram Sambat year.

#### Returns

`number`

Bikram Sambat year

#### Defined in

[index.ts:205](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L205)

***

### todaySauraMasaFirstP()

> **todaySauraMasaFirstP**(`ahar`): `number`

Check if today is the first day of the Saura Masa month.

#### Parameters

##### ahar

`number`

Ahargana (days since epoch)

#### Returns

`number`

1 if true, 0 otherwise

#### Defined in

[index.ts:109](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L109)

***

### toGregorian()

> **toGregorian**(`bsYear`, `bsMonth`, `bsDay`): `object`

Convert a Bikram Sambat date to a Gregorian date.

#### Parameters

##### bsYear

`number`

Bikram Sambat year

##### bsMonth

`number`

Bikram Sambat month (1-12)

##### bsDay

`number`

Bikram Sambat day (1-31)

#### Returns

`object`

Object containing year, month, and day

##### day

> **day**: `number`

##### month

> **month**: `number`

##### year

> **year**: `number`

#### Defined in

[index.ts:174](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L174)

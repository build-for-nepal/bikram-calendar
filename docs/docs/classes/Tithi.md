[**bikram-js**](../README.md)

***

[bikram-js](../README.md) / Tithi

# Class: Tithi

Tithi Calculation Utilities

## Constructors

### new Tithi()

> **new Tithi**(): [`Tithi`](Tithi.md)

#### Returns

[`Tithi`](Tithi.md)

## Methods

### adjustLongitude()

> **adjustLongitude**(`longitude`, `timeAdjustment`): `number`

Adjust the longitude based on the time adjustment for nepal.

#### Parameters

##### longitude

`number`

Longitude to adjust

##### timeAdjustment

`number`

Time adjustment in hours

#### Returns

`number`

Adjusted longitude

#### Defined in

[index.ts:300](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L300)

***

### calculateTithi()

> **calculateTithi**(`year`, `month`, `day`, `longitude`): `object`

Calculate the Tithi for a given Gregorian date and longitude.

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

##### longitude

`number` = `86.25`

Longitude for calculation (default: 86.25)

#### Returns

`object`

Object containing the tithi name and paksha

##### paksha

> **paksha**: `string`

##### tithi

> **tithi**: `string`

#### Defined in

[index.ts:266](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L266)

***

### getJulianDate()

> **getJulianDate**(`year`, `month`, `day`): `number`

Calculate Julian Date from Gregorian date.

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

[index.ts:312](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L312)

***

### getMoonLongitude()

> **getMoonLongitude**(`t`): `number`

Calculate the moon's longitude at a given time.

#### Parameters

##### t

`number`

Julian centuries since J2000

#### Returns

`number`

Moon's longitude in degrees

#### Defined in

[index.ts:327](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L327)

***

### getPaksha()

> **getPaksha**(`tithiIndex`): `string`

Get the Paksha based on the Tithi index.

#### Parameters

##### tithiIndex

`number`

Index of the Tithi (0-29)

#### Returns

`string`

Name of the Paksha ("शुक्ल" or "कृष्ण")

#### Defined in

[index.ts:382](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L382)

***

### getSunLongitude()

> **getSunLongitude**(`t`): `number`

Calculate the sun's longitude at a given time.

#### Parameters

##### t

`number`

Julian centuries since J2000

#### Returns

`number`

Sun's longitude in degrees

#### Defined in

[index.ts:349](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L349)

***

### getTithiName()

> **getTithiName**(`tithiIndex`): `string`

Get the name of the Tithi based on its index.

#### Parameters

##### tithiIndex

`number`

Index of the Tithi (0-29)

#### Returns

`string`

Name of the Tithi

#### Defined in

[index.ts:365](https://github.com/build-for-nepal/bikram-calendar/blob/525157e6ac695a4b9bc3f330cc081a863ddc61d7/src/index.ts#L365)

#ku4js-kernel

kodmunki™ utilities for JavaScript kernel is both a stand alone library and also acts as the kernel for the ku4js-* suite of libraries that make up the ku4js Framework an Object Oriented JavaScript Framework.

ku4js-kernel contains a vast number of powerful classes and patterns including: value objects, asserters, collections, math, geometry, finance, mediators, specifications, state machine abstractions and many more!

<img src="http://www.kodmunki.com/media/logo-small.png" alt="kodmunki" />

---

#Bind to jquery
You can bind ku4js to jquery by setting `var ku4jQuery = true;` before ku4js loads.

#Documentation
The following documentation describes each class in the ku4js-kernel library. It is organized to follow the directory structure found in /src ordered by lowest level constructs first. All instantiable classes can be instantiated using the $.className() syntax. All constructors are empty unless otherwise noted.

The API tables in each section of the documentation contain three columns. 

| API | Return | Description |
| --- | --- | --- |
|This column contains the actual JavaScript API of the property or method in question. Proper syntax is depicted. Argument types are displyed in italics. Class/static methods are denoted with the class name, whereas instance level methods will begin with a dot. Example class/static method: **$.math.round(value:_Number_, nearest:_Number_)**. Example of an instance method: **.toString()** | The return values type, if any. A value of "this" in this column indicates the return of a reference to self | This column contains descriptions and any **Gotchas!** |

##Base

###Asserters
ku4js-kernel contains an assortment of tested assertion functions that are useful in performing common logic tasks. By using ku4js-kernel asserters, not only are you able to leverage succinct powerful assertions, but your assertions will also clearly reveal the intention of the code.

| API | Return | Description |
| --- | --- | --- |
|$.isArray(value:_Object_)| Boolean | Returns true if value is an instance of an Array.|
|$.isBool(value:_Object_)| Boolean | Returns true if value is of type Boolean.|
|$.isDate(value:_Object_)| Boolean | Returns true if value is an instance of a Date.|
|$.isEvent(value:_Object_)| Boolean | A cross browser compatible assertion returning true if value is an instance of an Event or is a window.event.|
|$.isNumber(value:_Object_)| Boolean | Returns true if value is a Number and not NaN.|
|$.isObject(value:_Object_)| Boolean | Returns true if value is an Object that is not a Boolean, Number, Date, Array, String, or Function. |
|$.isObjectLiteral(value:_Object_)| Boolean | Returns true if value is an object litteral.|
|$.isFunction(value:_Object_)| Boolean | Returns true if value is an instance of a Function.|
|$.isString(value:_Object_)| Boolean | Returns true if value is a String.|
|$.isZero(value:_Object_)| Boolean | Returns true if value is 0.|
|$.isOdd(value:_Object_)| Boolean | Returns true if value is an odd number.|
|$.isEven(value:_Object_)| Boolean | Returns true if value is an even number.|
|$.isNull(value:_Object_)| Boolean | Returns true if value is null.|
|$.isUndefined(value:_Object_)| Boolean | Returns true if value is undefined.|
|$.isEmpty(value:_Object_)| Boolean | Returns true if value is an empty string.|
|$.isNullOrEmpty(value:_Object_)| Boolean | Returns true if value is undefined, null or an empty string.|
|$.exists(value:_Object_)| Boolean | Returns true if value is not undefined or null.|
|$.areEqual(value1:_Object_, value1:_Object_)| Boolean | Returns true if value1 and value2 are equal. This is useful for testing value objects.|
|$.xor(value1:_Boolean_, value2:_Boolean_)| Boolean | Returns true if the exclusive or opertionation of value1 and value2 evaluates to true.|

###Class
Class is a foundational construct from which numerous other classes inherit. This construct is leveraged 
heavily throughout the ku4js Framwork suite. It offers subclasses a common property API that includes 

* get()
* set()
* property() //a getter/setter. 

It also exposes the inheritance API $.Class.extend(). To subclass JavaScript classes with ku4js-kernel 
using the kernel simply do the following:

```javascript
function myClass() {
    myClass.base.call(this); //This line is required and set the correct scope.
    
    /*Add further constructor items, initializers and any other relevant code here*/
    
}
myClass.prototype = {

    /*All prototype methods go here*/
    
};
$.Class.extend(myClass, $.Class); //We are creating our subclass here. myClass is a subclass of $.Class

$.myClass = function() { return new myClass(); } //This line is optional. It will make this class pulic. Without this line this class will be internal.
```

With the above implementation. A developer can now call $.myClass() to instantiate a new myClass that 
contains get(), set(), and property(). It is important to note that many ku4js-* classes expose an inheritence
interface and can be inherited using the same convention as class. For example, to inherit from $.mediator, 
a developer would simply replace $.Class.extend(myClass, $.Class) in the example above with 
$.Class.extend(myClass, $.mediator.Class) and they would now be inheriting from $.mediator.

###math
Convenient math operations, and some that fix odd bugs.

| API | Return | Description |
| --- | --- | --- |
| $.math.round(value:_Number_, nearest:_Number_) | Number | Rounds value to the nearest, where nearest is the base 10 exponent to which to round. |
| $.math.roundUp(value:_Number_, nearest:_Number_) | Number | Rounds value up to the nearest, where nearest is the base 10 exponent to which to round. |
| $.math.roundDown(value:_Number_, nearest:_Number_) | Number | Rounds value down to the nearest, where nearest is the base 10 exponent to which to round. |
| $.math.roundTowardZero(value:_Number_, nearest:_Number_) | Number | Rounds value toward zeor to the nearest, where nearest is the base 10 exponent to which to round. |
| $.math.roundFactorial(value:_Number_) | Number | Returns the factorial of value. !value. |
| $.math.gcd(value1:_Number_, value2:_Number_) | Number | Returns the greatest common divisor given value1 and value2. |

###str
Convenient string operations.

| API | Return | Description |
| --- | --- | --- |
| $.str.trimStart(value:_String_) | String | Returns a string with leading whitespace trimmed. |
| $.str.trimEnd(value:_String_) | String | Returns a string with trailing whitespace trimmed. |
| $.str.trim(value:_String_) | String | Returns a string with leading and trailing whitespace trimmed. |
| $.str.format(value:_String_, ...:_String_) | String | Returns a string replacing the format placeholders with the following arguments. |
| $.str.render(value:_String_, obj:_object_) | String | Returns a string replacing the format placeholders with the values of the key, value pairs in the following object argument. |
| $.str.encodeBase64(value:_String_) | String | Returns a base 64 encoded string from value. |
| $.str.decodeBase64(value:_String_) | String | Returns a string from a base 64 encoded value. |
| $.str.encodeUtf8(value:_String_) | String | Returns a UTF-8 encoded value from value. |
| $.str.decodeUtf8(value:_String_) | String | Returns a string from a UTF-8 encoded value. |
| $.str.parse(value:_Number_, ...:_Number_) | String | Returns a string from the character code arguments. |

###uid
A 32 character random unique ID. 

| API | Return | Description |
| --- | --- | --- |
|$.uid()| String | Returns a 32 character random character string |


##Account

###emailAddress
An email address value object.

| API | Return | Description |
| --- | --- | --- |
| .local() | String | Returns the local portion of the email address. |
| .domain() | String | Returns the domain portion of the email address. |
| .topLevelDomain() | String | Returns the top level domain portion of the email address. |
| .equals(other:_emailAddress_) | Boolean | Returns true if the email addresses are equal. |
| .toString() | String | Returns a string representation of the email address. |
| $.emailAddress.parse(string:_String_) | emailAddress | Returns an email address containing the corresponding components. |

###phoneNumber
A phone number value object.

| API | Return | Description |
| --- | --- | --- |
| .value() | Number | Returns a number value of the phone number. |
| .equals(other:_phoneNumber_) | Boolean | Returns true if the this is equal to other. |
| .toStringWithFormat(format:_String_) | String | Returns a string value replacing each instance of "#" with the subsequent number in the value. Example: $.phoneNumber(2224441234).toStringWithFormat("(###) ###-####") == "(222) 444-1234" |
| $.phoneNumber.parse(string:_String_) | phoneNumber | Returns a phoneNumber with corresponding value. |

###properName
A proper name value object.


| API | Return | Description |
| --- | --- | --- |
| .first() | String | Returns the first name. |
| .middle() | String | Returns the middle name. |
| .last() | String | Returns the last name. |
| .full() | String | Returns the first middle and last name concatenated with space character separators. |
| .initials() | String | Returns the first letter of each name part capitalized and followed by a . character and a space character separator. |
| .equals(other_properName_) | String | Returns true if each part of this is equal to the corresponding part of other. |
| .toStringWithFormat(format:_String_) | String | Returns a string formatted with the passed format. The rules are: {F} = first name, {f} = first initial, {M} = middle name, {m} = middle initial, {L} = last name, {l} = last initial. Example $.properName("John", "Jacob", "Doe").toStringWithFormat("{L} {F}, {m}.") == "Doe John, J." |

##Collections

###hash

A key value pair collection.

| API | Return | Description |
| --- | --- | --- |
| .count() | Number | Returns the number of items in the hash. |
| .keys() | Array | Returns an array of all keys. |
| .values() | Array | Returns an array of all values. |
| .add(key:_String_, value:_Object_) | this | Adds value to hash with key. |
| .update(key:_String_, value:_Object_) | this | Updates the value at key. |
| .remove(key:_String_) | this | Removes the key, value pair that has key. |
| .clear() | this | Removes all key, value pairs. |
| .findKey(value:_Object_) | String | Returns the key for value. |
| .findValue(key:_String_) | Object | Returns the value at key.  |
| .each(func:_function_, scope:_Object?_) | this | Calls func for each item in the hash passing the object {"key": key, "value": value} on each pass. If scope is passed function will be called in the passed scope. |
| .quit() | this | Breaks the iterator. |
| .contains(value:_hash/object_) | Boolean | Returns true if the hash contains the passed value.  |
| .containsKey(key:_String_) | Boolean | Returns true if the hash contains the key. |
| .containsValue(value:_Object_) | Boolean | Returns true if the hash contains the value. |
| .isEmpty() | Boolean | Returns true if the hash is empty. |
| .merge(other:_hash/object_) | hash | Returns a new hash contains key, value pairs are a combination of the current hash and other giving precedence to the current hash for common keys. |
| meld(other:_hash/object_) | hash | Returns a new hash contains key, value pairs are a combination of the current hash and other giving precedence to the other hash for common keys. |
| .replicate() | hash | Returns a copy of the current hash. |
| .toObject() | object | Returns an object that contains key, value pairs equivalent to the key, value pairs of the current hash. |

###list

A indexed collection

| API | Return | Description |
| --- | --- | --- |
| .count() | Number | Returns the number of items in the list. |
| .add(item:_Object_, value:_Object_) | this | Adds value to list with key. |
| .remove(item:_Object_) | this | Removes the item. |
| .clear() | this | Removes all items. |
| .find(index:_Number_) | String | Returns the key for value. |
| .each(func:_function_, scope:_Object_) | this | Calls func for each item in the list passing the item on each pass. If scope is passed function will be called in the passed scope. |
| .quit() | this | Breaks the iterator. |
| .contains(item:_Object_) | Boolean | Returns true if the list contains the value. |
| .toArray() | object | Returns an array that contains items equivalent to the items of the current list. |

##Datetime

###dayPoint

A value object that represents a day.

| API | Return | Description |
| --- | --- | --- |
| .value() | Date | Returns the Date value |
| .day() | Number | Returns the zero indexed day of the week |
| .date() | Number | Returns the date |
| .month() | Number | Returns the month |
| .year() | Number | Returns the year |
| .isWeekday() | Boolean | Returns true if the day is 1-5 |
| .isWeekend() | Boolean | Returns true if the day is 0 or 6 |
| .isLeapYear() | Boolean | Returns true if the year contains a 29th day in the second month |
| .nextDay() | dayPoint | Returns the next day |
| .prevDay() | dayPoint | Returns the previous day |
| .add(years:_Number_, months:_Number_, days:_Number_) | dayPoint |  |
| .firstDayOfMonth() | dayPoint | Returns the first day of the current month |
| .lastDayOfMonth() | dayPoint | Returns the last day of the current month |
| .isBefore(other:_dayPoint_) | Boolean | Returns true if other is earlier than this dayPoint |
| .isAfter(other:_dayPoint_) | Boolean | Returns true if other is later than this dayPoint |
| .equals(other:_dayPoint_) | Boolean | Returns true if other is equal to than this dayPoint |
| .toString() | String | Returns the string value of the dayPoint |
| .toStringWithFormat(format:_String_) | String | Returns a string formatted per the passed format. Example: $.dayPoint(2013, 5, 24).toStringWithFormat("mm/dd/yy") == "05/24/13" |
| .toDate() | Date | Returns a Date value |
| .toJson() | String | Returns the JSON string value |
| $.dayPoint.canParse(string:_String_) | Boolean | Returns true if the string can be parsed into a dayPoint |
| $.dayPoint.parse(string:_String_) | dayPoint | Returns a dayPoint with the appropriate value |
| $.dayPoint.tryParse(string:_String_) | dayPoint | Returns a dayPoint with the appropriate value or null if the string value cannot be parsed |
| $.dayPoint.today() | dayPoint | Returns a dayPoint with the value, today |
| $.dayPoint.assumeNow(dayPoint:_dayPoint_) | void | Sets today as dayPoint. Can be very useful in testing application features that are date dependent. This feature allows the development of date dependent features without the need to manipulate system time. |

##Finance

###money

A value object that represents money.

| API | Return | Description |
| --- | --- | --- |
| .cents() | Number | Returns the fractional value of the money. |
| .dollars() | Number | Returns the whole value of the money. |
| .currency() | String | Returns the currency. "$" is the default. |
| .value() | Number | Returns the entire value of the money. |
| .add(other:_money_) | money | Returns a money whose value is the sum on this value plus other value. |
| .divide(divisor:_Number_) | money | Returns a money whose value is the quotient of this value divided by divisor.  |
| .equals(other:_money_) |Boolean  | Return true if this value equals other value. |
| .exchange(rate:_Number_, currency:_String_) | money  | Return a money of currency with value or this times rate. |
| .isOfCurrency(other:_money_) | Boolean | Return true if this currency is equal to other currency. |
| .isGreaterThan(other:_money_) | Boolean | Return true if this value > other value. |
| .isLessThan(other:_money_) | Boolean | Returns true if this value < other value. |
| .multiply(multiplier:_Number_) | money | Returns a money whose value is the product of this value times the multiplier. |
| .round() | money | Returns a money whose value is the value of this money rounded to the nearest hundredth. |
| .roundDown() | money | Returns a money whose value is the value of this money rounded down to the nearest hundredth. |
| .roundUp() | money | Returns a money whose value is the value of this money rounded up to the nearest hundredth. |
| .nearestDollar() | money | Returns a money whose value is the value of this money rounded to the nearest whole value. |
| .subtract(other:_money_) | money | Returns a money whose value is the difference of this value minus other value. |
| .toString(tens:_String_, tenths:_String_) | String | Returns a string representation of the money. There are two optional parameters tens and tenths. These values act as the separators for the tens and the tenths respectively. That is as an example $.money(12345678.90).toString("-", "|") == "$12-345-678|90". |
| $.money.zero() | money | Returns a money with value 0. |
| $.money.isMoney(other:_money_) | Boolean | Returns true if other is and instance of money |
| $.money.canParse(string:_String_) | money | Returns true if the string can be parsed to money. |
| $.money.parse(string:_String_) | money | Returns a money with corresponding value. |
| $.money.tryParse(string:_String_) | money | Returns a money with corresponding value if string can be parsed. Otherwise, null. |

##Geometry

###coord

A value object object representing a coordinate.

| API | Return | Description |
| --- | --- | --- |
| .x |  |  |
| .y |  |  |
| .abs |  |  |
| .add |  |  |
| .subtract |  |  |
| .multiply |  |  |
| .divide |  |  |
| .equals |  |  |
| .round |  |  |
| .half |  |  |
| .value |  |  |
| .toEm |  |  |
| .toPixel |  |  |
| .toString |  |  |

###point

A value object object representing a coordinate.

| API | Return | Description |
| --- | --- | --- |
|  |  |  |

###rectangle

A value object object representing a coordinate.

| API | Return | Description |
| --- | --- | --- |
|  |  |  |

###vector

A value object object representing a coordinate.

| API | Return | Description |
| --- | --- | --- |
|  |  |  |

##Patterns

###iterator

A value object object representing a coordinate.

| API | Return | Description |
| --- | --- | --- |
|  |  |  |

###mediator
| API | Return | Description |
| --- | --- | --- |
| .throwErrors() | this | Causes errors that occur in the notification process to be thrown, which will kill the JavaScript process if left unhandled. |
| .logErrors() | this | Causes errors that occur in the notification process to be logged to the console, allowing the JavaScript process to continue. |
| .catchErrors() | this | Causes errors that occur in the notification process to be silenced, allowing the JavaScript process to continue. |
| .isEmpty() | Boolean | Returns true if there are no subscribers. |
| .count() | Number | Returns that number of subscription managers. |
| .activeSubscriptionKeys() | Array | Returns an array of active subscription keys. |
| .subscribe(name_String_, method:_function_, scope:_Object?_, id:_String?_) | this | Subscribes method to be called in scope when name is notified. id is optional and used to unsubscribe |
| .unsubscribe(name_String_, id:_String?_) | this | Removes subscriber of id from all name notifications |
| .notify(filtersCSV:_String_, data:_Object_ ...) | this | Notifies subscribers by name with data. data and name are optional parameters and multiple data and multiple names may be passed. If no names are supplied all subscribers are notified. The names string can be a single name or a CSV of names. If no data is passed, no data is sent to the subscribers in the notification.  |
| .clear() | this | Clears all subscribers. |

####mediator notes!
This is a very powerful and useful pattern, but it comes with developer responsibilities. Below are some gotchas that
may arise when used irresponsibly, ignorantly, or unknowingly.

* You can setting the mediator to throwErrors or logErrors. Exceptions that arise in a methods that execute
through notification can be difficult to debug. Setting how the mediator handles these exceptions can be of great help
in development.

###observer
_Documentation Coming Soon_

| API | Return | Description |
| --- | --- | --- |
|  |  |  |

###queue
_Documentation Coming Soon_

| API | Return | Description |
| --- | --- | --- |
|  |  |  |

###specification
Constructor: $.spec(func:_function_). The function passed must take a value parameter and return a boolean value.

| API | Return | Description |
| --- | --- | --- |
| .and(other:_spec_) | spec | Returns a new spec whose isSatisfiedBy method is an evaluation of the current spec AND the other spec |
| .or(other:_spec_) | spec | Returns a new spec whose isSatisfiedBy method is an evaluation of the current spec OR the other spec |
| .xor(other:_spec_) | spec | Returns a new spec whose isSatisfiedBy method is an evaluation of the current spec XOR the other spec |
| .not() | spec | Inverts the return value of isSatisfiedBy |
| .isSatisfiedBy(value) | Boolean | Returns a boolean value of true if the value passed satisfies the specification |

####Spec Example:
```javascript
var oneSpec = $.spec(function(value) { return value === 1; }),
    twoSpec = $.spec(function(value) { return value === 2; }),
    oneOrTwoSpec = oneSpec.or(twoSpec);

console.log(oneSpec.isSatisfiedBy(1)) //Evaluates as true
console.log(twoSpec.isSatisfiedBy(1)) //Evaluates as false
console.log(oneOrTwoSpec.isSatisfiedBy(2)) //Evaluates as true
console.log(oneOrTwoSpec.isSatisfiedBy(3)) //Evaluates as false
```

###stack
_Documentation Coming Soon_

| API | Return | Description |
| --- | --- | --- |

---

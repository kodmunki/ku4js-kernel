#ku4jQuery-kernel

kodmunki™ utilities for jQuery kernel is a jQuery plugin for OO JavaScript development.

ku4jQuery-kernel contains numerous useful classes including collections, math, geometry, and numerous common
design patterns.

#Dependencies
* jQuery - http://jquery.com/ --:_This is not a dependency if kernel is compiled as such. See the:_kodmunki™ build process_(#kodmunki-build-process)_.

#kodmunki™ build process

This build process is dependent upon yuicompressor and a specific directory structure:

* root
 *:_build (This build script and the yuicompressor)
 * bin (The compiled scripts will appear here)
 * src (All script files go here)

The following variables found in setup () are
expected to be changed by the developer running
this process:

* LIBRARY (The library to build for or {} for none)
* PROJNAME (The name of your project)
* STARTMSG (A message to echo at start of build)
* ENDMSG (A message to echo at end of build)

---

#Documentation
The following is documentation for each class in the ku4jQuery-kernel library organized by common domain to follow the
directory structure found in /src. All constructors are empty unless otherwise noted.

##Class
Class is a foundational class that numerous other classes inherit from offering the subclasses a common property API
that includes get(), set(), and property() which is a getter/setter. It also exposes the inheritance API. To subclass
JavaScript classes using the kernel Class one would first create their class and then subclass as follows:

```javascript
function myClass() {
    myClass.base.call(this); //This line scopes the class hierarchy.
}
myClass.prototype = {
    /*All prototype methods go here*/
};
$.Class.extend(myClass, $.Class); //We are creating our subclass here.

$.myApp.myClass = function() { return new myClass(); } //We are exposing myClass for use here
```
With the above implementation. A developer can now call $.myApp.myClass() from within their application to instantiate
a new myClass that contains get(), set(), and property(). Also, it is important to note that many ku4* classes can be
inherited using the same convention as class. For example, to inherit from $.mediator, a developer would simply replace
$.Class.extend(myClass, $.Class) in the example above with $.Class.extend(myClass, $.mediator.Class)

##Account
_Coming soon_

##Collections

###hash
| API | Return | Description |
| --- | --- | --- |
| count() | Number | Returns the number of items in the hash. |
| keys() | Array | Returns an array of all keys. |
| values() | Array | Returns an array of all values. |
| add(key:_String_, value:_Object_) | this | Adds value to hash with key. |
| update(key:_String_, value:_Object_) | this | Updates the value at key. |
| remove(key:_String_) | this | Removes the key, value pair that has key. |
| clear() | this | Removes all key, value pairs. |
| findKey(value:_Object_) | String | Returns the key for value. |
| findValue(key:_String_) | Object | Returns the value at key.  |
| each(func:_function_, scope:_Object?_) | this | Calls func for each item in the hash passing the object {"key": key, "value": value} on each pass. If scope is passed function will be called in the passed scope. |
| quit() | this | Breaks the call. |
| contains(value:_hash/object_) | Boolean | Returns true if the hash contains the passed value.  |
| containsKey(key:_String_) | Boolean | Returns true if the hash contains the key. |
| containsValue(value:_Object_) | Boolean | Returns true if the hash contains the value. |
| isEmpty() | Boolean | Returns true if the hash is empty. |
| merge(other:_hash/object_) | hash | Returns a new hash contains key, value pairs are a combination of the current hash and other giving precedence to the current hash for common keys. |
| meld(other:_hash/object_) | hash | Returns a new hash contains key, value pairs are a combination of the current hash and other giving precedence to the other hash for common keys. |
| replicate() | hash | Returns a copy of the current hash. |
| toObject() | object | Returns an object that contains key, value pairs equivalent to the key, value pairs of the current hash. |

###list

| API | Return | Description |
| --- | --- | --- |
| count() | Number | Returns the number of items in the list. |
| add(item:_Object_, value:_Object_) | this | Adds value to list with key. |
| remove(item:_Object_) | this | Removes the item. |
| clear() | this | Removes all items. |
| find(index:_Number_) | String | Returns the key for value. |
| each(func:_function_, scope:_Object?_) | this | Calls func for each item in the list passing the item on each pass. If scope is passed function will be called in the passed scope. |
| quit() | this | Breaks the call. |
| contains(item:_Object_) | Boolean | Returns true if the list contains the value. |
| toArray() | object | Returns an array that contains items equivalent to the items of the current list. |

##Datetime
_Coming soon_

##Finance
_Coming soon_

##Geometry
_Coming soon_

##Patterns

###mediator
| API | Return | Description |
| --- | --- | --- |
| throwErrors() | this | Causes errors that occur in the notification process to be thrown, which will kill the JavaScript process if left unhandled. |
| logErrors() | this | Causes errors that occur in the notification process to be logged to the console, allowing the JavaScript process to continue. |
| catchErrors() | this | Causes errors that occur in the notification process to be silenced, allowing the JavaScript process to continue. |
| isEmpty() | Boolean | Returns true if there are no subscribers. |
| count() | Number | Returns that number of subscription managers. |
| activeSubscriptionKeys() | Array | Returns an array of active subscription keys. |
| subscribe(name_String_, method:_function_, scope:_Object?_, id:_String?_) | this | Subscribes method to be called in scope when name is notified. id is optional and used to unsubscribe |
| unsubscribe(name_String_, id:_String?_) | this | Removes subscriber of id from all name notifications |
| notify(data:_Object_, ..., name:_String_, ...) | this | Notifies subscribers of name with data. data and name are optional parameters and multiple data and multiple names may be passed. If no names are supplied all subscribers are notified. If no data is passed, no data is sent to the subscribers in the notification.  |
| clear() | this | Clears all subscribers. |


###spec
Constructor: $.spec(func:_function_). The function passed must take a value parameter and return a boolean value.

Example:
```javascript
var oneSpec = $.spec(function(value) { return value === 1; }),
    twoSpec = $.spec(function(value) { return value === 2; }),
    oneOrTwoSpec = oneSpec.or(twoSpec);

console.log(oneSpec.isSatisfiedBy(1)) //Evaluates as true
console.log(twoSpec.isSatisfiedBy(1)) //Evaluates as false
console.log(oneOrTwoSpec.isSatisfiedBy(2)) //Evaluates as true
console.log(oneOrTwoSpec.isSatisfiedBy(3)) //Evaluates as false
```

| API | Return | Description |
| --- | --- | --- |
| and(other:_spec_) | spec | Returns a new spec whose isSatisfiedBy method is an evaluation of the current spec AND the other spec |
| or(other:_spec_) | spec | Returns a new spec whose isSatisfiedBy method is an evaluation of the current spec OR the other spec |
| xor(other:_spec_) | spec | Returns a new spec whose isSatisfiedBy method is an evaluation of the current spec XOR the other spec |
| not() | spec | Inverts the return value of isSatisfiedBy |
| isSatisfiedBy(value) | Boolean | Returns a boolean value of true if the value passed satisfies the specification |
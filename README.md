#ku4jQuery-kernel

kodmunki™ utilities for jQuery kernel is a jQuery plugin for OO JavaScript development.

ku4jQuery-kernel contains numerous useful classes including collections, math, geometry, and numerous common
design patterns.

#Dependencies
* jQuery - http://jquery.com/

#kodmunki™ build process

This build process is dependent upon yuicompressor and a specific directory structure:

* root
 * _build (This build script and the yuicompressor)
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
directory structure found in /src.

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

| API | Return type | Description |
| --- | --- | --- |
|  |  |  |

##account
[Coming soon]

##collections
[Coming soon]

##datetime
[Coming soon]

##finance
[Coming soon]

##geometry
[Coming soon]

##patterns

###mediator
| API | returns | Description |
| --- | --- | --- |
| throwErrors() | self | Causes errors that occur in the notification process to be thrown, which will kill the JavaScript process if left unhandled. |
| logErrors() | self | Causes errors that occur in the notification process to be logged to the console, allowing the JavaScript process to continue. |
| catchErrors() | self | Causes errors that occur in the notification process to be silenced, allowing the JavaScript process to continue. |
| isEmpty() | Boolean | Returns true if there are no subscribers. |
| count() | Number | Returns that number of subscription managers. |
| activeSubscriptionKeys() | Array | Returns an array of active subscription keys. |
| subscribe(name, method, scope, id) | self | Subscribes method to be called in scope when name is notified. id is optional and used to unsubscribe |
| unsubscribe(name, id) | self | Removes subscriber of id from all name notifications |
| notify([data, ...], [name, ...]) | self | Notifies subscribers of name with data. data and name are optional parameters and multiple data and multiple names may be passed. If no names are supplied all subscribers are notified. If no data is passed, no data is sent to the subscribers in the notification.  |
| clear() | self | Clears all subscribers. |
var exception = function(type, info, browserTrace, ku4jTrace){
    this._type = type;
    this._info = info || "";
    this._browserTrace = browserTrace;
    this._ku4jTrace = ku4jTrace;
}
exception.prototype = {
    message: "",
    type: function(){ return this._type; },
    info: function(){ return this._info; },
    browserTrace: function(){ return this._browserTrace; },
    ku4jTrace: function(){ return this._ku4jTrace; },
    toString: function(){
        var format = "EXCEPTION: {0}: {1}\n\nBowser stack trace:\n{2}\n\nku4j stack:\n{3}";
        return $.str.format(format, this._type, this._info, this._browserTrace, this._ku4jTrace);
    },
    toObject: function(){
        return {
            type: this._type,
            message: this._info,
            browserTrace: this._browserTrace,
            ku4jTrace: this._ku4jTrace
        }
    }
}

$.kulog = function(){
    try { console.log.apply(console, arguments); }
    catch(e){ alert(Array.prototype.slice.call(arguments).join("\n")); }
}

$.refcheck = function(member, message){
    if(!$.exists(member)) throw $.exception("null", message);
    return member;
}

$.exception = function(type, message){
    var types = {
            "generic" : {
                type: "GENERIC EXCEPTION",
                message: "Generic exception. Use $.exception(\"[null|arg]\") for more detail."
            },
            "operation" : {
                type: "OPERATION EXCEPTION",
                message: "Invalid operation."
            },
            "null" : {
                type: "REFERENCE EXCEPTION",
                message: "Invalid reference to type null or undefined."
            },
            "arg" : {
                type: "ARGUMENT EXCEPTION",
                message: "Invalid argument"
            }
        },
        caller = arguments.callee.caller,
        ku4jTrace = "",
        browserTrace = "",
        typ = ($.exists(types[type])) ? types[type] : types.generic,
        msg = ($.exists(message)) ? " - " + message : "";
        
        (function(){
            try{ generate.exeception; }
            catch(e){
                browserTrace = ($.exists(e.stack)) ? e.stack.replace(/generate is.+/, ""): "[Unavailable]";
                var i = 0, method, m;
                while(caller && (i < 10)){
                    method = caller.toString().replace(/[\n\t\r\s]+/g, " ").substring(0, 100);
                    m = method
                        .replace(/\W/g, "a")
                        .replace(/\s/g, "")
                        .replace(/.*base\.js:216/, "")
                        .split(/\B/)
                        .length > 99
                            ? method + "..."
                            : method;
                    ku4jTrace += $.str.format("<kuidx[{0}]>:{1}\n", i, m);
                    caller = caller.caller;
                    i++;
                }
            }
        })();
    return new exception(typ.type, typ.message + msg, browserTrace, ku4jTrace);
}

/*
//IE
LOG: message 
LOG: description 
LOG: number 
LOG: name 
 
//firefox
fileName
lineNumber
 
//Safari
message
line
sourceId
expressionBeginOffset
expressionCaretOffset
expressionEndOffset
name
*/
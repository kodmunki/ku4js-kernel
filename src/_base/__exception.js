function exception(className, message, browserTrace, ku4Trace){
    var format = "ku4EXCEPTION @ {0}: {1}\n\nBrowser Stack Trace:\n{2}\n\nku4Trace:\n{3}";
    return new Error($.str.format(format, className.toUpperCase(), message, browserTrace, ku4Trace));
}

$.ku4exception = function(className, message) {
    var caller = arguments.callee.caller,
        ku4Trace = "",
        browserTrace = "";
        
        (function(){
            try{ generate.exeception(); }
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
                    ku4Trace += $.str.format("<ku4Idx[{0}]>:{1}\n", i, m);
                    caller = caller.caller;
                    i++;
                }
            }
        })();
    return exception(className, message, browserTrace, ku4Trace);
};

$.ku4Log = function(){
    try { console.log.apply(console, arguments); }
    catch(e){ alert(Array.prototype.slice.call(arguments).join("\n")); }
};
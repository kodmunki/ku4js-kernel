if(!$.exists($.evt)) $.evt = { };
$.evt.mute = function(event) {
    if(!$.exists(event)) return;
    if($.isFunction(event.preventDefault())) event.preventDefault();
    if($.isFunction(event.stopPropagation())) event.stopPropagation();
    if($.isFunction(event.stopImmediatePropagation())) event.stopImmediatePropagation();
    event.cancelBubble = true;
};
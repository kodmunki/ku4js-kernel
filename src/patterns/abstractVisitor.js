$.abstractVisitor = function() { }
$.abstractVisitor.prototype = {
    $visit: function(){ throw new Error("visit method is abstract an must be defined."); },
    subject: function(subject) { return this.property("subject", $.replicate(subject)); },
    visit: function() { return this.$visit(); }
}
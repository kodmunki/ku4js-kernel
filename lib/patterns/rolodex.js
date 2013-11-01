function rolodex(subj) {
    rolodex.base.call(this, subj);
}
rolodex.prototype = {
    $hasNext: function() {
	var s = this.$subject,
	    l = s.length - 1,
	    c = this.$current,
	    n = c + 1,
	    t = (n > l) ? 0 : n;
	return $.exists(s[t]);
    },
    $hasPrev: function() {
        var s = this.$subject,
	    l = s.length - 1,
	    c = this.$current,
	    n = c + 1,
	    t = (n < 0) ? l : n;
	return $.exists(s[t]);
    },
    $each: function(func, scp) {
	var s = scp || this; this.reset();
	do { func.call(scp, this.current()); } 
	    while (this.next() && (this.$current > 0)); this.reset();
    },
    $exec: function(n) {
	var s = this.$subject, l = (s.length - 1);
	this.$current = (n > l) ? 0 : ((n < 0) ? l : n);
	return s[this.$current];
    }
}
$.Class.extend(rolodex, $.iterator.Class);
$.rolodex = function(subj){ return new rolodex(subj); }
$.rolodex.Class = rolodex;
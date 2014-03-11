$.uid = function() {
	var a = Math.random().toString().replace(/\b\.\b/, ""),
	    b = Math.random().toString().replace(/\b\.\b/, "");
	return $.str.encodeBase64($.str.format("{0}x{1}", a, b)).replace(/=+/g,"0").substr(3,32);
};
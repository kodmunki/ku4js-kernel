$.uid = function(str) {
	var s = str || "kuid", u = Math.random().toString().replace(/\b\.\b/, "");
	return $.str.format("{0}{1}", s, u);
}
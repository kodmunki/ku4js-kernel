//kodmunki utilities
(function(J){$=J;$.isArray=function(l){return l instanceof Array};$.isBool=function(l){return(/boolean/i.test(typeof(l)))};$.isDate=function(l){return l instanceof Date};$.isEvent=function(l){try{return l instanceof Event}catch(R){return l===window.event}};$.isNumber=function(l){return(/number/i.test(typeof(l)))&&!isNaN(l)};$.isObject=function(l){return $.exists(l)&&(/object/i.test(typeof(l)))};$.isFunction=function(l){return(l instanceof Function)};$.isString=function(l){return(/string/i.test(typeof(l)))||l instanceof String};$.isZero=function(l){return l===0};$.isEven=function(l){return($.isNullOrEmpty(l)||$.isDate(l))?false:(isNaN(l)?false:($.isZero(l)?false:l%2===0))};$.isOdd=function(l){return($.isNullOrEmpty(l)||$.isDate(l))?false:(isNaN(l)?false:($.isZero(l)?false:!$.isEven(l)))};$.isNull=function(l){return l===null};$.isUndefined=function(l){return(/undefined/i.test(typeof(l)))};$.isEmpty=function(l){return $.isString(l)&&$.isZero(l.split(/\B/).length)};$.isNullOrEmpty=function(l){return !$.exists(l)||$.isEmpty(l)};$.exists=function(l){return(l!==null)&&(!$.isUndefined(l))};$.xor=function(R,l){return !R!=!l};$.replicate=function(S){var l=($.isDate(S))?new Date(S):($.isArray(S))?[]:($.isObject(S))?{}:S,R;for(n in S){R=S[n];l[n]=(($.isArray(R))||($.isObject(R)))?$.replicate(R):R}return l};if(!$.exists($.obj)){$.obj={}}$.obj.keys=function(R){var l=[];for(n in R){l[l.length]=n}return l};$.obj.values=function(R){var l=[];for(n in R){l[l.length]=R[n]}return l};$.obj.count=function(l){var R=0;for(n in l){R++}return R};$.obj.hasProp=function(l,R){return($.exists(l.hasOwnProperty))?l.hasOwnProperty(R):false};$.obj.merge=function(R,l){var S=$.replicate(l);for(n in R){S[n]=R[n]}return S};$.obj.meld=function(S,R){var l=$.replicate(R);for(n in S){if($.exists(l[n])){continue}l[n]=S[n]}return l};$.Class=function(){};$.Class.prototype={get:function(l){return this["_"+l]},set:function(R,l){this["_"+R]=l;return this},property:function(R,l){return($.isUndefined(l))?this.get(R):this.set(R,l)}};$.Class.extend=function(R,l){if(!R||!l){return null}var S=function(){};S.prototype=l.prototype;R.base=l;R.prototype=$.obj.merge(R.prototype,new S());R.prototype.constructor=R;return R};function d(l){d.base.call(this);this._isLocked=l||false}d.prototype={isLocked:function(){return this.get("isLocked")},lock:function(){this._isLocked=true;return this},unlock:function(){this._isLocked=false;return this}};$.Class.extend(d,$.Class);$.lock=function(l){return new d(l)};var m=function(S,T,l,R){this._type=S;this._info=T||"";this._browserTrace=l;this._ku4jTrace=R};m.prototype={message:"",type:function(){return this._type},info:function(){return this._info},browserTrace:function(){return this._browserTrace},ku4jTrace:function(){return this._ku4jTrace},toString:function(){var l="EXCEPTION: {0}: {1}\n\nBowser stack trace:\n{2}\n\nku4j stack:\n{3}";return $.str.format(l,this._type,this._info,this._browserTrace,this._ku4jTrace)},toObject:function(){return{type:this._type,message:this._info,browserTrace:this._browserTrace,ku4jTrace:this._ku4jTrace}}};$.kulog=function(){try{console.log.apply(console,arguments)}catch(l){alert(Array.prototype.slice.call(arguments).join("\n"))}};$.refcheck=function(R,l){if(!$.exists(R)){throw $.exception("null",l)}return R};$.exception=function(U,W){var T={generic:{type:"GENERIC EXCEPTION",message:'Generic exception. Use $.exception("[null|arg]") for more detail.'},operation:{type:"OPERATION EXCEPTION",message:"Invalid operation."},"null":{type:"REFERENCE EXCEPTION",message:"Invalid reference to type null or undefined."},arg:{type:"ARGUMENT EXCEPTION",message:"Invalid argument"}},R=arguments.callee.caller,S="",l="",V=($.exists(T[U]))?T[U]:T.generic,X=($.exists(W))?" - "+W:"";(function(){try{generate.exeception}catch(aa){l=($.exists(aa.stack))?aa.stack.replace(/generate is.+/,""):"[Unavailable]";var Z=0,ab,Y;while(R&&(Z<10)){ab=R.toString().replace(/[\n\t\r\s]+/g," ").substring(0,100);Y=ab.replace(/\W/g,"a").replace(/\s/g,"").replace(/.*base\.js:216/,"").split(/\B/).length>99?ab+"...":ab;S+=$.str.format("<kuidx[{0}]>:{1}\n",Z,Y);R=R.caller;Z++}}})();return new m(V.type,V.message+X,l,S)};if(!$.exists($.math)){$.math={}}$.math.round=function(T,S){var R=S||0,l=Math.pow(10,-R);return Math.round(parseFloat((T*l).toFixed(Math.abs(R))))/l};$.math.roundUp=function(T,S){var R=S||0,l=5*(Math.pow(10,R-1));return $.math.round(T+l,S)};$.math.roundDown=function(T,S){var R=S||0,l=5*(Math.pow(10,R-1));return $.math.round(T-l,S)};$.math.factorial=function(S){var l=S,R=S;while(R--){if(!!R){l*=R}}return l};$.math.divide=function(R,l){var S=$.isNumber(R)&&$.isNumber(l)&&!$.isZero(l);if(!S){throw new Error($.str.format("Invalid division. value: {0}/{1} | type: {2}/{3}",R,l,typeof R,typeof l))}return R/l};if(!$.exists($.str)){$.str={}}var M="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";$.str.build=function(){return"".concat.apply(new String(),arguments)};$.str.format=function(){var U=arguments,W=U[0],T=U.length,R,V;for(i=1;i<T;i++){R=U[i];V=($.isNull(R))?"null":($.isUndefined(R))?"undefined":R.toString();W=W.replace(RegExp("\\{"+(i-1)+"\\}","g"),V)}return W};$.str.parse=function(){return String.fromCharCode.apply(String,arguments)};$.str.trim=function(l){return $.str.trimStart($.str.trimEnd(l))};$.str.trimStart=function(l){if(!$.isString(l)){throw new Error("Cannot trim non-string values")}return($.exists(l.replace))?l.replace(/^\s*\b/,""):l};$.str.trimEnd=function(l){if(!$.isString(l)){throw new Error("Cannot trim non-string values")}return($.exists(l.replace))?l.replace(/\b\s*$/,""):l};$.str.encodeBase64=function(T){var U="",S=0,ab=$.str.encodeUtf8(T),ac,Z,X,aa,Y,W,V,l=function(ad){return ab.charCodeAt(ad)},R=function(ad){return M.charAt(ad)};while(S<ab.length){ac=l(S++);Z=l(S++);X=l(S++);aa=ac>>2;Y=((ac&3)<<4)|(Z>>4);W=((Z&15)<<2)|(X>>6);V=X&63;if(isNaN(Z)){W=V=64}else{if(isNaN(X)){V=64}}U+=(R(aa)+R(Y)+R(W)+R(V))}return U};$.str.decodeBase64=function(T){var U="",S=0,ab=T.replace(/[^A-Za-z0-9\+\/\=]/g,""),ac,Z,X,aa,Y,W,V,R=function(ad){return M.indexOf(ab.charAt(ad))},l=function(ad){return String.fromCharCode(ad)};while(S<ab.length){aa=R(S++);Y=R(S++);W=R(S++);V=R(S++);ac=(aa<<2)|(Y>>4);Z=((Y&15)<<4)|(W>>2);X=((W&3)<<6)|V;U+=l(ac);if(W!=64){U+=l(Z)}if(V!=64){U+=l(X)}}return $.str.decodeUtf8(U)};$.str.encodeUtf8=function(l){var V="",T=l.replace(/\r\n/g,"\n"),U=function(X){return T.charCodeAt(X)},S=function(X){return String.fromCharCode(X)};for(var R=0;R<T.length;R++){var W=U(R);if(W<128){V+=S(W)}else{if((W>127)&&(W<2048)){V+=(S((W>>6)|192)+S((W&63)|128))}else{V+=S((W>>12)|224)+S(((W>>6)&63)|128)+S((W&63)|128)}}}return V};$.str.decodeUtf8=function(W){var X="",U=0,V=0,T=0,S=0,Y=W,l=function(Z){return Y.charCodeAt(Z)},R=function(Z){return String.fromCharCode(Z)};while(U<Y.length){V=l(U);if(V<128){X+=R(V);U++}else{if((V>191)&&(V<224)){T=l(U+1);X+=R(((V&31)<<6)|(T&63));U+=2}else{T=l(U+1);S=l(U+2);X+=R(((V&15)<<12)|((T&63)<<6)|(S&63));U+=3}}}return X};$.uid=function(S){var R=S||"kuid",l=Math.random().toString().replace(/\b\.\b/,"");return $.str.format("{0}{1}",R,l)};function I(l){I.base.call(this);var R=(!$.exists(l)||!l.toObject)?l:l.toObject();this.$h=($.exists(R))?R:{};this._count=0;for(n in this.$h){this._count++}}I.prototype={count:function(){return this.get("count")},add:function(R,l){if(!$.exists(R)||this.containsKey(R)){return this}this.$h[R]=l;this._count++;return this},clear:function(){var l=this.$h;for(n in l){delete l[n]}this._count=0;return this},find:function(l){if(!$.exists(l)){return null}return this.$h[l]},findKey:function(l){if(!$.exists(l)){return null}var R=this.$h;for(n in R){if(R[n]==l){return n}}return null},findValue:function(l){return this.find(l)},quit:function(){this._iterator.quit();return this},each:function(R,l){var S=l||this;this._iterator=$.iterator(this.toObject());this._iterator.each(R,S);return this},isEmpty:function(){return this._count<1},listKeys:function(){return new $.list($.obj.keys(this.$h))},listValues:function(){return new $.list($.obj.values(this.$h))},containsKey:function(l){if(!$.exists(l)){return false}return $.exists(this.$h[l])},containsValue:function(R){var l=$.obj.values(this.$h),S=l.length;while(S--){if(l[S]==R){return true}}return false},merge:function(l){return H(this,l,"merge")},meld:function(l){return H(this,l,"meld")},remove:function(l){var R=this.$h;if(!$.exists(l)||!$.exists(R[l])){return this}delete R[l];this._count--;return this},replicate:function(){return $.hash($.replicate(this.$h))},toObject:function(){return this.$h},update:function(R,l){if(!$.exists(R)){return this}if(!this.containsKey(R)){this._count++}this.$h[R]=l;return this}};$.Class.extend(I,$.Class);function H(S,R,l){var T=(!R.toObject)?R:R.toObject();S.$h=$.obj[l](T,S.$h);S._count=$.obj.count(S.$h);return S}$.hash=function(l){return new I(l)};$.hash.Class=I;function t(S){t.base.call(this);this._keys=[];this._hash=$.hash();this._count=this._keys.length;if(!$.exists(S)){return}var T=0,R=S.length;while(T<R){this.add(S[T]);T++}}t.prototype={count:function(){return this.get("count")},add:function(R){var l=this._keys,S=$.uid();l[l.length]=S;this._hash.add(S,R);this._count=this._keys.length;return this},clear:function(){this._hash.clear();this._keys=[];this._count=this._keys.length;return this},contains:function(l){return this._hash.containsValue(l)},find:function(R){var l=this._keys;return($.exists(l[R]))?this._hash.find(l[R]):null},quit:function(){this._iterator.quit();return this},each:function(R,l){var S=l||this;this._iterator=$.iterator(this.toArray());this._iterator.each(R,S);return this},isEmpty:function(){return this._count<1},remove:function(S){var R=this._hash,l;if(!this.contains(S)){return this}l=R.findKey(S);this._keys.splice(l,1);R.remove(l);this._count=R.count();return this},toArray:function(){var l=[];this._hash.each(function(R){l.push(R.value)});return l},sort:function(R){var T=this.toArray().sort(R);this.clear();var U=0,S=T.length;while(U<S){this.add(T[U]);U++}return this}};$.Class.extend(t,$.Class);$.list=function(l){return new t(l)};$.list.Class=t;$.list.parseArguments=function(l){return new t(Array.prototype.slice.call(l))};function L(V,T,l,W,S,X,R){if((T<1)||(T>12)){throw new $.exception("arg","Invalid month at $.dayPoint")}if((l<1)||(l>P(T,V))){throw new $.exception("arg","Invalid date at $.dayPoint")}this._value=(arguments.length>=3)?new Date(V,T-1,l,W||0,S||0,X||0,R||0):new Date();var Y=this._value;function Z(aa){return aa<10?"0"+aa:""+aa}this._day=Y.getDay();this._date=l;this._month=T;this._year=V;this._hour=Z(Y.getHours());this._minute=Z(Y.getMinutes());this._second=Z(Y.getSeconds());this._millisecond=Z(Y.getMilliseconds());var U=this._day;this._isWeekday=U>0&&U<6;this._isWeekend=!this._isWeekday}L.prototype={value:function(){return this._value},day:function(){return this._day},date:function(){return this._date},month:function(){return this._month},year:function(){return this._year},hour:function(){return this._hour},minute:function(){return this._minute},second:function(){return this._second},millisecond:function(){return this._millisecond},isWeekday:function(){return this._isWeekday},isWeekend:function(){return this._isWeekend},equals:function(l){return this._value==l.value()},nextDay:function(){return Q(this,1,0,0)},prevDay:function(){return Q(this,-1,0,0)},nextMonth:function(){return Q(this,0,1,0)},prevMonth:function(){return Q(this,0,-1,0)},nextYear:function(){return Q(this,0,0,1)},prevYear:function(){return Q(this,0,0,-1)},add:function(V,l,aa){function Z(ac,ag,af){var ad=ac,ae=ag;while(ae--){ad=ad[af]()}return ad}var Y=V<0,ab=Math.abs,X=ab(V),W=ab(aa),S=ab(l),R=Y?"prevYear":"nextYear",U=Y?"prevDay":"nextDay",T=Y?"prevMonth":"nextMonth";return Z(Z(Z(this,X,R),S,T),W,U)},firstDayOfMonth:function(){return new L(this._year,this._month,1)},lastDayOfMonth:function(){return new L(this._year,this._month,P(this._month,this._year))},isBefore:function(l){return !(this.isAfter(l)||this.equals(l))},isAfter:function(R){var l=this._year,T=R.year(),S=this._month,U=R.month();if(l>T){return true}if((l==T)&&(S>U)){return true}if((l==T)&&(S==U)&&(this._date>R.date())){return true}return false},equals:function(l){return(this._year==l.year())&&(this._month==l.month())&&(this._date==l.date())},toString:function(){var T=this._year,l=this._month,S=this._date,R=(l<10&&S<10)?"0{1}/0{2}/{0}":(l<10)?"0{1}/{2}/{0}":(S<10)?"{1}/0{2}/{0}":"{1}/{2}/{0}";return $.str.format(R,T,l,S)},toDate:function(){return this.value()}};$.dayPoint=function(U,V,S,l,T,W,R){if(!($.isDate(U)||($.isNumber(U)&&$.isNumber(V)&&$.isNumber(S)))){return null}return new L(U,V,S,l,T,W,R)};$.dayPoint.canParse=function(l){return($.isString(l)||$.isNumber(l)||$.isDate(l))?!isNaN(new Date(l).valueOf()):false};$.dayPoint.parse=function(X){if(X instanceof L){return X}if(!($.isDate(X)||this.canParse(X))){return null}var l=new Date(X),W=l.getFullYear(),S=l.getMonth()+1,V=l.getDate(),T=l.getHours(),U=l.getMinutes(),Y=l.getSeconds(),R=l.getMilliseconds();return $.dayPoint(W,S,V,T,U,Y,R)};$.dayPoint.tryParse=function(l){return $.dayPoint.canParse(l)?$.dayPoint.parse(l):null};var G;$.dayPoint.assumeNow=function(l){G=$.dayPoint.parse(l)};$.dayPoint.today=function(){return G||$.dayPoint.parse(new Date())};function P(S,R){var l=S,T=R;if(l==2){return(r(T))?29:28}return(((l<8)&&($.isEven(l)))||((l>7)&&($.isOdd(l))))?30:31}function r(l){var S=l.toString().split(/\B/),R=parseFloat($.str.build(S[S.length-2],S[S.length-1]));return(R%4==0)}function Q(W,ab,S,ad){var af=W.month(),X=W.year(),U=W.date(),l=P(af,X),ae=ab,V=S,aa=ad,R=U+ae,Z=af+V,ac=X+aa;if((U+ae)>l){R=1;Z=(af+(V+1))}if((U+ae)<1){var T=W.prevMonth(),R=P(T.month(),T.year());(Z=af+(V-1))}if((Z)>12){Z=1;ac=(X+(aa+1))}if((Z)<1){Z=12;ac=(X+(aa-1))}var Y=P(Z,ac);R=(R>Y)?Y:R;return new L(ac,Z,R)}function E(V,S){if(isNaN(V)){throw new $.exception("arg",$.str.format("$.money requires a number. Passed {0}",V))}var R=V.toString().split(/\./),T=R[0],U=R[1];function l(W){return(V<0)?-W:W}this._cents=($.exists(U))?l(parseFloat("."+U)):0;this._dollars=parseInt(T);this._type=S||"$";this._value=V}E.prototype={cents:function(){return this._cents},dollars:function(){return this._dollars},type:function(){return this._type},value:function(){return this._value},add:function(l){money_checkType(this,l);return new E(this._value+l.value())},divide:function(l){if(!$.isNumber(l)){throw new Error()}return new E(this._value/l)},equals:function(l){return(this.isOfType(l))&&(this._value==l.value())},isOfType:function(l){return this._type==l.type()},isGreaterThan:function(l){money_checkType(this,l);return this._value>l.value()},isLessThan:function(l){money_checkType(this,l);return this._value<l.value()},multiply:function(l){if(!$.isNumber(l)){throw new Error()}return new E(this._value*l)},round:function(){return new E($.math.round(this.value,-2))},roundDown:function(){return new E($.math.roundDown(this.value,-2))},roundUp:function(){return new E($.math.roundUp(this.value,-2))},subtract:function(l){money_checkType(this,l);return new E(this._value-l.value())},toString:function(){var l=(this.value<0)?"({0}{1}.{2})":"{0}{1}.{2}";return $.str.format(l,this._type,money_formatDollars(this),money_formatCents(this))}};$.money=function(R,l){return new E(R,l)};$.money.zero=function(){return $.money(0)};$.money.isMoney=function(l){return l instanceof E};$.money.canParse=function(l){try{$.money.parse(l);return true}catch(R){return false}};$.money.parse=function(W){if($.isNumber(W)){return $.money(W)}var l=/(\(.*\))|(\-)/.test(W),V=(l)?1:0,T=W.match(/[^\d\.\,\-]/g)||[],S=$.exists(T[V])?T[V]:"$",X=parseFloat(W.replace(/[^\d\.]/g,"")),R=(l)?-X:X;return $.money(R,S)};$.money.tryParse=function(l){return $.money.canParse(l)?$.money.parse(l):null};money_checkType=function(R,l){if(!R.isOfType(l)){throw new $.exception("operation","Invalid operation on non-conforming currencies.")}};money_formatDollars=function(R){var S=R.dollars(),U=(R.cents()>=0.995)?(S+1):S,Z=U.toString(),W=Z.replace(/\-/,"").split(/\B/).reverse(),T=W.length,X=T>3,V=0,Y=[];while(V<T){Y[Y.length]=W[V];V++;if(!$.exists(W[V])){break}if((V%3==0)&&X){Y[Y.length]=","}}return $.str.build.apply(this,Y.reverse())};money_formatCents=function(T){var U=$.math.round(T.cents(),-3),S=U.toString(),V=S.replace(/\-|(0\.)/g,"").concat("0").split(/\B/),R=V.length;if($.isZero(R)||U>=0.995){return"00"}if(R<2){return"0"+V[0]}return(parseInt(V[2])>4)?V[0]+(parseInt(V[1])+1):V[0]+V[1]};function q(l,R){if(!$.isNumber(l)||!$.isNumber(R)){throw new Error($.str.format("at $.coord({0},{1})",l,R))}q.base.call(this);this.x(l).y(R)}q.prototype={x:function(l){return this.property("x",l)},y:function(l){return this.property("y",l)},abs:function(){return new q(Math.abs(this._x),Math.abs(this._y))},add:function(R){var l=this._x+R.x(),S=this._y+R.y();return new q(l,S)},divide:function(R){var l=this._x/R.x(),S=this._y/R.y();return new q(l,S)},equals:function(l){return(this._x===l.x())&&(this._y===l.y())},multiply:function(R){var l=this._x*R.x(),S=this._y*R.y();return new q(l,S)},subtract:function(R){var l=this._x-R.x(),S=this._y-R.y();return new q(l,S)},round:function(l){var R=l||0;return new q($.math.round(this.x(),R),$.math.round(this.y(),R))},half:function(){return this.divide(new q(2,2))},value:function(){return{x:this._x,y:this._y}},toEm:function(){return A(this,"em")},toPixel:function(){return A(this,"px")},toString:function(){return $.str.format("({0},{1})",this._x,this._y)}};$.Class.extend(q,$.Class);$.coord=function(l,R){return new q(l,R)};$.coord.Class=q;function A(R,l){return{x:function(){return R.x()+l},y:function(){return R.y()+l}}}function C(l){try{if(("left" in l)&&("top" in l)){return !isNaN(l.left)&&!isNaN(l.top)}if(("width" in l)&&("height" in l)){return !isNaN(l.width)&&!isNaN(l.height)}return false}catch(R){return false}}function f(l){if(("left" in l)&&("top" in l)){return new q(l.left,l.top)}if(("width" in l)&&("height" in l)){return new q(l.width,l.height)}return null}$.coord.zero=function(){return new q(0,0)};$.coord.random=function(S,R){var l=S*Math.random(),T=R*Math.random(R);return new q(l,T)};$.coord.canParse=f;$.coord.parse=f;$.coord.tryParse=function(l){return C(l)?f(l):null};function z(l,R){z.base.call(this,l,R)}z.prototype={isAbove:function(l){return this.y()<l.y()},isBelow:function(l){return this.y()>l.y()},isLeftOf:function(l){return this.x()<l.x()},isRightOf:function(l){return this.x()>l.x()},distanceFrom:function(l){return $.vector(this.x()-l.x(),this.y()-l.y())},distanceTo:function(l){return this.distanceFrom(l).invert()}};$.Class.extend(z,$.coord.Class);$.point=function(l,R){return new z(l,R)};$.point.Class=z;$.point.zero=function(){return new z(0,0)};$.point.canParse=w;$.point.parse=a;$.point.tryParse=function(l){return w(l)?a(l):null};function w(l){try{return !isNaN(l.x())&&!isNaN(l.y())}catch(R){return false}}function a(l){return new z(l.x(),l.y())}function N(l,R){N.base.call(this);this._topLeft=$.point.parse(l);this._dims=$.point.parse(R);this._bottomRight=$.point.parse(l.add(R))}N.prototype={dims:function(){return this.get("dims")},topLeft:function(){return this.get("topLeft")},bottomRight:function(){return this.get("bottomRight")},center:function(){return this._topLeft.add(this._bottomRight.subtract(this._topLeft)).half()},contains:function(S){var R=this._topLeft,l=this._bottomRight;return R.isAbove(S)&&R.isLeftOf(S)&&l.isRightOf(S)&&l.isBelow(S)}};$.Class.extend(N,$.Class);$.rectangle=function(R,l){return new N(R,l)};function b(l,R){if(!$.isNumber(l)||!$.isNumber(R)){throw $.exception("args",$.str.format("at $.vector({0},{1})",l,R))}b.base.call(this,l,R);this._lengthSquared=c(this,l,R);this._length=p(this,this._lengthSquared);this._unitNormalX=B(this,l);this._unitNormalY=B(this,R)}b.prototype={magnatude:function(){return this.get("length")},equals:function(l){return(l instanceof b)&&((this._x===l.x())&&(this._y===l.y()))},normal:function(){return $.vector(this._unitNormalX,this._unitNormalY)},invert:function(){return $.vector(this.x()*-1,this.y()*-1)},norm:function(){return $.vector(Math.abs(this.x()),Math.abs(this.y()))},perpendicular:function(){return $.vector(this.y()*-1,this.x())},isZero:function(){return this.x()==0&&this.y()==0},add:function(l){return $.vector(this.x()+l.x(),this.y()+l.y())},dot:function(l){return(this.x()*l.x())+(this.y()*l.y())},perpendicularAtTo:function(l){var R=l.add(this.projectionOfOnto(l).invert());return $.vector(R.x(),R.y())},projectionOfOnto:function(l){var R=l.normal().scale(this.dot(l.normal()));return $.vector(R.x(),R.y())},scale:function(l){return $.vector((this.x()*l),(this.y()*l))},unitNormalDot:function(l){return(this.normal().x()*l.normal().x())+(this.normal().y()*l.normal().y())},reflect:function(l){if(l.isZero()){return this}var R=l.normal();return this.add(R.scale(2*(R.dot(this))).invert())},round:function(l){var R=l||0;return $.vector($.math.round(this.x(),R),$.math.round(this.y(),R))}};$.Class.extend(b,$.coord.Class);$.vector=function(l,R){return new b(l,R)};$.vector.Class=b;$.vector.zero=function(){return $.vector(0,0)};$.vector.random=function(S,R){var l=S*Math.random(),T=R*Math.random();return $.vector(l,T)};function p(l,R){if(l.isZero()){return 0}return Math.sqrt(R)}function c(R,l,S){if(R.isZero()){return 0}return Math.pow(l,2)+Math.pow(S,2)}function B(R,l){if(R.isZero()){return 0}return l/R.magnatude()}$.abstractContext=function(l){$.abstractContext.base.call(this);this.state(l)};$.abstractContext.prototype={state:function(l){if(!$.exists(l)){return this._state}return this.set("state",l.context(this))}};$.Class.extend($.abstractContext,$.Class);$.abstractState=function(l){$.abstractState.base.call(this);this.states(l)};$.abstractState.prototype={context:function(l){return this.property("context",l)},states:function(l){return this.set("states",l)},state:function(l){var R=this._context;R.state(new this._states[l](R));return this}};$.Class.extend($.abstractState,$.Class);$.abstractVisitor=function(){};$.abstractVisitor.prototype={$visit:function(){throw new Error("visit method is abstract an must be defined.")},subject:function(l){return this.property("subject",$.replicate(l))},visit:function(){return this.$visit()}};function s(l){s.base.call(this);this.$current=0;this._quit=false;this.subject(l)}s.prototype={$hasNext:function(){return $.exists(this._subject[this.$current+1])},$hasPrev:function(){return $.exists(this._subject[this.$current-1])},$each:function(R,S){var l=S||this;this.reset();do{R.call(l,this.current())}while(this.next()&&(!this._quit));this._end=false;this.reset()},$exec:function(S){var l=this._subject,R=l[S];if(!$.exists(R)){return null}this.$current=S;return R},subject:function(R){var l=($.isArray(R))?R:($.isObject(R))?g(R):R;if(!$.isUndefined(R)){this.reset()}this.$subject=l;return this.property("subject",l)},current:function(){return this.$exec(this.$current)},next:function(){return this.$exec(this.$current+1)},prev:function(){return this.$exec(this.$current-1)},hasNext:function(){return this.$hasNext()},hasPrev:function(){return this.$hasPrev()},reset:function(){this.$current=0;return this},quit:function(){return this.set("quit",true)},each:function(l,R){if(this._subject.length<1){return this}this.$each(l,R);return this}};function g(l){var R=[];for(n in l){R.push({key:n,value:l[n]})}return R}$.Class.extend(s,$.Class);$.iterator=function(l){return new s(l)};$.iterator.Class=s;function x(){x.base.call(this);this._observers=$.hash()}x.prototype={subscribe:function(l,U,R,T){var S=this._observers;if(S.containsKey(l)){S.find(l).add(U,R,T)}else{S.add(l,$.observer().add(U,R,T))}return this},unsubscribe:function(l,S){var R=this._observers;if(R.containsKey(l)){R.find(l).remove(S)}return this},notify:function(){var T=$.list.parseArguments(arguments),l=T.find(0),S=!this._observers.containsKey(l),R=!S||(T.count()>1),U=S?l:null,V=S?T.remove(l):T;return(R)?this._notify(U,V):this._notifyAll(U);return this},clear:function(){this._observers.each(function(l){l.value.clear()}).clear();return this},isEmpty:function(){return this._observers.isEmpty()},_notifyAll:function(l){this._observers.listValues().each(function(R){R.notify(l)});return this},_notify:function(R,l){var S=this._observers;l.each(function(T){try{S.find(T).notify(R)}catch(U){$.kulog(U)}});return this}};$.Class.extend(x,$.Class);$.mediator=function(){return new x()};$.mediator.Class=x;function y(){y.base.call(this);this._methods=new $.hash()}y.prototype={add:function(U,R,T){var l=T||$.uid("observerMethod"),S=R||this;this._methods.add(l,{m:U,s:S});return this},remove:function(l){this._methods.remove(l);return this},clear:function(){this._methods.clear();return this},notify:function(){var R=new $.iterator(this._methods.listValues().toArray()),l=arguments;R.each(function(S){$.refcheck(S.m).apply(S.s,l)});return this},isEmpty:function(){return this._methods.isEmpty()}};$.Class.extend(y,$.Class);$.observer=function(){return new y()};$.observer.Class=y;function h(){this._q=[]}h.prototype={isEmpty:function(){return this._q.length==0},enqueue:function(l){var R=this._q;R[R.length]=l;return this},dequeue:function(){var R=this._q,l=R[0];R.splice(0,1);return l},clear:function(){this._q=[]}};$.queue=function(){return new h()};$.queue.Class=h;function F(l){F.base.call(this,l)}F.prototype={$hasNext:function(){var T=this.$subject,R=T.length-1,V=this.$current,U=V+1,S=(U>R)?0:U;return $.exists(T[S])},$hasPrev:function(){var T=this.$subject,R=T.length-1,V=this.$current,U=V+1,S=(U<0)?R:U;return $.exists(T[S])},$each:function(R,S){var l=S||this;this.reset();do{R.call(S,this.current())}while(this.next()&&(this.$current>0));this.reset()},$exec:function(T){var S=this.$subject,R=(S.length-1);this.$current=(T>R)?0:((T<0)?R:T);return S[this.$current]}};$.Class.extend(F,$.iterator.Class);$.rolodex=function(l){return new F(l)};$.rolodex.Class=F;function O(){}O.prototype={$isSatisfiedBy:function(l){return},isSatisfiedBy:function(l){return this.$isSatisfiedBy(l)},and:function(l){return new D(this,l)},or:function(l){return new j(this,l)},xor:function(l){return new v(this,l)},not:function(){return new K(this)}};function D(R,l){D.base.call(this);this.$1=R;this.$2=l}D.prototype.$isSatisfiedBy=function(l){return this.$1.isSatisfiedBy(l)&&this.$2.isSatisfiedBy(l)};$.Class.extend(D,O);function j(R,l){j.base.call(this);this.$1=R;this.$2=l}j.prototype.$isSatisfiedBy=function(l){return this.$1.isSatisfiedBy(l)||this.$2.isSatisfiedBy(l)};$.Class.extend(j,O);function v(R,l){v.base.call(this);this.$1=R;this.$2=l}v.prototype.$isSatisfiedBy=function(l){return $.xor(this.$1.isSatisfiedBy(l),this.$2.isSatisfiedBy(l))};$.Class.extend(v,O);function k(){k.base.call(this)}k.prototype.$isSatisfiedBy=function(l){return true};$.Class.extend(k,O);function e(){e.base.call(this)}e.prototype.$isSatisfiedBy=function(l){return false};$.Class.extend(e,O);function K(l){K.base.call(this);this._s=l}K.prototype.$isSatisfiedBy=function(l){return !this._s.isSatisfiedBy(l)};$.Class.extend(K,O);function o(l){o.base.call(this);this.$isSatisfiedBy=l}$.Class.extend(o,O);$.spec=function(l){return new o(l)};function u(){this._q=[]}u.prototype={isEmpty:function(){return this._q.length==0},push:function(l){var R=this._q;R[R.length]=l;return this},pop:function(){return this._q.pop()},clear:function(){this._q=[]}};$.stack=function(){return new u()};$.stack.Class=u})(jQuery);
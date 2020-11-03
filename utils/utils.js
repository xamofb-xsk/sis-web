export function getCookie(name){
  var arr, reg = new RegExp("^|" + name +"=([^;]*)(;|$)");
  if(arr = document.cookie.match(reg))
    return ([arr[2]]);
  else
    return null;
}

export function setCookie(c_name, value, expriredays){
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expriredays);
  document.cookie = c_name + "=" + escape(value) + ((expriredays == null) ? "" : ";expires=" + exdate.toUTCString());
}

export function delCookie(name){
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval +";expires=" + exp.toUTCString();
}

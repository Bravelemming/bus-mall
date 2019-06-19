//JDK : library for local storage getters, setters, stringified, parsed
/* eslint-disable no-unused-vars */
'use strict';

//this function stores objects in local storage, stringified.
function storeInLocal (key, value) {
  //stringify an object
  var objectStringified = JSON.stringify(value);
  localStorage.setItem(key, objectStringified);

}

//return from local storage, parse.
var returnFromLocal = function (key) {
  var returned = JSON.parse(localStorage.getItem(key));
  return returned;
};

//NOTE: object Object is what JS produces when you try to turn an object to a string!
//NOTE: local storage always stores strings.
//NOTE: when you attempt to retrieve something that isn't there, null returns.
//NOTE: localStorage.clear() will wipe the data by page!
//NOTE: localStorage strips methods from objects, you must reattach methods later.

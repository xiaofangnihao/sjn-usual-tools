console.log(1);

import { typeOf, hideMobile, getSearchParams, getOSType } from "../index";
console.log(Object.prototype.toString.call({}));
console.log(Object.prototype.toString.call(1));
console.log(typeOf("1"));

console.log(hideMobile("13123850532"));

console.log(window.location);

console.log(new URLSearchParams(window.location.search).entries());
console.log(getSearchParams());
console.log(getOSType());

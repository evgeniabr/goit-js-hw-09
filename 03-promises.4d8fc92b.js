!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},t={},r=n.parcelRequired7c6;null==r&&((r=function(e){if(e in o)return o[e].exports;if(e in t){var n=t[e];delete t[e];var r={id:e,exports:{}};return o[e]=r,n.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){t[e]=n},n.parcelRequired7c6=r);var i=r("6JpON");document.querySelector(".form").addEventListener("submit",(function(e){e.preventDefault();var n=e.currentTarget,o=Number(n.delay.value),t=Number(n.step.value),r=Number(n.amount.value);console.log(o,t,r);for(var i=0;i<r;i+=1){var c=i+1;console.log(c);var f=o+t*i;console.log(f),u(c,f).then(a).catch(l)}}));var u=function(e,n){return new Promise((function(o,t){return Math.random()>.3?o({position:e,delay:n}):t({position:e,delay:n})}))},a=function(n){var o=n.position,t=n.delay;setTimeout((function(){e(i).Notify.success("✅ Fulfilled promise ".concat(o," in ").concat(t,"ms"))}),t)},l=function(n){var o=n.position,t=n.delay;setTimeout((function(){e(i).Notify.failure("❌ Rejected promise ".concat(o," in ").concat(t,"ms"))}),t)}}();
//# sourceMappingURL=03-promises.4d8fc92b.js.map
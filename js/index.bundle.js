var e
e=function(){"use strict"
const e="transitionend",t=e=>{const t=(e=>{let t=e.getAttribute("data-bs-target")
if(!t||"#"===t){let n=e.getAttribute("href")
if(!n||!n.includes("#")&&!n.startsWith("."))return null
n.includes("#")&&!n.startsWith("#")&&(n=`#${n.split("#")[1]}`),t=n&&"#"!==n?n.trim():null}return t})(e)
return t?document.querySelector(t):null},n=e=>!(!e||"object"!=typeof e)&&(void 0!==e.jquery&&(e=e[0]),void 0!==e.nodeType),r=e=>n(e)?e.jquery?e[0]:e:"string"==typeof e&&e.length>0?document.querySelector(e):null,o=e=>!(!n(e)||0===e.getClientRects().length)&&"visible"===getComputedStyle(e).getPropertyValue("visibility"),i=e=>!e||e.nodeType!==Node.ELEMENT_NODE||!!e.classList.contains("disabled")||(void 0!==e.disabled?e.disabled:e.hasAttribute("disabled")&&"false"!==e.getAttribute("disabled")),s=()=>{},a=()=>{const{jQuery:e}=window
return e&&!document.body.hasAttribute("data-bs-no-jquery")?e:null},c=[],l=()=>"rtl"===document.documentElement.dir,f=e=>{var t
t=()=>{const t=a()
if(t){const n=e.NAME,r=t.fn[n]
t.fn[n]=e.jQueryInterface,t.fn[n].Constructor=e,t.fn[n].noConflict=()=>(t.fn[n]=r,e.jQueryInterface)}},"loading"===document.readyState?(c.length||document.addEventListener("DOMContentLoaded",(()=>{c.forEach((e=>e()))})),c.push(t)):t()},u=e=>{"function"==typeof e&&e()},d=(t,n,r=!0)=>{if(!r)return void u(t)
const o=(e=>{if(!e)return 0
let{transitionDuration:t,transitionDelay:n}=window.getComputedStyle(e)
const r=Number.parseFloat(t),o=Number.parseFloat(n)
return r||o?(t=t.split(",")[0],n=n.split(",")[0],1e3*(Number.parseFloat(t)+Number.parseFloat(n))):0})(n)+5
let i=!1
const s=({target:r})=>{r===n&&(i=!0,n.removeEventListener(e,s),u(t))}
n.addEventListener(e,s),setTimeout((()=>{i||n.dispatchEvent(new Event(e))}),o)},p=/[^.]*(?=\..*)\.|.*/,m=/\..*/,h=/::\d+$/,g={}
let v=1
const b={mouseenter:"mouseover",mouseleave:"mouseout"},y=/^(mouseenter|mouseleave)/i,w=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"])
function E(e,t){return t&&`${t}::${v++}`||e.uidEvent||v++}function _(e){const t=E(e)
return e.uidEvent=t,g[t]=g[t]||{},g[t]}function O(e,t,n=null){const r=Object.keys(e)
for(let o=0,i=r.length;o<i;o++){const i=e[r[o]]
if(i.originalHandler===t&&i.delegationSelector===n)return i}return null}function x(e,t,n){const r="string"==typeof t,o=r?n:t
let i=L(e)
return w.has(i)||(i=e),[r,o,i]}function j(e,t,n,r,o){if("string"!=typeof t||!e)return
if(n||(n=r,r=null),y.test(t)){const e=e=>function(t){if(!t.relatedTarget||t.relatedTarget!==t.delegateTarget&&!t.delegateTarget.contains(t.relatedTarget))return e.call(this,t)}
r?r=e(r):n=e(n)}const[i,s,a]=x(t,n,r),c=_(e),l=c[a]||(c[a]={}),f=O(l,s,i?n:null)
if(f)return void(f.oneOff=f.oneOff&&o)
const u=E(s,t.replace(p,"")),d=i?function(e,t,n){return function r(o){const i=e.querySelectorAll(t)
for(let{target:s}=o;s&&s!==this;s=s.parentNode)for(let a=i.length;a--;)if(i[a]===s)return o.delegateTarget=s,r.oneOff&&D.off(e,o.type,t,n),n.apply(s,[o])
return null}}(e,n,r):function(e,t){return function n(r){return r.delegateTarget=e,n.oneOff&&D.off(e,r.type,t),t.apply(e,[r])}}(e,n)
d.delegationSelector=i?n:null,d.originalHandler=s,d.oneOff=o,d.uidEvent=u,l[u]=d,e.addEventListener(a,d,i)}function A(e,t,n,r,o){const i=O(t[n],r,o)
i&&(e.removeEventListener(n,i,Boolean(o)),delete t[n][i.uidEvent])}function L(e){return e=e.replace(m,""),b[e]||e}const D={on(e,t,n,r){j(e,t,n,r,!1)},one(e,t,n,r){j(e,t,n,r,!0)},off(e,t,n,r){if("string"!=typeof t||!e)return
const[o,i,s]=x(t,n,r),a=s!==t,c=_(e),l=t.startsWith(".")
if(void 0!==i){if(!c||!c[s])return
return void A(e,c,s,i,o?n:null)}l&&Object.keys(c).forEach((n=>{!function(e,t,n,r){const o=t[n]||{}
Object.keys(o).forEach((i=>{if(i.includes(r)){const r=o[i]
A(e,t,n,r.originalHandler,r.delegationSelector)}}))}(e,c,n,t.slice(1))}))
const f=c[s]||{}
Object.keys(f).forEach((n=>{const r=n.replace(h,"")
if(!a||t.includes(r)){const t=f[n]
A(e,c,s,t.originalHandler,t.delegationSelector)}}))},trigger(e,t,n){if("string"!=typeof t||!e)return null
const r=a(),o=L(t),i=t!==o,s=w.has(o)
let c,l=!0,f=!0,u=!1,d=null
return i&&r&&(c=r.Event(t,n),r(e).trigger(c),l=!c.isPropagationStopped(),f=!c.isImmediatePropagationStopped(),u=c.isDefaultPrevented()),s?(d=document.createEvent("HTMLEvents"),d.initEvent(o,l,!0)):d=new CustomEvent(t,{bubbles:l,cancelable:!0}),void 0!==n&&Object.keys(n).forEach((e=>{Object.defineProperty(d,e,{get:()=>n[e]})})),u&&d.preventDefault(),f&&e.dispatchEvent(d),d.defaultPrevented&&void 0!==c&&c.preventDefault(),d}},N={find:(e,t=document.documentElement)=>[].concat(...Element.prototype.querySelectorAll.call(t,e)),findOne:(e,t=document.documentElement)=>Element.prototype.querySelector.call(t,e),children:(e,t)=>[].concat(...e.children).filter((e=>e.matches(t))),parents(e,t){const n=[]
let r=e.parentNode
for(;r&&r.nodeType===Node.ELEMENT_NODE&&3!==r.nodeType;)r.matches(t)&&n.push(r),r=r.parentNode
return n},prev(e,t){let n=e.previousElementSibling
for(;n;){if(n.matches(t))return[n]
n=n.previousElementSibling}return[]},next(e,t){let n=e.nextElementSibling
for(;n;){if(n.matches(t))return[n]
n=n.nextElementSibling}return[]},focusableChildren(e){const t=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map((e=>`${e}:not([tabindex^="-"])`)).join(", ")
return this.find(t,e).filter((e=>!i(e)&&o(e)))}},S=new Map
var k={set(e,t,n){S.has(e)||S.set(e,new Map)
const r=S.get(e)
r.has(t)||0===r.size?r.set(t,n):console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(r.keys())[0]}.`)},get:(e,t)=>S.has(e)&&S.get(e).get(t)||null,remove(e,t){if(!S.has(e))return
const n=S.get(e)
n.delete(t),0===n.size&&S.delete(e)}}
class C{constructor(e){(e=r(e))&&(this._element=e,k.set(this._element,this.constructor.DATA_KEY,this))}dispose(){k.remove(this._element,this.constructor.DATA_KEY),D.off(this._element,this.constructor.EVENT_KEY),Object.getOwnPropertyNames(this).forEach((e=>{this[e]=null}))}_queueCallback(e,t,n=!0){d(e,t,n)}static getInstance(e){return k.get(r(e),this.DATA_KEY)}static getOrCreateInstance(e,t={}){return this.getInstance(e)||new this(e,"object"==typeof t?t:null)}static get VERSION(){return"5.1.2"}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}}const T="active",P="fade",M="show",q=".active",B=":scope > li > .active"
class I extends C{static get NAME(){return"tab"}show(){if(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&this._element.classList.contains(T))return
let e
const n=t(this._element),r=this._element.closest(".nav, .list-group")
if(r){const t="UL"===r.nodeName||"OL"===r.nodeName?B:q
e=N.find(t,r),e=e[e.length-1]}const o=e?D.trigger(e,"hide.bs.tab",{relatedTarget:this._element}):null
if(D.trigger(this._element,"show.bs.tab",{relatedTarget:e}).defaultPrevented||null!==o&&o.defaultPrevented)return
this._activate(this._element,r)
const i=()=>{D.trigger(e,"hidden.bs.tab",{relatedTarget:this._element}),D.trigger(this._element,"shown.bs.tab",{relatedTarget:e})}
n?this._activate(n,n.parentNode,i):i()}_activate(e,t,n){const r=(!t||"UL"!==t.nodeName&&"OL"!==t.nodeName?N.children(t,q):N.find(B,t))[0],o=n&&r&&r.classList.contains(P),i=()=>this._transitionComplete(e,r,n)
r&&o?(r.classList.remove(M),this._queueCallback(i,e,!0)):i()}_transitionComplete(e,t,n){if(t){t.classList.remove(T)
const e=N.findOne(":scope > .dropdown-menu .active",t.parentNode)
e&&e.classList.remove(T),"tab"===t.getAttribute("role")&&t.setAttribute("aria-selected",!1)}e.classList.add(T),"tab"===e.getAttribute("role")&&e.setAttribute("aria-selected",!0),(e=>{e.offsetHeight})(e),e.classList.contains(P)&&e.classList.add(M)
let r=e.parentNode
if(r&&"LI"===r.nodeName&&(r=r.parentNode),r&&r.classList.contains("dropdown-menu")){const t=e.closest(".dropdown")
t&&N.find(".dropdown-toggle",t).forEach((e=>e.classList.add(T))),e.setAttribute("aria-expanded",!0)}n&&n()}static jQueryInterface(e){return this.each((function(){const t=I.getOrCreateInstance(this)
if("string"==typeof e){if(void 0===t[e])throw new TypeError(`No method named "${e}"`)
t[e]()}}))}}D.on(document,"click.bs.tab.data-api",'[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',(function(e){["A","AREA"].includes(this.tagName)&&e.preventDefault(),i(this)||I.getOrCreateInstance(this).show()})),f(I)
var H="top",R="bottom",W="right",$="left",V="auto",Y=[H,R,W,$],K="start",U="end",z="clippingParents",F="viewport",Q="popper",X="reference",G=Y.reduce((function(e,t){return e.concat([t+"-"+K,t+"-"+U])}),[]),J=[].concat(Y,[V]).reduce((function(e,t){return e.concat([t,t+"-"+K,t+"-"+U])}),[]),Z="beforeRead",ee="read",te="afterRead",ne="beforeMain",re="main",oe="afterMain",ie="beforeWrite",se="write",ae="afterWrite",ce=[Z,ee,te,ne,re,oe,ie,se,ae]
function le(e){return e?(e.nodeName||"").toLowerCase():null}function fe(e){if(null==e)return window
if("[object Window]"!==e.toString()){var t=e.ownerDocument
return t&&t.defaultView||window}return e}function ue(e){return e instanceof fe(e).Element||e instanceof Element}function de(e){return e instanceof fe(e).HTMLElement||e instanceof HTMLElement}function pe(e){return"undefined"!=typeof ShadowRoot&&(e instanceof fe(e).ShadowRoot||e instanceof ShadowRoot)}var me={name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state
Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},r=t.attributes[e]||{},o=t.elements[e]
de(o)&&le(o)&&(Object.assign(o.style,n),Object.keys(r).forEach((function(e){var t=r[e]
!1===t?o.removeAttribute(e):o.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}}
return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var r=t.elements[e],o=t.attributes[e]||{},i=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{})
de(r)&&le(r)&&(Object.assign(r.style,i),Object.keys(o).forEach((function(e){r.removeAttribute(e)})))}))}},requires:["computeStyles"]}
function he(e){return e.split("-")[0]}function ge(e,t){var n=e.getBoundingClientRect()
return{width:n.width/1,height:n.height/1,top:n.top/1,right:n.right/1,bottom:n.bottom/1,left:n.left/1,x:n.left/1,y:n.top/1}}function ve(e){var t=ge(e),n=e.offsetWidth,r=e.offsetHeight
return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function be(e,t){var n=t.getRootNode&&t.getRootNode()
if(e.contains(t))return!0
if(n&&pe(n)){var r=t
do{if(r&&e.isSameNode(r))return!0
r=r.parentNode||r.host}while(r)}return!1}function ye(e){return fe(e).getComputedStyle(e)}function we(e){return["table","td","th"].indexOf(le(e))>=0}function Ee(e){return((ue(e)?e.ownerDocument:e.document)||window.document).documentElement}function _e(e){return"html"===le(e)?e:e.assignedSlot||e.parentNode||(pe(e)?e.host:null)||Ee(e)}function Oe(e){return de(e)&&"fixed"!==ye(e).position?e.offsetParent:null}function xe(e){for(var t=fe(e),n=Oe(e);n&&we(n)&&"static"===ye(n).position;)n=Oe(n)
return n&&("html"===le(n)||"body"===le(n)&&"static"===ye(n).position)?t:n||function(e){var t=-1!==navigator.userAgent.toLowerCase().indexOf("firefox")
if(-1!==navigator.userAgent.indexOf("Trident")&&de(e)&&"fixed"===ye(e).position)return null
for(var n=_e(e);de(n)&&["html","body"].indexOf(le(n))<0;){var r=ye(n)
if("none"!==r.transform||"none"!==r.perspective||"paint"===r.contain||-1!==["transform","perspective"].indexOf(r.willChange)||t&&"filter"===r.willChange||t&&r.filter&&"none"!==r.filter)return n
n=n.parentNode}return null}(e)||t}function je(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}var Ae=Math.max,Le=Math.min,De=Math.round
function Ne(e,t,n){return Ae(e,Le(t,n))}function Se(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function ke(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}var Ce={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,s=n.modifiersData.popperOffsets,a=he(n.placement),c=je(a),l=[$,W].indexOf(a)>=0?"height":"width"
if(i&&s){var f=function(e,t){return Se("number"!=typeof(e="function"==typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:ke(e,Y))}(o.padding,n),u=ve(i),d="y"===c?H:$,p="y"===c?R:W,m=n.rects.reference[l]+n.rects.reference[c]-s[c]-n.rects.popper[l],h=s[c]-n.rects.reference[c],g=xe(i),v=g?"y"===c?g.clientHeight||0:g.clientWidth||0:0,b=m/2-h/2,y=f[d],w=v-u[l]-f[p],E=v/2-u[l]/2+b,_=Ne(y,E,w),O=c
n.modifiersData[r]=((t={})[O]=_,t.centerOffset=_-E,t)}},effect:function(e){var t=e.state,n=e.options.element,r=void 0===n?"[data-popper-arrow]":n
null!=r&&("string"!=typeof r||(r=t.elements.popper.querySelector(r)))&&be(t.elements.popper,r)&&(t.elements.arrow=r)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]}
function Te(e){return e.split("-")[1]}var Pe={top:"auto",right:"auto",bottom:"auto",left:"auto"}
function Me(e){var t,n=e.popper,r=e.popperRect,o=e.placement,i=e.variation,s=e.offsets,a=e.position,c=e.gpuAcceleration,l=e.adaptive,f=e.roundOffsets,u=!0===f?function(e){var t=e.x,n=e.y,r=window.devicePixelRatio||1
return{x:De(De(t*r)/r)||0,y:De(De(n*r)/r)||0}}(s):"function"==typeof f?f(s):s,d=u.x,p=void 0===d?0:d,m=u.y,h=void 0===m?0:m,g=s.hasOwnProperty("x"),v=s.hasOwnProperty("y"),b=$,y=H,w=window
if(l){var E=xe(n),_="clientHeight",O="clientWidth"
E===fe(n)&&"static"!==ye(E=Ee(n)).position&&"absolute"===a&&(_="scrollHeight",O="scrollWidth"),E=E,o!==H&&(o!==$&&o!==W||i!==U)||(y=R,h-=E[_]-r.height,h*=c?1:-1),o!==$&&(o!==H&&o!==R||i!==U)||(b=W,p-=E[O]-r.width,p*=c?1:-1)}var x,j=Object.assign({position:a},l&&Pe)
return c?Object.assign({},j,((x={})[y]=v?"0":"",x[b]=g?"0":"",x.transform=(w.devicePixelRatio||1)<=1?"translate("+p+"px, "+h+"px)":"translate3d("+p+"px, "+h+"px, 0)",x)):Object.assign({},j,((t={})[y]=v?h+"px":"",t[b]=g?p+"px":"",t.transform="",t))}var qe={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=void 0===r||r,i=n.adaptive,s=void 0===i||i,a=n.roundOffsets,c=void 0===a||a,l={placement:he(t.placement),variation:Te(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o}
null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,Me(Object.assign({},l,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:c})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,Me(Object.assign({},l,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}},Be={passive:!0},Ie={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=void 0===o||o,s=r.resize,a=void 0===s||s,c=fe(t.elements.popper),l=[].concat(t.scrollParents.reference,t.scrollParents.popper)
return i&&l.forEach((function(e){e.addEventListener("scroll",n.update,Be)})),a&&c.addEventListener("resize",n.update,Be),function(){i&&l.forEach((function(e){e.removeEventListener("scroll",n.update,Be)})),a&&c.removeEventListener("resize",n.update,Be)}},data:{}},He={left:"right",right:"left",bottom:"top",top:"bottom"}
function Re(e){return e.replace(/left|right|bottom|top/g,(function(e){return He[e]}))}var We={start:"end",end:"start"}
function $e(e){return e.replace(/start|end/g,(function(e){return We[e]}))}function Ve(e){var t=fe(e)
return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function Ye(e){return ge(Ee(e)).left+Ve(e).scrollLeft}function Ke(e){var t=ye(e),n=t.overflow,r=t.overflowX,o=t.overflowY
return/auto|scroll|overlay|hidden/.test(n+o+r)}function Ue(e){return["html","body","#document"].indexOf(le(e))>=0?e.ownerDocument.body:de(e)&&Ke(e)?e:Ue(_e(e))}function ze(e,t){var n
void 0===t&&(t=[])
var r=Ue(e),o=r===(null==(n=e.ownerDocument)?void 0:n.body),i=fe(r),s=o?[i].concat(i.visualViewport||[],Ke(r)?r:[]):r,a=t.concat(s)
return o?a:a.concat(ze(_e(s)))}function Fe(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Qe(e,t){return t===F?Fe(function(e){var t=fe(e),n=Ee(e),r=t.visualViewport,o=n.clientWidth,i=n.clientHeight,s=0,a=0
return r&&(o=r.width,i=r.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(s=r.offsetLeft,a=r.offsetTop)),{width:o,height:i,x:s+Ye(e),y:a}}(e)):de(t)?function(e){var t=ge(e)
return t.top=t.top+e.clientTop,t.left=t.left+e.clientLeft,t.bottom=t.top+e.clientHeight,t.right=t.left+e.clientWidth,t.width=e.clientWidth,t.height=e.clientHeight,t.x=t.left,t.y=t.top,t}(t):Fe(function(e){var t,n=Ee(e),r=Ve(e),o=null==(t=e.ownerDocument)?void 0:t.body,i=Ae(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=Ae(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),a=-r.scrollLeft+Ye(e),c=-r.scrollTop
return"rtl"===ye(o||n).direction&&(a+=Ae(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:s,x:a,y:c}}(Ee(e)))}function Xe(e,t,n){var r="clippingParents"===t?function(e){var t=ze(_e(e)),n=["absolute","fixed"].indexOf(ye(e).position)>=0&&de(e)?xe(e):e
return ue(n)?t.filter((function(e){return ue(e)&&be(e,n)&&"body"!==le(e)})):[]}(e):[].concat(t),o=[].concat(r,[n]),i=o[0],s=o.reduce((function(t,n){var r=Qe(e,n)
return t.top=Ae(r.top,t.top),t.right=Le(r.right,t.right),t.bottom=Le(r.bottom,t.bottom),t.left=Ae(r.left,t.left),t}),Qe(e,i))
return s.width=s.right-s.left,s.height=s.bottom-s.top,s.x=s.left,s.y=s.top,s}function Ge(e){var t,n=e.reference,r=e.element,o=e.placement,i=o?he(o):null,s=o?Te(o):null,a=n.x+n.width/2-r.width/2,c=n.y+n.height/2-r.height/2
switch(i){case H:t={x:a,y:n.y-r.height}
break
case R:t={x:a,y:n.y+n.height}
break
case W:t={x:n.x+n.width,y:c}
break
case $:t={x:n.x-r.width,y:c}
break
default:t={x:n.x,y:n.y}}var l=i?je(i):null
if(null!=l){var f="y"===l?"height":"width"
switch(s){case K:t[l]=t[l]-(n[f]/2-r[f]/2)
break
case U:t[l]=t[l]+(n[f]/2-r[f]/2)}}return t}function Je(e,t){void 0===t&&(t={})
var n=t,r=n.placement,o=void 0===r?e.placement:r,i=n.boundary,s=void 0===i?z:i,a=n.rootBoundary,c=void 0===a?F:a,l=n.elementContext,f=void 0===l?Q:l,u=n.altBoundary,d=void 0!==u&&u,p=n.padding,m=void 0===p?0:p,h=Se("number"!=typeof m?m:ke(m,Y)),g=f===Q?X:Q,v=e.rects.popper,b=e.elements[d?g:f],y=Xe(ue(b)?b:b.contextElement||Ee(e.elements.popper),s,c),w=ge(e.elements.reference),E=Ge({reference:w,element:v,strategy:"absolute",placement:o}),_=Fe(Object.assign({},v,E)),O=f===Q?_:w,x={top:y.top-O.top+h.top,bottom:O.bottom-y.bottom+h.bottom,left:y.left-O.left+h.left,right:O.right-y.right+h.right},j=e.modifiersData.offset
if(f===Q&&j){var A=j[o]
Object.keys(x).forEach((function(e){var t=[W,R].indexOf(e)>=0?1:-1,n=[H,R].indexOf(e)>=0?"y":"x"
x[e]+=A[n]*t}))}return x}function Ze(e,t){void 0===t&&(t={})
var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,s=n.padding,a=n.flipVariations,c=n.allowedAutoPlacements,l=void 0===c?J:c,f=Te(r),u=f?a?G:G.filter((function(e){return Te(e)===f})):Y,d=u.filter((function(e){return l.indexOf(e)>=0}))
0===d.length&&(d=u)
var p=d.reduce((function(t,n){return t[n]=Je(e,{placement:n,boundary:o,rootBoundary:i,padding:s})[he(n)],t}),{})
return Object.keys(p).sort((function(e,t){return p[e]-p[t]}))}var et={name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name
if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=void 0===o||o,s=n.altAxis,a=void 0===s||s,c=n.fallbackPlacements,l=n.padding,f=n.boundary,u=n.rootBoundary,d=n.altBoundary,p=n.flipVariations,m=void 0===p||p,h=n.allowedAutoPlacements,g=t.options.placement,v=he(g),b=c||(v!==g&&m?function(e){if(he(e)===V)return[]
var t=Re(e)
return[$e(e),t,$e(t)]}(g):[Re(g)]),y=[g].concat(b).reduce((function(e,n){return e.concat(he(n)===V?Ze(t,{placement:n,boundary:f,rootBoundary:u,padding:l,flipVariations:m,allowedAutoPlacements:h}):n)}),[]),w=t.rects.reference,E=t.rects.popper,_=new Map,O=!0,x=y[0],j=0;j<y.length;j++){var A=y[j],L=he(A),D=Te(A)===K,N=[H,R].indexOf(L)>=0,S=N?"width":"height",k=Je(t,{placement:A,boundary:f,rootBoundary:u,altBoundary:d,padding:l}),C=N?D?W:$:D?R:H
w[S]>E[S]&&(C=Re(C))
var T=Re(C),P=[]
if(i&&P.push(k[L]<=0),a&&P.push(k[C]<=0,k[T]<=0),P.every((function(e){return e}))){x=A,O=!1
break}_.set(A,P)}if(O)for(var M=function(e){var t=y.find((function(t){var n=_.get(t)
if(n)return n.slice(0,e).every((function(e){return e}))}))
if(t)return x=t,"break"},q=m?3:1;q>0&&"break"!==M(q);q--);t.placement!==x&&(t.modifiersData[r]._skip=!0,t.placement=x,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}}
function tt(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function nt(e){return[H,W,R,$].some((function(t){return e[t]>=0}))}var rt={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,s=Je(t,{elementContext:"reference"}),a=Je(t,{altBoundary:!0}),c=tt(s,r),l=tt(a,o,i),f=nt(c),u=nt(l)
t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:l,isReferenceHidden:f,hasPopperEscaped:u},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":f,"data-popper-escaped":u})}},ot={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=void 0===o?[0,0]:o,s=J.reduce((function(e,n){return e[n]=function(e,t,n){var r=he(e),o=[$,H].indexOf(r)>=0?-1:1,i="function"==typeof n?n(Object.assign({},t,{placement:e})):n,s=i[0],a=i[1]
return s=s||0,a=(a||0)*o,[$,W].indexOf(r)>=0?{x:a,y:s}:{x:s,y:a}}(n,t.rects,i),e}),{}),a=s[t.placement],c=a.x,l=a.y
null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=l),t.modifiersData[r]=s}},it={name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name
t.modifiersData[n]=Ge({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},st={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=void 0===o||o,s=n.altAxis,a=void 0!==s&&s,c=n.boundary,l=n.rootBoundary,f=n.altBoundary,u=n.padding,d=n.tether,p=void 0===d||d,m=n.tetherOffset,h=void 0===m?0:m,g=Je(t,{boundary:c,rootBoundary:l,padding:u,altBoundary:f}),v=he(t.placement),b=Te(t.placement),y=!b,w=je(v),E="x"===w?"y":"x",_=t.modifiersData.popperOffsets,O=t.rects.reference,x=t.rects.popper,j="function"==typeof h?h(Object.assign({},t.rects,{placement:t.placement})):h,A={x:0,y:0}
if(_){if(i||a){var L="y"===w?H:$,D="y"===w?R:W,N="y"===w?"height":"width",S=_[w],k=_[w]+g[L],C=_[w]-g[D],T=p?-x[N]/2:0,P=b===K?O[N]:x[N],M=b===K?-x[N]:-O[N],q=t.elements.arrow,B=p&&q?ve(q):{width:0,height:0},I=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},V=I[L],Y=I[D],U=Ne(0,O[N],B[N]),z=y?O[N]/2-T-U-V-j:P-U-V-j,F=y?-O[N]/2+T+U+Y+j:M+U+Y+j,Q=t.elements.arrow&&xe(t.elements.arrow),X=Q?"y"===w?Q.clientTop||0:Q.clientLeft||0:0,G=t.modifiersData.offset?t.modifiersData.offset[t.placement][w]:0,J=_[w]+z-G-X,Z=_[w]+F-G
if(i){var ee=Ne(p?Le(k,J):k,S,p?Ae(C,Z):C)
_[w]=ee,A[w]=ee-S}if(a){var te="x"===w?H:$,ne="x"===w?R:W,re=_[E],oe=re+g[te],ie=re-g[ne],se=Ne(p?Le(oe,J):oe,re,p?Ae(ie,Z):ie)
_[E]=se,A[E]=se-re}}t.modifiersData[r]=A}},requiresIfExists:["offset"]}
function at(e,t,n){void 0===n&&(n=!1)
var r=de(t)
de(t)&&function(e){var t=e.getBoundingClientRect()
t.width,e.offsetWidth,t.height,e.offsetHeight}(t)
var o,i,s=Ee(t),a=ge(e),c={scrollLeft:0,scrollTop:0},l={x:0,y:0}
return(r||!r&&!n)&&(("body"!==le(t)||Ke(s))&&(c=(o=t)!==fe(o)&&de(o)?{scrollLeft:(i=o).scrollLeft,scrollTop:i.scrollTop}:Ve(o)),de(t)?((l=ge(t)).x+=t.clientLeft,l.y+=t.clientTop):s&&(l.x=Ye(s))),{x:a.left+c.scrollLeft-l.x,y:a.top+c.scrollTop-l.y,width:a.width,height:a.height}}function ct(e){var t=new Map,n=new Set,r=[]
function o(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!n.has(e)){var r=t.get(e)
r&&o(r)}})),r.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||o(e)})),r}var lt={placement:"bottom",modifiers:[],strategy:"absolute"}
function ft(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n]
return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}function ut(e){void 0===e&&(e={})
var t=e,n=t.defaultModifiers,r=void 0===n?[]:n,o=t.defaultOptions,i=void 0===o?lt:o
return function(e,t,n){void 0===n&&(n=i)
var o,s,a={placement:"bottom",orderedModifiers:[],options:Object.assign({},lt,i),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},c=[],l=!1,f={state:a,setOptions:function(n){var o="function"==typeof n?n(a.options):n
u(),a.options=Object.assign({},i,a.options,o),a.scrollParents={reference:ue(e)?ze(e):e.contextElement?ze(e.contextElement):[],popper:ze(t)}
var s,l,d=function(e){var t=ct(e)
return ce.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}((s=[].concat(r,a.options.modifiers),l=s.reduce((function(e,t){var n=e[t.name]
return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{}),Object.keys(l).map((function(e){return l[e]}))))
return a.orderedModifiers=d.filter((function(e){return e.enabled})),a.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,r=void 0===n?{}:n,o=e.effect
if("function"==typeof o){var i=o({state:a,name:t,instance:f,options:r}),s=function(){}
c.push(i||s)}})),f.update()},forceUpdate:function(){if(!l){var e=a.elements,t=e.reference,n=e.popper
if(ft(t,n)){a.rects={reference:at(t,xe(n),"fixed"===a.options.strategy),popper:ve(n)},a.reset=!1,a.placement=a.options.placement,a.orderedModifiers.forEach((function(e){return a.modifiersData[e.name]=Object.assign({},e.data)}))
for(var r=0;r<a.orderedModifiers.length;r++)if(!0!==a.reset){var o=a.orderedModifiers[r],i=o.fn,s=o.options,c=void 0===s?{}:s,u=o.name
"function"==typeof i&&(a=i({state:a,options:c,name:u,instance:f})||a)}else a.reset=!1,r=-1}}},update:(o=function(){return new Promise((function(e){f.forceUpdate(),e(a)}))},function(){return s||(s=new Promise((function(e){Promise.resolve().then((function(){s=void 0,e(o())}))}))),s}),destroy:function(){u(),l=!0}}
if(!ft(e,t))return f
function u(){c.forEach((function(e){return e()})),c=[]}return f.setOptions(n).then((function(e){!l&&n.onFirstUpdate&&n.onFirstUpdate(e)})),f}}var dt=ut(),pt=ut({defaultModifiers:[Ie,it,qe,me]}),mt=ut({defaultModifiers:[Ie,it,qe,me,ot,et,st,Ce,rt]}),ht=Object.freeze({__proto__:null,popperGenerator:ut,detectOverflow:Je,createPopperBase:dt,createPopper:mt,createPopperLite:pt,top:H,bottom:R,right:W,left:$,auto:V,basePlacements:Y,start:K,end:U,clippingParents:z,viewport:F,popper:Q,reference:X,variationPlacements:G,placements:J,beforeRead:Z,read:ee,afterRead:te,beforeMain:ne,main:re,afterMain:oe,beforeWrite:ie,write:se,afterWrite:ae,modifierPhases:ce,applyStyles:me,arrow:Ce,computeStyles:qe,eventListeners:Ie,flip:et,hide:rt,offset:ot,popperOffsets:it,preventOverflow:st})
function gt(e){return"true"===e||"false"!==e&&(e===Number(e).toString()?Number(e):""===e||"null"===e?null:e)}function vt(e){return e.replace(/[A-Z]/g,(e=>`-${e.toLowerCase()}`))}const bt={setDataAttribute(e,t,n){e.setAttribute(`data-bs-${vt(t)}`,n)},removeDataAttribute(e,t){e.removeAttribute(`data-bs-${vt(t)}`)},getDataAttributes(e){if(!e)return{}
const t={}
return Object.keys(e.dataset).filter((e=>e.startsWith("bs"))).forEach((n=>{let r=n.replace(/^bs/,"")
r=r.charAt(0).toLowerCase()+r.slice(1,r.length),t[r]=gt(e.dataset[n])})),t},getDataAttribute:(e,t)=>gt(e.getAttribute(`data-bs-${vt(t)}`)),offset(e){const t=e.getBoundingClientRect()
return{top:t.top+window.pageYOffset,left:t.left+window.pageXOffset}},position:e=>({top:e.offsetTop,left:e.offsetLeft})},yt="dropdown",wt="Escape",Et="Space",_t="ArrowUp",Ot="ArrowDown",xt=new RegExp("ArrowUp|ArrowDown|Escape"),jt="click.bs.dropdown.data-api",At="keydown.bs.dropdown.data-api",Lt="show",Dt='[data-bs-toggle="dropdown"]',Nt=".dropdown-menu",St=l()?"top-end":"top-start",kt=l()?"top-start":"top-end",Ct=l()?"bottom-end":"bottom-start",Tt=l()?"bottom-start":"bottom-end",Pt=l()?"left-start":"right-start",Mt=l()?"right-start":"left-start",qt={offset:[0,2],boundary:"clippingParents",reference:"toggle",display:"dynamic",popperConfig:null,autoClose:!0},Bt={offset:"(array|string|function)",boundary:"(string|element)",reference:"(string|element|object)",display:"string",popperConfig:"(null|object|function)",autoClose:"(boolean|string)"}
class It extends C{constructor(e,t){super(e),this._popper=null,this._config=this._getConfig(t),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar()}static get Default(){return qt}static get DefaultType(){return Bt}static get NAME(){return yt}toggle(){return this._isShown()?this.hide():this.show()}show(){if(i(this._element)||this._isShown(this._menu))return
const e={relatedTarget:this._element}
if(D.trigger(this._element,"show.bs.dropdown",e).defaultPrevented)return
const t=It.getParentFromElement(this._element)
this._inNavbar?bt.setDataAttribute(this._menu,"popper","none"):this._createPopper(t),"ontouchstart"in document.documentElement&&!t.closest(".navbar-nav")&&[].concat(...document.body.children).forEach((e=>D.on(e,"mouseover",s))),this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.add(Lt),this._element.classList.add(Lt),D.trigger(this._element,"shown.bs.dropdown",e)}hide(){if(i(this._element)||!this._isShown(this._menu))return
const e={relatedTarget:this._element}
this._completeHide(e)}dispose(){this._popper&&this._popper.destroy(),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_completeHide(e){D.trigger(this._element,"hide.bs.dropdown",e).defaultPrevented||("ontouchstart"in document.documentElement&&[].concat(...document.body.children).forEach((e=>D.off(e,"mouseover",s))),this._popper&&this._popper.destroy(),this._menu.classList.remove(Lt),this._element.classList.remove(Lt),this._element.setAttribute("aria-expanded","false"),bt.removeDataAttribute(this._menu,"popper"),D.trigger(this._element,"hidden.bs.dropdown",e))}_getConfig(e){if(e={...this.constructor.Default,...bt.getDataAttributes(this._element),...e},((e,t,r)=>{Object.keys(r).forEach((o=>{const i=r[o],s=t[o],a=s&&n(s)?"element":null==(c=s)?`${c}`:{}.toString.call(c).match(/\s([a-z]+)/i)[1].toLowerCase()
var c
if(!new RegExp(i).test(a))throw new TypeError(`${e.toUpperCase()}: Option "${o}" provided type "${a}" but expected type "${i}".`)}))})(yt,e,this.constructor.DefaultType),"object"==typeof e.reference&&!n(e.reference)&&"function"!=typeof e.reference.getBoundingClientRect)throw new TypeError(`${yt.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`)
return e}_createPopper(e){if(void 0===ht)throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)")
let t=this._element
"parent"===this._config.reference?t=e:n(this._config.reference)?t=r(this._config.reference):"object"==typeof this._config.reference&&(t=this._config.reference)
const o=this._getPopperConfig(),i=o.modifiers.find((e=>"applyStyles"===e.name&&!1===e.enabled))
this._popper=mt(t,this._menu,o),i&&bt.setDataAttribute(this._menu,"popper","static")}_isShown(e=this._element){return e.classList.contains(Lt)}_getMenuElement(){return N.next(this._element,Nt)[0]}_getPlacement(){const e=this._element.parentNode
if(e.classList.contains("dropend"))return Pt
if(e.classList.contains("dropstart"))return Mt
const t="end"===getComputedStyle(this._menu).getPropertyValue("--bs-position").trim()
return e.classList.contains("dropup")?t?kt:St:t?Tt:Ct}_detectNavbar(){return null!==this._element.closest(".navbar")}_getOffset(){const{offset:e}=this._config
return"string"==typeof e?e.split(",").map((e=>Number.parseInt(e,10))):"function"==typeof e?t=>e(t,this._element):e}_getPopperConfig(){const e={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]}
return"static"===this._config.display&&(e.modifiers=[{name:"applyStyles",enabled:!1}]),{...e,..."function"==typeof this._config.popperConfig?this._config.popperConfig(e):this._config.popperConfig}}_selectMenuItem({key:e,target:t}){const n=N.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",this._menu).filter(o)
n.length&&((e,t,n,r)=>{let o=e.indexOf(t)
if(-1===o)return e[!n&&r?e.length-1:0]
const i=e.length
return o+=n?1:-1,r&&(o=(o+i)%i),e[Math.max(0,Math.min(o,i-1))]})(n,t,e===Ot,!n.includes(t)).focus()}static jQueryInterface(e){return this.each((function(){const t=It.getOrCreateInstance(this,e)
if("string"==typeof e){if(void 0===t[e])throw new TypeError(`No method named "${e}"`)
t[e]()}}))}static clearMenus(e){if(e&&(2===e.button||"keyup"===e.type&&"Tab"!==e.key))return
const t=N.find(Dt)
for(let n=0,r=t.length;n<r;n++){const r=It.getInstance(t[n])
if(!r||!1===r._config.autoClose)continue
if(!r._isShown())continue
const o={relatedTarget:r._element}
if(e){const t=e.composedPath(),n=t.includes(r._menu)
if(t.includes(r._element)||"inside"===r._config.autoClose&&!n||"outside"===r._config.autoClose&&n)continue
if(r._menu.contains(e.target)&&("keyup"===e.type&&"Tab"===e.key||/input|select|option|textarea|form/i.test(e.target.tagName)))continue
"click"===e.type&&(o.clickEvent=e)}r._completeHide(o)}}static getParentFromElement(e){return t(e)||e.parentNode}static dataApiKeydownHandler(e){if(/input|textarea/i.test(e.target.tagName)?e.key===Et||e.key!==wt&&(e.key!==Ot&&e.key!==_t||e.target.closest(Nt)):!xt.test(e.key))return
const t=this.classList.contains(Lt)
if(!t&&e.key===wt)return
if(e.preventDefault(),e.stopPropagation(),i(this))return
const n=this.matches(Dt)?this:N.prev(this,Dt)[0],r=It.getOrCreateInstance(n)
if(e.key!==wt)return e.key===_t||e.key===Ot?(t||r.show(),void r._selectMenuItem(e)):void(t&&e.key!==Et||It.clearMenus())
r.hide()}}D.on(document,At,Dt,It.dataApiKeydownHandler),D.on(document,At,Nt,It.dataApiKeydownHandler),D.on(document,jt,It.clearMenus),D.on(document,"keyup.bs.dropdown.data-api",It.clearMenus),D.on(document,jt,Dt,(function(e){e.preventDefault(),It.getOrCreateInstance(this).toggle()})),f(It),document.addEventListener("DOMContentLoaded",(function(){if(document.getElementById("prism-css").media="all",document.getElementById("toggle-offcanvas").addEventListener("click",(function(){document.body.classList.toggle("offcanvas-open")})),0!=document.querySelectorAll(".demo").length&&!document.getElementById("select-theme")){var e=window.themes||["bootstrap5","bootstrap4","default"],t={bootstrap5:"Bootstrap 5",bootstrap4:"Bootstrap 4",default:"Default"},n=localStorage.getItem("theme");-1==e.indexOf(n)&&(n="bootstrap5")
var r=document.createElement("input")
r.classList.add("theme-selector-input")
var o=document.getElementById("main-container")
document.querySelectorAll(".demo-mini").length||(o.insertBefore(r,o.firstChild),new TomSelect(r,{maxItems:1,controlInput:"<input>",plugins:["no_backspace_delete"],options:e.map((n=>-1!=e.indexOf(n)&&{text:t[n],value:n})),items:[n],render:{item:(e,t)=>"<div>Theme: "+t(e.text)+"</div>"},onChange:e=>{i(e)}})),i(n),document.addEventListener("click",(e=>{var t=e.target.closest(".opensandbox")
if(t){var n,r=t.closest(".demo")
function e(e){var t=r.querySelector(e)
return t&&t.textContent||""}var o=`<div class="p-4">${r.querySelector("textarea").value||""}</div>`,i=e("style"),s=e("script"),a=[`https://cdn.jsdelivr.net/npm/tom-select@2.0.0-rc.4/dist/css/tom-select.${localStorage.getItem("theme")||"bootstrap4"}.min.css`,"https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/css/bootstrap.min.css","https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"],c=["https://cdn.jsdelivr.net/npm/tom-select@2.0.0-rc.4/dist/js/tom-select.complete.min.js"]
r.classList.contains("demo-jquery")&&(c.push("https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js"),c.push("https://cdn.jsdelivr.net/npm/jquery-ui-dist@1.12.1/jquery-ui.js")),n={html:o,js:s,css:i,js_external:c.join(";"),css_external:a.join(";")},r.querySelector(".codepen").value=JSON.stringify(n),r.querySelector(".jsfiddle-html").value=o,r.querySelector(".jsfiddle-js").value=s,r.querySelector(".jsfiddle-css").value=i,r.querySelector(".jsfiddle-resources").value=c.join(",")+","+a.join(","),setTimeout((()=>{t.nextElementSibling.submit()}),50)}}))}function i(t){if(-1!=e.indexOf(t)){localStorage.setItem("theme",t)
var n=document.getElementById("select-theme")
n&&n.parentNode.removeChild(n),(n=document.createElement("link")).id="select-theme",n.setAttribute("rel","stylesheet"),n.setAttribute("href","/css/tom-select."+t+".css"),document.getElementsByTagName("head")[0].appendChild(n)}}}))},"function"==typeof define&&define.amd?define(e):e()
//# sourceMappingURL=index.bundle.js.map

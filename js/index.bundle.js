var e
e=function(){"use strict"
const e="transitionend",t=e=>{const t=(e=>{let t=e.getAttribute("data-bs-target")
if(!t||"#"===t){let n=e.getAttribute("href")
if(!n||!n.includes("#")&&!n.startsWith("."))return null
n.includes("#")&&!n.startsWith("#")&&(n=`#${n.split("#")[1]}`),t=n&&"#"!==n?n.trim():null}return t})(e)
return t?document.querySelector(t):null},n=e=>!(!e||"object"!=typeof e)&&(void 0!==e.jquery&&(e=e[0]),void 0!==e.nodeType),r=e=>n(e)?e.jquery?e[0]:e:"string"==typeof e&&e.length>0?document.querySelector(e):null,o=e=>!(!n(e)||0===e.getClientRects().length)&&"visible"===getComputedStyle(e).getPropertyValue("visibility"),i=e=>!e||e.nodeType!==Node.ELEMENT_NODE||!!e.classList.contains("disabled")||(void 0!==e.disabled?e.disabled:e.hasAttribute("disabled")&&"false"!==e.getAttribute("disabled")),s=()=>{},a=()=>{const{jQuery:e}=window
return e&&!document.body.hasAttribute("data-bs-no-jquery")?e:null},c=[],l=()=>"rtl"===document.documentElement.dir,u=e=>{var t
t=()=>{const t=a()
if(t){const n=e.NAME,r=t.fn[n]
t.fn[n]=e.jQueryInterface,t.fn[n].Constructor=e,t.fn[n].noConflict=()=>(t.fn[n]=r,e.jQueryInterface)}},"loading"===document.readyState?(c.length||document.addEventListener("DOMContentLoaded",(()=>{c.forEach((e=>e()))})),c.push(t)):t()},f=e=>{"function"==typeof e&&e()},d=(t,n,r=!0)=>{if(!r)return void f(t)
const o=(e=>{if(!e)return 0
let{transitionDuration:t,transitionDelay:n}=window.getComputedStyle(e)
const r=Number.parseFloat(t),o=Number.parseFloat(n)
return r||o?(t=t.split(",")[0],n=n.split(",")[0],1e3*(Number.parseFloat(t)+Number.parseFloat(n))):0})(n)+5
let i=!1
const s=({target:r})=>{r===n&&(i=!0,n.removeEventListener(e,s),f(t))}
n.addEventListener(e,s),setTimeout((()=>{i||n.dispatchEvent(new Event(e))}),o)},p=/[^.]*(?=\..*)\.|.*/,m=/\..*/,h=/::\d+$/,g={}
let v=1
const b={mouseenter:"mouseover",mouseleave:"mouseout"},y=/^(mouseenter|mouseleave)/i,w=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"])
function x(e,t){return t&&`${t}::${v++}`||e.uidEvent||v++}function E(e){const t=x(e)
return e.uidEvent=t,g[t]=g[t]||{},g[t]}function O(e,t,n=null){const r=Object.keys(e)
for(let o=0,i=r.length;o<i;o++){const i=e[r[o]]
if(i.originalHandler===t&&i.delegationSelector===n)return i}return null}function _(e,t,n){const r="string"==typeof t,o=r?n:t
let i=L(e)
return w.has(i)||(i=e),[r,o,i]}function j(e,t,n,r,o){if("string"!=typeof t||!e)return
if(n||(n=r,r=null),y.test(t)){const e=e=>function(t){if(!t.relatedTarget||t.relatedTarget!==t.delegateTarget&&!t.delegateTarget.contains(t.relatedTarget))return e.call(this,t)}
r?r=e(r):n=e(n)}const[i,s,a]=_(t,n,r),c=E(e),l=c[a]||(c[a]={}),u=O(l,s,i?n:null)
if(u)return void(u.oneOff=u.oneOff&&o)
const f=x(s,t.replace(p,"")),d=i?function(e,t,n){return function r(o){const i=e.querySelectorAll(t)
for(let{target:s}=o;s&&s!==this;s=s.parentNode)for(let a=i.length;a--;)if(i[a]===s)return o.delegateTarget=s,r.oneOff&&D.off(e,o.type,t,n),n.apply(s,[o])
return null}}(e,n,r):function(e,t){return function n(r){return r.delegateTarget=e,n.oneOff&&D.off(e,r.type,t),t.apply(e,[r])}}(e,n)
d.delegationSelector=i?n:null,d.originalHandler=s,d.oneOff=o,d.uidEvent=f,l[f]=d,e.addEventListener(a,d,i)}function A(e,t,n,r,o){const i=O(t[n],r,o)
i&&(e.removeEventListener(n,i,Boolean(o)),delete t[n][i.uidEvent])}function L(e){return e=e.replace(m,""),b[e]||e}const D={on(e,t,n,r){j(e,t,n,r,!1)},one(e,t,n,r){j(e,t,n,r,!0)},off(e,t,n,r){if("string"!=typeof t||!e)return
const[o,i,s]=_(t,n,r),a=s!==t,c=E(e),l=t.startsWith(".")
if(void 0!==i){if(!c||!c[s])return
return void A(e,c,s,i,o?n:null)}l&&Object.keys(c).forEach((n=>{!function(e,t,n,r){const o=t[n]||{}
Object.keys(o).forEach((i=>{if(i.includes(r)){const r=o[i]
A(e,t,n,r.originalHandler,r.delegationSelector)}}))}(e,c,n,t.slice(1))}))
const u=c[s]||{}
Object.keys(u).forEach((n=>{const r=n.replace(h,"")
if(!a||t.includes(r)){const t=u[n]
A(e,c,s,t.originalHandler,t.delegationSelector)}}))},trigger(e,t,n){if("string"!=typeof t||!e)return null
const r=a(),o=L(t),i=t!==o,s=w.has(o)
let c,l=!0,u=!0,f=!1,d=null
return i&&r&&(c=r.Event(t,n),r(e).trigger(c),l=!c.isPropagationStopped(),u=!c.isImmediatePropagationStopped(),f=c.isDefaultPrevented()),s?(d=document.createEvent("HTMLEvents"),d.initEvent(o,l,!0)):d=new CustomEvent(t,{bubbles:l,cancelable:!0}),void 0!==n&&Object.keys(n).forEach((e=>{Object.defineProperty(d,e,{get:()=>n[e]})})),f&&d.preventDefault(),u&&e.dispatchEvent(d),d.defaultPrevented&&void 0!==c&&c.preventDefault(),d}},N={find:(e,t=document.documentElement)=>[].concat(...Element.prototype.querySelectorAll.call(t,e)),findOne:(e,t=document.documentElement)=>Element.prototype.querySelector.call(t,e),children:(e,t)=>[].concat(...e.children).filter((e=>e.matches(t))),parents(e,t){const n=[]
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
class C{constructor(e){(e=r(e))&&(this._element=e,k.set(this._element,this.constructor.DATA_KEY,this))}dispose(){k.remove(this._element,this.constructor.DATA_KEY),D.off(this._element,this.constructor.EVENT_KEY),Object.getOwnPropertyNames(this).forEach((e=>{this[e]=null}))}_queueCallback(e,t,n=!0){d(e,t,n)}static getInstance(e){return k.get(r(e),this.DATA_KEY)}static getOrCreateInstance(e,t={}){return this.getInstance(e)||new this(e,"object"==typeof t?t:null)}static get VERSION(){return"5.1.3"}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}}const T="active",P="fade",M="show",q=".active",I=":scope > li > .active"
class B extends C{static get NAME(){return"tab"}show(){if(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&this._element.classList.contains(T))return
let e
const n=t(this._element),r=this._element.closest(".nav, .list-group")
if(r){const t="UL"===r.nodeName||"OL"===r.nodeName?I:q
e=N.find(t,r),e=e[e.length-1]}const o=e?D.trigger(e,"hide.bs.tab",{relatedTarget:this._element}):null
if(D.trigger(this._element,"show.bs.tab",{relatedTarget:e}).defaultPrevented||null!==o&&o.defaultPrevented)return
this._activate(this._element,r)
const i=()=>{D.trigger(e,"hidden.bs.tab",{relatedTarget:this._element}),D.trigger(this._element,"shown.bs.tab",{relatedTarget:e})}
n?this._activate(n,n.parentNode,i):i()}_activate(e,t,n){const r=(!t||"UL"!==t.nodeName&&"OL"!==t.nodeName?N.children(t,q):N.find(I,t))[0],o=n&&r&&r.classList.contains(P),i=()=>this._transitionComplete(e,r,n)
r&&o?(r.classList.remove(M),this._queueCallback(i,e,!0)):i()}_transitionComplete(e,t,n){if(t){t.classList.remove(T)
const e=N.findOne(":scope > .dropdown-menu .active",t.parentNode)
e&&e.classList.remove(T),"tab"===t.getAttribute("role")&&t.setAttribute("aria-selected",!1)}e.classList.add(T),"tab"===e.getAttribute("role")&&e.setAttribute("aria-selected",!0),(e=>{e.offsetHeight})(e),e.classList.contains(P)&&e.classList.add(M)
let r=e.parentNode
if(r&&"LI"===r.nodeName&&(r=r.parentNode),r&&r.classList.contains("dropdown-menu")){const t=e.closest(".dropdown")
t&&N.find(".dropdown-toggle",t).forEach((e=>e.classList.add(T))),e.setAttribute("aria-expanded",!0)}n&&n()}static jQueryInterface(e){return this.each((function(){const t=B.getOrCreateInstance(this)
if("string"==typeof e){if(void 0===t[e])throw new TypeError(`No method named "${e}"`)
t[e]()}}))}}D.on(document,"click.bs.tab.data-api",'[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',(function(e){["A","AREA"].includes(this.tagName)&&e.preventDefault(),i(this)||B.getOrCreateInstance(this).show()})),u(B)
var H="top",R="bottom",W="right",$="left",V="auto",Y=[H,R,W,$],F="start",K="end",U="clippingParents",z="viewport",Q="popper",X="reference",G=Y.reduce((function(e,t){return e.concat([t+"-"+F,t+"-"+K])}),[]),J=[].concat(Y,[V]).reduce((function(e,t){return e.concat([t,t+"-"+F,t+"-"+K])}),[]),Z="beforeRead",ee="read",te="afterRead",ne="beforeMain",re="main",oe="afterMain",ie="beforeWrite",se="write",ae="afterWrite",ce=[Z,ee,te,ne,re,oe,ie,se,ae]
function le(e){return e?(e.nodeName||"").toLowerCase():null}function ue(e){if(null==e)return window
if("[object Window]"!==e.toString()){var t=e.ownerDocument
return t&&t.defaultView||window}return e}function fe(e){return e instanceof ue(e).Element||e instanceof Element}function de(e){return e instanceof ue(e).HTMLElement||e instanceof HTMLElement}function pe(e){return"undefined"!=typeof ShadowRoot&&(e instanceof ue(e).ShadowRoot||e instanceof ShadowRoot)}var me={name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state
Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},r=t.attributes[e]||{},o=t.elements[e]
de(o)&&le(o)&&(Object.assign(o.style,n),Object.keys(r).forEach((function(e){var t=r[e]
!1===t?o.removeAttribute(e):o.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}}
return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var r=t.elements[e],o=t.attributes[e]||{},i=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{})
de(r)&&le(r)&&(Object.assign(r.style,i),Object.keys(o).forEach((function(e){r.removeAttribute(e)})))}))}},requires:["computeStyles"]}
function he(e){return e.split("-")[0]}var ge=Math.max,ve=Math.min,be=Math.round
function ye(e,t){void 0===t&&(t=!1)
var n=e.getBoundingClientRect(),r=1,o=1
if(de(e)&&t){var i=e.offsetHeight,s=e.offsetWidth
s>0&&(r=be(n.width)/s||1),i>0&&(o=be(n.height)/i||1)}return{width:n.width/r,height:n.height/o,top:n.top/o,right:n.right/r,bottom:n.bottom/o,left:n.left/r,x:n.left/r,y:n.top/o}}function we(e){var t=ye(e),n=e.offsetWidth,r=e.offsetHeight
return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function xe(e,t){var n=t.getRootNode&&t.getRootNode()
if(e.contains(t))return!0
if(n&&pe(n)){var r=t
do{if(r&&e.isSameNode(r))return!0
r=r.parentNode||r.host}while(r)}return!1}function Ee(e){return ue(e).getComputedStyle(e)}function Oe(e){return["table","td","th"].indexOf(le(e))>=0}function _e(e){return((fe(e)?e.ownerDocument:e.document)||window.document).documentElement}function je(e){return"html"===le(e)?e:e.assignedSlot||e.parentNode||(pe(e)?e.host:null)||_e(e)}function Ae(e){return de(e)&&"fixed"!==Ee(e).position?e.offsetParent:null}function Le(e){for(var t=ue(e),n=Ae(e);n&&Oe(n)&&"static"===Ee(n).position;)n=Ae(n)
return n&&("html"===le(n)||"body"===le(n)&&"static"===Ee(n).position)?t:n||function(e){var t=-1!==navigator.userAgent.toLowerCase().indexOf("firefox")
if(-1!==navigator.userAgent.indexOf("Trident")&&de(e)&&"fixed"===Ee(e).position)return null
var n=je(e)
for(pe(n)&&(n=n.host);de(n)&&["html","body"].indexOf(le(n))<0;){var r=Ee(n)
if("none"!==r.transform||"none"!==r.perspective||"paint"===r.contain||-1!==["transform","perspective"].indexOf(r.willChange)||t&&"filter"===r.willChange||t&&r.filter&&"none"!==r.filter)return n
n=n.parentNode}return null}(e)||t}function De(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function Ne(e,t,n){return ge(e,ve(t,n))}function Se(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function ke(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}var Ce={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,s=n.modifiersData.popperOffsets,a=he(n.placement),c=De(a),l=[$,W].indexOf(a)>=0?"height":"width"
if(i&&s){var u=function(e,t){return Se("number"!=typeof(e="function"==typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:ke(e,Y))}(o.padding,n),f=we(i),d="y"===c?H:$,p="y"===c?R:W,m=n.rects.reference[l]+n.rects.reference[c]-s[c]-n.rects.popper[l],h=s[c]-n.rects.reference[c],g=Le(i),v=g?"y"===c?g.clientHeight||0:g.clientWidth||0:0,b=m/2-h/2,y=u[d],w=v-f[l]-u[p],x=v/2-f[l]/2+b,E=Ne(y,x,w),O=c
n.modifiersData[r]=((t={})[O]=E,t.centerOffset=E-x,t)}},effect:function(e){var t=e.state,n=e.options.element,r=void 0===n?"[data-popper-arrow]":n
null!=r&&("string"!=typeof r||(r=t.elements.popper.querySelector(r)))&&xe(t.elements.popper,r)&&(t.elements.arrow=r)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]}
function Te(e){return e.split("-")[1]}var Pe={top:"auto",right:"auto",bottom:"auto",left:"auto"}
function Me(e){var t,n=e.popper,r=e.popperRect,o=e.placement,i=e.variation,s=e.offsets,a=e.position,c=e.gpuAcceleration,l=e.adaptive,u=e.roundOffsets,f=e.isFixed,d=s.x,p=void 0===d?0:d,m=s.y,h=void 0===m?0:m,g="function"==typeof u?u({x:p,y:h}):{x:p,y:h}
p=g.x,h=g.y
var v=s.hasOwnProperty("x"),b=s.hasOwnProperty("y"),y=$,w=H,x=window
if(l){var E=Le(n),O="clientHeight",_="clientWidth"
E===ue(n)&&"static"!==Ee(E=_e(n)).position&&"absolute"===a&&(O="scrollHeight",_="scrollWidth"),(o===H||(o===$||o===W)&&i===K)&&(w=R,h-=(f&&E===x&&x.visualViewport?x.visualViewport.height:E[O])-r.height,h*=c?1:-1),o!==$&&(o!==H&&o!==R||i!==K)||(y=W,p-=(f&&E===x&&x.visualViewport?x.visualViewport.width:E[_])-r.width,p*=c?1:-1)}var j,A=Object.assign({position:a},l&&Pe),L=!0===u?function(e){var t=e.x,n=e.y,r=window.devicePixelRatio||1
return{x:be(t*r)/r||0,y:be(n*r)/r||0}}({x:p,y:h}):{x:p,y:h}
return p=L.x,h=L.y,c?Object.assign({},A,((j={})[w]=b?"0":"",j[y]=v?"0":"",j.transform=(x.devicePixelRatio||1)<=1?"translate("+p+"px, "+h+"px)":"translate3d("+p+"px, "+h+"px, 0)",j)):Object.assign({},A,((t={})[w]=b?h+"px":"",t[y]=v?p+"px":"",t.transform="",t))}var qe={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=void 0===r||r,i=n.adaptive,s=void 0===i||i,a=n.roundOffsets,c=void 0===a||a,l={placement:he(t.placement),variation:Te(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:"fixed"===t.options.strategy}
null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,Me(Object.assign({},l,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:c})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,Me(Object.assign({},l,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}},Ie={passive:!0},Be={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=void 0===o||o,s=r.resize,a=void 0===s||s,c=ue(t.elements.popper),l=[].concat(t.scrollParents.reference,t.scrollParents.popper)
return i&&l.forEach((function(e){e.addEventListener("scroll",n.update,Ie)})),a&&c.addEventListener("resize",n.update,Ie),function(){i&&l.forEach((function(e){e.removeEventListener("scroll",n.update,Ie)})),a&&c.removeEventListener("resize",n.update,Ie)}},data:{}},He={left:"right",right:"left",bottom:"top",top:"bottom"}
function Re(e){return e.replace(/left|right|bottom|top/g,(function(e){return He[e]}))}var We={start:"end",end:"start"}
function $e(e){return e.replace(/start|end/g,(function(e){return We[e]}))}function Ve(e){var t=ue(e)
return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function Ye(e){return ye(_e(e)).left+Ve(e).scrollLeft}function Fe(e){var t=Ee(e),n=t.overflow,r=t.overflowX,o=t.overflowY
return/auto|scroll|overlay|hidden/.test(n+o+r)}function Ke(e){return["html","body","#document"].indexOf(le(e))>=0?e.ownerDocument.body:de(e)&&Fe(e)?e:Ke(je(e))}function Ue(e,t){var n
void 0===t&&(t=[])
var r=Ke(e),o=r===(null==(n=e.ownerDocument)?void 0:n.body),i=ue(r),s=o?[i].concat(i.visualViewport||[],Fe(r)?r:[]):r,a=t.concat(s)
return o?a:a.concat(Ue(je(s)))}function ze(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Qe(e,t){return t===z?ze(function(e){var t=ue(e),n=_e(e),r=t.visualViewport,o=n.clientWidth,i=n.clientHeight,s=0,a=0
return r&&(o=r.width,i=r.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(s=r.offsetLeft,a=r.offsetTop)),{width:o,height:i,x:s+Ye(e),y:a}}(e)):fe(t)?function(e){var t=ye(e)
return t.top=t.top+e.clientTop,t.left=t.left+e.clientLeft,t.bottom=t.top+e.clientHeight,t.right=t.left+e.clientWidth,t.width=e.clientWidth,t.height=e.clientHeight,t.x=t.left,t.y=t.top,t}(t):ze(function(e){var t,n=_e(e),r=Ve(e),o=null==(t=e.ownerDocument)?void 0:t.body,i=ge(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=ge(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),a=-r.scrollLeft+Ye(e),c=-r.scrollTop
return"rtl"===Ee(o||n).direction&&(a+=ge(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:s,x:a,y:c}}(_e(e)))}function Xe(e,t,n){var r="clippingParents"===t?function(e){var t=Ue(je(e)),n=["absolute","fixed"].indexOf(Ee(e).position)>=0&&de(e)?Le(e):e
return fe(n)?t.filter((function(e){return fe(e)&&xe(e,n)&&"body"!==le(e)})):[]}(e):[].concat(t),o=[].concat(r,[n]),i=o[0],s=o.reduce((function(t,n){var r=Qe(e,n)
return t.top=ge(r.top,t.top),t.right=ve(r.right,t.right),t.bottom=ve(r.bottom,t.bottom),t.left=ge(r.left,t.left),t}),Qe(e,i))
return s.width=s.right-s.left,s.height=s.bottom-s.top,s.x=s.left,s.y=s.top,s}function Ge(e){var t,n=e.reference,r=e.element,o=e.placement,i=o?he(o):null,s=o?Te(o):null,a=n.x+n.width/2-r.width/2,c=n.y+n.height/2-r.height/2
switch(i){case H:t={x:a,y:n.y-r.height}
break
case R:t={x:a,y:n.y+n.height}
break
case W:t={x:n.x+n.width,y:c}
break
case $:t={x:n.x-r.width,y:c}
break
default:t={x:n.x,y:n.y}}var l=i?De(i):null
if(null!=l){var u="y"===l?"height":"width"
switch(s){case F:t[l]=t[l]-(n[u]/2-r[u]/2)
break
case K:t[l]=t[l]+(n[u]/2-r[u]/2)}}return t}function Je(e,t){void 0===t&&(t={})
var n=t,r=n.placement,o=void 0===r?e.placement:r,i=n.boundary,s=void 0===i?U:i,a=n.rootBoundary,c=void 0===a?z:a,l=n.elementContext,u=void 0===l?Q:l,f=n.altBoundary,d=void 0!==f&&f,p=n.padding,m=void 0===p?0:p,h=Se("number"!=typeof m?m:ke(m,Y)),g=u===Q?X:Q,v=e.rects.popper,b=e.elements[d?g:u],y=Xe(fe(b)?b:b.contextElement||_e(e.elements.popper),s,c),w=ye(e.elements.reference),x=Ge({reference:w,element:v,strategy:"absolute",placement:o}),E=ze(Object.assign({},v,x)),O=u===Q?E:w,_={top:y.top-O.top+h.top,bottom:O.bottom-y.bottom+h.bottom,left:y.left-O.left+h.left,right:O.right-y.right+h.right},j=e.modifiersData.offset
if(u===Q&&j){var A=j[o]
Object.keys(_).forEach((function(e){var t=[W,R].indexOf(e)>=0?1:-1,n=[H,R].indexOf(e)>=0?"y":"x"
_[e]+=A[n]*t}))}return _}function Ze(e,t){void 0===t&&(t={})
var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,s=n.padding,a=n.flipVariations,c=n.allowedAutoPlacements,l=void 0===c?J:c,u=Te(r),f=u?a?G:G.filter((function(e){return Te(e)===u})):Y,d=f.filter((function(e){return l.indexOf(e)>=0}))
0===d.length&&(d=f)
var p=d.reduce((function(t,n){return t[n]=Je(e,{placement:n,boundary:o,rootBoundary:i,padding:s})[he(n)],t}),{})
return Object.keys(p).sort((function(e,t){return p[e]-p[t]}))}var et={name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name
if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=void 0===o||o,s=n.altAxis,a=void 0===s||s,c=n.fallbackPlacements,l=n.padding,u=n.boundary,f=n.rootBoundary,d=n.altBoundary,p=n.flipVariations,m=void 0===p||p,h=n.allowedAutoPlacements,g=t.options.placement,v=he(g),b=c||(v!==g&&m?function(e){if(he(e)===V)return[]
var t=Re(e)
return[$e(e),t,$e(t)]}(g):[Re(g)]),y=[g].concat(b).reduce((function(e,n){return e.concat(he(n)===V?Ze(t,{placement:n,boundary:u,rootBoundary:f,padding:l,flipVariations:m,allowedAutoPlacements:h}):n)}),[]),w=t.rects.reference,x=t.rects.popper,E=new Map,O=!0,_=y[0],j=0;j<y.length;j++){var A=y[j],L=he(A),D=Te(A)===F,N=[H,R].indexOf(L)>=0,S=N?"width":"height",k=Je(t,{placement:A,boundary:u,rootBoundary:f,altBoundary:d,padding:l}),C=N?D?W:$:D?R:H
w[S]>x[S]&&(C=Re(C))
var T=Re(C),P=[]
if(i&&P.push(k[L]<=0),a&&P.push(k[C]<=0,k[T]<=0),P.every((function(e){return e}))){_=A,O=!1
break}E.set(A,P)}if(O)for(var M=function(e){var t=y.find((function(t){var n=E.get(t)
if(n)return n.slice(0,e).every((function(e){return e}))}))
if(t)return _=t,"break"},q=m?3:1;q>0&&"break"!==M(q);q--);t.placement!==_&&(t.modifiersData[r]._skip=!0,t.placement=_,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}}
function tt(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function nt(e){return[H,W,R,$].some((function(t){return e[t]>=0}))}var rt={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,s=Je(t,{elementContext:"reference"}),a=Je(t,{altBoundary:!0}),c=tt(s,r),l=tt(a,o,i),u=nt(c),f=nt(l)
t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:l,isReferenceHidden:u,hasPopperEscaped:f},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":f})}},ot={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=void 0===o?[0,0]:o,s=J.reduce((function(e,n){return e[n]=function(e,t,n){var r=he(e),o=[$,H].indexOf(r)>=0?-1:1,i="function"==typeof n?n(Object.assign({},t,{placement:e})):n,s=i[0],a=i[1]
return s=s||0,a=(a||0)*o,[$,W].indexOf(r)>=0?{x:a,y:s}:{x:s,y:a}}(n,t.rects,i),e}),{}),a=s[t.placement],c=a.x,l=a.y
null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=l),t.modifiersData[r]=s}},it={name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name
t.modifiersData[n]=Ge({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},st={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=void 0===o||o,s=n.altAxis,a=void 0!==s&&s,c=n.boundary,l=n.rootBoundary,u=n.altBoundary,f=n.padding,d=n.tether,p=void 0===d||d,m=n.tetherOffset,h=void 0===m?0:m,g=Je(t,{boundary:c,rootBoundary:l,padding:f,altBoundary:u}),v=he(t.placement),b=Te(t.placement),y=!b,w=De(v),x="x"===w?"y":"x",E=t.modifiersData.popperOffsets,O=t.rects.reference,_=t.rects.popper,j="function"==typeof h?h(Object.assign({},t.rects,{placement:t.placement})):h,A="number"==typeof j?{mainAxis:j,altAxis:j}:Object.assign({mainAxis:0,altAxis:0},j),L=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,D={x:0,y:0}
if(E){if(i){var N,S="y"===w?H:$,k="y"===w?R:W,C="y"===w?"height":"width",T=E[w],P=T+g[S],M=T-g[k],q=p?-_[C]/2:0,I=b===F?O[C]:_[C],B=b===F?-_[C]:-O[C],V=t.elements.arrow,Y=p&&V?we(V):{width:0,height:0},K=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},U=K[S],z=K[k],Q=Ne(0,O[C],Y[C]),X=y?O[C]/2-q-Q-U-A.mainAxis:I-Q-U-A.mainAxis,G=y?-O[C]/2+q+Q+z+A.mainAxis:B+Q+z+A.mainAxis,J=t.elements.arrow&&Le(t.elements.arrow),Z=J?"y"===w?J.clientTop||0:J.clientLeft||0:0,ee=null!=(N=null==L?void 0:L[w])?N:0,te=T+G-ee,ne=Ne(p?ve(P,T+X-ee-Z):P,T,p?ge(M,te):M)
E[w]=ne,D[w]=ne-T}if(a){var re,oe="x"===w?H:$,ie="x"===w?R:W,se=E[x],ae="y"===x?"height":"width",ce=se+g[oe],le=se-g[ie],ue=-1!==[H,$].indexOf(v),fe=null!=(re=null==L?void 0:L[x])?re:0,de=ue?ce:se-O[ae]-_[ae]-fe+A.altAxis,pe=ue?se+O[ae]+_[ae]-fe-A.altAxis:le,me=p&&ue?function(e,t,n){var r=Ne(e,t,n)
return r>n?n:r}(de,se,pe):Ne(p?de:ce,se,p?pe:le)
E[x]=me,D[x]=me-se}t.modifiersData[r]=D}},requiresIfExists:["offset"]}
function at(e,t,n){void 0===n&&(n=!1)
var r,o,i=de(t),s=de(t)&&function(e){var t=e.getBoundingClientRect(),n=be(t.width)/e.offsetWidth||1,r=be(t.height)/e.offsetHeight||1
return 1!==n||1!==r}(t),a=_e(t),c=ye(e,s),l={scrollLeft:0,scrollTop:0},u={x:0,y:0}
return(i||!i&&!n)&&(("body"!==le(t)||Fe(a))&&(l=(r=t)!==ue(r)&&de(r)?{scrollLeft:(o=r).scrollLeft,scrollTop:o.scrollTop}:Ve(r)),de(t)?((u=ye(t,!0)).x+=t.clientLeft,u.y+=t.clientTop):a&&(u.x=Ye(a))),{x:c.left+l.scrollLeft-u.x,y:c.top+l.scrollTop-u.y,width:c.width,height:c.height}}function ct(e){var t=new Map,n=new Set,r=[]
function o(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!n.has(e)){var r=t.get(e)
r&&o(r)}})),r.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||o(e)})),r}var lt={placement:"bottom",modifiers:[],strategy:"absolute"}
function ut(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n]
return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}function ft(e){void 0===e&&(e={})
var t=e,n=t.defaultModifiers,r=void 0===n?[]:n,o=t.defaultOptions,i=void 0===o?lt:o
return function(e,t,n){void 0===n&&(n=i)
var o,s,a={placement:"bottom",orderedModifiers:[],options:Object.assign({},lt,i),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},c=[],l=!1,u={state:a,setOptions:function(n){var o="function"==typeof n?n(a.options):n
f(),a.options=Object.assign({},i,a.options,o),a.scrollParents={reference:fe(e)?Ue(e):e.contextElement?Ue(e.contextElement):[],popper:Ue(t)}
var s,l,d=function(e){var t=ct(e)
return ce.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}((s=[].concat(r,a.options.modifiers),l=s.reduce((function(e,t){var n=e[t.name]
return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{}),Object.keys(l).map((function(e){return l[e]}))))
return a.orderedModifiers=d.filter((function(e){return e.enabled})),a.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,r=void 0===n?{}:n,o=e.effect
if("function"==typeof o){var i=o({state:a,name:t,instance:u,options:r}),s=function(){}
c.push(i||s)}})),u.update()},forceUpdate:function(){if(!l){var e=a.elements,t=e.reference,n=e.popper
if(ut(t,n)){a.rects={reference:at(t,Le(n),"fixed"===a.options.strategy),popper:we(n)},a.reset=!1,a.placement=a.options.placement,a.orderedModifiers.forEach((function(e){return a.modifiersData[e.name]=Object.assign({},e.data)}))
for(var r=0;r<a.orderedModifiers.length;r++)if(!0!==a.reset){var o=a.orderedModifiers[r],i=o.fn,s=o.options,c=void 0===s?{}:s,f=o.name
"function"==typeof i&&(a=i({state:a,options:c,name:f,instance:u})||a)}else a.reset=!1,r=-1}}},update:(o=function(){return new Promise((function(e){u.forceUpdate(),e(a)}))},function(){return s||(s=new Promise((function(e){Promise.resolve().then((function(){s=void 0,e(o())}))}))),s}),destroy:function(){f(),l=!0}}
if(!ut(e,t))return u
function f(){c.forEach((function(e){return e()})),c=[]}return u.setOptions(n).then((function(e){!l&&n.onFirstUpdate&&n.onFirstUpdate(e)})),u}}var dt=ft(),pt=ft({defaultModifiers:[Be,it,qe,me]}),mt=ft({defaultModifiers:[Be,it,qe,me,ot,et,st,Ce,rt]}),ht=Object.freeze({__proto__:null,popperGenerator:ft,detectOverflow:Je,createPopperBase:dt,createPopper:mt,createPopperLite:pt,top:H,bottom:R,right:W,left:$,auto:V,basePlacements:Y,start:F,end:K,clippingParents:U,viewport:z,popper:Q,reference:X,variationPlacements:G,placements:J,beforeRead:Z,read:ee,afterRead:te,beforeMain:ne,main:re,afterMain:oe,beforeWrite:ie,write:se,afterWrite:ae,modifierPhases:ce,applyStyles:me,arrow:Ce,computeStyles:qe,eventListeners:Be,flip:et,hide:rt,offset:ot,popperOffsets:it,preventOverflow:st})
function gt(e){return"true"===e||"false"!==e&&(e===Number(e).toString()?Number(e):""===e||"null"===e?null:e)}function vt(e){return e.replace(/[A-Z]/g,(e=>`-${e.toLowerCase()}`))}const bt={setDataAttribute(e,t,n){e.setAttribute(`data-bs-${vt(t)}`,n)},removeDataAttribute(e,t){e.removeAttribute(`data-bs-${vt(t)}`)},getDataAttributes(e){if(!e)return{}
const t={}
return Object.keys(e.dataset).filter((e=>e.startsWith("bs"))).forEach((n=>{let r=n.replace(/^bs/,"")
r=r.charAt(0).toLowerCase()+r.slice(1,r.length),t[r]=gt(e.dataset[n])})),t},getDataAttribute:(e,t)=>gt(e.getAttribute(`data-bs-${vt(t)}`)),offset(e){const t=e.getBoundingClientRect()
return{top:t.top+window.pageYOffset,left:t.left+window.pageXOffset}},position:e=>({top:e.offsetTop,left:e.offsetLeft})},yt="dropdown",wt="Escape",xt="Space",Et="ArrowUp",Ot="ArrowDown",_t=new RegExp("ArrowUp|ArrowDown|Escape"),jt="click.bs.dropdown.data-api",At="keydown.bs.dropdown.data-api",Lt="show",Dt='[data-bs-toggle="dropdown"]',Nt=".dropdown-menu",St=l()?"top-end":"top-start",kt=l()?"top-start":"top-end",Ct=l()?"bottom-end":"bottom-start",Tt=l()?"bottom-start":"bottom-end",Pt=l()?"left-start":"right-start",Mt=l()?"right-start":"left-start",qt={offset:[0,2],boundary:"clippingParents",reference:"toggle",display:"dynamic",popperConfig:null,autoClose:!0},It={offset:"(array|string|function)",boundary:"(string|element)",reference:"(string|element|object)",display:"string",popperConfig:"(null|object|function)",autoClose:"(boolean|string)"}
class Bt extends C{constructor(e,t){super(e),this._popper=null,this._config=this._getConfig(t),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar()}static get Default(){return qt}static get DefaultType(){return It}static get NAME(){return yt}toggle(){return this._isShown()?this.hide():this.show()}show(){if(i(this._element)||this._isShown(this._menu))return
const e={relatedTarget:this._element}
if(D.trigger(this._element,"show.bs.dropdown",e).defaultPrevented)return
const t=Bt.getParentFromElement(this._element)
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
return o+=n?1:-1,r&&(o=(o+i)%i),e[Math.max(0,Math.min(o,i-1))]})(n,t,e===Ot,!n.includes(t)).focus()}static jQueryInterface(e){return this.each((function(){const t=Bt.getOrCreateInstance(this,e)
if("string"==typeof e){if(void 0===t[e])throw new TypeError(`No method named "${e}"`)
t[e]()}}))}static clearMenus(e){if(e&&(2===e.button||"keyup"===e.type&&"Tab"!==e.key))return
const t=N.find(Dt)
for(let n=0,r=t.length;n<r;n++){const r=Bt.getInstance(t[n])
if(!r||!1===r._config.autoClose)continue
if(!r._isShown())continue
const o={relatedTarget:r._element}
if(e){const t=e.composedPath(),n=t.includes(r._menu)
if(t.includes(r._element)||"inside"===r._config.autoClose&&!n||"outside"===r._config.autoClose&&n)continue
if(r._menu.contains(e.target)&&("keyup"===e.type&&"Tab"===e.key||/input|select|option|textarea|form/i.test(e.target.tagName)))continue
"click"===e.type&&(o.clickEvent=e)}r._completeHide(o)}}static getParentFromElement(e){return t(e)||e.parentNode}static dataApiKeydownHandler(e){if(/input|textarea/i.test(e.target.tagName)?e.key===xt||e.key!==wt&&(e.key!==Ot&&e.key!==Et||e.target.closest(Nt)):!_t.test(e.key))return
const t=this.classList.contains(Lt)
if(!t&&e.key===wt)return
if(e.preventDefault(),e.stopPropagation(),i(this))return
const n=this.matches(Dt)?this:N.prev(this,Dt)[0],r=Bt.getOrCreateInstance(n)
if(e.key!==wt)return e.key===Et||e.key===Ot?(t||r.show(),void r._selectMenuItem(e)):void(t&&e.key!==xt||Bt.clearMenus())
r.hide()}}D.on(document,At,Dt,Bt.dataApiKeydownHandler),D.on(document,At,Nt,Bt.dataApiKeydownHandler),D.on(document,jt,Bt.clearMenus),D.on(document,"keyup.bs.dropdown.data-api",Bt.clearMenus),D.on(document,jt,Dt,(function(e){e.preventDefault(),Bt.getOrCreateInstance(this).toggle()})),u(Bt),document.addEventListener("DOMContentLoaded",(function(){if(document.getElementById("prism-css").media="all",document.getElementById("toggle-offcanvas").addEventListener("click",(function(){document.body.classList.toggle("offcanvas-open")})),0!=document.querySelectorAll(".demo").length&&!document.getElementById("select-theme")){var e=window.themes||["bootstrap5","bootstrap4","default"],t={bootstrap5:"Bootstrap 5",bootstrap4:"Bootstrap 4",default:"Default"},n=localStorage.getItem("theme");-1==e.indexOf(n)&&(n="bootstrap5")
var r=document.createElement("input")
r.classList.add("theme-selector-input")
var o=document.getElementById("main-container")
document.querySelectorAll(".demo-mini").length||(o.insertBefore(r,o.firstChild),new TomSelect(r,{maxItems:1,controlInput:"<input>",plugins:["no_backspace_delete"],options:e.map((n=>-1!=e.indexOf(n)&&{text:t[n],value:n})),items:[n],render:{item:(e,t)=>"<div>Theme: "+t(e.text)+"</div>"},onChange:e=>{i(e)}})),i(n),document.addEventListener("click",(e=>{var t=e.target.closest(".opensandbox")
if(t){var n,r=t.closest(".demo")
function l(e){var t=r.querySelector(e)
return t&&t.textContent||""}var o=`<div class="p-4">${r.querySelector("textarea").value||""}</div>`,i=l("style"),s=l("script"),a=[`https://cdn.jsdelivr.net/npm/tom-select@2.0.3/dist/css/tom-select.${localStorage.getItem("theme")||"bootstrap4"}.min.css`,"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"]
"bootstrap4"==localStorage.getItem("theme")?a.push("https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/css/bootstrap.min.css"):a.push("https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css")
var c=["https://cdn.jsdelivr.net/npm/tom-select@2.0.3/dist/js/tom-select.complete.min.js"]
r.classList.contains("demo-jquery")&&(c.push("https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js"),c.push("https://cdn.jsdelivr.net/npm/jquery-ui-dist@1.12.1/jquery-ui.js")),n={html:o,js:s,css:i,js_external:c.join(";"),css_external:a.join(";")},r.querySelector(".codepen").value=JSON.stringify(n),r.querySelector(".jsfiddle-html").value=o,r.querySelector(".jsfiddle-js").value=s,r.querySelector(".jsfiddle-css").value=i,r.querySelector(".jsfiddle-resources").value=c.join(",")+","+a.join(","),setTimeout((()=>{t.nextElementSibling.submit()}),50)}}))}function i(t){if(-1!=e.indexOf(t)){localStorage.setItem("theme",t)
var n=document.getElementById("select-theme")
n&&n.parentNode.removeChild(n),(n=document.createElement("link")).id="select-theme",n.setAttribute("rel","stylesheet"),n.setAttribute("href","/css/tom-select."+t+".css"),document.getElementsByTagName("head")[0].appendChild(n)}}}))},"function"==typeof define&&define.amd?define(e):e()
//# sourceMappingURL=index.bundle.js.map

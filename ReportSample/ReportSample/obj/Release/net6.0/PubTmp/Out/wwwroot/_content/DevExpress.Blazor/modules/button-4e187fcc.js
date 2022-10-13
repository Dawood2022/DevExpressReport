import{a as e}from"./_tslib-158249d5.js";import{C as t}from"./custom-events-helper-18f7786a.js";import{L as i}from"./lit-element-base-3b55fdd3.js";import{L as n}from"./locker-c40478e6.js";import{E as a}from"./eventhelper-8570b930.js";import{n as s}from"./nameof-factory-64d95f5b.js";import{e as o}from"./property-d3853089.js";import{n as r}from"./custom-element-bd7061f2.js";class l{constructor(e){this.action=null,this.handle=null,this.timeout=0,this.timeout=e}execute(e){this.cancel(),this.action=e,this.handle=setInterval((()=>{var e;null===(e=this.action)||void 0===e||e.call(this)}),this.timeout)}cancel(){this.handle&&(clearInterval(this.handle),this.action=null,this.handle=null)}}class c{static addEventListener(e,t,i,n){if(c.targetEvents.has(i)||c.documentEvents.has(i))throw new Error("multiple event listeners are not supported");const a=e=>{e.handled||i(e)};c.documentEvents.set(i,a);const s=e=>{e.handled=!0,i(e)};c.targetEvents.set(i,s),e.addEventListener(t,s,n),document.addEventListener(t,a,n)}static removeEventListener(e,t,i,n){const a=c.targetEvents.get(i);a&&(c.targetEvents.delete(i),e.removeEventListener(t,a));const s=c.documentEvents.get(i);s&&(c.documentEvents.delete(i),document.removeEventListener(t,s))}}c.documentEvents=new Map,c.targetEvents=new Map;class h{constructor(e){this.action=null,this.handle=null,this.timeout=0,this.timeout=e}get hasAction(){return!!this.handle}execute(e){this.cancel(),this.action=e,this.handle=setTimeout((()=>{var e;null===(e=this.action)||void 0===e||e.call(this),this.handle=null,this.action=null}),this.timeout)}forceExecute(){if(!this.hasAction)return;const e=this.action;this.cancel(),e&&e()}cancel(){this.hasAction&&this.handle&&(clearTimeout(this.handle),this.action=null,this.handle=null)}}var p;const d="dxbl-button";var u,v;!function(e){e.Simple="simple",e.Toggle="toggle",e.Repeat="repeat"}(u||(u={})),function(e){e.Release="release",e.Press="press"}(v||(v={}));class k{constructor(e){this.eventArgs=e}}class m extends CustomEvent{constructor(e){super(m.eventName,{detail:new k(e),bubbles:!0,composed:!0,cancelable:!0})}}m.eventName="dxbl-button.click",t.register(m.eventName,(e=>e.detail));const y=s();let b=p=class extends i{constructor(){super(),this.clickHandler=this.handleClick.bind(this),this.pointerDownHandler=this.handlePointerDown.bind(this),this.pointerUpHandler=this.handlePointerUp.bind(this),this.keyDownHandler=this.handleKeyDown.bind(this),this.keyUpHandler=this.handleKeyUp.bind(this),this.visibilityChangeHandler=this.handleVisibilityChange.bind(this),this.repeatLocker=new n,this.preventRaiseNextClick=!1,this.processClick=!1,this.stopPropagation=!1,this.preventDefault=!1,this.buttonKind=u.Simple,this.repeatInterval=p.defaultRepeatInterval,this.repeatDelay=p.defaultRepeatDelay,this.clickMode=null,this.initializeRepeatAction()}createRenderRoot(){return this}get actualClickMode(){return this.clickMode?this.clickMode:this.actualButtonKind===u.Repeat?v.Press:v.Release}get actualButtonKind(){var e;return null!==(e=this.buttonKind)&&void 0!==e?e:u.Simple}get actualRepeatInterval(){var e;return null!==(e=this.repeatInterval)&&void 0!==e?e:p.defaultRepeatInterval}get actualRepeatDelay(){var e;return null!==(e=this.repeatDelay)&&void 0!==e?e:p.defaultRepeatDelay}connectedCallback(){super.connectedCallback(),this.addEventListener("keydown",this.keyDownHandler),this.addEventListener("keyup",this.keyUpHandler),this.addEventListener("pointerdown",this.pointerDownHandler),this.addEventListener("click",this.clickHandler)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("keydown",this.keyDownHandler),this.removeEventListener("keyup",this.keyUpHandler),this.removeEventListener("pointerdown",this.pointerDownHandler),this.removeEventListener("click",this.clickHandler),this.cancelRepeatAction()}startRepeatAction(e){this.repeatLocker.IsLocked||(this.repeatLocker.lockOnce(),c.addEventListener(this,"pointerup",this.pointerUpHandler),c.addEventListener(this,"keyup",this.keyUpHandler),document.addEventListener("visibilitychange",this.visibilityChangeHandler),this.preventRaiseNextClick=!1,this.raiseClick(e),this.deferredAction.execute((()=>{this.repeatAction.execute((()=>this.raiseClick(e)))})))}cancelRepeatAction(){this.repeatLocker.IsLocked&&(this.repeatLocker.unlock(),this.preventRaiseNextClick=!0,c.removeEventListener(this,"pointerup",this.pointerUpHandler),c.removeEventListener(this,"keyup",this.keyUpHandler),document.removeEventListener("visibilitychange",this.visibilityChangeHandler),this.deferredAction.cancel(),this.repeatAction.cancel())}handlePointerDown(e){this.processClick&&(this.actualButtonKind!==u.Repeat?this.actualClickMode===v.Press&&(this.raiseClick(e),a.stopPropagation(e)):this.startRepeatAction(e))}handlePointerUp(e){this.actualButtonKind===u.Repeat&&this.cancelRepeatAction(),this.actualClickMode!==v.Press||a.stopPropagation(e)}handleKeyDown(e){this.processClick&&(this.repeatLocker.IsLocked||("Enter"===e.key&&this.actualButtonKind===u.Repeat?this.startRepeatAction(e):"Enter"===e.key&&this.actualButtonKind!==u.Repeat&&(this.repeatLocker.lockOnce(),this.raiseClick(e)),a.stopPropagation(e)))}handleKeyUp(e){this.processClick&&this.actualClickMode===v.Press&&("Space"===e.code&&(this.raiseClick(e),a.stopPropagation(e)),"Enter"===e.code&&this.actualButtonKind===u.Repeat?(this.cancelRepeatAction(),a.stopPropagation(e)):"Enter"===e.key&&this.actualButtonKind!==u.Repeat&&this.repeatLocker.unlock())}updated(e){(e.has(y("repeatInterval"))||e.has(y("repeatDelay")))&&(this.cancelRepeatAction(),this.initializeRepeatAction()),e.has(y("clickMode"))&&this.cancelRepeatAction()}initializeRepeatAction(){this.repeatAction=new l(this.actualRepeatInterval),this.deferredAction=new h(this.actualRepeatDelay)}handleClick(e){this.processClick&&(this.stopPropagation&&e.stopPropagation(),this.preventDefault&&e.preventDefault(),this.repeatLocker.IsLocked||(this.preventRaiseNextClick?this.preventRaiseNextClick=!1:this.actualClickMode===v.Release&&this.raiseClick(e)))}raiseClick(e){this.dispatchEvent(new m(e))}handleVisibilityChange(e){"visible"!==document.visibilityState&&this.cancelRepeatAction()}};b.defaultRepeatInterval=50,b.defaultRepeatDelay=1e3,e([o({type:Boolean,attribute:"process-click"})],b.prototype,"processClick",void 0),e([o({type:Boolean,attribute:"click-stop-propagation"})],b.prototype,"stopPropagation",void 0),e([o({type:Boolean,attribute:"click-prevent-default"})],b.prototype,"preventDefault",void 0),e([o({type:String,attribute:"button-kind"})],b.prototype,"buttonKind",void 0),e([o({type:Number,attribute:"repeat-interval"})],b.prototype,"repeatInterval",void 0),e([o({type:Number,attribute:"repeat-delay"})],b.prototype,"repeatDelay",void 0),e([o({type:String,attribute:"click-mode"})],b.prototype,"clickMode",void 0),b=p=e([r("dxbl-button")],b);export{m as B,b as D,c as G,h as a,d};

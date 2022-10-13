import{D as e}from"./dx-ui-element-c0c26c83.js";import{b as t}from"./masks-378fccab.js";import{$ as n}from"./lit-element-1e675104.js";class p extends e{constructor(){super(),this.defaultInputLeftPadding=0,this.boundSlotChangedHandler=this.onSlotChanged.bind(this),this.prependGroupResizeObserver=new ResizeObserver(this.onPrependGroupSizeChanged.bind(this)),this.appendGroupResizeObserver=new ResizeObserver(this.onAppendGroupSizeChanged.bind(this))}disconnectedCallback(){this.prependGroupResizeObserver.disconnect(),this.appendGroupResizeObserver.disconnect(),super.disconnectedCallback()}render(){return n`
            <slot @slotchange="${this.boundSlotChangedHandler}">
            </slot>
        `}recalculateInputPadding(e,n,p){const r=this.getInputElement();p?r.style.paddingLeft=n+this.defaultInputLeftPadding+"px":r.style.paddingRight=n+"px",t(r,e)}getInputElement(){return this.querySelector("input")}onSlotChanged(e){const t=this.getInputElement();0===this.defaultInputLeftPadding&&(this.defaultInputLeftPadding=parseFloat(getComputedStyle(t).paddingLeft));const n=this.getInputGroupPrependElement();n&&this.prependGroupResizeObserver.observe(n);const p=this.getInputGroupAppendElement();p&&this.appendGroupResizeObserver.observe(p)}onPrependGroupSizeChanged(e){this.onInputGroupButtonsSizeChanged(e,!0)}onAppendGroupSizeChanged(e){this.onInputGroupButtonsSizeChanged(e,!1)}onInputGroupButtonsSizeChanged(e,t){if(e.length<1)return;this.recalculateInputPadding(e[0].target,e[0].contentRect.width,t)}getInputGroupAppendElement(){return this.querySelector(p.InputGroupAppendSelector)}getInputGroupPrependElement(){return this.querySelector(p.InputGroupPrependSelector)}}p.InputGroupAppendSelector=".dxbs-input-group-append",p.InputGroupPrependSelector=".dxbs-input-group-prepend";export{p as I};

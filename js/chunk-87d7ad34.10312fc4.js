(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-87d7ad34"],{"240d":function(t,e,i){},"3f54":function(t,e,i){"use strict";i("240d")},"42df":function(t,e,i){"use strict";i("c1f2")},"4bd4":function(t,e,i){"use strict";var n=i("5530"),a=(i("caad"),i("2532"),i("07ac"),i("4de4"),i("159b"),i("7db0"),i("58df")),r=i("7e2b"),c=i("3206");e["a"]=Object(a["a"])(r["a"],Object(c["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,i=function(t){return t.$watch("hasError",(function(i){e.$set(e.errorBag,t._uid,i)}),{immediate:!0})},n={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?n.shouldValidate=t.$watch("shouldValidate",(function(a){a&&(e.errorBag.hasOwnProperty(t._uid)||(n.valid=i(t)))})):n.valid=i(t),n},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var i=this.watchers.find((function(t){return t._uid===e._uid}));i&&(i.valid(),i.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object(n["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},c1f2:function(t,e,i){},f43e:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",[i("v-form",{staticClass:"d-flex align-center mx-2",on:{submit:function(e){return e.preventDefault(),e.stopPropagation(),t.addTicket.apply(null,arguments)}}},[i("div",{staticClass:"title"},[t._v("新增優惠卷")]),i("v-text-field",{staticClass:"px-5",attrs:{placeholder:"請輸入優惠代碼",max:"8",hint:"優惠卷皆為8碼，英文皆大寫。"},model:{value:t.ticketCode,callback:function(e){t.ticketCode=e},expression:"ticketCode"}}),i("v-btn",{attrs:{type:"submit",text:""}},[i("v-icon",[t._v("mdi-magnify")])],1)],1),i("v-divider",{staticClass:"mt-2"}),t.status.isLoading?i("div",{staticClass:"loading-box"},[i("half-circle-spinner",{attrs:{"animation-duration":1200,size:80,color:"#1A237E"}})],1):[i("v-container",{staticClass:"card-container"},t._l(t.tickets,(function(t){return i("CouponTicket",{key:t.id,attrs:{ticket:t}})})),1)]],2)},a=[],r=(i("159b"),i("b0c0"),i("7db0"),i("fc1d")),c=i("c968"),s=i("369b"),o=i.n(s),u=i("4583"),d="https://docs.google.com/spreadsheets/d/e/2PACX-1vT54r-aPFDVkBm3KfUCm3C1N6kwcAN7fVqFzsUc2IKShjEpO3TQjKPKY2zUbkeQkQD6OaQ56CyR0ECC/pub?gid=1432926202&single=true&output=csv",l="https://docs.google.com/spreadsheets/d/e/2PACX-1vT54r-aPFDVkBm3KfUCm3C1N6kwcAN7fVqFzsUc2IKShjEpO3TQjKPKY2zUbkeQkQD6OaQ56CyR0ECC/pub?gid=1353915558&single=true&output=csv",f={name:"Coupon",components:{CouponTicket:r["a"],HalfCircleSpinner:u["a"]},created:function(){this.fetchTickets(),this.fetchOther()},data:function(){return{tickets:[],ticketCode:"",otherTickets:[],status:{isLoading:!0}}},methods:{fetchTickets:function(){var t=this;o.a.parse(d,{download:!0,header:!0,dynamicTyping:!0,complete:function(e){e.data.forEach((function(e){var i=null;i="divide"===e.discountType?function(t){return t*e.discount}:"minus"===e.discountType?function(t){return t-e.discount}:function(t,e){return t-e},t.tickets.push({id:e.id,name:e.name,type:"無"===e.type?"":e.type,minimum:e.minimum,code:e.code,limitDate:e.limitDate,function:i})})),t.status.isLoading=!1}})},fetchOther:function(){var t=this;o.a.parse(l,{download:!0,header:!0,dynamicTyping:!0,complete:function(e){t.otherTickets=e.data}})},addTicket:function(){var t=this,e=this.otherTickets.find((function(e){return e.code===t.ticketCode}));if(e){var i=null;i="divide"===e.discountType?function(t){return t*e.discount}:"minus"===e.discountType?function(t){return t-e.discount}:function(t,e){return t-e},this.tickets.push({id:e.id,name:e.name,type:"無"===e.type?"":e.type,minimum:e.minimum,code:e.code,limitDate:e.limitDate,function:i}),c["a"].fire({icon:"success",title:"新增優惠卷－".concat(e.name)}),this.ticketCode=""}else c["a"].fire({icon:"error",title:"優惠卷不存在"})}}},h=f,p=(i("42df"),i("2877")),m=i("6544"),v=i.n(m),k=i("8336"),b=i("a523"),C=i("ce7e"),y=i("4bd4"),g=i("132d"),_=i("8654"),V=Object(p["a"])(h,n,a,!1,null,"8fdebb8a",null);e["default"]=V.exports;v()(V,{VBtn:k["a"],VContainer:b["a"],VDivider:C["a"],VForm:y["a"],VIcon:g["a"],VTextField:_["a"]})},fc1d:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-hover",{scopedSlots:t._u([{key:"default",fn:function(e){var n=e.hover;return[i("v-card",{staticClass:"card my-2 d-flex align-center",class:{moveY:n},attrs:{elevation:n?8:4,"min-width":t.minWidth}},[i("v-container",{staticClass:"icon-container py-7 ma-0 indigo"},[i("v-icon",{attrs:{"x-large":"",color:"white"}},[t._v(" mdi-ticket-percent-outline ")])],1),i("v-container",{staticClass:"py-0"},[i("v-card-title",[t._v(t._s(t.ticket.name)+" ")]),i("v-card-subtitle",[t._v("使用期限： "+t._s(t.ticket.limitDate))])],1),t.ticket.type?i("div",{staticClass:"type-label amber white--text pa-1 rounded"},[t._v(" "+t._s(t.ticket.type)+" ")]):t._e()],1)]}}])})},a=[],r={props:{ticket:{type:Object,default:function(){return{}}},minWidth:{type:String,default:""}},name:"CouponTicket"},c=r,s=(i("3f54"),i("2877")),o=i("6544"),u=i.n(o),d=i("b0af"),l=i("99d9"),f=i("a523"),h=i("ce87"),p=i("132d"),m=Object(s["a"])(c,n,a,!1,null,"0d0e7ce3",null);e["a"]=m.exports;u()(m,{VCard:d["a"],VCardSubtitle:l["b"],VCardTitle:l["d"],VContainer:f["a"],VHover:h["a"],VIcon:p["a"]})}}]);
//# sourceMappingURL=chunk-87d7ad34.10312fc4.js.map
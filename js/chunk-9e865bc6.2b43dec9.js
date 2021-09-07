(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9e865bc6"],{"291d":function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[n("v-sheet",{attrs:{evelation:"8"}},[e.status.isLoading?n("div",{staticClass:"loading-box"},[n("half-circle-spinner",{attrs:{"animation-duration":1200,size:80,color:"#1A237E"}})],1):[n("v-form",{ref:"form",on:{submit:function(t){return t.preventDefault(),t.stopPropagation(),e.handleSubmit.apply(null,arguments)}},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[n("v-text-field",{attrs:{required:"",rules:e.presentPasswordRule,label:"舊密碼：","append-icon":e.show.present?"mdi-eye":"mdi-eye-off",type:e.show.present?"text":"password"},on:{"click:append":function(t){e.show.present=!e.show.present}},model:{value:e.presentPasswordCheck,callback:function(t){e.presentPasswordCheck=t},expression:"presentPasswordCheck"}}),n("v-text-field",{attrs:{label:"新密碼：",rules:e.newPasswordRule,clearable:"",required:"","append-icon":e.show.new?"mdi-eye":"mdi-eye-off",type:e.show.new?"text":"password",hint:"最少8個字，大小寫數字不限制"},on:{"click:append":function(t){e.show.new=!e.show.new}},model:{value:e.newPassword,callback:function(t){e.newPassword=t},expression:"newPassword"}}),n("v-text-field",{attrs:{label:"確認新密碼：",rules:e.newPasswordRule,clearable:"",required:"","append-icon":(e.show.newCheck,"mdi-eye-off"),type:e.show.newCheck?"text":"password"},on:{"click:append":function(t){e.show.newCheck=!e.show.newCheck}},model:{value:e.newPasswordCheck,callback:function(t){e.newPasswordCheck=t},expression:"newPasswordCheck"}}),n("v-row",{staticClass:"my-3"},[n("v-spacer"),n("v-btn",{staticClass:"mr-4",attrs:{disabled:e.notEmpty,color:"primary",type:"submit"}},[e._v(" 修改密碼 ")])],1)],1)]],2)],1)},r=[],i=n("5530"),a=(n("7db0"),n("498a"),n("c968")),o=n("4583"),c=n("369b"),u=n.n(c),d=n("2f62"),h="https://docs.google.com/spreadsheets/d/e/2PACX-1vT54r-aPFDVkBm3KfUCm3C1N6kwcAN7fVqFzsUc2IKShjEpO3TQjKPKY2zUbkeQkQD6OaQ56CyR0ECC/pub?gid=1020618966&single=true&output=csv",l={name:"ChangePasswordForm",components:{HalfCircleSpinner:o["a"]},data:function(){return{valid:!1,check:!1,presentPassword:"",presentPasswordCheck:"",newPassword:"",newPasswordCheck:"",show:{present:!1,new:!1,newCheck:!1},status:{isLoading:!0}}},watch:{presentPasswordCheck:function(){this.check=!1}},created:function(){var e=this.user.id;this.fetchUser(e)},methods:{fetchUser:function(e){var t=this;u.a.parse(h,{download:!0,header:!0,complete:function(n){var s=n.data.find((function(t){return t.id==e}));t.presentPassword=s.password,t.status.isLoading=!1}})},toggleCheck:function(){this.check=!0},handleSubmit:function(){this.toggleCheck(),this.valid?(a["a"].fire({icon:"success",title:"修改成功"}),this.presentPasswordCheck="",this.newPassword="",this.newPasswordCheck=""):a["a"].fire({icon:"error",title:"資料有誤，修改失敗"})}},computed:Object(i["a"])({presentPasswordRule:function(){var e=this;return this.check?[function(){return e.presentPasswordCheck===e.presentPassword||"密碼錯誤"}]:[]},newPasswordRule:function(){var e=this;return this.check?[function(){return e.newPassword.length>=8||"密碼需大於8位"},function(){return e.newPassword===e.newPasswordCheck||"新密碼不相同"}]:[]},notEmpty:function(){return!(this.presentPasswordCheck.trim()&&this.newPassword.trim()&&this.newPasswordCheck.trim())}},Object(d["b"])(["user"]))},w=l,f=(n("38a3"),n("2877")),p=n("6544"),m=n.n(p),v=n("8336"),b=n("a523"),k=n("4bd4"),P=n("0fd9"),C=n("8dd9"),g=n("2fa4"),y=n("8654"),V=Object(f["a"])(w,s,r,!1,null,"25b2c674",null);t["default"]=V.exports;m()(V,{VBtn:v["a"],VContainer:b["a"],VForm:k["a"],VRow:P["a"],VSheet:C["a"],VSpacer:g["a"],VTextField:y["a"]})},"38a3":function(e,t,n){"use strict";n("7829")},"4bd4":function(e,t,n){"use strict";var s=n("5530"),r=(n("caad"),n("2532"),n("07ac"),n("4de4"),n("159b"),n("7db0"),n("58df")),i=n("7e2b"),a=n("3206");t["a"]=Object(r["a"])(i["a"],Object(a["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(e){var t=Object.values(e).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput:function(e){var t=this,n=function(e){return e.$watch("hasError",(function(n){t.$set(t.errorBag,e._uid,n)}),{immediate:!0})},s={_uid:e._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?s.shouldValidate=e.$watch("shouldValidate",(function(r){r&&(t.errorBag.hasOwnProperty(e._uid)||(s.valid=n(e)))})):s.valid=n(e),s},validate:function(){return 0===this.inputs.filter((function(e){return!e.validate(!0)})).length},reset:function(){this.inputs.forEach((function(e){return e.reset()})),this.resetErrorBag()},resetErrorBag:function(){var e=this;this.lazyValidation&&setTimeout((function(){e.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(e){return e.resetValidation()})),this.resetErrorBag()},register:function(e){this.inputs.push(e),this.watchers.push(this.watchInput(e))},unregister:function(e){var t=this.inputs.find((function(t){return t._uid===e._uid}));if(t){var n=this.watchers.find((function(e){return e._uid===t._uid}));n&&(n.valid(),n.shouldValidate()),this.watchers=this.watchers.filter((function(e){return e._uid!==t._uid})),this.inputs=this.inputs.filter((function(e){return e._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(e){var t=this;return e("form",{staticClass:"v-form",attrs:Object(s["a"])({novalidate:!0},this.attrs$),on:{submit:function(e){return t.$emit("submit",e)}}},this.$slots.default)}})},7829:function(e,t,n){}}]);
//# sourceMappingURL=chunk-9e865bc6.2b43dec9.js.map
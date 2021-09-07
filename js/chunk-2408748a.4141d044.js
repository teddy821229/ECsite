(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2408748a"],{"11a4":function(t,e,i){},"13fd":function(t,e,i){},"15e6":function(t,e,i){"use strict";var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-card",{staticClass:"mx-4 my-6 product-card",attrs:{"max-width":"220"}},[i("v-img",{attrs:{height:"146",src:t.item.image||"https://picsum.photos/id/"+(10+t.item.id)+"/500/300","lazy-src":"https://picsum.photos/id/11/100/60"}}),i("div",{staticClass:"card-section"},[i("v-card-title",{staticClass:"text-title"},[t._v(t._s(t.item.name))]),i("v-card-title",{staticClass:"text-subtitle"},[t._v(" NTD"+t._s(t._f("moneyFilter")(t.item.price)))])],1),i("v-card-text",{staticClass:"pt-1 pb-0 description-part"},[i("v-row",{staticClass:"mx-0",attrs:{align:"center"}},[i("v-rating",{attrs:{value:t.item.rating,color:"amber",dense:"","half-increments":"",readonly:"",size:"14"}}),i("div",{staticClass:"grey--text ms-4"},[t._v(t._s(t.item.rating))])],1)],1),i("v-card-actions",{staticClass:"mx-2 mt-3 mb-1"},[i("v-spacer"),i("v-btn",{attrs:{icon:"",color:t.isLiked?"pink":"grey"},on:{click:t.toggleLiked}},[i("v-icon",[t._v("mdi-heart")])],1),i("v-btn",{attrs:{icon:"",color:t.isInCart?"primary":"grey"},on:{click:t.addToCart}},[i("v-icon",[t._v("mdi-cart")])],1),i("router-link",{staticClass:"ml-3",attrs:{to:{name:"product",params:{id:t.item.id}}}},[i("v-btn",{attrs:{elevation:"4",color:"primary"}},[t._v("現在購買")])],1)],1)],1)},a=[],s=i("5530"),n=(i("b0c0"),i("7db0"),i("c968")),o=i("2f62"),c=i("11c1"),d=i("2708"),u={name:"ProductsCard",mixins:[d["a"]],props:{initialItem:{type:Object,required:!0}},watch:{initialItem:{handler:function(t){this.item=Object(s["a"])(Object(s["a"])({},this.item),t)},deep:!0}},created:function(){this.fetchItem()},data:function(){return{item:{id:-1,name:"",price:0,stock:50}}},methods:{fetchItem:function(){this.item=Object(s["a"])(Object(s["a"])({},this.item),this.initialItem)},toggleLiked:function(){var t=this;-1!==this.user.id?this.likes.some((function(e){return e.id===t.item.id}))?this.$store.commit("removeLike",this.item):this.$store.commit("setLike",this.item):n["a"].fire({icon:"error",title:"無法加入收藏，請先登入"})},addToCart:function(){if(-1!==this.user.id)if(this.isInCart)n["a"].fire({icon:"warning",title:"商品已經在購物車內！"});else{var t={id:Object(c["v4"])(),Item:{id:this.item.id,name:this.item.name,image:"",price:this.item.price,stock:this.item.stock},quantity:1};this.$store.commit("setCartItem",t),n["a"].fire({icon:"success",title:"加入購物車成功！"})}else n["a"].fire({icon:"error",title:"無法新增至購物車，請先登入"})}},computed:Object(s["a"])(Object(s["a"])({},Object(o["b"])(["user","itemInCart","likes"])),{},{isInCart:function(){var t=this;return this.itemInCart.find((function(e){return e.Item.id===t.item.id}))},isLiked:function(){var t=this;return this.likes.some((function(e){return e.id===t.item.id}))}})},l=u,h=(i("2d0e"),i("2877")),m=i("6544"),f=i.n(m),p=i("8336"),v=i("b0af"),b=i("99d9"),y=i("132d"),g=i("adda"),w=i("1d4d"),k=i("0fd9"),C=i("2fa4"),x=Object(h["a"])(l,r,a,!1,null,"318e2e9e",null);e["a"]=x.exports;f()(x,{VBtn:p["a"],VCard:v["a"],VCardActions:b["a"],VCardText:b["c"],VCardTitle:b["d"],VIcon:y["a"],VImg:g["a"],VRating:w["a"],VRow:k["a"],VSpacer:C["a"]})},"2d0e":function(t,e,i){"use strict";i("13fd")},"4bd4":function(t,e,i){"use strict";var r=i("5530"),a=(i("caad"),i("2532"),i("07ac"),i("4de4"),i("159b"),i("7db0"),i("58df")),s=i("7e2b"),n=i("3206");e["a"]=Object(a["a"])(s["a"],Object(n["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,i=function(t){return t.$watch("hasError",(function(i){e.$set(e.errorBag,t._uid,i)}),{immediate:!0})},r={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?r.shouldValidate=t.$watch("shouldValidate",(function(a){a&&(e.errorBag.hasOwnProperty(t._uid)||(r.valid=i(t)))})):r.valid=i(t),r},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var i=this.watchers.find((function(t){return t._uid===e._uid}));i&&(i.valid(),i.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object(r["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},"6f80":function(t,e,i){"use strict";var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-form",{on:{submit:function(e){return e.preventDefault(),e.stopPropagation(),t.searchResult.apply(null,arguments)}}},[i("v-container",[i("v-row",[i("v-col",{staticClass:"d-flex search-row"},[i("v-text-field",{attrs:{label:"搜尋商品",placeholder:"請輸入關鍵字",outlined:"","hide-details":""},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}}),i("v-btn",{staticClass:"ml-2 my-2",attrs:{type:"submit",text:"",height:"40px"}},[t._v(" 搜尋 ")]),i("v-btn",{staticClass:"mr-1 my-2",attrs:{color:"red",text:"",type:"button",height:"40px"},on:{click:t.cleanSearch}},[t._v(" 清除 ")])],1)],1)],1)],1)},a=[],s={name:"SearchingBar",props:{target:{type:String,required:!0}},data:function(){return{keyword:""}},methods:{searchResult:function(){if(document.documentElement.scrollTop=0,this.keyword!==this.$route.query.keyword){if("likes"===this.target)return this.$router.push({name:this.target,query:{keyword:this.keyword}}),void this.$emit("after-search",this.keyword.toLowerCase());this.$router.push({name:this.target,query:{filterId:1,seriesId:"all",keyword:this.keyword}}),this.$emit("after-search",this.keyword.toLowerCase())}},cleanSearch:function(){if(document.documentElement.scrollTop=0,""!==this.keyword){if(this.keyword="","likes"===this.target)return this.$router.push({name:this.target,query:{keyword:""}}),void this.$emit("after-search","");this.$router.push({name:this.target,query:{filterId:1,seriesId:"all",keyword:""}}),this.$emit("after-search","")}}}},n=s,o=i("2877"),c=i("6544"),d=i.n(c),u=i("8336"),l=i("62ad"),h=i("a523"),m=i("4bd4"),f=i("0fd9"),p=i("8654"),v=Object(o["a"])(n,r,a,!1,null,"4b150c51",null);e["a"]=v.exports;d()(v,{VBtn:u["a"],VCol:l["a"],VContainer:h["a"],VForm:m["a"],VRow:f["a"],VTextField:p["a"]})},c49c:function(t,e,i){"use strict";i.r(e);var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",{attrs:{"mb-5":""}},[i("v-sheet",{staticClass:"py-3 mx-auto",attrs:{"max-width":"1200"}},[i("div",{staticClass:"title text-center indigo white--text py-3 elevation-6"},[t._v(" 我的收藏 ")])]),i("v-sheet",{staticClass:"my-3 mx-auto",attrs:{elevation:"4","max-width":"1200"}},[i("SearchingBar",{attrs:{target:"likes"},on:{"after-search":t.afterSearch}})],1),i("v-sheet",{staticClass:"mt-5 mx-auto",attrs:{elevation:"8","max-width":"1200"}},[i("v-container",{staticClass:"card-container px-10"},[0===t.likes.length?[i("v-sheet",{staticClass:"d-flex flex-column justify-center align-center",attrs:{height:"200"}},[i("p",{staticClass:"noLikes text-h6 grey--text"},[t._v(" 還沒有收藏任何商品唷，快去逛逛吧！ ")]),i("v-btn",{staticClass:"mt-2 py-5 indigo white--text",attrs:{outlined:"",width:"140px",to:{name:"products",query:{filterId:1,seriesId:"all",keyword:""}}}},[t._v(" 前往商品列表 ")])],1)]:t._e(),t._l(t.filterItems,(function(t){return i("ProductsCard",{key:t.id,attrs:{initialItem:t}})}))],2)],1)],1)},a=[],s=i("5530"),n=(i("4de4"),i("caad"),i("2532"),i("b0c0"),i("15e6")),o=i("6f80"),c=i("2f62"),d={name:"Likes",components:{ProductsCard:n["a"],SearchingBar:o["a"]},data:function(){return{searchInput:""}},methods:{afterSearch:function(t){this.searchInput=t}},computed:Object(s["a"])(Object(s["a"])({},Object(c["b"])(["likes"])),{},{filterItems:function(){var t=this;return this.likes.filter((function(e){return e.name.toLowerCase().includes(t.searchInput)}))}})},u=d,l=(i("cdd6"),i("2877")),h=i("6544"),m=i.n(h),f=i("8336"),p=i("a523"),v=i("8dd9"),b=Object(l["a"])(u,r,a,!1,null,"9255e2e2",null);e["default"]=b.exports;m()(b,{VBtn:f["a"],VContainer:p["a"],VSheet:v["a"]})},cdd6:function(t,e,i){"use strict";i("11a4")}}]);
//# sourceMappingURL=chunk-2408748a.4141d044.js.map
(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{555:function(t,e,n){"use strict";n.r(e);var r=n(33),o=(n(117),{asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$axios,e.next=3,n.$get("/discuss");case 3:return data=e.sent,e.abrupt("return",{data:data});case 5:case"end":return e.stop()}}),e)})))()},data:function(){return{user:this.$auth.user,loggedIn:this.$auth.loggedIn}},methods:{logout:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$auth.logout();case 2:return e.next=4,t.$nuxt.refresh();case 4:case"end":return e.stop()}}),e)})))()}}}),c=n(127),d=n(173),l=n.n(d),v=n(100),h=n(116),_=n(93),f=n(337),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.loggedIn?n("p",{attrs:{align:"right"}},[t._v("\n      User: "+t._s(t.user.username)+"\n      "),n("v-btn",{staticClass:"ma-5",on:{click:t.logout}},[t._v("Logout")])],1):n("p",{attrs:{align:"right"}},[n("v-btn",{staticClass:"ma-5",attrs:{to:"/login/login"}},[t._v("Login")])],1),t._v(" "),n("section",[n("v-col",{attrs:{align:"center"}},[t.loggedIn?n("v-btn",{attrs:{width:"80%",to:"/discuss/add_topic"}},[t._v("add Topic")]):t._e()],1),t._v(" "),t._l(t.data,(function(i){return n("v-col",{key:i._id},[n("v-card",[n("router-link",{attrs:{to:{path:"/discuss/discuss_room",query:{id:i.id}}}},[n("v-card-text",[t._v(t._s(i.title))])],1)],1)],1)}))],2)])}),[],!1,null,null,null);e.default=component.exports;l()(component,{VBtn:v.a,VCard:h.a,VCardText:_.c,VCol:f.a})}}]);
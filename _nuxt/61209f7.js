(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{571:function(t,r,e){"use strict";e.r(r);var n=e(33),c=(e(117),{asyncData:function(t){return Object(n.a)(regeneratorRuntime.mark((function r(){var e,n,sub;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return e=t.$axios,n=t.query,r.next=3,e.$get("/subject/".concat(n.id));case 3:return sub=r.sent,r.abrupt("return",{sub:sub});case 5:case"end":return r.stop()}}),r)})))()},data:function(){return{user:this.$auth.user,id:this.$route.query.id,loggedIn:this.$auth.loggedIn}},methods:{deltop:function(t){var r=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={data:{id:r.$route.query.id,topic:t}},e.next=3,r.$axios.$post("/deltopic",n);case 3:return e.next=5,r.$nuxt.refresh();case 5:case"end":return e.stop()}}),e)})))()}}}),o=e(127),d=e(173),v=e.n(d),l=e(100),_=e(116),w=e(93),h=e(336),component=Object(o.a)(c,(function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",[t._l(t.sub[0].chapters,(function(i){return e("v-row",{key:i._id,staticClass:"justify-center"},[e("v-card",{staticClass:"ma-5",attrs:{width:"100%"}},[e("v-card-title",[t._v(" "+t._s(i.title)+" ")]),t._v(" "),e("v-card-subtitle",[t._v(" "+t._s(i.description)+" ")]),t._v(" "),e("div",{staticClass:"ma-5 justify-center",domProps:{innerHTML:t._s(i.content)}}),t._v(" "),e("v-card-actions",[e("v-btn",{attrs:{to:{path:"/writer/edit_topic",query:{id:t.id,data:i}}}},[t._v(" EDIT ")]),t._v(" "),e("v-btn",{on:{click:function(r){return t.deltop(i)}}},[t._v(" DELETE ")])],1)],1)],1)})),t._v(" "),e("v-row",{staticClass:" col-12 justify-center"},[e("v-btn",{staticClass:"ma-5 pa-10",attrs:{width:"15%",to:"/writer/writer_main"}},[t._v(" back ")]),t._v(" "),e("v-btn",{staticClass:"ma-5 pa-10",attrs:{width:"35%",to:{path:"/writer/add_topic",query:{id:t.id}}}},[t._v(" addtopic ")]),t._v(" "),e("v-btn",{staticClass:"ma-5 pa-10",attrs:{width:"35%",to:{path:"/writer/writer_quiz",query:{id:t.id}}}},[t._v(" quiz ")])],1)],2)}),[],!1,null,null,null);r.default=component.exports;v()(component,{VBtn:l.a,VCard:_.a,VCardActions:w.a,VCardSubtitle:w.b,VCardTitle:w.d,VRow:h.a})}}]);
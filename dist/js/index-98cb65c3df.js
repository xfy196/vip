"use strict";!function(){function e(t){this.options=t,this.init()}$(function(){(function(){for(var a=new Swiper(".swiper-container",{effect:"fade",fadeEffect:{crossFade:!0},autoplay:{delay:3e3,disableOnInteraction:!0},loop:!0,pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}),t=0;t<a.pagination.bullets.length;t++)a.pagination.bullets[t].onmouseover=function(){this.click()};a.el.onmouseover=function(){a.autoplay.stop();var t=a.navigation.prevEl,n=a.navigation.nextEl;$(t).stop(!0).animate({left:0}),$(n).stop(!0).animate({right:0})},a.el.onmouseout=function(){var t=a.navigation.prevEl,n=a.navigation.nextEl;$(t).stop(!0).animate({left:-33}),$(n).stop(!0).animate({right:-33}),a.autoplay.start()}})(),$.ajax({url:"https://mapi.vip.com/vips-mobile/rest/shopping/search/entryword/pc/v1",dataType:"jsonp",data:{app_name:"shop_pc",app_version:4,warehouse:"VIP_SH",fdc_area_id:"103104110",client:"pc",mobile_platform:1,province_id:103104,api_key:"70f71280d5d547b2a7bb370a529aeea1",user_id:"",mars_cid:"1585923048293_a96d442f0be377ab63fc1790f5d32873",wap_consumer:"a",channel_id:1,gPlatform:"PC",_:Date.now()},success:function(t){"success"===t.msg&&$(".search-ipt").attr("placeholder",t.data.showWord)},jsonpCallback:"getSearchwords"}),$.ajax({url:"https://category.vip.com/ajax/getSuggestHotKeywords.php",dataType:"jsonp",data:{count:10,uid:"",_:Date.now()},success:function(t){var n="",a="";if(200===t.code){for(var e=t.data,o=0;o<e.length;o++)a+='<li><a href="'.concat(e[o].url,'">').concat(e[o].key,"</a></li>");for(var i=0;i<e.length;i++){if(6===i){n+='<li><a href="'.concat(e[i].url,'">').concat(e[i].word,"</a></li>");break}n+='<li><a href="'.concat(e[i].url,'">').concat(e[i].word,"</a><span>|</span></li>")}$(".search-hots-pot .hot-list").html(n),$(".search-recommend-list ul").html(a)}},jsonpCallback:"searchSuggestHotKeywords"}),function(){var o=!1;$(".nav-list").mouseover(function(){o||setTimeout(function(){$.ajax({url:"https://mapi.vip.com/vips-mobile/rest/shopping/pc/category/index/get_tab/v1",dataType:"jsonp",data:{app_name:"shop_pc",app_version:4,warehouse:"VIP_SH",fdc_area_id:"103104110",client:"PC",mobile_platform:1,province_id:103104,api_key:"70f71280d5d547b2a7bb370a529aeea1",user_id:"",mars_cid:"1585923048293_a96d442f0be377ab63fc1790f5d32873",wap_consumer:"a",hierarchy_id:117,_:Date.now()},jsonpCallback:"getTopCategory"}).then(function(t){if("success"===t.msg){o=!0;for(var n=t.data.data.tabs,a="",e=0;e<n.length;e++)a+='<li class="t-w-m-item"><span data-categoryId="'.concat(n[e].categoryId,'">').concat(n[e].name,'</span>\n                                <div class="t-w-box">\n\n                                </div>\n                                </li>');$(".t-w-menu").html(a),$(".t-w-m-item").mouseenter(function(){var t,n=this.firstElementChild.getAttribute("data-categoryId");t={categoryId:n},$.ajax({url:"https://mapi.vip.com/vips-mobile/rest/shopping/pc/category/index/get_tab_data/v1",dataType:"jsonp",data:{app_name:"shop_pc",app_version:4,warehouse:"VIP_SH",fdc_area_id:"103104110",client:"PC",mobile_platform:1,province_id:"103104",api_key:"70f71280d5d547b2a7bb370a529aeea1",user_id:"",mars_cid:"1585923048293_a96d442f0be377ab63fc1790f5d32873",wap_consumer:"a",hierarchyId:117,categoryId:t.categoryId,clientFrom:"PC",net:"wifi",width:1920,height:1080,pcmpWidth:750,mobile_channel:"nature",functions:"jumper",_:Date.now()},jsonpCallback:"getSubCategory"+t.categoryId}).then(function(t){!function(t){for(var n="",a="",e=t.data.data.sectionList,o="",i=1;i<e.length;i++){for(var s="",c=e[i].category.children,r=0;r<c.length;r++)i!==e.length-1?s+='<li class="category_item"><a href="'.concat(c[r].href,'">').concat(c[r].name,"</a></li>"):o+=' <li class="b-img"><a href="'.concat(c[r].href,'"><img\n                                    src="').concat(c[r].image,'"></a></li>');i!==e.length-1&&(n+='<div class="sub clearfix">\n                            <strong>'.concat(e[i].category.name,'</strong>\n                            <i class="iconfont icon-zuojiantou-copy"></i>\n                            <ul class="category_list">\n                            ').concat(s,"\n                            </ul>\n                            </div>"))}n='<div class="brand-type clearfix">\n                            '.concat(n,"\n                        </div>"),a+=' <div class="brand-img"><div class="brand-title">\n                        品牌推荐\n                        </div>\n                        <ul class="brands">\n                            '.concat(o,"\n                        </ul></div>"),$(".t-w-box").html(n+a)}(t)})})}})},100)})}(),function(){for(var a=$(".shop-top-banner"),t=function(n){var t;n===a.length-1&&$.ajax({type:"get",url:"http://xfy196.qicp.vip/notice",data:{mode:"home",warehouse:"VIP_SH",areaCode:"103104",pagecode:"a",provinceName:"安徽省",cityName:"滁州市","brandInfoExt[fields]":"activeIndexTips,salesNo,brandImage,mobileImageOne,salesName,brandStoreSn,vendorSaleMessage,warmMode,agio,storyLogo,link,brandType,pms_act_no,showTimeFrom","brandInfoExt[startIndex]":0,"brandInfoExt[num]":"72",preview:"",token:"",_:Date.now()},dataType:"json"}).then(function(t){!function(t,n){var a="",e=0;for(var o in t){var i="margin:0 30px 20px 0";(e+1)%4==0&&(i="margin : 0"),a+='<div style="'.concat(i,'" class="brand-item">\n            <a href="javascript:void(0)"><img class="brand-img" data-original="').concat(t[o].brandImage.size2,'"></a>\n            <div class="brand-info">\n                <a class="brand-name" href="javascript:void(0)">').concat(t[o].salesName,'</a>\n                <div class="pms-info" title="').concat(t[o].activeIndexTips,'">\n                    ').concat(t[o].activeIndexTips,'\n                </div>\n                <span class="brand-discount">').concat(t[o].agio,'\n            </div>\n            <form action="#" class="book_form">\n                <div class="book-notice-warp">\n                    <input type="hidden" value="').concat(t[o].salesNo,'" name="brandId">\n                    <input type="text" placeholder="请输入手机号码" name="email-phone" class="subscribe-phone">\n                    <button type="submit" class="book-notice-btn book-sub">开售提示</button>\n                </div>\n            </form>\n        </div>'),e++}$(".last-show").html(a),"function"==typeof n&&n()}(t.data.brandInfo,function(){setTimeout(function(){new e({content_selector:".shop-top-banner",stairs_selector:".left-ladder a"}),$(".wrap img").lazyload({effect:"fadeIn",threshold:400})},300)})}),t=n+1,$.ajax({url:"http://xfy196.qicp.vip/floor",dataType:"json",data:{floorId:t,newDapLogic:1,warehouse:"VIP_SH",channelId:0,sortType:1,areaCode:103104,pagecode:"a",provinceName:"安徽省",cityName:"滁州市","brandInfoExt[fields]":"activeIndexTips,displayEndtime,salesNo,brandImage,mobileImageOne,agio,salesName,brandStoreSn,vendorSaleMessage,isSpecialBanner,hiddenEndTime,iconInfo,link,brandType,pms_act_no,showTimeFrom","brandInfoExt[startIndex]":0,"brandInfoExt[num]":36,preview:"",token:"",sell_time_from:"",time_from:"",_:Date.now()}}).then(function(t){!function(t,n,a){if(200===t.code&&"success"===t.msg){var e="",o=t.data.brandInfo,i=0;for(var s in o){var c="left";i%2&&(c="right"),e+='<a href="'.concat(o[s].link,'"><div class="shop-item" style="float: ').concat(c,'; margin-bottom: 20px;"><img width=570 height=273\n                data-original="').concat(o[s].brandImage.size1,'" alt="">\n                <div class="brand-info" style="margin-top: 20px; font-size: 18px;">\n                    <p class="brandName" style="color: #000000; font-weight: bold; margin-bottom: 10px;">\n                        ').concat(o[s].salesName,'</p>\n                        <p style="color:#333333">').concat(o[s].agio,"\n                            ").concat(o[s].activeIndexTips,"\n                        </p>\n                </div>\n            </div></a>"),i++}$(n).find(".shop-show-box").html(e),"function"==typeof a&&a()}}(t,a[n])})},n=0;n<a.length;n++)t(n)}(),function(){var n=null,a=$(".left-ladder").offset().top;$(document).scroll(function(){if("number"==typeof n)return!1;n=setTimeout(function(){n=null;var t=$("body,html").scrollTop();a<=t?$(".left-ladder").css({position:"fixed",top:"10%"}):$(".left-ladder").css({position:"absolute",top:1565})},100)})}(),function(){var t=$(".nav"),n=t.offset().top,a=null;$(document).scroll(function(){if(" number"==typeof a)return!1;a=setTimeout(function(){},200),n<=$("body,html").scrollTop()?t.css({width:"100%",position:"fixed",top:0,left:0,background:"#ffffff",boxShadow:"0 1px 3px 0 #a7a7a7","z-index":100}):t.removeAttr("style")})}(),$(".location-top").click(function(){$(window).scrollTop(0)}),$(".search-ipt").click(function(){$(".search-helper").show()}),$(".search-ipt").blur(function(){$(".search-helper").hide()})}),e.prototype={constructor:e,init:function(){this.content_ele_offset_top_list=[],$(this.options.content_selector).offset(function(t,n){return this.content_ele_offset_top_list.push(n.top),n}.bind(this));var t=this.content_ele_offset_top_list.length;this.min_top=this.content_ele_offset_top_list[0],this.max_top=this.content_ele_offset_top_list[t-1]+$(this.options.content_selector).last().height(),this.content_ele_offset_top_list.push(this.max_top),this.bindEvent()},bindEvent:function(){var a=$("body,html"),n=this,e=null;$(document).scroll(function(){var n=this;if("number"==typeof e)return!1;e=setTimeout(function(){e=null;var t=a.scrollTop();n.calcStairsIndex(t)},200)}.bind(this)),$(this.options.stairs_selector).click(function(){var t=$(this).index(n.options.stairs_selector);n.changeStairsIndex(t)})},calcStairsIndex:function(t){if(t<this.min_top||t>this.max_top)return this.index=-1,this.changeStairsBtn(),!1;var n=this.content_ele_offset_top_list;if(t>=n[this.index]&&t<n[this.index+1])return!1;for(var a=0;a<n.length;a++)if(t>=n[a]&&t<n[a+1]){this.index=a;break}this.changeStairsBtn()},changeStairsBtn:function(){if(-1===this.index)return $(this.options.stairs_selector).removeClass("cur"),!1;$(this.options.stairs_selector).eq(this.index).addClass("cur").siblings().removeClass("cur")},changeStairsIndex:function(t){$("body,html").scrollTop(this.content_ele_offset_top_list[t]),$(document).trigger("scroll")}}}();
//# sourceMappingURL=index-98cb65c3df.js.map

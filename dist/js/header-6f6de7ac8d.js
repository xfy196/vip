"use strict";!function(l){var a=l.Callbacks();a.add(function(){l.ajax({url:"https://category.vip.com/ajax/getSuggestHotKeywords.php",dataType:"jsonp",data:{count:10,uid:"",_:Date.now()},success:function(a){var n="",t="";if(200===a.code){for(var e=a.data,o=0;o<e.length;o++)t+='<li><a href="'.concat(e[o].url,'">').concat(e[o].key,"</a></li>");for(var c=0;c<e.length;c++){if(3===c){n+='<li><a href="'.concat(e[c].url,'">').concat(e[c].word,"</a></li>");break}n+='<li><a href="'.concat(e[c].url,'">').concat(e[c].word,"</a><span>|</span></li>")}l(".search-hots-pot .hot-list").html(n),l(".search-recommend-list ul").html(t)}},jsonpCallback:"searchSuggestHotKeywords"}),function(){var o=!1;l(".nav-list").mouseover(function(){o||setTimeout(function(){l.ajax({url:"../json/TopCategory.json",dataType:"json"}).then(function(a){if("success"===a.msg){o=!0;for(var n=a.data.data.tabs,t="",e=0;e<n.length;e++)t+='<li class="t-w-m-item"><span data-categoryId="'.concat(n[e].categoryId,'">').concat(n[e].name,'</span>\n                                <div class="t-w-box">\n\n                                </div>\n                                </li>');l(".t-w-menu").html(t),l(".t-w-m-item").mouseenter(function(){var a,n=this.firstElementChild.getAttribute("data-categoryId");a={categoryId:n},l.ajax({url:"../json/SubCategory"+a.categoryId+".json",dataType:"json"}).then(function(a){!function(a){for(var n="",t="",e=a.data.data.sectionList,o="",c=1;c<e.length;c++){for(var s="",i=e[c].category.children,r=0;r<i.length;r++)c!==e.length-1?s+='<li class="category_item"><a href="'.concat(i[r].href,'">').concat(i[r].name,"</a></li>"):o+=' <li class="b-img"><a href="'.concat(i[r].href,'"><img\n                                    src="').concat(i[r].image,'"></a></li>');c!==e.length-1&&(n+='<div class="sub clearfix">\n                            <strong>'.concat(e[c].category.name,'</strong>\n                            <i class="iconfont icon-zuojiantou-copy"></i>\n                            <ul class="category_list">\n                            ').concat(s,"\n                            </ul>\n                            </div>"))}n='<div class="brand-type clearfix">\n                            '.concat(n,"\n                        </div>"),t+=' <div class="brand-img"><div class="brand-title">\n                        品牌推荐\n                        </div>\n                        <ul class="brands">\n                            '.concat(o,"\n                        </ul></div>"),l(".t-w-box").html(n+t)}(a)})})}})},100)})}(),l(".search-ipt").click(function(){l(".search-helper").show()}),l(".search-ipt").blur(function(){l(".search-helper").hide()}),l(".location-top,.top_txt").click(function(){l(window).scrollTop(0)}),function(){var a=l.cookie("userLoginInfo");if(void 0===a)return;var n=JSON.parse(a);l(".sign-text").html(n.username),l(".top-pic-infs").addClass("hidden").next().removeClass("hidden").find(".success_username").html(n.username),l("#my_cnt_no_name").addClass("hidden").next().removeClass("hidden").find("#my_cnt_user_name").html(n.username)}(),l(".top-pic-success").on("click",".logout",function(){l.removeCookie("userLoginInfo"),location.reload()})}),a.fire()}(jQuery);
//# sourceMappingURL=header-6f6de7ac8d.js.map

"use strict";!function(a){function n(n){this.eles=n,this.ordersEle=a(n.ordersEle)}a.extend(n.prototype,{init:function(){this.initCars()},update:function(n){this.carsList[n.id]=n,localStorage.setItem("cars",JSON.stringify(this.carsList)),this.renderData()},delete:function(n){delete this.carsList[n],localStorage.setItem("cars",JSON.stringify(this.carsList)),this.renderData()},initCars:function(){this.carsList=JSON.parse(localStorage.getItem("cars"))||{},this.renderData(),this.bindEvent()},bindEvent:function(){var e=this;this.ordersEle.on("click",e.eles.numAdd,function(){var n=Number(a(e.eles.numInput).val()),t=a(this).parents("tr").find("input[name=productId]").val();n++,a(e.eles.numInput).val(n);var s=e.carsList[t];s.num=n,e.update(s)}),this.ordersEle.on("click",e.eles.numReduce,function(){var n=Number(a(e.eles.numInput).val()),t=a(this).parents("tr").find("input[name=productId]").val();if(0==--n)return!1;a(e.eles.numInput).val(n);var s=e.carsList[t];s.num=n,e.update(s)}),this.ordersEle.on("click",e.eles.deleteBtn,function(){var n=a(this).parents("tr").find("input[name=productId]").val();e.delete(n)})},bindImageHover:function(){a(".product-pic").hover(function(){a(".product-pic-preview-tooltips").addClass("product-tooltips-show")},function(){a(".product-pic-preview-tooltips").removeClass("product-tooltips-show")})},renderCarData:function(){var n=this.carsList,t="";for(var s in n)t+='<tr class="goods_item">\n                <input type="hidden" name="productId" value="'.concat(s,'">\n                <td class="product-item">\n                    <div class="m-product product-small">\n                        <div class="product-pic product-pic-trigger">\n                            <a href="javascript:void(0)">\n                                <img width="58" height="74"\n                                    src="').concat(n[s].images[0],'"\n                                    alt="" />\n                            </a>\n                            <div class="product-pic-preview-tooltips ui-tooltips">\n                                <div class="ui-tooltips-content">\n                                    <img class=""\n                                        src="').concat(n[s].images[0],'"\n                                        alt="').concat(n[s].longTitle,'" width="184"\n                                        height="234">\n                                </div>\n                            </div>\n                        </div>\n                        <h3 class="product-title">\n                            <span class="u-saletype u-saletype-0">自营</span>\n                            <a href="javascript:void(0)">').concat(n[s].longTitle,'</a>\n                        </h3>\n                        <p class="product-size">尺码：').concat(n[s].size,'</p>\n                        <div class="product-price-tip">\n                            <span class="product-tip">折后价</span>\n                        </div>\n                    </div>\n                </td>\n                <td class="price-item">\n                    <div class="m-price">\n                        <span class="goods-cxoprice-tag u-hidden"></span>\n                        <span class="u-yen">¥</span><strong class="u-price">').concat(n[s].promotion_price,'</strong>\n                    </div>\n                    <del class="m-price market-price">\n                        <span class="u-yen">¥</span><span class="u-price">').concat(n[s].max_market_price,'</span>\n                    </del>\n                </td>\n                <td class="quantity-item">\n                    <div class="m-amount confirm_box cart_amount_confirm_box clearfix">\n                        <a class="iconfont icon-jianhao icon-reduce num-reduce"\n                            href="javascript:void(0)">\n                        </a>\n                        <div title="请选择购买数量" class="amount-num">\n                            <input name="num" type="text" disabled value="').concat(n[s].num,'"\n                                class="cart_num num-input" />\n                        </div>\n                        <a class="iconfont icon-jiahao icon-add num-add"\n                            href="javascript:void(0)">\n                        </a>\n                    </div>\n                </td>\n                <td class="subtotal-item">\n                    <span class="m-price  subtotal-price">\n                        <span class="u-yen">¥</span>\n                        <strong class="u-price">\n                            ').concat(n[s].promotion_price*n[s].num,'\n                        </strong>\n                    </span>\n                </td>\n                <td class="actions-item">\n                    <a href="javascript:void(0)" class="dellCarBtn">删除</a>\n                </td>\n            </tr>');this.ordersEle.html(t),this.notAllowedCheck()},renderTotalPrice:function(){var n="",t=0,s=0;for(var e in this.carsList)t+=this.carsList[e].num,s+=this.carsList[e].num*this.carsList[e].promotion_price;n+='<p class="price-panel">共<span class="quantity">'.concat(t,'</span>件商品&nbsp;&nbsp;商品金额<span\n            class="m-price"><span>¥</span>').concat(s,'</span></p>\n            <p class="price-panel">总金额(未含运费)<span class="m-price totalPrice"><span>¥</span>').concat(s,"</span>\n            </p>"),a(".orders-total-bd").html(n)},renderData:function(){this.renderCarData(),this.renderTotalPrice(),this.bindImageHover()},notAllowedCheck:function(){Number(a(this.eles.numInput).val())<=1?a(this.eles.numReduce).css({cursor:"not-allowed"}):a(this.eles.numReduce).css({cursor:"pointer"})}});var t=a.Callbacks();t.add(function(){!function(){var n=a.cookie("userLoginInfo");if(void 0!==n){var t=JSON.parse(n);a(".username").html(t.username)}}(),a(".linkLogout").on("click",function(n){n.preventDefault?n.preventDefault():n.returnValue=!1,a.removeCookie("userLoginInfo"),location.reload()}),new n({ordersEle:".orders-table",numReduce:".num-reduce",numAdd:".num-add",numInput:".num-input",deleteBtn:".dellCarBtn"}).init()}),t.fire()}(jQuery);
//# sourceMappingURL=cars-d09f4a911f.js.map
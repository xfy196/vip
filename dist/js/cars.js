;; (function ($) {
    /**
     * 购物车对象
     */
    function Car(eles) {
        this.eles = eles;
        this.ordersEle = $(eles.ordersEle);
    }
    $.extend(Car.prototype, {

        init: function () {
            this.initCars();
        },
        /**
         * 更新购物车数据
         * @param {*} carData 
         */
        update: function (carData) {
            this.carsList[carData.id] = carData;
            localStorage.setItem("cars", JSON.stringify(this.carsList));
            this.renderData();
        },
        delete: function (productId) {
            delete this.carsList[productId];
            localStorage.setItem("cars", JSON.stringify(this.carsList));
            this.renderData();
        },
        /**
         * 初始化购物车数据
         */
        initCars: function () {
            this.carsList = JSON.parse(localStorage.getItem("cars")) || {};
            this.renderData();
            this.bindEvent();

        },
        bindEvent: function () {
            var that = this;

            // 选择数量 加法的
            this.ordersEle.on("click", that.eles.numAdd, function () {
                // 获取输入框的数字
                var num = Number($(that.eles.numInput).val());
                // 获取这个商品的id好
                var productId = $(this).parents("tr").find("input[name=productId]").val();
                num++;
                $(that.eles.numInput).val(num);
                // 获取这个购物车localStorage中对应的商品数据
                var carData = that.carsList[productId];
                carData.num = num;
                // 更新数据
                that.update(carData);

            });

            // 选择数量减法的
            this.ordersEle.on("click", that.eles.numReduce, function () {
                // 获取输入框中的数据
                var num = Number($(that.eles.numInput).val());
                // 获取这个商品的id值
                var productId = $(this).parents("tr").find("input[name=productId]").val();
                num--;
                if (num === 0) {
                    return false;
                }
                $(that.eles.numInput).val(num);

                // 从新计算数据
                var carData = that.carsList[productId];
                carData.num = num;

                that.update(carData);

            });

            /**
             * 删除按钮的事件
             */
            this.ordersEle.on("click", that.eles.deleteBtn, function () {
                var productId = $(this).parents("tr").find("input[name=productId]").val();
                that.delete(productId);
            });

        },
        bindImageHover: function () {
            $(".product-pic").hover(function () {
                $(".product-pic-preview-tooltips").addClass("product-tooltips-show");
            }, function () {
                $(".product-pic-preview-tooltips").removeClass("product-tooltips-show");

            })
        },
        renderCarData: function () {
            var carData = this.carsList;
            var html = ``;
            for (var attr in carData) {
                html += `<tr class="goods_item">
                <input type="hidden" name="productId" value="${attr}">
                <td class="product-item">
                    <div class="m-product product-small">
                        <div class="product-pic product-pic-trigger">
                            <a href="javascript:void(0)">
                                <img width="58" height="74"
                                    src="${carData[attr].images[0]}"
                                    alt="" />
                            </a>
                            <div class="product-pic-preview-tooltips ui-tooltips">
                                <div class="ui-tooltips-content">
                                    <img class=""
                                        src="${carData[attr].images[0]}"
                                        alt="${carData[attr].longTitle}" width="184"
                                        height="234">
                                </div>
                            </div>
                        </div>
                        <h3 class="product-title">
                            <span class="u-saletype u-saletype-0">自营</span>
                            <a href="javascript:void(0)">${carData[attr].longTitle}</a>
                        </h3>
                        <p class="product-size">尺码：${carData[attr].size}</p>
                        <div class="product-price-tip">
                            <span class="product-tip">折后价</span>
                        </div>
                    </div>
                </td>
                <td class="price-item">
                    <div class="m-price">
                        <span class="goods-cxoprice-tag u-hidden"></span>
                        <span class="u-yen">¥</span><strong class="u-price">${carData[attr].promotion_price}</strong>
                    </div>
                    <del class="m-price market-price">
                        <span class="u-yen">¥</span><span class="u-price">${carData[attr].max_market_price}</span>
                    </del>
                </td>
                <td class="quantity-item">
                    <div class="m-amount confirm_box cart_amount_confirm_box clearfix">
                        <a class="iconfont icon-jianhao icon-reduce num-reduce"
                            href="javascript:void(0)">
                        </a>
                        <div title="请选择购买数量" class="amount-num">
                            <input name="num" type="text" disabled value="${carData[attr].num}"
                                class="cart_num num-input" />
                        </div>
                        <a class="iconfont icon-jiahao icon-add num-add"
                            href="javascript:void(0)">
                        </a>
                    </div>
                </td>
                <td class="subtotal-item">
                    <span class="m-price  subtotal-price">
                        <span class="u-yen">¥</span>
                        <strong class="u-price">
                            ${carData[attr].promotion_price * carData[attr].num}
                        </strong>
                    </span>
                </td>
                <td class="actions-item">
                    <a href="javascript:void(0)" class="dellCarBtn">删除</a>
                </td>
            </tr>`
            }
            this.ordersEle.html(html);
            this.notAllowedCheck();

        },
        renderTotalPrice: function () {
            var html = ``;
            var totalNum = 0;
            var totalPrice = 0;
            for (var attr in this.carsList) {
                totalNum += this.carsList[attr].num;
                totalPrice += this.carsList[attr].num * this.carsList[attr].promotion_price;
            }
            html += `<p class="price-panel">共<span class="quantity">${totalNum}</span>件商品&nbsp;&nbsp;商品金额<span
            class="m-price"><span>¥</span>${totalPrice}</span></p>
            <p class="price-panel">总金额(未含运费)<span class="m-price totalPrice"><span>¥</span>${totalPrice}</span>
            </p>`;
            $(".orders-total-bd").html(html);
        },
        renderData: function () {
            this.renderCarData();
            this.renderTotalPrice();
            this.bindImageHover();
        },
        /**
         * 加减按钮的不允许状态检查
         */
        notAllowedCheck: function () {
            var num = Number($(this.eles.numInput).val());
            if (num <= 1) {
                $(this.eles.numReduce).css({
                    cursor: "not-allowed"
                })
            } else {
                $(this.eles.numReduce).css({
                    cursor: "pointer"
                })
            }
        }
    });
    new Car({
        ordersEle: ".orders-table",
        numReduce: ".num-reduce",
        numAdd: ".num-add",
        numInput: ".num-input",
        deleteBtn: ".dellCarBtn"
    }).init();

})(jQuery);
;; (function ($) {
    var callbacks = $.Callbacks();
    callbacks.add(init);
    callbacks.fire();

    function init() {
        getProductData();
        getRecommendData();
    }
    /**
     * 购物车对象
     */
    function Car(data) {
        this.data = data;
        this.carDetailInfo = data.data;
        this.formEle = $(data.formEle);
        this.colorEel = $(data.colorEel);
        this.sizeEle = $(data.sizeEle);
        this.numReduce = $(data.numReduce);
        this.numAdd = $(data.numAdd);
        this.numInput = $(data.numInput);
    }
    $.extend(Car.prototype, {

        init: function () {
            this.initCars();
            this.bindEvent();
        },
        addCar: function () {
            // 就这个数据进行操作更改他的数据结构
            var productId = this.carDetailInfo.product.id;
            this.carsList[productId] = this.carDetailInfo.product;
            localStorage.setItem("cars", JSON.stringify(this.carsList));
        },
        /**
         * 初始化购物车数据
         */
        initCars: function () {
            this.carsList = JSON.parse(localStorage.getItem("cars")) || {};
        },
        bindEvent: function () {
            var that = this;
            this.formEle.on("click", ".button-box button", function () {
                // 验证购物车中的一些必选是否选中
                /* 
                    选中将购物车数据添加到localStorage中
                    没有选中弹出提示信息高度用户需要勾选选项
                */
                // 验证时候该选的都已经选中了
                if (!(that.colorEel.hasClass("color-selected") && that.sizeEle.hasClass("size-selected"))) {
                    $(".addErrorMsg").show();
                } else {
                    // 错误信息隐藏
                    $(".addErrorMsg").hide();
                    that.carDetailInfo.product.color = that.colorEel.parent().siblings("input").val();
                    that.carDetailInfo.product.size = that.sizeEle.siblings("input").val();
                    that.carDetailInfo.product.num = that.numInput.html();
                    // 将购物车的数据存储到localStorage中
                    that.addCar();
                    // 延迟跳转
                    setTimeout(function () {
                        location.href = "./cars.html";
                    }, 300)
                }
            });

            //选择颜色
            this.formEle.on("click", that.data.colorEel, function () {
                $(this).toggleClass("color-selected").parent().siblings().find(that.data.colorEel).removeClass("color-selected");
                if ($(this).hasClass("color-selected")) {
                    $(this).parent().siblings("input").val($(this).attr("title"));
                } else {
                    $(this).parent().siblings("input").val("");
                }
            });

            // 选择尺寸
            this.formEle.on("click", that.data.sizeEle, function () {
                $(this).toggleClass("size-selected").siblings(that.data.sizeEle).removeClass("size-selected");

                if ($(this).hasClass("size-selected")) {
                    $(this).siblings("input").val($(this).attr("title"));
                } else {
                    $(this).siblings("input").val("");
                }
            });
            // 选择数量 加法的
            this.formEle.on("click", that.data.numAdd, function () {
                var num = Number(that.numInput.html());
                num++;
                if (num > 1) {
                    that.numReduce.css({
                        cursor: "pointer"
                    })
                }
                that.numInput.html(num);


            });

            // 选择数量减法的
            this.formEle.on("click", that.data.numReduce, function () {
                var num = Number(that.numInput.html());;
                num--;
                if (num === 0) {
                    return false;
                }
                if (num <= 1) {
                    that.numReduce.css({
                        cursor: "not-allowed"
                    })
                }
                that.numInput.html(num);

            });
        }
    });


    /**
 * 获取商品详情的数据
 */
    function getProductData() {
        $.ajax({
            type: "get",
            url: "../json/detailInfo.json",
        }).then((data) => {
            var magnifierConfig = {
                magnifier: ".pic",//最外层的大容器
                container: ".zoomPad",
                containerImg: ".zoom_origin_img_box",
                view: ".zoomWindow",
                thumbnail: ".pic-slider ul",
                width: 420,//承载容器宽
                height: 420,//承载容器高
                zoom: 3
            };
            if (!(/^2\d{2}$/.test(data.code))) {
                return false;
            }
            renderProductDetail(data.data.product);
            magnifier(magnifierConfig);
            new Car({
                data: data.data,
                formEle: "#cartAdd-form",
                colorEel: ".colorItem",
                sizeEle: ".size-list-item",
                numReduce: ".num-reduce",
                numInput: ".num-input",
                numAdd: ".num-add"
            }).init();

        });;
    }

    /**
     * @msg 渲染商品详情的数据
     * @param {数据} data 
     */
    function renderProductDetail(data) {
        var imageInfo = ``;
        var productInfo = ``;
        imageInfo += `<div class="pic-sliderwrap">
        <div class="show-midpic active-pannel">
            <a href="javascript:;" class="bigImgZoom">
                <div class="zoomPad">
                    <div class="zoom_origin_img_box">
                    </div>

                    <!-- 放大的盒子 -->
                    <div class="zoomWindow" style="display: none;">
                        <div class="zoomWrapperImage">
                            
                        </div>
                    </div>
                </div>
            </a>
            <em class="icon-a"></em>
        </div>
    </div>
    <div class="pic-slider">
        <ul class="sImg-wrap">`;

        data.images.forEach((item, index) => {
            imageInfo += `
            <li class="pic-sImg-item">
                <img width="64" height="64"
                    src="${item}"
                    class="mer-smallImg" alt="">
            </li>`
        });
        imageInfo += `</ul>
        </div>
        <!-- 产品图片end -->
        <div class="product-text">
            <p class="other-infoCoding">商品编码：${data.infoCoding}</p>
            <div class="onsell-collect" id="add_fav_wrapper">
                <div class="goods-fav-collect" id="add_fav_button">
                    <i></i>
                    <span class="collect-tips">收藏商品</span>
                </div>
                <div class="goods-fav-collected hidden" id="remove_fav_button">
                    <i class="iconfont"></i>
                    <span class="collect-tips had-collected">已收藏</span>
                    <span class="collect-tips cancel-collected">取消收藏</span>
                </div>
    
            </div>
        </div>
        <div class="safeguard-icon">
        <div class="pi-promise-box clearfix">
            <ul class="pi-promise-list">
                <img src="//shop.vipstatic.com/img/detail/pc_xuanguan.png">
            </ul>
        </div>
    </div>`;

        // 商品详情的html
        productInfo += `
        <div class="pi-title-box">
            <div class="pib-title">
                <a href="javascript:;" class="pib-title-brandName">${data.brandName}</a>
                <span class="pib-presale-tag hidden">预售</span>
                <p class="pib-title-detail" title="${data.longTitle}">${data.longTitle}
                </p>
            </div>
        </div>
        <div class="pi-price-box">
            <div class="specialPrice-wrap">
                <div class="spcecialPrice-box">
                    <div class="sp-info">
                        <span class="sp-title">折后价</span>
                        <i class="pbox-yen">¥</i>
                        <span title="469" class="sp-price">${data.promotion_price}</span>
                        <span class="sp-postfix"></span>
                        <span class="pbox-market">¥<del class="marketPrice">${data.max_market_price}</del></span>
                        <span class="sp-discount">${data.promotionDiscount}</span>
                    </div>
                </div>
            </div>
        </div>

        <div id="proData-box" class="pi-attr-box">
            <form action="javascript:;" class="cartAdd-form" id="cartAdd-form">
                <input type="hidden" name="act" value="add">
                <input type="hidden" name="client_time" value="">
                <dl class="delivery-address clearfix">
                    <dt class="delivery-address-name">配送</dt>
                    <dd class="delivery-address-box">
                        <div class="delivery-address-info">
                            <div class="delivery-address-tips">
                                <span class="tab_name">请选择配送区域</span>
                            </div>
                            <i class="iconfont icon-xiajiantou"></i>
                        </div>
                    </dd>
                </dl>
                <div class="delivery_time_container delivery_message clearfix">
                    <div class="message-box">

                        现在付款，预计4月20日（周一）送达</div>
                </div>
                <dl class="i-freight clearfix">
                    <dt class="freight-name">运费</dt>
                    <span id="freight_tips" class="freight_tips">新会员专享首单满38元免邮（限唯品自营商品，部分商品不可用）</span>
                </dl>
                <dl class="i-color clearfix">
                    <dt class="color-name">颜色</dt>
                    <dd class="color-list">
                        <ul class="clearfix">
                        <input type="hidden" name="color" value="">
                            <li class="color-list-item"><a href="javascript:;" title="传奇蓝"
                                    class="colorItem">
                                    <span class="color-pic-wrapper">
                                        <img src="https://a.vpimg3.com/upload/merchandise/pdcvis/2020/03/07/20/d2346eca-3693-4372-bc41-25813762fb83_420_531_54x69_100.jpg"
                                            alt="传奇蓝" width="22" height="28">
                                    </span>
                                    <span class="color-item-name">传奇蓝</span>
                                    <span class="i-select"></span>
                                    <span class="i-chance"></span>
                                </a></li>
                            <li class="color-list-item"><a href="javascript:;" title="标准白"
                                    class="colorItem">
                                    <span class="color-pic-wrapper">
                                        <img src="https://a.vpimg3.com/upload/merchandise/pdcvis/2020/03/07/6/90b0f38c-4593-4d92-970a-6c71f2e0728d_420_531_54x69_100.jpg"
                                            alt="标准白" width="22" height="28">
                                    </span>
                                    <span class="color-item-name">陶瓷白</span>
                                    <span class="i-select"></span>
                                    <span class="i-chance"></span>
                                </a></li>
                        </ul>
                    </dd>
                </dl>
                <dl class="i-size clearfix">
                    <dt class="size-name">尺寸</dt>
                    <dd class="i-notice-msg notice-msg"><i class=""></i>请选择尺码</dd>
                    <dd class="size-list">
                        <ul class="clearfix">
                        <input type="hidden" name="size" value="">`;
        data.sizes.forEach((item, index) => {
            productInfo += `<li class="size-list-item" title="${item.name}">
                            <span class="size-list-item-name">${item.name}</span>
                            <span class="i-select"></span>
                            <span class="i-recommand"></span>
                        </li>`
        });
        var dataJson = JSON.stringify(data)
        productInfo += `</ul>
                    </dd>
                </dl>
                <dl class="i-num clearfix">
                    <dt class="num-name">数量</dt>
                    <dd class="ui-quantity num-box">
                        <a href="javascript:;" class="num-reduce iconfont icon-jianhao z-disable"></a>
                        <em class="amount num-input num-txt">1</em>
                        <a href="javascript:;" class="num-add iconfont icon-jiahao"></a>
                    </dd>
                </dl>
                <div class="addErrorMsg">请选择正确的颜色和尺寸再去提交</div>
                <div class="i-button">
                    <!-- 加入购物袋的按钮 -->
                    <div class="button-box">
                        <button type="submit" class="ui-btn-large ui-btn-primary ui-btn-loading" data-value=${dataJson} data-id=${data.id}>
                            <span class="ui-btn-loading-before ui-btn-big">
                                <i class="iconfont icon-gouwudai"></i>
                                加入购物袋
                            </span>
                        </button>
                    </div>
                </div>
            </form>
        </div>`
        $(".mer-ImgReview").html(imageInfo);
        $(".product-content-inner").html(productInfo);
    }

    /**
     * 获取推荐的数据
     */
    function getRecommendData() {

        $.ajax({
            url: "../json/detailRecommend.json",
            dataType: "json",
        }).then(function (data) {
            renderRecommendStore(data.data.brandStoreV2);
            renderRecommendLook(data.data.lookLook);
        });
    }

    /**
     * 渲染推荐的品牌数据
     * @param {*} data 
     */
    function renderRecommendStore(data) {
        var html = ``;
        data.products.forEach(function (item, index) {
            html += `<a href="javascript:void(0)" data-id=${item.productId}>
                 <img src="${item.imageUrl}"
                     alt="">
                 <div class="re-product-info">
                     <div class="re-product-name">${item.title}</div>
                     <div class="re-product-price">¥${item.salePrice.salePrice}</div>
                 </div>
             </a>`;
        });
        $(".re-brand").html(html);
    }

    /**
     * 渲染推荐板块的看了又看数据
     * @param {*} data 
     */
    function renderRecommendLook(data) {
        var html = ``;
        data.products.forEach(function (item, index) {
            html += `<a href="javascript:void(0)" data-id=${item.productId}>
                 <img src="${item.imageUrl}"
                     alt="">
                 <div class="re-product-info">
                     <div class="re-product-name">${item.title}</div>
                     <div class="re-product-price">¥${item.salePrice.salePrice}</div>
                 </div>
             </a>`;
        });
        $(".re-look").html(html);
    }
})(jQuery);
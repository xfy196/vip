;; (function ($) {
    var callbacks = $.Callbacks();
    callbacks.add(init);
    callbacks.fire();

    /**
     * 页面初始化的函数
     */
    function init() {
        getBannerData();

        // swiperOpr();

        // 梯子改变的事件
        floorChangeEvent();
        // 左边梯子随着滚轮滚动跟随的函数
        leftBarFollow();
        // 吸顶函数
        suctionTop();
    }




    // swiper的轮播图的函数
    function swiperOpr() {
        let mySwiper = new Swiper('.swiper-container', {
            effect: 'fade',
            fadeEffect: {
                crossFade: true,
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: true,
            },
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

        });
        //鼠标滑过pagination控制swiper切换
        for (let i = 0; i < mySwiper.pagination.bullets.length; i++) {
            mySwiper.pagination.bullets[i].onmouseover = function () {
                this.click();
            };
        }
        mySwiper.el.onmouseover = function () {
            mySwiper.autoplay.stop();
            let prev_ele = mySwiper.navigation.prevEl;
            let next_ele = mySwiper.navigation.nextEl;
            $(prev_ele).stop(true).animate({
                left: 0
            })
            $(next_ele).stop(true).animate({
                right: 0
            })

        }
        mySwiper.el.onmouseout = function () {
            // 获取左右两边的按钮
            let prev_ele = mySwiper.navigation.prevEl;
            let next_ele = mySwiper.navigation.nextEl;
            // 给两个边的那妞设置动画隐藏效果
            $(prev_ele).stop(true).animate({
                left: -33
            })
            $(next_ele).stop(true).animate({
                right: -33
            })
            mySwiper.autoplay.start();

        }
    }


    // 梯子切换
    function floorChangeEvent() {

        // 1.点击梯子时候 我们是需要找到与梯子对应盒子 对应盒子距离顶部的距离没然后直接将滚动条直接设置这个高度
        // 2.当我滑动的时候， 当这个盒子刚出来的时候啊，我们需要发送一个请求去请求对应梯子的数据 然后吐过这个梯子的距离浏览器顶部的高度等于scrollTop的高度就将左侧的变为选中状态
        // 加入一个图片懒加载功能

        // 这个ajax不是我们页面一上来就去出发的 是通过这个梯子去触发的

        let shop_top_banners = $(".shop-top-banner");
        for (let i = 0; i < shop_top_banners.length; i++) {
            if (i === shop_top_banners.length - 1) {
                // 最后一个梯子是预告的请求
                noticeRankAjax().then(function (data) {
                    noticeRankRenderData(data.data.brandInfo, function () {
                        setTimeout(() => {
                            new Stairs({
                                content_selector: ".shop-top-banner",
                                stairs_selector: ".left-ladder a"
                            });
                            $(".wrap img").lazyload({
                                // 覆盖lazyload自带的背景图片
                                // placeholder: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3544053956,2144358865&fm=26&gp=0.jpg",
                                placeholder: "https://shop.vipstatic.com/img/te/index_v4/bbg-hash-b619a210.png?9b4f55ea",
                                effect: "fadeIn",
                                threshold: 400
                            });
                            $(".notice-shop img").lazyload({
                                // 覆盖lazyload自带的背景图片
                                placeholder: "https://shop.vipstatic.com/img/te/index_v4/bbg-lazy-hash-fc6d3841.png?05d68fe4",
                                effect: "fadeIn",
                                threshold: 400
                            });
                        }, 300);
                    });
                })
            }
            floorShopAjax(i + 1).then((data) => {
                renderFloorData(data, shop_top_banners[i]);
            });
        }
    }
    function renderFloorData(data, shop_top_banner, callback) {
        // 判读状态码
        if (data.code === 200 && data.msg === "success") {
            let html = ``;
            let brandInfoData = data.data.brandInfo;
            // 因为需要偶数左浮动奇数右浮动
            let count = 0;
            for (let attr in brandInfoData) {
                let float_str = "left";
                if (count % 2) {
                    float_str = "right";
                }
                html += `<a href="./shop_list.html"><div class="shop-item" style="float: ${float_str}; margin-bottom: 20px;"><img width=570 height=273
                data-original="${brandInfoData[attr].brandImage.size1}" alt="">
                <div class="brand-info" style="margin-top: 20px; font-size: 18px;">
                    <p class="brandName" style="color: #000000; font-weight: bold; margin-bottom: 10px;">
                        ${brandInfoData[attr].salesName}</p>
                        <p style="color:#333333">${brandInfoData[attr].agio}
                            ${brandInfoData[attr].activeIndexTips}
                        </p>
                </div>
            </div></a>`
                count++;
            }
            // 渲染到页面之中

            $(shop_top_banner).find(".shop-show-box").html(html);
            if (typeof callback === "function") {

                callback();
            }

        }
    }
    // 商品梯子图片展示的ajax请求
    function floorShopAjax(floorNum) {
        return $.ajax({
            url: "http://xfy196.qicp.vip/floor",
            dataType: "json",
            data: {
                floorId: floorNum,
                newDapLogic: 1,
                warehouse: "VIP_SH",
                channelId: 0,
                sortType: 1,
                areaCode: 103104,
                pagecode: "a",
                provinceName: "安徽省",
                cityName: "滁州市",
                "brandInfoExt[fields]": "activeIndexTips,displayEndtime,salesNo,brandImage,mobileImageOne,agio,salesName,brandStoreSn,vendorSaleMessage,isSpecialBanner,hiddenEndTime,iconInfo,link,brandType,pms_act_no,showTimeFrom",
                "brandInfoExt[startIndex]": 0,
                "brandInfoExt[num]": 36,
                preview: "",
                token: "",
                sell_time_from: "",
                time_from: "",
                _: Date.now()
            },
        })
    }

    // 左边栏scroll监听跟随的操作
    function leftBarFollow() {
        let t = null;
        let left_bar_top = $(".left-ladder").offset().top;
        // 滚动监听
        $(document).scroll(function () {
            if (typeof t === "number") {
                return false;
            }
            t = setTimeout(function () {
                t = null;
                let body_scrollTop = $("body,html").scrollTop();
                if (left_bar_top <= body_scrollTop) {
                    $(".left-ladder").css({
                        position: "fixed",
                        top: "10%"
                    })
                } else {
                    $(".left-ladder").css({
                        position: "absolute",
                        // 需要减去nav的高度应为nav菜单栏是固定定位了
                        top: 1565
                    })
                }
            }, 100);

        })
    }

    // 吸顶操作
    function suctionTop() {

        // 找到nav菜单的元素节点
        let nav_ele = $(".nav");
        // 获取这个元素距离页面的高度
        let scrollTop = nav_ele.offset().top + nav_ele.height();

        let slideDownCount = 0;
        let t = null;
        $(document).scroll(function () {

            // 函数节流
            if (typeof t === " number") {
                return false;
            }

            t = setTimeout(function () {

            }, 200)
            if (scrollTop < $("body,html").scrollTop()) {
                // 只需要让slideDown的效果执行一次即可
                if (slideDownCount > 1) {
                    return;
                }
                nav_ele.css({
                    width: "100%",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    background: "#ffffff",
                    boxShadow: "0 1px 3px 0 #a7a7a7",
                    display: "none",
                    "z-index": 100
                }).slideDown(function () {
                    slideDownCount++;
                });
            } else {
                nav_ele.removeAttr("style");
                // 回到原来的位置将slideDown的次数设置为0即可
                slideDownCount = 0;
            }
        });
    }

    /**
     * 最后预告板块的数据请求渲染
     */
    function noticeRankAjax() {
        // 发送ajax的请求
        return $.ajax({
            type: "get",
            url: "http://xfy196.qicp.vip/notice",
            data: {
                mode: "home",
                warehouse: "VIP_SH",
                areaCode: "103104",
                pagecode: "a",
                provinceName: "安徽省",
                cityName: "滁州市",
                "brandInfoExt[fields]": "activeIndexTips,salesNo,brandImage,mobileImageOne,salesName,brandStoreSn,vendorSaleMessage,warmMode,agio,storyLogo,link,brandType,pms_act_no,showTimeFrom",
                "brandInfoExt[startIndex]": 0,
                "brandInfoExt[num]": "72",
                preview: "",
                token: "",
                _: Date.now()
            },
            dataType: "json",
        });
    }

    function noticeRankRenderData(data, callback) {
        let html = ``;
        let i = 0;
        for (let attr in data) {
            let marginStr = "margin:0 30px 20px 0"
            // 每一行的最后一位我们需要将margin设置为0
            if ((i + 1) % 4 === 0) {
                marginStr = "margin : 0";
            }
            html += `<div style="${marginStr}" class="brand-item">
            <a href="javascript:void(0)"><img class="brand-img" data-original="${data[attr].brandImage.size2}"></a>
            <div class="brand-info">
                <a class="brand-name" href="javascript:void(0)">${data[attr].salesName}</a>
                <div class="pms-info" title="${data[attr].activeIndexTips}">
                    ${data[attr].activeIndexTips}
                </div>
                <span class="brand-discount">${data[attr].agio}
            </div>
            <form action="#" class="book_form">
                <div class="book-notice-warp">
                    <input type="hidden" value="${data[attr].salesNo}" name="brandId">
                    <input type="text" placeholder="请输入手机号码" name="email-phone" class="subscribe-phone">
                    <button type="submit" class="book-notice-btn book-sub">开售提示</button>
                </div>
            </form>
        </div>`;
            i++;
        }
        $(".last-show").html(html);
        if (typeof callback === "function") {
            callback();
        }
    }

    // banner图片数据请求函数
    function getBannerData() {
        $.ajax({
            url: "https://pcapi.vip.com/cmc/index.php",
            dataType: "jsonp",
            data: {
                type: "ADSEC56K,ADSP1Q2W,ADSZBA78,ADSIR7IX,ADSX7W3G,ADSNNLS7,ADS7JI3F,ADS2B669,ADSITG64,ADS45AV4,ADSHS93V,ADS44T33,ADS14OC5,ADSU3XLQ,ADSY2DWE,ADS3NGX5",
                warehouse: "VIP_SH",
                areaid: 103104,
                preview: 0,
                date_from: "",
                time_from: "",
                user_class: "",
                channelId: 0
            },
            success: function (data) {
                let res = null;
                for (let attr in data) {
                    if (data[attr].items.length === 0) {
                        continue;
                    }
                    if (/ [\u4e00-\u9fa5]/.test(data[attr].items[0].name)) {
                        res = data[attr];
                    }
                }
                // 渲染数据
                if (res === null) {
                    return false
                }
                console.log(res);
                let html = ``;
                for (let i = 0; i < res.items.length; i++) {
                    html += `<div class="swiper-slide"><a href="#"><img
                    src="${res.items[i].img}" alt=""></a></div><style>
                    .swiper-pagination span:nth-of-type(${i + 1})::after{
                        content:"${res.items[i].name}";
                    }
                    </style>`;
                }
                $(".swiper-wrapper").html(html);
                // 轮播图的函数
                swiperOpr();
            },
            jsonCallback: "shopAds"
        })
    }

    // 梯子对象
    function Stairs(options) {

        this.options = options;
        this.init();
    }
    Stairs.prototype = {
        constructor: Stairs,
        init: function () {
            // 计算每一个内容元素的高度的数组
            this.content_ele_offset_top_list = [];
            // 获取元素的偏移量
            $(this.options.content_selector).offset(function (index, cords) {
                // 将每一个元素的高度值放入发哦度列表之中
                this.content_ele_offset_top_list.push(cords.top);
                return cords;
            }.bind(this));

            // 计算最小高和最大高
            let _length = this.content_ele_offset_top_list.length;

            this.min_top = this.content_ele_offset_top_list[0];
            this.max_top = this.content_ele_offset_top_list[_length - 1] + $(this.options.content_selector).last().height();
            // 同样我们吧这个最高的值放入数组中之后的计算需要使用
            this.content_ele_offset_top_list.push(this.max_top);
            // 每一次页面刷新的时候需要先计算一下梯子的位置
            // 获得数据
            let scrollTop = $("body, html").scrollTop();
            // 计算下标
            this.calcStairsIndex(scrollTop);
            this.bindEvent();
        },
        bindEvent: function () {
            let $body_html = $("body,html");

            let instance = this;
            // 滚动事件监听
            // 函数节流的变量
            let t = null;
            $(document).scroll(function () {
                if (typeof t === "number") {
                    return false;
                }
                t = setTimeout(() => {
                    t = null;
                    // 获得数据
                    let scrollTop = $body_html.scrollTop();
                    // 计算下标
                    this.calcStairsIndex(scrollTop);
                }, 200)
            }.bind(this));

            // 点击右侧楼梯的我们需要滚动至对应的位置 绑定事件
            $(this.options.stairs_selector).click(function () {
                // 先得到点击事件元素在数组中的下标 通过这个下标找到对应的板块
                let index = $(this).index(instance.options.stairs_selector);
                instance.changeStairsIndex(index);
            })
        },
        calcStairsIndex: function (st) {
            // 我们需要判断数据是在哪一个楼梯的访问
            if (st < this.min_top || st > this.max_top) {

                this.index = -1;
                this.changeStairsBtn();
                return false;
            }
            let _list = this.content_ele_offset_top_list;
            // 数据一直在这个范围之内我们就不在重复计算了
            if (st >= _list[this.index] && st < _list[this.index + 1]) {
                return false;
            }
            // 遍历记录滚入的楼梯的下标
            for (let i = 0; i < _list.length; i++) {
                if (st >= _list[i] && st < _list[i + 1]) {
                    this.index = i;
                    break;
                }
            }
            this.changeStairsBtn();
        },
        /**
         * 改变梯子的选中状态
         */
        changeStairsBtn: function () {
            if (this.index === -1) {
                $(this.options.stairs_selector).removeClass("cur");
                return false;
            }
            // 如果不熟index===-1 说明要选中对应下标的楼梯
            $(this.options.stairs_selector).eq(this.index).addClass("cur").siblings().removeClass("cur");
        },
        /**
         * 改变梯子选中的下标的
         * @param {点击的梯子的下标} index 
         */
        changeStairsIndex: function (index) {

            // 通过这个index我们去scroll对应的板块
            $("body,html").scrollTop(this.content_ele_offset_top_list[index]);
            $(document).trigger("scroll");
        }
    }
})(jQuery);

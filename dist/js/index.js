;; (function () {
    $(function () {
        init();
    });

    /**
     * 页面初始化的函数
     */
    function init() {
        // 轮播图的函数
        swiperOpr();
        // 获取搜索关键字的函数
        getSearchKeywords();
        // 获取搜索热词的函数
        getSearchKeyHotKeywords();
        // 二级菜单鼠标划入发送的ajax的函数
        navHoverAjax();
        // 梯子改变的事件
        floorChangeEvent();
        // 左边梯子随着滚轮滚动跟随的函数
        leftBarFollow();
        // 吸顶函数
        suctionTop();
        // 点击top回到页面最顶端的函数
        locationTop();
        clickSearch();
    }

    function clickSearch() {
        $(".search-ipt").click(function () {
            $(".search-helper").show();
        });
        $(".search-ipt").blur(function () {
            $(".search-helper").hide();
        });
    }
    /**
     * nav二级菜单hover发送ajax的函数
     */
    function navHoverAjax() {
        let hover_two_get_staring = false;
        // 鼠标hover上去的时候采取发送请求
        $(".nav-list").mouseover(function () {
            // 函数节流
            if (!hover_two_get_staring) {
                setTimeout(function () {
                    getTwoCategory().then((data) => {
                        // 返回的信息未success代表成功
                        if (data.msg === "success") {
                            hover_two_get_staring = true;
                            let tabs = data.data.data.tabs;
                            let tabs_html = ``;
                            for (let i = 0; i < tabs.length; i++) {
                                tabs_html += `<li class="t-w-m-item"><span data-categoryId="${tabs[i].categoryId}">${tabs[i].name}</span>
                                <div class="t-w-box">

                                </div>
                                </li>`
                            }
                            // 拼接数据
                            $(".t-w-menu").html(tabs_html);
                            threeCategoryAjax();
                        }
                    });
                }, 100)

            }
        });
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

    // 获取搜索关键字
    function getSearchKeywords() {

        $.ajax({
            url: "https://mapi.vip.com/vips-mobile/rest/shopping/search/entryword/pc/v1",
            dataType: "jsonp",
            data: {
                app_name: "shop_pc",
                app_version: 4.0,
                warehouse: "VIP_SH",
                fdc_area_id: "103104110",
                client: "pc",
                mobile_platform: 1,
                province_id: 103104,
                api_key: "70f71280d5d547b2a7bb370a529aeea1",
                user_id: "",
                mars_cid: "1585923048293_a96d442f0be377ab63fc1790f5d32873",
                wap_consumer: "a",
                channel_id: 1,
                gPlatform: "PC",
                _: Date.now()
            },
            success: function (data) {
                // 数据请求成功之后需要将数据渲染到页面之中
                if (data.msg === "success") {
                    $(".search-ipt").attr("placeholder", data.data.showWord)
                }
            },
            jsonpCallback: "getSearchwords"
        })
    }

    // 获取搜索热点关键字
    function getSearchKeyHotKeywords() {
        $.ajax({
            url: "https://category.vip.com/ajax/getSuggestHotKeywords.php",
            dataType: "jsonp",
            data: {
                count: 10,
                uid: "",
                _: Date.now()
            },
            success: function (data) {
                // code为200代表返回的是成功状态
                let hot_list_html = ``;
                let search_recommend_list_html = ``;
                if (data.code === 200) {
                    let res = data.data;
                    for (let i = 0; i < res.length; i++) {
                        search_recommend_list_html += `<li><a href="${res[i].url}">${res[i].key}</a></li>`;
                    }
                    for (let i = 0; i < res.length; i++) {
                        if (i === 6) {
                            hot_list_html += `<li><a href="${res[i].url}">${res[i].word}</a></li>`
                            break;
                        }
                        hot_list_html += `<li><a href="${res[i].url}">${res[i].word}</a><span>|</span></li>`
                    }

                    // 替换到页面之中
                    $(".search-hots-pot .hot-list").html(hot_list_html);
                    $(".search-recommend-list ul").html(search_recommend_list_html);
                }
            },
            jsonpCallback: "searchSuggestHotKeywords"
        })
    }

    // 二级菜单的数据
    function getTwoCategory() {
        return $.ajax({
            url: "https://mapi.vip.com/vips-mobile/rest/shopping/pc/category/index/get_tab/v1",
            dataType: "jsonp",
            data: {
                app_name: "shop_pc",
                app_version: 4.0,
                warehouse: "VIP_SH",
                fdc_area_id: "103104110",
                client: "PC",
                mobile_platform: 1,
                province_id: 103104,
                api_key: "70f71280d5d547b2a7bb370a529aeea1",
                user_id: "",
                mars_cid: "1585923048293_a96d442f0be377ab63fc1790f5d32873",
                wap_consumer: "a",
                hierarchy_id: 117,
                _: Date.now()
            },
            jsonpCallback: "getTopCategory"
        })
    }


    // 三级菜单数据请求
    function getThreeCategory(args) {

        return $.ajax({
            url: "https://mapi.vip.com/vips-mobile/rest/shopping/pc/category/index/get_tab_data/v1",
            dataType: "jsonp",
            data: {
                app_name: "shop_pc",
                app_version: 4.0,
                warehouse: "VIP_SH",
                fdc_area_id: "103104110",
                client: "PC",
                mobile_platform: 1,
                province_id: "103104",
                api_key: "70f71280d5d547b2a7bb370a529aeea1",
                user_id: "",
                mars_cid: "1585923048293_a96d442f0be377ab63fc1790f5d32873",
                wap_consumer: "a",
                hierarchyId: 117,
                categoryId: args.categoryId,
                clientFrom: "PC",
                net: "wifi",
                width: 1920,
                height: 1080,
                pcmpWidth: 750,
                mobile_channel: "nature",
                functions: "jumper",
                _: Date.now()
            },
            jsonpCallback: "getSubCategory" + args.categoryId
        })
    }

    // 三级菜单的请求发送
    function threeCategoryAjax() {
        $(".t-w-m-item").mouseenter(function () {
            // 难道每一个二级菜单的category的ID值
            let category_id = this.firstElementChild.getAttribute("data-categoryId");
            getThreeCategory({
                categoryId: category_id
            }).then((data) => {
                renderThreeCategory(data);
            });
        })
    }

    // 三级菜单数据渲染操作
    function renderThreeCategory(data) {
        // 三级菜单变量
        let sub_category_html = ``;
        // 三级菜单热门品牌图片变量
        let brand_rec = ``;
        let res = data.data.data.sectionList;
        // 图片列表的变量
        let img_list = ``;
        for (let i = 1; i < res.length; i++) {
            let list_html = ``;
            let children = res[i].category.children;

            for (let j = 0; j < children.length; j++) {
                // 因为接口数据最后一项是热销商品的图片数据
                if (i === res.length - 1) {
                    img_list += ` <li class="b-img"><a href="${children[j].href}"><img
                                    src="${children[j].image}"></a></li>`;
                    continue;
                }
                list_html += `<li class="category_item"><a href="${children[j].href}">${children[j].name}</a></li>`;
            }
            if (i === res.length - 1) {
                continue;
            }
            // 三级菜单循环渲染
            sub_category_html += `<div class="sub clearfix">
                            <strong>${res[i].category.name}</strong>
                            <i class="iconfont icon-zuojiantou-copy"></i>
                            <ul class="category_list">
                            ${list_html}
                            </ul>
                            </div>`;

        }
        // 最后处理三级菜单的html代码
        sub_category_html = `<div class="brand-type clearfix">
                            ${sub_category_html}
                        </div>`;
        // 每一个品牌热销的图片html代码
        brand_rec += ` <div class="brand-img"><div class="brand-title">
                        品牌推荐
                        </div>
                        <ul class="brands">
                            ${img_list}
                        </ul></div>`;
        // 渲染到页面之中
        $(".t-w-box").html(sub_category_html + brand_rec);

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
                html += `<a href="${brandInfoData[attr].link}"><div class="shop-item" style="float: ${float_str}; margin-bottom: 20px;"><img width=570 height=273
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
        let scrollTop = nav_ele.offset().top;
        let t = null;
        $(document).scroll(function () {

            // 函数节流
            if (typeof t === " number") {
                return false;
            }

            t = setTimeout(function () {

            }, 200)
            if (scrollTop <= $("body,html").scrollTop()) {
                nav_ele.css({
                    width: "100%",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    background: "#ffffff",
                    boxShadow: "0 1px 3px 0 #a7a7a7",
                    "z-index": 100
                });
            } else {
                nav_ele.removeAttr("style");
            }
        });
    }

    // 点击top直接返回页面最上面
    function locationTop() {
        $(".location-top").click(function () {
            $(window).scrollTop(0);
        })
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
        changeStairsBtn: function () {
            if (this.index === -1) {
                $(this.options.stairs_selector).removeClass("cur");
                return false;
            }
            // 如果不熟index===-1 说明要选中对应下标的楼梯
            $(this.options.stairs_selector).eq(this.index).addClass("cur").siblings().removeClass("cur");
        },
        changeStairsIndex: function (index) {

            // 通过这个index我们去scroll对应的板块
            $("body,html").scrollTop(this.content_ele_offset_top_list[index]);
            $(document).trigger("scroll");
        }
    }
})();

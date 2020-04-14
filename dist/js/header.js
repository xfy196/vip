;; (function () {

    $(function () {

        init();
    });
    /**
     * 初始化的函数
     */
    function init() {
        getSearchKeywords();
        getSearchKeyHotKeywords();
        // 二级菜单鼠标划入发送的ajax的函数
        navHoverAjax();
        clickSearch();
        locationTop();
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
    // 点击top直接返回页面最上面
    function locationTop() {
        $(".location-top").click(function () {
            $(window).scrollTop(0);
        })
    }
    /**
 * 点击出现搜索历史框和推荐商品
 */
    function clickSearch() {
        $(".search-ipt").click(function () {
            $(".search-helper").show();
        });
        $(".search-ipt").blur(function () {
            $(".search-helper").hide();
        });
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
})();
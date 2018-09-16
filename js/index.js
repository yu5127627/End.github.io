window.onload = function () {
    //1.事件源及变量
    var banner_li = $('slider_banner').getElementsByTagName('li');
    var nav_tab_li = $('nav_tab').getElementsByTagName('li');
    var menu_child = $('menu').children;
    var box = $('menu_main').getElementsByClassName('menu-main-box');

    //2.广告自动切换
    var index = 0;
    timer = setInterval(function () {
        for (var j = 0; j < banner_li.length; j++) {
            banner_li[j].style.opacity = 0;
        }
        ease_Animation(banner_li[index], {opacity: 1});

        index += 1;
        index = index % banner_li.length;

    }, 3000);

    //3.导航栏切换效果
    var lastOne = 0;
    for (var i = 0; i < nav_tab_li.length; i++) {
        /*闭包高级排他的运用*/
        (function (masks) {
            nav_tab_li[i].onclick = function () {
                //1.清除隐藏
                nav_tab_li[lastOne].className = '';
                menu_child[lastOne].style.display = 'none';
                //2.设置显示
                this.className = 'current';
                menu_child[masks].style.display = 'block';
                //赋值
                lastOne = masks;
            }
        })(i);
    }

    //4.瀑布流样式
    autoCreateImg();

    //4.2.瀑布流布局
    setTimeout(function () {
        waterFull('menu_main', box);
    }, 200);

    //4.3.动态加载图片
    var timer = null;
    window.onscroll = function () {
        clearTimeout(timer);

        //延时刷新
        timer = setTimeout(function () {
            //判断是否具备加载条件
            if (checkWillLoadImage) {
                autoCreateImg();
                waterFull('menu_main', box);
            }
        }, 1000);

        //5.第三方登录吸顶效果 + 返回顶部快捷键
        if (scroll().top > $('quick_login').offsetTop) {
            $('top_login').style.display = 'block';
            $('back_top').style.display = 'block';
        } else {
            $('top_login').style.display = 'none';
            $('back_top').style.display = 'none';
        }
    };

    //6.登录按钮

    //开启登录
    $('nav_right_login').onclick = function () {
        $('login').style.display = 'block';

        //清除页面滚动
        document.body.style.overflow = 'hidden';
    };

    //关闭登录
    $('login_off').onclick = function () {
        $('login').style.display = 'none';

        //显示页面滚动
        document.body.style.overflow = 'auto';
    }
};


/*瀑布流*/
function autoCreateImg() {
    //1.制作数据
    var json = [
        {txt: '当我们正在为生活疲于奔命的时候，生活已经离我们而去。——约翰·列侬', pic: 'images/0.jpg'},
        {txt: '活在世上，不必什么都知道，只知道最好的就够了。——王小波', pic: 'images/2.jpg'},
        {txt: '世界上任何书籍都不能带给你好运，但是它们能让你悄悄变成你自己。——黑塞', pic: 'images/3.jpg'},
        {txt: '很多人不需要再见，只是路过而已。——《彼岸花》', pic: 'images/4.jpg'},
        {txt: '人生最困难的三件事：保守秘密，忘掉所受的创伤，充分利用余暇。——吉罗', pic: 'images/5.jpg'},
        {txt: '人时已尽，人世很长，我在中间，应当休息。——顾城', pic: 'images/6.jpg'},
        {txt: '信任的深浅，不在于会不会对你笑，而在于愿不愿意在你面前哭。', pic: 'images/7.jpg'},
        {txt: '有一种旅行，不为跋涉千里的向往，只为漫无目的的闲逛，不为人山人海的名胜，只为怡然自乐的街景...', pic: 'images/8.jpg'},
        {txt: '再长的路，一步步地能走完，再短的路，不迈开双脚也无法到达。', pic: 'images/9.jpg'},
        {txt: '哪里会有人喜欢孤独，不过是不喜欢失望。——村上春树', pic: 'images/10.jpg'},
        {txt: '咖啡苦与甜，不在于怎么搅拌，而在于是否放糖；一段伤痛，不在于怎么忘记，而在于是否有勇气重新开始。', pic: 'images/11.jpg'},
        {txt: '不乱于心，不困于情。不畏将来，不念过往。如此，安好。', pic: 'images/12.jpg'},
        {txt: '其实我不是一定要等你，只是等上了，就等不了别人了。——《朝露若颜》', pic: 'images/13.jpg'},
        {txt: '一切都是瞬间，一切都会过去，一切过去了的都会变成亲切的怀念。——普希金', pic: 'images/14.jpg'},
        {txt: '每一个人都需要这样一个朋友：当以为自己再也笑不出来的时候，他能让你开怀大笑！', pic: 'images/15.jpg'},
        {txt: '你如果认识从前的我，也许你会原谅现在的我。——张爱玲', pic: 'images/16.jpg'},
        {txt: '简约不是少，而是没有多余。足够也不是多，而是刚好你在。', pic: 'images/17.jpg'},
        {txt: '多少人曾爱慕你年轻时的容颜，可知谁愿承受岁月无情的变迁', pic: 'images/18.jpg'},
        {txt: '与众不同的你是幸运的，何必让自己变得与别人一样。', pic: 'images/19.jpg'},
        {txt: '梦里出现的人，醒来时就该去见她，生活就是这么简单。——《新桥恋人》', pic: 'images/20.jpg'},
        {txt: '我们已经出发了太久，以至于我们忘了为什么要出发。——纪伯伦', pic: 'images/21.jpg'},
        {txt: '阳光温热，岁月静好，你还不来，我怎敢老。', pic: 'images/22.jpg'},
        {txt: '若只是喜欢 何必夸张成爱。——林夕', pic: 'images/23.jpg'},
        {txt: '水来，我在水中等你；火来，我在灰烬中等你。——《你是我的独家记忆》', pic: 'images/24.jpg'},
        {txt: '阳光温热，岁月静好，你还不来，我怎敢老。', pic: 'images/25.jpg'},
        {txt: '天下就没有偶然，那不过是化了妆的，戴了面具的必然。——钱钟书', pic: 'images/26.jpg'},
        {txt: '人生最困难的三件事：保守秘密，忘掉所受的创伤，充分利用余暇。——吉罗', pic: 'images/27.jpg'}
    ], str, txt, pic, htmlStr;

    //2.遍历数据
    for (var i = 0; i < json.length; i++) {
        //2.1 将父标签以文本的形式获取到
        str = $('menu_main').innerHTML;

        //2.2 取出图片的地址和文字
        txt = json[i].txt;
        pic = json[i].pic;

        //2.3 创建子标签
        htmlStr = '<div class="menu-main-box">' +
            '<div class="pic">' +
            '<img src=' + pic + ' alt="">' +
            '<div class="mask" id="mask">' +
            '<button>采集</button><span></span></div></div>' +
            '<p>' + txt + '</p></div>';

        //2.4拼接
        str += htmlStr;
        $('menu_main').innerHTML = str;


    }

    //3.蒙版效果事件
    var pics = $('menu_main').getElementsByClassName('pic');
    for (var j = 0; j < pics.length; j++) {
        pics[j].onmouseover = function () {
            this.children[1].style.display = 'block';
        };
        pics[j].onmouseout = function () {
            this.children[1].style.display = 'none';
        }
    }

};


















/*
window.onload = function () {
    //1.实现瀑布流布局
    waterFull('main', 'box');


    //2.动态加载图片
    window.onscroll = function () {
        var timer=null;
        clearInterval(timer);

        timer=setInterval(function () {
            if (checkWillLoadImage()) {
                //2.1 造数据
                var imgArr = [
                    {'src': 'img01.jpg'},
                    {'src': 'img02.jpg'},
                    {'src': 'img03.jpg'},
                    {'src': 'img04.jpg'},
                    {'src': 'img05.jpg'},
                    {'src': 'img06.jpg'},
                    {'src': 'img07.jpg'},
                    {'src': 'img08.jpg'},
                    {'src': 'img09.jpg'},
                    {'src': 'img10.jpg'},
                    {'src': 'img11.jpg'},
                    {'src': 'img12.jpg'},
                    {'src': 'img13.jpg'},
                    {'src': 'img14.jpg'},
                    {'src': 'img15.jpg'},
                    {'src': 'img16.jpg'},
                    {'src': 'img17.jpg'},
                    {'src': 'img18.jpg'},
                    {'src': 'img19.jpg'},
                    {'src': 'img20.jpg'},
                    {'src': 'img21.jpg'},
                    {'src': 'img22.jpg'},
                    {'src': 'img23.jpg'},
                    {'src': 'img24.jpg'},
                    {'src': 'img25.jpg'},
                    {'src': 'img26.jpg'},
                    {'src': 'img27.jpg'},
                    {'src': 'img28.jpg'},
                    {'src': 'img29.jpg'},
                    {'src': 'img30.jpg'},
                    {'src': 'img31.jpg'},
                    {'src': 'img32.jpg'},
                    {'src': 'img33.jpg'},
                    {'src': 'img34.jpg'},
                    {'src': 'img35.jpg'},
                    {'src': 'img36.jpg'},
                    {'src': 'img37.jpg'},
                    {'src': 'img38.jpg'},
                    {'src': 'img39.jpg'},
                    {'src': 'img40.jpg'},
                ];

                //2.2 创建元素
                for (i = 0; i < imgArr.length; i++) {

                    var box = document.createElement('div');
                    box.className = 'box';
                    $('main').appendChild(box);

                    var pic = document.createElement('div');
                    pic.className = 'pic';
                    box.appendChild(pic);

                    var img = document.createElement('img');
                    img.src = "images/" + imgArr[i].src;
                    pic.appendChild(img);

                }

                //2.3重新布局
                waterFull('main','box');

            }

        },5000)
    }


};
*/


//实现瀑布流布局
function waterFull(parent, child) {
    //1.实现 main 盒子居中

    //1.1 获取所有的 box
    var allBoxs = $(parent).children;

    //1.2 获取 box的宽度
    var boxWidth = allBoxs[0].offsetWidth;

    //1.3 获取屏幕的宽度
    // var screenWidth = document.documentElement.clientWidth;

    //1.4 动态获取每一列的列数
    var cols = 5;  //屏幕宽度/盒子的宽度=列数

    //1.5 动态获取 parent 盒子的宽度
    // mainWidth = 列数 * boxWidth;
    // var mainWidth = cols * boxWidth;

    //1.6 动态为 parent 赋值 宽度  居中样式
    // $(parent).style.width = mainWidth + 'px';

    // $(parent).style.margin = '0 auto';

    var xyMargin = 22;

    //2. 子盒子的定位

    //2.1 定义高度数组
    var heightArr = [], boxHeigth = 0, minBoxHeight = 0, minBoxIndex = 0;

    //2.2 遍历子盒子
    for (i = 0; i < allBoxs.length; i++) {
        //2.2.1 求出每一个子盒子的高度
        boxHeigth = allBoxs[i].offsetHeight + xyMargin;

        allBoxs[i].style.position = 'absolute';
        allBoxs[i].style.left = i * (boxWidth+xyMargin) + 'px';
        allBoxs[i].style.top =xyMargin+ 'px';
        //2.2.2 取出第一行盒子的高度放入数组
        if (i < cols) {
            heightArr.push(boxHeigth);
        } else {
            // 剩余行
            // 1.取出最矮盒子的高度
            minBoxHeight = _.min(heightArr);

            // 2.求最矮盒子的索引
            minBoxIndex = getMinBoxIndex(heightArr, minBoxHeight);

            //3.子盒子定位
            allBoxs[i].style.position = 'absolute';
            allBoxs[i].style.left = minBoxIndex * (boxWidth+xyMargin) + 'px';
            allBoxs[i].style.top = minBoxHeight +xyMargin+ 'px';

            //3.动态变化 数组中 的高度
            heightArr[minBoxIndex] += boxHeigth;

        }

    }
    // console.log(heightArr, minBoxHeight, minBoxIndex);

}

/**
 * 获取数组中最矮盒子的索引 getMinBoxIndex
 * @param arr
 * @param val
 * @returns {number}
 */
function getMinBoxIndex(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            return i;
        }
    }
}

/**
 * 判断是否具备加载图片的功能
 */
function checkWillLoadImage() {
    //1.获取最后一个盒子
    var allBox = document.getElementsByClassName('box');
    var lastBox = allBox[allBox.length - 1];

    //2.求出最后一个盒子自身高度的一半 + offsetTop
    var lastBoxDis = lastBox.offsetHeight * 0.5 + lastBox.offsetTop;

    //3.求出屏幕的高度
    var screenHeight = document.documentElement.clientHeight || document.body.clientHeight;

    //4.求出页面偏移浏览器的高度
    var scrollTop = scroll().top;

    return lastBoxDis <= screenHeight + scrollTop;

}


function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : null;
}
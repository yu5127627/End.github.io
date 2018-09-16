/**
 * 获取页面滚动卷去的 Top距离和 Left距离
 * scroll().top     scroll().left
 * @returns {{top: number, left: number}}
 */
function scroll() {
    if (window.pageXOffset !== null) {
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        }
    } else if (document.compatMode === 'CSS1Compat') {
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        }
    }
    return {
        top: document.body.scrollTop,
        left: document.body.scrollLeft
    }
}

/**
 * $('id'):快捷获取 id 方法
 * @param id
 * @returns {any}
 */
function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : null;
}


/**
 * show(Element):隐藏元素
 * @param obj
 * @returns {string}
 */
function show(obj) {
    return obj.style.display = 'block';
}

/**
 * hide(Element):显示元素
 * @param obj
 * @returns {string}
 */
function hide(obj) {
    return obj.style.display = 'none';
}

/**
 * 兼容模式的 clienWidth和 clientHeight
 * @returns {{width: number, height: number}}
 */
function client() {
    /* IE9+ 及最新浏览器 */
    if (window.innerWidth !== null) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }
    //W3C 标准
    else if (document.compatMode === 'CSS1Compat') {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }
    //怪异模式
    return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
    }
}

/**
 * 匀速动画函数
 * @param obj:事件对象(element)
 * @param end：结束位置(number)
 * @param step：步长(number)
 */
function uniform_Animation(obj, end, step) {
    var timer = null;
    //1.先清除定时器
    clearInterval(timer);

    //1.1判断方向
    // 如果 obj的 offsetLeft < end  向右移动(正方向)
    // 否则 obj的 offsetLeft > end  向左移动(反方向)
    var direction = obj.offsetLeft < end ? step : -step;
    console.log(obj.offsetLeft);

    //2.再设置定时器
    timer = setInterval(function () {
        obj.style.left = obj.offsetLeft + direction + 'px';

        //3.到达指定位置停止
        if (Math.abs(end - obj.offsetLeft) < Math.abs(direction)) {
            clearInterval(timer);

            //将 end 与 step 的差值补足，让 obj 到达指定位置
            obj.style.left = end + 'px';
        }
    }, 20)
}

/**
 * 缓动动画函数
 * @param obj
 * @param json
 * @param fn
 */
function ease_Animation(obj, json, fn) {
    //1.获取事件源及定义变量
    var begin = 0, end = 0, step = 0;

    //1.1清除定时器
    clearInterval(obj.timer);

    //1.2触发定时器
    obj.timer = setInterval(function () {
        /*begin=begin+(end-begin)*缓动系数*/

        //旗帜
        var flag = true;

        for (var key in json) {
            //1.2.1获取初始值
            if ("opacity" === key) { // 透明度
                begin = parseInt(parseFloat(getCSSAttrValue(obj, key)) * 100);
                end = parseInt(parseFloat(json[key]) * 100);
            } else if ('scrollTop' === key) {
                begin = Math.ceil(obj.scrollTop);
                end = parseInt(json[key]);
            } else {
                begin = parseInt(getCSSAttrValue(obj, key)) || 0;
                end = parseInt(json[key]);
            }


            //1.3求出步长
            step = (end - begin) * 0.2;

            //1.3.1 判断是否向上取整
            step = (end > begin) ? Math.ceil(step) : Math.floor(step);

            //1.4动起来
            if ('opacity' === key) {//透明度
                //w3c浏览器
                obj.style.opacity = (begin + step) / 100;
                //IE8之前浏览器
                obj.style.filter = 'alpha(opacity:' + (begin + step) + ')';
            } else if ('scrollTop' === key) {
                obj.scrollTop = begin + step;
            } else if ('zIndex' === key) {
                obj.style[key] = json[key];
            } else {
                obj.style[key] = begin + step + 'px';
            }

            //1.5判断到达指定位置值后清除定时器
            if (begin !== end) {
                flag = false;
            }
        }

        //清除定时器
        if (flag) {
            clearInterval(obj.timer);


            //判断有没有回调函数
            if (fn) {
                fn();
            }
        }

    }, 20);

}

/**
 * 获取css属性值
 * @param {object}obj
 * @param {string}attr
 * @returns {string}
 */
function getCSSAttrValue(obj, attr) {
    if (obj.currentStyle) {
        // IE 和 Opera
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, null)[attr];
    }
}


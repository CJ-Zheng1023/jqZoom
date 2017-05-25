/**
 * 放大镜插件     v1.0.0
 * @mail cj_zheng1023@hotmail.com
 * @author AfterWin
 *
 *
 *
 * update log
 *
 */
(function($){

    var SPACING = 15;
    //var ZOOM_TIMES = 10;





    $.fn.jqZoom = function(options){
        $(this).each(function(i, dom){
            var me = $(dom);
            _initZoom(me, options.selectorWidth, options.selectorHeight);
            var imgUrl = options&&options.zoomImgUrl?options.zoomImgUrl:me.attr("src");
            _initViewer(me, imgUrl, options.viewerWidth, options.viewerHeight);
        })
    }

    /**
     * 初始化聚焦框
     * @param target     图片jquery对象
     * @param sWidth     聚焦区域宽度
     * @param sHeight    聚焦区域长度
     * @private
     */
    var _initZoom = function(target, sWidth, sHeight){
        var $zoom = $("<div />").addClass("zoom-selector").width(sWidth).height(sHeight);
        target.after($zoom);
        target.closest(".zoom-box").on({
            mousemove: function(e){
                var mouseX=e.pageX-$(this).offset().left;
                var mouseY=e.pageY-$(this).offset().top;
                var halfSWidth = sWidth/ 2,halfSHeight = sHeight/2;
                var realX, realY;
                if(mouseX < halfSWidth){
                    realX = 0;
                }else if(mouseX + halfSWidth > target.width()){
                    realX = target.width() - sWidth;
                }else{
                    realX = mouseX - halfSWidth;
                }
                if(mouseY < halfSHeight){
                    realY = 0;
                }else if(mouseY + halfSHeight > target.height()){
                    realY = target.height() - sHeight;
                }else{
                    realY = mouseY - halfSHeight;
                }
                $zoom.css({
                    left: realX,
                    top: realY
                })
                var viewerX = realX*($(this).find(".viewer-box>img").width() - $(this).find(".viewer-box").width())/(target.width() - sWidth);
                var viewerY = realY*($(this).find(".viewer-box>img").height() - $(this).find(".viewer-box").height())/(target.height() - sHeight);
                $(this).find(".viewer-box>img").css({
                    left: -viewerX,
                    top: -viewerY
                })
            },
            mouseenter: function(){
                $zoom.css("display", "block");
                $(this).find(".viewer-box").css("display", "block");
            },
            mouseleave: function(){
                $zoom.css("display", "none");
                $(this).find(".viewer-box").css("display", "none");
            }
        })
    }
    /**
     *初始化放大区域
     * @param target       图片jquery对象
     * @param imgUrl      原始图片URL
     * @param vWidth      放大区域宽度
     * @param vHeight     放大区域长度
     * @private
     */
    var _initViewer = function(target, imgUrl, vWidth, vHeight){
        var $viewer = $("<div />").addClass("viewer-box").width(vWidth).height(vHeight);
        var $zoomBox = target.closest(".zoom-box");
        $viewer.css({
            left: target.width() + SPACING,
            top: 0
        })
        var imgSize = _getOriginalSize(target);
        var $img = $("<img src='"+imgUrl+"' />").width(imgSize.oWidth).height(imgSize.oHeight);
        $viewer.append($img);
        target.after($viewer);
    }
    /**
     * 获取图片原始宽高
     * @param target       图片jquery对象
     * @returns {{oWidth: Number, oHeight: Number}}
     * @private
     */
    var _getOriginalSize = function(target){
        var newImg = new Image();
        newImg.src = target.attr("src");
        return{
            oWidth: newImg.width,
            oHeight: newImg.height
        }
    }

})(jQuery);
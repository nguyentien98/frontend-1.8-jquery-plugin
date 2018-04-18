/* Your plugin javascript here */
$(function () {
    $.fn.inner_float = function(options) {
        var defaults = {
            top: '50px'
        };
        var currentMarginTop = $(this).css('margin-top') != 0 ? $(this).css('margin-top') : false;
        var currentMarginBottom = $(this).css('margin-bottom') != 0 ? $(this).css('margin-bottom') : false;
        var currentMarginBottomNumber = currentMarginBottom != false ? currentMarginBottom.substr(0, currentMarginBottom.indexOf('px')) : 0;
        var setting = $.extend(defaults, options);
        var topInt = setting.top.substr(0, setting.top.indexOf('px'));
        var box = $(this);
        var boxOffset = box.offset().top;
        var parentOffset = box.parent().offset().top;
        var parentHeight = box.parent().height();
        var parentWidth = box.parent().width();
        var stopFloat = parentOffset + parentHeight - box.height() - topInt;
        if (currentMarginBottomNumber) {
            stopFloat = stopFloat - currentMarginBottomNumber;
        }
        $(window).scroll(function(){
            if (boxOffset - $(this).scrollTop() <= topInt) {
                box.addClass('float');
                box.css({
                    'position' : 'fixed',
                    'top' : setting.top,
                    'width' : parentWidth,
                    'margin' : 0
                });
                if ($(this).scrollTop() > stopFloat - currentMarginBottomNumber) {
                    bottom = currentMarginBottom != false ? currentMarginBottom : 0;
                    box.css({
                        'position' : 'absolute',
                        'bottom' : bottom,
                        'top' : 'unset'
                    });
                }
            } else {
                var reset = {
                    'position' : 'inherit',
                    'top' : 0
                };
                if (currentMarginTop) {
                    reset = Object.assign({
                        'margin-top' : currentMarginTop
                    }, reset);
                } 
                if (currentMarginBottom) {
                    reset = Object.assign({
                        'margin-bottom' : currentMarginBottom
                    }, reset);
                } 
                box.css(reset);
            }
        });
    }
}(jQuery));
/* Call your plugin */
$('#almost-show').inner_float({
    top: "10px"
});
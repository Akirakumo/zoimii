$(function(){
    F.swiper();//轮播
    F.contenOver();//鼠标移入移出
    F.contentOn();//内容开
    F.contentOff();//内容关
    F.btnMenu();//菜单按钮
    F.linkTo();//跳转功能
    F.maskPw();//密码    
});
var that = null;
var _index = null;
var F = {
    contenOver:function(){
        $('.item-content').on('mouseover', hoverAnime).on('mouseout', function () {
            $(this).removeClass('item-content-over');
        })  
    },
    contentOn:function(){
        $('.item-content').on('click',function(){
            if ($(this).attr('data-lock') == 1) {
                $('.mask-pw').fadeIn(200);
                that = $(this);
            }else{
                $(this).addClass('inner-on').off('mouseover').parents('.item').css('z-index','9');
                $('.head-btn-close').addClass('head-btn-close-on');  
                $('.bottom-box').addClass('bottom-box-hide');
            }        
        });
    },
    contentOff:function(){
        $('.head-btn-close').on('click',function(){
            back2Top(function(){
                $('.inner-on').removeClass('inner-on')
                $('.head-btn-close').removeClass('head-btn-close-on');
                $('.item-content').on('mouseover', hoverAnime).parents('.item').css('z-index', '0');
                $('.bottom-box').removeClass('bottom-box-hide');   
            });                          
        })
        $('.head-logo').on('click',function(){
            back2Top();           
        });
    },
    swiper:function(){
        var $list = $('.item-content');
        //右移     
        $('.arrow-right').on('click',function(){
            $('.arrow-left').show();//显示左箭头
            var n = Number($('.this-banner').attr('data'));
            if (n>=$list.length-2) {$(this).hide()};
            var left = -(n+1)*100 + '%';
            $('.swiper').css('left',left);
            $('.bottom-banner li').removeClass('this-banner').siblings('li[data='+(n+1)+']').addClass('this-banner');
            bannerMove();
        });
        //左移
        $('.arrow-left').on('click',function(){
            $('.arrow-right').show();//显示右箭头
            var n = Number($('.this-banner').attr('data'));            
            if (n <= 1) { $(this).hide() };      
            var left = -(n - 1) * 100 + '%';
            $('.swiper').css('left', left);
            $('.bottom-banner li').removeClass('this-banner').siblings('li[data='+(n-1)+']').addClass('this-banner');
            bannerMove();
        });
        //底部导航条
        $('.bottom-banner').on('click','li',function(){
            var n = Number($(this).attr('data'));
            $(this).addClass('this-banner').siblings().removeClass('this-banner');
            if (n <= 0) { 
                $('.arrow-left').hide();
                $('.arrow-right').show(); 
            } else if (n >= $list.length - 1){
                $('.arrow-right').hide();
                $('.arrow-left').show();
            } else{
                $('.arrow-left,.arrow-right').show();
            }
            var left = -n*100 +'%';
            $('.swiper').css('left', left);
            bannerMove();
        });
    },
    btnMenu:function(){
        var $menu = $('.menu-box');
        $('.head-btn-menu').on('click',function(){
            if ($menu.hasClass('menu-box-on')){
                $(this).removeClass('head-btn-menu-on');
                $menu.removeClass('menu-box-on');
            }else{
                $(this).addClass('head-btn-menu-on');
                $menu.addClass('menu-box-on');
            }
        })       
    },
    maskPw:function(){
        var pw = $('.pop-box-pw');
        pw.on('focus',function(){
            $(this).removeClass('wrong-word');
        });
        $('.pop-box-yes').on('click',function(){
            if (pw.val() == '0123450') {
                $('.mask-pw').fadeOut(200,function(){
                    that.addClass('inner-on').off('mouseover').parents('.item').css('z-index', '9');
                    $('.head-btn-close').addClass('head-btn-close-on');
                    $('.bottom-box').addClass('bottom-box-hide');                        
                });
                pw.val('');
            }else{
                pw.addClass('wrong-word');
            }             
        });
        $('.pop-box-no').on('click', function () {
            $('.mask-pw').fadeOut(200);
            pw.removeClass('wrong-word').val('');
        });
    },
    linkTo:function(){
        $('.item-foot-right .item-foot-btn').on('click',function(){
            $('.head-btn-close').click();
            _index = $(this).attr('data');
            setTimeout(function () { $('.bottom-banner').find('li[data=' + _index + ']').click()},1300);
            setTimeout(function () { $('.item-content[data=' + _index + ']').click()}, 2200);                   
        });
    },
}

// item hover动画
function hoverAnime(){
    if ($(window).height()>500&&$(window).width()>780) {
        $(this).addClass('item-content-over');
    }       
} 
//导航底部移动
function bannerMove() {
    var color_list = ['rgb(0,175,250)', 'rgb(50,225,225)','rgb(250,200,250)'];
    var _d = $('.this-banner').attr('data');
    var left = _d * 35 + 7;
    $('.bottom-underline').css({ 'left': left, 'background-color': color_list[_d%3]});
    $('.this-banner').css('color', color_list[_d % 3]).siblings('li').css('color','');
}
//回到顶部
function back2Top(back){
    var s = $('.inner-on').scrollTop();
    if (back == undefined || back == null || back == '') {
        if (s == 0) {
            back();
        }else{
            $('.inner-on').animate({ scrollTop: 0 }, 600);
        }      
    } else {
        if (s == 0) {
            back();
        }else{
            $('.inner-on').animate({ scrollTop: 0 }, 600, back);
        }
    } 
}
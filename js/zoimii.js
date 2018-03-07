$(function () {
	
	var win_width = $(document).width() < $("body").width() ? $(document).width() : $("body").width(),
		win_height = $(window).height() < 670 ? 670 : $(window).height(),
		contents = $(".b-content").children(), 									
		buttons = $(".b-button-btn").children(),
		li_margin_rt = (win_width-640-180)/2,
		index = 0;
	
	var ts = 10;
	//初始化大小
	initSize();

	function initSize(){
		$(".main").css({
			"height":(win_height-120)+"px",
			"width":win_width
		});
		$(".b-content").css({
			"width":win_width*contents.length+"px",		
			"margin-left":win_width,
			"padding-left":(win_width-640)/2+"px",
			"padding-top":(win_height-120-430-90)/2+"px"
		});
		$(".b-side").css({
			"top":(win_height-120-400-90)/2+"px"
		});
	}
	
	//调整窗口大小事件
//	$(window).resize(function(){
//		win_width = $(document).width() < $("body").width() ? $(document).width() : $("body").width(),
//		win_height = $(window).height() < 670 ? 670 : $(window).height(),
//		contents = $(".b-content").children(), 									
//		buttons = $(".b-button-btn").children(),
//		li_margin_rt = (win_width-640-180)/2;
//
//		initSize();
//	})


	//页面开始动画
	startAnime();
	
	function startAnime(){
		var welcome_words = $(".welcome-words");

		welcome_words.children().eq(0).animate({opacity:"1",paddingTop:"0"},150*ts,function(){
			welcome_words.children().eq(1).animate({opacity:"1",paddingTop:"0"},150*ts,function(){
				welcome_words.children().eq(2).animate({opacity:"1",paddingTop:"0"},150*ts,function(){
					$(".nav").animate({top:"0"},100*ts);
					$(".b-button").animate({opacity:"1"},100*ts,function(){
						$(".b-content").animate({marginLeft:"0"},100*ts,function(){
							welcome_words.hide();
							$(".b-side-right").show();
						});
					});
				});
			});
		});
	}
	


	//banner

	//banner绑定事件
	for(var i=0; i<buttons.length; i++){

		//设置li右外边距
		contents.eq(i).css("margin-right",li_margin_rt+"px");
		
		//设置内容模块定位
		$(".m-content").children().eq(i).css({
			"left":(win_width)/2+"px",
			"top":(win_height)/2+"px"
		});
		
		//按钮点击事件
		buttons.eq(i).on("click",function(){
			index = buttons.index($(this));
			//隐藏显示侧栏
			sideHide();
			//按钮样式切换
			setClass();
			//点击移动动画		
			banMove();
			//设置btn选中颜色
			setBtnColor();
			//btn under动画
			btnUnderMove();
		});
		
		//按钮hover事件
		btnHover();

		//con-selected事件

		//content鼠标移入移出动画
		mouseInOut();

		//li点击事件
		contents.eq(i).on("click",function(){
			index = contents.index($(this));		
			//检测是否为选中项
			if( $(this).hasClass("con-selected") ){
				$(this).children(".title").stop().animate({marginTop:"-250px"},"fast");
				$(this).children(".num").stop().animate({top:"110%"},"fast",function(){
					$(".m-content").children().eq(index).show().animate({
						width:win_width+"px",
						height:win_height+"px",
						top:0,
						left:0
					},function(){
						$(".m-close").animate({top:"30px"},function(){
							$(".m-content").children().eq(index).children().fadeIn();
						});
					});
				});				
			}

		});
	}//banner绑定事件结束

	//点击banner side移动banner

	//向左
	$(".b-side-left").on("click",function(){
		index = buttons.index($(".b-button-btn").children(".btn-selected"));
		sideHide();
		index -= 1;							
		//按钮样式切换
		setClass();
		//点击移动动画		
		banMove();
		//设置btn颜色
		setBtnColor();
		//banner导航按钮under动画
		btnUnderMove();
		if(index==0)$(this).hide();
		if(index<8)$(".b-side-right").show();
	});
	//向右
	$(".b-side-right").on("click",function(){
		index = buttons.index($(".b-button-btn").children(".btn-selected"));
		sideHide();
		index += 1;
		//按钮样式切换
		setClass();
		//点击移动动画		
		banMove();
		//设置btn颜色
		setBtnColor();
		//banner导航按钮under动画
		btnUnderMove();
		if(index==8)$(this).hide();
		if(index>0)$(".b-side-left").show();
	});
	
	//点击X关闭详情页
	$(".m-close").on("click",function(){
		close();
	});
	//点击logo关闭详情页
	$(".nav-logo").on("click",function(){
		close();
	});
	
	//nav下拉菜单
	navMenuToggle();
	navMenuTitles();


	
	//banner每个li独立事件
	
	//b-one
	contents.eq(0).mouseenter(function(){
			if( $(this).hasClass("con-selected") ){
				$(this).children(".b-one-img1").stop().animate({left:"-150px"},"fast");
				$(this).children(".b-one-img2").stop().animate({right:"-180px"},"fast");			
			}
		}).mouseleave(function(){
				$(this).children(".b-one-img1").stop().animate({left:"-500px"},"fast");
				$(this).children(".b-one-img2").stop().animate({right:"-500px"},"fast");		
		}).click(function(){
			if( $(this).hasClass("con-selected") ){
				$(this).children(".b-one-img1").stop().animate({left:"-500px"},"fast");
				$(this).children(".b-one-img2").stop().animate({right:"-500px"},"fast");
			}
		});
		
	//b-two
	var timer;
	contents.eq(1).mouseenter(function(){
			if( $(this).hasClass("con-selected") ){
				$(this).children(".b-two-titAnime").show();
				snakeMove();
			}
		}).mouseleave(function(){
				$(this).children(".b-two-titAnime").hide();
				clearInterval(timer);
				$(".b-two-snake").css("left",0);
				$(".die-svg").hide();		
		}).click(function(){
			if( $(this).hasClass("con-selected") ){
				$(this).children(".b-two-titAnime").hide();
				clearInterval(timer);
				$(".b-two-snake").css("left",0);
				$(".die-svg").hide();
			}
		});
		

    //b-three
    // var timerFood;
    // contents.eq(2).mouseenter(function(){
    // 	$(".b-three-svg").show();
    // 	function randomFood(){
	   //  	index = ~~(Math.random()*10);
	   //  	$(".b-three-svg").children().eq(index).css({
	   //  		"left":~~(Math.random()*650)+"px",
	   //  		"top":~~(Math.random()*390)+"px",
	   //  		"opacity":"1"
	   //  	});
    // 	}
    // 	timerFood = setInterval(randomFood,500);
    	
    // }).mouseleave(function(){
    // 	$(".b-three-svg").hide();
    // 	clearInterval(timerFood);
    // });
	    


    //每个模块详情页
	
	//m-one
	
	//设置m-one详情页中各个模块间距
	$(".m-one-block").children().css({
		"height":win_height+"px",
		"width":win_width+"px"
	});
	//blocks居中
	$(".m-one-block").children().children(".m-one-outer").css("margin-left",(win_width-1366)/2+"px");	
	//当宽度大于2500时imgs和p宽高660px
	if(win_width >= 1920)$(".m-one-imgs,.m-one-p").css({
		"width":"660px",
		"height":"660px"
	});
	
	//点击复制邮箱地址
	$(".m-one-last-inright1").on("click",function(){
		$(this).siblings().children().select();
		document.execCommand("Copy");
		alert("邮箱地址已复制");
	})

	//m-one页面滚动变色、动画		
	mOneAnime();
	
	function mOneAnime(){
		var img1 = $(".m-one-img1"),
			img2 = $(".m-one-img2"),
			img3 = $(".m-one-img3");		

		$(".m-one").scroll(function(){		
			//实时变化的 窗口滚动条
			var win_st = $(this).scrollTop();
						
            //元素将要偏移的值	
            var shift_img1 = -50-win_st/4 <= -90 ? -90 : -50-win_st/4,
            	shift_top_img2 = 260-win_st/3 <= 200 ? 200 : 260-win_st/3,
            	shift_right_img2 = 620+win_st/4 >= 680 ? 680 : 620+win_st/4,
            	shift_img3 = 450-win_st <= 200 ? 200 : 450-win_st;           
            //移动动画
            img1.css("transform","translate3d("+shift_img1+"px,70px,0px) rotate(18deg)");
            img2.css("transform","translate3d("+shift_right_img2+"px,"+shift_top_img2+"px,0px) rotate(-20deg)")
            img3.css("transform","translate3d(-390px,"+shift_img3+"px,0) rotate(12deg)");
                  
            var blocks = (~~((win_st+win_height/2)/win_height))%3;           
            //背景颜色随滚动条变化
            
            if($(".m-one-block").height()-1.5*win_height <= win_st){	            	
            	$(".m-one").css("background-color","#fff");
            }else{
            	$(".m-one").css("background-color",["#00affa","#32e1e1","#fac8fa"][blocks]);
            }
		});
	}


	
	//m-two
	
	//贪吃蛇开始、重试事件
    $(".start-snakes").on("click",function(){
    	$(this).hide();
    	StartSnake();
    });
    $(".retry-snakes").on("click",function(){
    	$(this).parent().hide();
    	StartSnake();
    });
    $(".close-snakes").on("click",function(){
    	$(this).parent().hide();
    	$(".start-snakes").show();
    });
    
    //m-three
    //$(".b-three").on("click",function(){mThreeAnime()});
    
//  function mThreeAnime(){
//		var timerFood;
//	    	alert("do");
//	    	randomFood();
//	    	timerFood = setInterval(randomFood,500);
//	    	//clearInterval(timerFood);
//	  
//	    
//   	function randomFood(){
//	     	index = ~~(Math.random()*10);
//	     	$(".m-three-lunch").children().eq(index).css({
//	     		"left":~~(Math.random() * win_width)+"px",
//	    		"top":~~(Math.random() * win_height)+"px",
//	  			"opacity":"1"
//	     	});
//   	}
//  
//  }






	//隐藏最前最后的side
	function sideHide(){
		switch(index){
			case 0:
				$(".b-side-left").hide();
				$(".b-side-right").show();
			 	break;
			case 8:
			 	$(".b-side-right").hide();
			 	$(".b-side-left").show();
			 	break;
			default:
			 	$(".b-side-left").show();
			 	$(".b-side-right").show();
		}
	}

	//banner移动动画
	function banMove(){
		$(".b-content").stop().animate({
					"left":-(contents.eq(index).width()+li_margin_rt)*index+"px"//设定移动距离
				},500,"swing");
	}

	//banner导航按钮hover变色
	function btnHover(){
		buttons.eq(i).hover(function(){
			var point = buttons.index($(this));
			if (!buttons.eq(point).hasClass("btn-selected")){
				buttons.eq(point).css("color",["#00affa","#32e1e1","#fac8fa"][point % 3]);
			}
		},function(){
			var point = buttons.index($(this));
				if (!buttons.eq(point).hasClass("btn-selected")){
				buttons.eq(point).css("color","#003264");
			}
		});
	}

	//banner导航按钮under动画
	function btnUnderMove(){
		$(".b-button-under").stop().animate({
			"left":34*index+"px"
		},500,"swing",function(){
			$(this).css("background-color",["#00affa","#32e1e1","#fac8fa"][index % 3]);
		});
	}
	
	
	//内容模块关闭按钮	
	function close(){		
		index = contents.index($(".b-content").children(".con-selected"));
		$(".m-close").animate({top:"-1000px"});			
		contents.eq(index).children(".num").css("top","120%");
		$(".m-content").children().eq(index).children().fadeOut(function(){
			$(".m-content").children().eq(index).stop().animate({
				width:0,
				height:0,
				left:(win_width)/2+"px",
				top:(win_height)/2+"px"
			},function(){
				$(".m-content").children().hide();
				contents.eq(index).children(".num").animate({top:"50%"},"fast");
			});
		});				
	}

	
	//nav下拉菜单 Menu按钮点击事件
	function navMenuToggle(){
		var nav_menu_main = $(".nav-menu-main");
		$(".nav-menu").on("click",function(){
			//切换改变menu按钮图标
			$(this).children().toggle();			
			//隐藏m模块关闭按钮
			$(".m-close").hide();
			//获取下拉菜单高度
			nav_menu_main.css("height",win_height+"px").stop().slideToggle(function(){			
				//打开下拉菜单后，内容淡入
				if(nav_menu_main.css("display") != 'none'){
					nav_menu_main.children().fadeIn(600);
					nav_menu_main.children(".nav-menu-content").css({
						"height":win_height-175+"px"
					});
				}else{
					nav_menu_main.children().hide();
					$(".m-close").show();
				}
			});
		});
	}	

	//navMenuTitle点击切换tab事件
	function navMenuTitles(){
		var titles = $(".nav-menu-title").children("p"),
			contents = $(".nav-menu-content").children();
		//绑定点击事件		
		for(i=0;i<titles.length;i++){
			titles.eq(i).on("click",function(){
				index = titles.index($(this));
				//设置class和切换动画
				for(i=0;i<titles.length;i++){
					titles.eq(i).removeClass("active");
					contents.eq(i).stop().fadeOut(300);
				}
				titles.eq(index).addClass("active");
				contents.eq(index).stop().delay(300).fadeIn(300);
			})
		}
	}
	
	//点击切换class函数	
	function setClass(){
		for(var i=0; i<buttons.length; i++){
			buttons.eq(i).removeClass("btn-selected");
			contents.eq(i).removeClass("con-selected");
		}
		buttons.eq(index).addClass("btn-selected");
		contents.eq(index).addClass("con-selected");
	}

	//设置btn不一样的颜色
	function setBtnColor(){
		buttons.css("color","#003264");
		if (buttons.eq(index).hasClass("btn-selected")) {				
			buttons.eq(index).css("color",["#00affa","#32e1e1","#fac8fa"][index % 3]);
		}
	}

	//鼠标移入移出动画函数
	function mouseInOut(){
		contents.eq(i).mouseenter(function(){
			if( $(this).hasClass("con-selected") ){
				$(this).stop().animate({width:"690px",height:"430px",marginLeft:"-25px",marginRight:li_margin_rt-25+"px",marginTop:"0"},"fast");
				$(this).children(".num").stop().animate({fontSize:"50px",top:"80%"},"fast");
				$(this).children(".title").show().stop().animate({marginTop:"0"},"fast");			
			}
		}).mouseleave(function(){
				$(this).stop().animate({width:"640px",height:"400px",marginLeft:"0",marginRight:li_margin_rt+"px",marginTop:"15px"},"fast");
				$(this).children(".num").stop().animate({fontSize:"120px",top:"50%"},"fast");
				$(this).children(".title").show().stop().animate({marginTop:"-260px"},"fast");			
		});
	}







	//banner-li上简易贪吃蛇动画
	function snakeMove(){
			timer = setInterval(move,100);
			var left = parseInt($(".b-two-snake").css("left"));
			function move(){
				if ( left < 537){
					left += 22;
					$(".b-two-snake").css("left",left+"px");
				}else{
					$(".die-svg").show().children().css("opacity","1");
					clearInterval(timer);				
				}
			}
		}

	//m-two详情页内贪吃蛇
	function StartSnake(){
		var ctx = $('#snakes').get(0).getContext("2d"),
			arrSnake = [0],
			food = 1, 
	    	next = 1, 
	    	n;
	    //清除画布
	    (function(){
	    	ctx.clearRect(0,0,800,500);
	    })();
	    //倒计时
	    (function(){

	    })();
	    //绘图函数
	    function draw(l, c) {//l为长度，c为颜色
	        ctx.fillStyle = c;  
	        ctx.fillRect(l % 40 * 20 + 1, ~~(l / 40) * 20 + 1, 18, 18); 
	    }

		//键盘事件
		document.onkeydown = function(e) {  
			n = [ -1, -40, 1, 40 ][e.keyCode - 37];
	        next = arrSnake[1] - arrSnake[0] == n ? next : n; 
	    }; 

	    function init() { 
	        arrSnake.unshift(n = arrSnake[0] + next); 
	        draw(n, "#727000");//绘制蛇
	        //alert("n="+n+",next="+next+","+arrSnake[1]+arrSnake[0]);//测试
	        if (arrSnake.indexOf(n, 1) > 0 || n < 0 || n > 999 || next == 1 && n % 40 == 0 || next == -1 && n % 40 == 39){        	
	        	return $(".retry-snakes-outer").show();
	        }            
	        if (n == food) {  
	            while (arrSnake.indexOf(food = ~~(Math.random() * 1000)) >= 0); //在蛇外生成食物
	            draw(food, "#727000"); //绘制食物
	        } else {
	            draw(arrSnake.pop(), "#c6d000"); //取蛇尾删除并涂黑
	        } 
	        setTimeout(arguments.callee, 150);
	    }
	    init();
	}


}); //All end
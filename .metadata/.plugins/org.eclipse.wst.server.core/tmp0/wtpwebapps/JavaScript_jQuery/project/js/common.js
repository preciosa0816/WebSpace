(function(win,$){
	var $html=$("html");
	var deviceSize={ // 반응형 웹의 중단점에 사용할 값
			pc:1009,
			tablet:801,
			mobile:800			
	};
	function scrollShowHide(status){// 매개변수에 전달된 값이 scroll이면 스크롤바생성+ 너비값 반환
		$html.css({"overflow-y":status});
		return $html.width();
	}
	
	var sc_w1=scrollShowHide("hidden"),
		sc_w2=scrollShowHide("scroll"),
		sc_w3=sc_w1-sc_w2;
	
	if(sc_w3>0){
		deviceSize.pc=diviceSize.pc-sc_w3;
		deviceSize.tablet=diviceSize.tablet-sc_w3;
		deviceSize.mobile=diviceSize.mobile-sc_w3;
	}
	// console.log(deviceSize.pc);
	
	$(win).on("resize",function(){// 브라우저의 창 너비가 변하면 창의 너비를 w_size에 저장
		var w_size=$(win).width();
		// 브라우저의 창 너비가 데스크톱의 너비보다 크거나 같을 경우
		if(w_size>=deviceSize.pc&&!$("html").hasClass("pc")){
			$html.removeClass("mobile tablet").addClass("pc");
			scrollShowHide("scroll");
			// 태블릿 사이즈인 경우
		}else if(w_size<deviceSize.pc&&w_size>=deviceSize.tablet&&!$("html").hasClass("tablet")){
			$html.removeClass("mobile pc").addClass("tablet");
			scrollShowHide("scroll");
			// 모바일 사이즈인 경우
		}else if(w_size<=deviceSize.mobile&&!$html.hasClass("mobile")){
			$html.removeClass("pc tablet").addClass("mobile");
			var menu_pos = parseInt($(".mobile-menu-wrap").css("left"));
			if(menu_pos>=0){
				scrollShowHide("hidden");
			}
		}
		
	});
	
	$(function(){// 문서 로딩시 resize이벤트 발생.설정한 중단점에 맞는 class값 생성
		$(win).trigger("resize");
	$(document).on("mouseover focus",".pc #gnb>ul>li>a, .tablet #gnb>ul>li>a",gnbPlay);
	$(document).on("click",".mobile #gnb>ul>li:not(.no-sub)>a",gnbPlay);
	
	function gnbPlay(){
		var $ts=$(this);
		if($("html").hasClass("mobile")){
			$(".mobile #gnb>ul>li>a").removeClass("on");
			$("#gnb ul ul:visible").slideUp(300);
			if($ts.next().is(":hidden")){
				$ts.addClass("on");
				$ts.next().stop(true,true).slideDown(300);
			}
		}else{
			$("#gnb ul ul:visible").slideUp(300);
			$ts.next().stop(true,true).slideDown(300);
		}
	}
	$(document).on("mouseleave",
			".pc #gnb, .tablet #gnb",gnbleave);
		function gnbleave(){
			$("#gnb ul ul:visible").sliceUp(300);
			$("#gnb>ul>li>a").removeClass("on");
		}
		$(".mobile-menu-open button").on("click",function(){
			$(".mobile-menu-wrap").animate({"left":0},200);
			scrollShowHide("hidden");
		});
		
		$(".mobile-menu-close button").on("click",function(){
			$(".mobile-menu-wrap").animate({"left":"-1000px"},200);
			scrollShowHide("scroll");
			gnbleave();
		});
	});
	
	
}(window, jQuery));
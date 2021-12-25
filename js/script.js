/*===========================================================*/
/* ドロップダウンメニュー（写真付 上ナビ）*/
/*===========================================================*/
function mediaQueriesWin(){
	const width = $(window).width();
	if(width <= 850) {//横幅が850px以下の場合
		$(".has-child>a").off('click');	//has-childクラスがついたaタグのonイベントを複数登録を避ける為offにして一旦初期状態へ
		$(".has-child>a").on('click', function() {
			const parentElem =  $(this).parent();// aタグから見た親要素の<li>を取得し
			$(parentElem).toggleClass('active');//矢印方向を変えるためのクラス名を付与して
			$(parentElem).children('ul').stop().slideToggle(500);//liの子要素のスライドを開閉させる※数字が大きくなるほどゆっくり開く
			return false;//リンクの無効化
		});
	}else{//横幅が850px以上の場合
		$(".has-child>a").off('click');//has-childクラスがついたaタグのonイベントをoff(無効)にし
		$(".has-child>a").removeClass('active');//activeクラスを削除
		$('.has-child').children('ul').css("display","");//スライドトグルで動作したdisplayも無効化にする
	}
}

/*===========================================================*/
/* クリックしたら円形背景が拡大（左上から）*/
/*===========================================================*/
$(".openbtn").click(function () {
	$(this).toggleClass('active');
    $("#g-nav").toggleClass('panelactive');
    $(".circle-bg").toggleClass('circleactive');
});

$("#g-nav a").click(function () {
    $(".openbtn").removeClass('active');
    $("#g-nav").removeClass('panelactive');
    $(".circle-bg").removeClass('circleactive');
});

/*===========================================================*/
/*ページの指定の高さを超えたら下から出現*/
/*===========================================================*/
//スクロールした際の動き
function PageTopAnime() {
	const scroll = $(window).scrollTop(); //スクロール値を取得
	if (scroll >= 200){
		$('#page-top').removeClass('DownMove');
		$('#page-top').addClass('UpMove');
	}else{
		if($('#page-top').hasClass('UpMove')){
			$('#page-top').removeClass('UpMove');
			$('#page-top').addClass('DownMove');
		}
	}
	
	const wH = window.innerHeight; //画面の高さを取得
	const footerPos =  $('#footer').offset().top; //footerの位置を取得
	if(scroll+wH >= (footerPos+10)) {
		var pos = (scroll+wH) - footerPos+10
		$('#page-top').css('bottom',pos);	//#page-topに上記の値をCSSのbottomに直接指定してフッター手前で止まる
	}else{//それ以外は
		if($('#page-top').hasClass('UpMove')){
			$('#page-top').css('bottom','10px');
		}
	}
}

// #page-topをクリックした際の設定
$('#page-top').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 500);
    return false;
});

/*===========================================================*/
/* ツールチップ*/
/*===========================================================*/
tippy('.cap', {
	placement: 'top-start',
	animation: 'shift-toward-subtle',
	duration: 200,
}
)

/*===========================================================*/
/* Slick_Slider */
/*===========================================================*/
$('.slider').slick({
		autoplay: true,//自動的に動き出すか。初期値はfalse。
		infinite: true,//スライドをループさせるかどうか。初期値はtrue。
		speed: 500,//スライドのスピード。初期値は300。
		slidesToShow: 3,//スライドを画面に3枚見せる
		slidesToScroll: 1,//1回のスクロールで1枚の写真を移動して見せる
		prevArrow: '<div class="slick-prev"></div>',//矢印部分PreviewのHTMLを変更
		nextArrow: '<div class="slick-next"></div>',//矢印部分NextのHTMLを変更
		centerMode: true,//要素を中央ぞろえ
		variableWidth: true,//幅の違う画像の高さを揃えて表示
		dots: true,//下部ドットナビゲーションの表示
	});

/*===========================================================*/
/* 順番に現れる（CSS x jQuery）*/
/*===========================================================*/
function delayScrollAnime() {
	var time = 0.2;//遅延時間を増やす秒数の値
	var value = time;
	$('.delayScroll').each(function () {
		var parent = this;//親要素を取得
		var elemPos = $(this).offset().top;//要素の位置まで来たら
		var scroll = $(window).scrollTop();//スクロール値を取得
		var windowHeight = $(window).height();//画面の高さを取得
		var childs = $(this).children();	//子要素
		
		if (scroll >= elemPos - windowHeight && !$(parent).hasClass("play")) {//指定領域内にスクロールが入ったらまた親要素にクラスplayがなければ
			$(childs).each(function () {
				if (!$(this).hasClass("flipRight")) {//アニメーションのクラス名が指定されているかどうかをチェック
					$(parent).addClass("play");	//親要素にクラス名playを追加
					$(this).css("animation-delay", value + "s");//アニメーション遅延のCSS animation-delayを追加
					$(this).addClass("flipRight");
					value = value + time;//delay時間を増加
					
					//全ての処理を終わったらplayを外す
					var index = $(childs).index(this);
					if((childs.length-1) == index){
						$(parent).removeClass("play");
					}
				}
			})
		}else {
			$(childs).removeClass("flipRight");
			value = time;//delay初期値の数値に戻す
		}
	})
}
/*===========================================================*/
/* 要素の動き */
/*===========================================================*/
function fadeAnime(){
	//下から
$('.fadeUpTrigger').each(function(){
		const elemPos = $(this).offset().top-50;
		const scroll = $(window).scrollTop();
		const windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
			$(this).addClass('fadeUp');// 画面内に入ったらfadeUpというクラス名を追記
			}else{
			$(this).removeClass('fadeUp');// 画面外に出たらfadeUpというクラス名を外す
			}
		});

	//上から
$('.fadeDownTrigger').each(function(){
		const elemPos = $(this).offset().top-50;
		const scroll = $(window).scrollTop();
		const windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
			$(this).addClass('fadeDown');
			}else{
			$(this).removeClass('fadeDown');
			}
		});
}

/*===========================================================*/
/* 関数まとめ */
/*===========================================================*/
// ページがリサイズされたら動かしたい場合の記述
$(window).resize(function() {
	mediaQueriesWin();/* ドロップダウンメニュー（写真付 上ナビ）*/
});

// 画面をスクロールで動作
$(window).scroll(function () {
	PageTopAnime();
    fadeAnime();
	delayScrollAnime();
});

// ページが読み込まれた動作
$(window).on('load', function () {
	mediaQueriesWin();/* ドロップダウンメニュー（写真付 上ナビ）*/
	PageTopAnime();
    fadeAnime();
	delayScrollAnime();

	// アコーディオン 
	$(".open").each(function(index, element){
		const Title =$(element).children('.title');
		$(Title).addClass('close');
		const Box =$(element).children('.box');
		$(Box).slideDown(500);
	});
});

// ページ内リンク
$('#g-nav a[href*="#"]').click(function () {
	const elmHash = $(this).attr('href');
	const pos = $(elmHash).offset().top-100;
	$('body,html').animate({scrollTop: pos}, 500);
	return false;
});

// ページ外リンク
$(window).on('load', function() {
	const headerHight = 100;
	if(document.URL.match("#")) {
		const str = location.href ;
		const cut_str = "#";
		const index = str.indexOf(cut_str);
		const href = str.slice(index);
		const target = href;
		const position = $(target).offset().top - headerHight;
		$("html, body").animate({scrollTop:position}, 500,"swing");
		return false;
	}
});

/*===========================================================*/
/*機能編 5-1-3 ドロップダウンメニュー（写真付 上ナビ）*/
/*===========================================================*/
//ドロップダウンの設定を関数でまとめる
function mediaQueriesWin(){
	var width = $(window).width();
	if(width <= 850) {//横幅が850px以下の場合
		$(".has-child>a").off('click');	//has-childクラスがついたaタグのonイベントを複数登録を避ける為offにして一旦初期状態へ
		$(".has-child>a").on('click', function() {//has-childクラスがついたaタグをクリックしたら
			var parentElem =  $(this).parent();// aタグから見た親要素の<li>を取得し
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
/*機能編 5-1-10スクロールすると位置が固定して追従*/
/*===========================================================*/

// $(window).on('load resize', function() {
// 	var windowWidth = window.innerWidth;
// 	var elements = $('.sub-fix-block');//position: sticky;を指定している要素
// 	if (windowWidth >= 1020) {/*1020px以上にIE用のJSをきかせる*/
// 		Stickyfill.add(elements);
// 	}else{
// 		Stickyfill.remove(elements);
// 	} 
// });

/*===========================================================*/
/*機能編 5-1-22 クリックしたら円形背景が拡大（左上から）*/
/*===========================================================*/

$(".openbtn").click(function () {//ボタンがクリックされたら
	$(this).toggleClass('active');//ボタン自身に activeクラスを付与し
    $("#g-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
    $(".circle-bg").toggleClass('circleactive');//丸背景にcircleactiveクラスを付与
});

$("#g-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".openbtn").removeClass('active');//ボタンの activeクラスを除去し
    $("#g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスを除去
    $(".circle-bg").removeClass('circleactive');//丸背景のcircleactiveクラスを除去
});

/*===========================================================*/
/*機能編 8-1-2 ページの指定の高さを超えたら下から出現*/
/*===========================================================*/
//スクロールした際の動きを関数でまとめる
function PageTopAnime() {

	var scroll = $(window).scrollTop(); //スクロール値を取得
	if (scroll >= 200){//200pxスクロールしたら
		$('#page-top').removeClass('DownMove');		// DownMoveというクラス名を除去して
		$('#page-top').addClass('UpMove');			// UpMoveというクラス名を追加して出現
	}else{//それ以外は
		if($('#page-top').hasClass('UpMove')){//UpMoveというクラス名が既に付与されていたら
			$('#page-top').removeClass('UpMove');	//  UpMoveというクラス名を除去し
			$('#page-top').addClass('DownMove');	// DownMoveというクラス名を追加して非表示
		}
	}
	
	var wH = window.innerHeight; //画面の高さを取得
	var footerPos =  $('#footer').offset().top; //footerの位置を取得
	if(scroll+wH >= (footerPos+10)) {
		var pos = (scroll+wH) - footerPos+10 //スクロールの値＋画面の高さからfooterの位置＋10pxを引いた場所を取得し
		$('#page-top').css('bottom',pos);	//#page-topに上記の値をCSSのbottomに直接指定してフッター手前で止まるようにする
	}else{//それ以外は
		if($('#page-top').hasClass('UpMove')){//UpMoveというクラス名がついていたら
			$('#page-top').css('bottom','10px');// 下から10pxの位置にページリンクを指定
		}
	}
}

// #page-topをクリックした際の設定
$('#page-top').click(function () {
    $('body,html').animate({
        scrollTop: 0//ページトップまでスクロール
    }, 500);//ページトップスクロールの速さ。数字が大きいほど遅くなる
    return false;//リンク自体の無効化
});

/*===========================================================*/
/*機能編 9-3-1ツールチップ*/
/*===========================================================*/

tippy('.cap', {//指定した要素にツールチップが出現
	placement: 'top-start',//ツールチップの表示位置⇒top、top-start、top-end、right、right-start、right-end、bottom、bottom-start、bottom-end、left、left-start、left-end。指定をしなくてもtopに表示
	animation: 'shift-toward-subtle',//ツールチップ出現の動き。動きを指定するにはhttps://unpkg.com/browse/tippy.js@5.0.3/animations/から任意の動きを選び<head>内に読み込むことが必要。使用できる動き⇒shift-away、shift-away-subtle、shift-away-extreme、shift-toward、shift-toward-subtle、shift-toward-extreme、scale、scale-subtle、scale-extreme、perspective、perspective-subtle、perspective-extreme。指定をしなくてもfadeで表示
	//theme: 'light-border',//ツールチップのテーマの色。色を指定するにはhttps://unpkg.com/browse/tippy.js@5.0.3/themes/からテーマを選び<head>内に読み込んで指定する。テーマの種類⇒light、light-border、material、translucent。指定をしなくても黒色で表示
	duration: 200,//ツールチップの出現の速さをミリ秒単位で指定
}
)

/*===========================================================*/
/*機能編 6-1-7	複数画像を中央に注目させて見せる*/
/*===========================================================*/

$('.slider').slick({
		autoplay: true,//自動的に動き出すか。初期値はfalse。
		infinite: true,//スライドをループさせるかどうか。初期値はtrue。
		speed: 500,//スライドのスピード。初期値は300。
		slidesToShow: 3,//スライドを画面に3枚見せる
		slidesToScroll: 1,//1回のスクロールで1枚の写真を移動して見せる
		prevArrow: '<div class="slick-prev"></div>',//矢印部分PreviewのHTMLを変更
		nextArrow: '<div class="slick-next"></div>',//矢印部分NextのHTMLを変更
		centerMode: true,//要素を中央ぞろえにする
		variableWidth: true,//幅の違う画像の高さを揃えて表示
		dots: true,//下部ドットナビゲーションの表示
	});


/*===========================================================*/
/*印象編 4-12 順番に現れる（CSS x jQuery）*/
/*===========================================================*/

function delayScrollAnime() {
	var time = 0.2;//遅延時間を増やす秒数の値
	var value = time;
	$('.delayScroll').each(function () {
		var parent = this;					//親要素を取得
		var elemPos = $(this).offset().top;//要素の位置まで来たら
		var scroll = $(window).scrollTop();//スクロール値を取得
		var windowHeight = $(window).height();//画面の高さを取得
		var childs = $(this).children();	//子要素
		
		if (scroll >= elemPos - windowHeight && !$(parent).hasClass("play")) {//指定領域内にスクロールが入ったらまた親要素にクラスplayがなければ
			$(childs).each(function () {
				
				if (!$(this).hasClass("flipRight")) {//アニメーションのクラス名が指定されているかどうかをチェック
					
					$(parent).addClass("play");	//親要素にクラス名playを追加
					$(this).css("animation-delay", value + "s");//アニメーション遅延のCSS animation-delayを追加し
					$(this).addClass("flipRight");//アニメーションのクラス名を追加
					value = value + time;//delay時間を増加させる
					
					//全ての処理を終わったらplayを外す
					var index = $(childs).index(this);
					if((childs.length-1) == index){
						$(parent).removeClass("play");
					}
				}
			})
		}else {
			$(childs).removeClass("flipRight");//アニメーションのクラス名を削除
			value = time;//delay初期値の数値に戻す
		}
	})
}
/*===========================================================*/
/* 印象編 4 最低限おぼえておきたい動き*/
/*===========================================================*/

// 動きのきっかけの起点となるアニメーションの名前を定義
function fadeAnime(){

	//4-1 ふわっ（下から）
    
$('.fadeUpTrigger').each(function(){ //fadeUpTriggerというクラス名が
		var elemPos = $(this).offset().top-50;//要素より、50px上の
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
		$(this).addClass('fadeUp');// 画面内に入ったらfadeUpというクラス名を追記
		}else{
		$(this).removeClass('fadeUp');// 画面外に出たらfadeUpというクラス名を外す
		}
		});

	//4-1 ふわっ（上から）

$('.fadeDownTrigger').each(function(){ //fadeDownTriggerというクラス名が
		var elemPos = $(this).offset().top-50;//要素より、50px上の
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
		$(this).addClass('fadeDown');// 画面内に入ったらfadeDownというクラス名を追記
		}else{
		$(this).removeClass('fadeDown');// 画面外に出たらfadeDownというクラス名を外す
		}
		});
}

/*===========================================================*/
/* 関数をまとめる*/
/*===========================================================*/

// ページがリサイズされたら動かしたい場合の記述
$(window).resize(function() {
	mediaQueriesWin();/*機能編  5-1-3 ドロップダウンメニュー（写真付 上ナビ）の関数を呼ぶ*/
});

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
	PageTopAnime();/*機能編  8-1-2 ページの指定の高さを超えたら下から出現の関数を呼ぶ*/
    fadeAnime();/* 印象編 4 最低限おぼえておきたい動き*/
	delayScrollAnime();/* 印象編 4-12 順番に現れる（CSS x jQuery）関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
	mediaQueriesWin();/*機能編  5-1-3 ドロップダウンメニュー（写真付 上ナビ）の関数を呼ぶ*/
	PageTopAnime();/*機能編  8-1-2 ページの指定の高さを超えたら下から出現の関数を呼ぶ*/
    fadeAnime();/* 印象編 4 最低限おぼえておきたい動き*/
	delayScrollAnime();/* 印象編 4-12 順番に現れる（CSS x jQuery）関数を呼ぶ*/

    /*機能編 9-2-1 任意の場所をクリックすると隠れていた内容が開くの読み込み*/
	$(".open").each(function(index, element){	//openクラスを取得
		var Title =$(element).children('.title');	//openクラスの子要素のtitleクラスを取得
		$(Title).addClass('close');				//タイトルにクラス名closeを付与し
		var Box =$(element).children('.box');	//openクラスの子要素boxクラスを取得
		$(Box).slideDown(500);					//アコーディオンを開く
	});
});

// ページ内リンク
$('#g-nav a[href*="#"]').click(function () {
	var elmHash = $(this).attr('href'); //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
	var pos = $(elmHash).offset().top-100;	//idの上部の距離を取得
	$('body,html').animate({scrollTop: pos}, 500); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
	return false;
});

// ページ外リンク
$(window).on('load', function() {
	var headerHight = 100; //ヘッダの高さ
	if(document.URL.match("#")) {
	var str = location.href ;
	var cut_str = "#";
	var index = str.indexOf(cut_str);
	var href = str.slice(index);
	var target = href;
	var position = $(target).offset().top - headerHight;
	$("html, body").animate({scrollTop:position}, 500,"swing");
	return false;
}
});

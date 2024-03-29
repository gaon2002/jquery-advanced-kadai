$(function(){

// メインビジュアルをカルーセルにする
$('.mainVisual').slick({
  autoplay: true,
  dots: true,
  infinite: true,
  speed: 500,
  fade: true,
  cssEase: 'linear'
});

// リンクのホバー時に不透明度をアニメーションで変更する
$('a').hover(
  function() {  
  $(this).animate({'opacity': 0.5},300); //$(this)は特定のイベントハンドラ内で使用され、クリックされた要素を指す。
},function() {  
  $(this).animate({'opacity': 1},300)
});


//$(document).on('click, blur’, ’HTML要素, HTML要素’, function(){ 関数 })
// 1回目の処理
// $(document).on('mouseenter', 'a', function() {  //on()だとhover関数が効かない？
//   $(this).css('opacity', '0.5'); //$(this)は特定のイベントハンドラ内で使用され、クリックされた要素を指す。
// }).on('mouseleave', 'a', function() {
//   $(this).css('opacity', '1'); //元に戻す
// });



// スクロールしたときにTOPに戻るボタンを表示させる

$(window).on('scroll', function(){
  if ($(window).scrollTop() >= 100) {       //現在のスクロール位置を取得
    $('#top').css('visibility', 'visible');
  } else {
    $('#top').css('visibility', 'hidden');
  }
});

// ページ内リンクのスクロールをなめらかにする
$(document).on('click','a[href^="#"]', function() { //'#'のある<a>要素をクリックしたときに発生するイベント
  // e.preventDefault();                 //通常クリックしたら発生するデフォルトの動作をキャンセル
  const href = $(this).attr('href');  //ページ内リンクを取得：<a>(=$(this))のhref属性値(=リンク先)を取得
  const speed = 500;
  let $target;
  if (href == '#'){                   //リンクが'#'だったら、'html'にしてTOPに戻る
    $target = $('html');
  }else{
    $target = $(href);                //そうでなければ、クリックしたリンク先を指定
  }
  //$(要素).offset().top：要素の上の縁の位置を取得するメソッド。  
  const position = $target.offset().top ;
  //html 要素と body 要素をアニメーションでスクロールするイベント関数
  // ブラウザによってhtml要素またはbody要素のどちらかにしか対応していないため、両方を対象にする
  $('html, body').animate({
    //scrollTop: 垂直方向でどこまでスクロールするのか位置を指定するプロパティ。
    //$(element：position = $target (= html or href))の上部の位置にスクロールするように指示。
    // swing：jQueryのアニメーションメソッドにおけるイージング（easing）の一種。
    // 'swing'イージング：アニメーションが始まるときに徐々に速度を上げ、終わりに近づくにつれて速度を下げる効果。
    'scrollTop': position }, speed, 'swing');
    //それ以降の処理を中断し、イベントの伝播（でんぱん）を防ぐ
    return false;
  });
})

// スクロールしたときにセクションをフェードインさせる
$(window).on('scroll', function(){
  let scrollTop = $(window).scrollTop()  //現在のスクロール位置を取得
  let windowHeight = $(window).height()  //現在のブラウザウィンドウの高さ（ピクセル単位）を取得
  $('section').each(function(){
    let position = $(this).offset().top //各セクションの上部までの位置を取得・・・毎回一の情報をとらないといけないので、式の中にメソッドを入れておく必要がある
    // 現在のスクロール位置がそのセクション上部からウィンドウの高さを引いて100px加算した高さを越えたら
    // ウィンドウの高さ分を差し引く理由は、もともと画面表示されているスクロール量を差し引いかないとかなり下にスクロールするまで表示されないから。
    if (scrollTop >= position - windowHeight + 200) {
        //それぞれのセクションにクラスを追加する
        $(this).addClass('active'); 
    };
  });
});


// 1回目：　about、worksそれぞれでフェードインを作成していた。
// // スクロールしたときにセクションをフェードインさせる(about)
// $(window).on('scroll', function(){
//   let scrollTop = $(window).scrollTop()  //現在のスクロール位置を取得
//   let windowHeight = $(window).height()  //現在のブラウザウィンドウの高さ（ピクセル単位）を取得
//   let aboutTop = $('#about').offset().top //#aboutセクションの上部までの位置を取得
//   // 現在のスクロール位置とブラウザウィンドウの高さの合計がaboutセクションまでスクロールした時に
//   if (scrollTop + windowHeight >= aboutTop - windowHeight + 100) {
//       //#aboutにクラスを追加する　※.activeとやってしまうと.activeというclassをすべて削除してしまう
//       $('#about').addClass('active'); 
//   };
// });

// // スクロールしたときにセクションをフェードインさせる(works)
// $(window).on('scroll', function(){
//   let scrollTop = $(window).scrollTop()  //現在のスクロール位置を取得
//   let windowHeight = $(window).height()  //現在のブラウザウィンドウの高さ（ピクセル単位）を取得
//   let worksTop = $('#works').offset().top //#worksセクションの上部までの位置を取得
//   // 現在のスクロール位置とブラウザウィンドウの高さの合計がworksセクションまでスクロールした時に
//   if (scrollTop >= worksTop - windowHeight) {
//       //#worksにクラスを追加する
//       $('#works').addClass('active'); 
//   };
// });


// Worksの画像をクリックしたときにモーダルで拡大表示する
$(document).on('click','.worksImg img', function() {
  // attr()メソッドを使い、クリックされた画像のsrc属性の値を取得する
  const worksPic = $(this).attr('src');  //クリックされたリンクのsrc属性値を取得
  console.log(worksPic);
  $('.worksMimg').attr('src', worksPic); //モーダルの画像部分（img要素）のsrc属性に取得した値を追加する
  // $('.worksMordal').css('display', 'inline'); //1回目のコード
  $('.worksMordal').fadeIn(); //fadeIn関数を使えば簡単
  return false;
});

// ✕ボタンを押したら画面を閉じる
$(document).on('click','.closeButton', function() {
  // ✕ボタンのクリックを検知しているか確認するために、コンソールにメッセージを出力
  console.log("Close button clicked");
  // //worksMordalを非表示にする。　なお、closeButtonのクリックにデフォルト動作がないのでe.preventDefault()は不要
  // $('.worksMordal').css('display', 'none'); //1回目のコードクリックしたら非表示にする
  $('.worksMordal').fadeOut();
  return false;
});

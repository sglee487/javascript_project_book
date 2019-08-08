var banner = document.getElementById('banner'), // 배너 본체
    img = banner.getElementsByTagName('img'),   // 풍선 스프라이트 이미지 객체
    toggle = document.getElementById('toggle'),     // 배너를 열고 닫는 토글 버튼 객체
    sound_btn = document.getElementById('sound_btn');   // 사운드를 끄고 켜는 토글 버튼 객체

var banner_height = getComputedStyle(banner).height;    // 배너의 높이 값 변수
var cast = [];  // 풍선 스프라이트 객체를 정의할 배열

// 풍선 객체 생성 함수
function set_balloon(num) {
    // 풍선의 속성 값을 랜덤을 생성
    var x = Math.floor(Math.random() * (500 - 10) + 10),    // 10에서 500 사이의 값
        y = Math.floor(Math.random() * (400 - 120) + 120),
        size = Math.floor(Math.random() * (200 - 100) + 100),
        angle = Math.floor(Math.random() * (360 - 0) + 0),
        speed = Math.random() * (2-0) + 0;

    // 풍선 객체
    cast[num] = {
        x: x,   // 풍선의 x 좌표
        y: -y,  // 풍선의 y 좌표(배너 상단 밖에서 출현하므로 -값 적용)
        size: size, // 풍선의 크기
        angle: angle,   // 풍선의 초기 회전 각도 값
        speed: speed    // 풍선이 떨어지는 속도
    };
}

// 풍선 객체 초기화 함수
function ball_init() {
    for(var i = 0; i < img.length; i++){
        set_balloon(i);
        img[i].style.left = '-9999px';  // 풍선의 x 좌표 . 초기화면에서 풍선이 화면 내에 표시되지 않도록 화면 밖 임의의 좌표 값 지정
        img[i].style.top = '-9999px';   // 풍선의 y 좌표
    }
}

ball_init();

// 풍선 애니메이션 함수
function animate_balloon() {
    for(var i = 0; i < img.length; i++){
        // 풍선 속성 변경
        img[i].style.left = cast[i].x + 'px';   // x 좌표
        img[i].style.top = cast[i].y + 'px';    // y 좌표
        img[i].style.transform = 'rotate(' + cast[i].angle + 'deg)';    // 회전

        // 풍선이 화면 안에 있으면
        if(cast[i].y < parseInt(banner_height)){
            cast[i].y += 1 + cast[i].speed;
            cast[i].angle += cast[i].speed;
        } else { // 풍선이 화면 밖으로 나가면
            set_balloon(i);
        }
    } // end for
} // end move_ballon()

function bgm_init() {
    var bgm = new Audio();
    bgm.src = 'images/bgm.mp3';
    bgm.loop = true;
    document.body.appendChild(bgm);
}
/* ----------------------------- */
// 메인
ball_init();
setInterval(function () {animate_balloon();}, 1000/30);
bgm_init();
{
    var list = document.getElementById('list');
    var li = document.createElement('li'); // 문서 객체 추가

    li.innerHTML = 'new list'; // li 객체에 text 추가
    list.appendChild(li);       // 목록에 li 객체 추가
}

/* --------------------------- */
// 사운드 버튼 이벤트 핸들러
sound_btn.onclick = function (event) { // 이벤트 버블링 방지를 위해 매개변수 추가
    var attr = sound_btn.getAttribute('class'); // 사운드 버튼의 class 속성
    var bgm = document.getElementsByTagName('audio');   // audio 객체

    if(attr == 'active'){
        // 사운드 off
        sound_btn.removeAttribute('class'); // 클래스 제거
        sound_btn.setAttribute('src','images/sound_off.png');   // 버튼 이미지 교체
        bgm[0].pause(); // bgm 정지
    } else {
        // 사운드 on
        sound_btn.setAttribute('class', 'active');
        sound_btn.setAttribute('src', 'images/sound_on.png');
        bgm[0].play();  // bgm 재생
    }
    event.stopPropagation(); // 이벤트 버블링 차단
}

// 배너 열기/닫기 버튼 이벤트 핸들러
toggle.onclick = function () {
    var attr = banner.getAttribute('class') // 배너 객체 class 속성

    if(attr == 'active'){
        // 배너 닫기
        banner.removeAttribute('class');
        toggle.innerHTML = '배너 열기'; // 버튼 text 변경
        return false;
    } else {
        // 배너 열기
        banner.setAttribute('class','active');
        toggle.innerHTML = '배너 닫기';
        return false;
    }
};

// 배너 링크 처리
banner.onclick = function () {
    window.open('https://csslick.github.io','_black');  // 새 창 열기
    // _black 새창, _self 현재 창
    // window.open(url, option) 메서드
    // location.href = URL . 속성. 현재 페이지에서 지정된 URL로 이동
}
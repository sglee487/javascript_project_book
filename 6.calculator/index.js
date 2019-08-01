// 변수 선언
var inp = document.forms['cal'];
var input = inp.getElementsByTagName('input');
var cls_btn = document.getElementsByClassName('cls_btn')[0];
var result_btn = document.getElementsByClassName('result_btn')[0];

// 계산기 초기화(clear)
function clr() {
    inp['result'].value = 0;
}

// 계산기 입력 처리 함수
function calc(value) {
    // 입력이 들어가면 0을 지움
    if(inp['result'].value == 0){
        inp['result'].value = '';
    }

    // 입력 값을 결과창에 출력
    inp['result'].value += value;
}

// 계산 결과 처리 함수
function my_result(){
    var result = document.forms['cal']['result'];
    var calc = eval(result.value);

    // 결과 창에 표시
    inp['result'].value = calc;
}

for(var i = 0; i < input.length; i++) {

    // 숫자와 사칙 연산자만 입력 처리
    if(input[i].value != '=' && input[i].value != 'clear'){
        input[i].onclick = function () {
            calc(this.value);
        }
    }
}

// 초기화 버튼
cls_btn.onclick = function () {
    clr();
}

// 결과 버튼
result_btn.onclick = function () {
    try{
        my_result();
    }
    catch (err) {
        var result = inp['result'];
        result.value = "입력 오류";
    }
}
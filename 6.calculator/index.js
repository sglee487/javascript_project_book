var $inp = $('form[name=cal]');
var $input = $inp.find('input');
var $cls_btn = $('.cls_btn');
var $result_btn = $('.result_btn');
var $result = $inp.find('input[name=result]');

$('input').click(function () {
    var $input_value = $(this).val();

    // 숫자와 사칙 연산자만 입력 처리
    if($input_value != '=' && $input_value != 'clear'){
        calc($input_value)
    }
});

// 초기화 버튼
$('.cls_btn').click(function () {
    clr();
});

// 결과 버튼
$('.result_btn').click(function () {
    try{
        my_result();
    }
    catch (err) {
        $result.val('입력 오류');
    }
});

function calc(value) {
    // 입력이 들어가면 0을 지움
    if($result.val() == 0){
        $result.val('');
    }

    var val = $result.val() + value;
    $result.val(val);
}

function clr() {
    $result.val(0)
}

function my_result() {
    var calc = eval($result.val());

    $result.val(calc)
}

result_btn.onclick = function () {
    try {
        my_result()
    }
    catch (err) {
        var result = inp['result'];
        result.value = '입력 오류';
    }
}
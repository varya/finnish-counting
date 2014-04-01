steroids.view.navigationBar.show("Finnish Counting");

var range = [1, 999];

var getNumber = function() {
    return Math.round(Math.random() * (range[1] - range[0]) + range[0]);
}

var getSet = function() {

    var res = [], len = 0;
    while (len < 6) {
        var rand = getNumber();
        if (res.indexOf(rand) > -1) continue;
        res.push(rand);
        len++;
    }
    return res;

}

var refresh = function() {

    var numbers = getSet();

    var html = [];
    for (var i = 0; i < numbers.length; i++) {
        html.push('<li class="numbers-list__item" data-value="' + numbers[i] + '">' +
            '<div class="number">' +
            numbers[i] +
            '</div>' +
            '</li> ');
    }

    for(var i = 0; i < 10; i++) {
        html.push('<li class="numbers-list__sizer"></li>');
    }

    $('.numbers-list').html(html.join(''));

}

$(function(){

    $('.numbers-list').on('click', '.numbers-list__item', function(e){
        var number = $(e.currentTarget).attr('data-value');
        playNumber(number);
    });

    $('.again').on('click', function(){
        refresh();
    });

    refresh();

});



var playNumber = function(number) {
    number = number || getNumber();
    playAudio("http://translate.google.com/translate_tts?tl=fi&q=" + number);
}

// Audio player
//
var my_media = null;

// Play audio
//
function playAudio(src) {
    // Create Media object from src
    my_media = new Media(src, onSuccess, onError);

    // Play audio
    my_media.play();

}

// onSuccess Callback
//
function onSuccess() {
    console.log("playAudio():Audio Success");
}

// onError Callback
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
}

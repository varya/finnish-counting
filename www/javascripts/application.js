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
    $('.log').text(number);
}

// Audio player
        //
        var my_media = null;
        var mediaTimer = null;

        // Play audio
        //
        function playAudio(src) {
            // Create Media object from src
            my_media = new Media(src, onSuccess, onError);

            // Play audio
            my_media.play();

            // Update my_media position every second
            if (mediaTimer == null) {
                mediaTimer = setInterval(function() {
                    // get my_media position
                    my_media.getCurrentPosition(
                        // success callback
                        function(position) {
                            if (position > -1) {
                                setAudioPosition((position) + " sec");
                            }
                        },
                        // error callback
                        function(e) {
                            console.log("Error getting pos=" + e);
                            setAudioPosition("Error: " + e);
                        }
                    );
                }, 1000);
            }
        }

        // Pause audio
        //
        function pauseAudio() {
            if (my_media) {
                my_media.pause();
            }
        }

        // Stop audio
        //
        function stopAudio() {
            if (my_media) {
                my_media.stop();
            }
            clearInterval(mediaTimer);
            mediaTimer = null;
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

        // Set audio position
        //
        function setAudioPosition(position) {
            document.getElementById('audio_position').innerHTML = position;
        }



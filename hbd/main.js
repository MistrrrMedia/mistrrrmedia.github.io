var h_audio = document.getElementById("her_song");
var play = document.getElementById("play")
var pause = document.getElementById("pause")

function toggle_music() {
    if( h_audio.paused ) {
        h_audio.play();
        play.style.display = "none";
        pause.style.display = "block";
    }
    
    else { 
        h_audio.pause();
        play.style.display = "block";
        pause.style.display = "none";
    }
}


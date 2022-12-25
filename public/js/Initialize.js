import { Game } from "./Game.js";
import { ADDRESS } from "./script.js";

class Initialize {

    static LOADER = {
        MINIMAL_TIME: 500,
        START: Date.now(),
        ANIMATION_TIME: 500,
        SMOOTH_TRANSITION: true
    };

    static player() {

        $.ajax({
            type: "POST",
            url: ADDRESS.URL,
            data: {
                action: "initialize"
            },
            dataType: "json",
            success: (response) => {
                if (response.success) {
                    Game.initialize(response.data.player);
                }
                this.showGame();
            },
            error: (xhr) => {
                console.log("Error:", xhr);
            }
        });
    }

    static showGame() {
        // TRANSITION FROM LOADER TO GAME
        if (this.LOADER.SMOOTH_TRANSITION) {
            setTimeout(() => {
                $("#loader").fadeOut(this.LOADER.ANIMATION_TIME);
                $("#game").fadeIn(this.LOADER.ANIMATION_TIME);
            }, this.LOADER.START - Date.now() + this.LOADER.MINIMAL_TIME);
        } else {
            $("#loader").hide();
            $("#game").show();
        }
    }

}

export { Initialize };
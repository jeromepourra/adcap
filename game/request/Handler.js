const Player = require("../Player");

module.exports = class Handler {

    body;
    static RESPONSE = {success: false};

    constructor(body) {
        this.body = body;
    }

    /**
     * 
     * @param {Player} player 
     */
    dispatch(player) {
        if (Object.hasOwnProperty.call(this.body, "action"))
            switch(this.body.action) {
                case "initialize":
                    player.onInitialize();
                    break;
                case "stand-run":
                    player.onStandRun(this.body.stand);
                    break;
                case "stand-upgrade":
                    player.onStandUpgrade(this.body.stand);
                    break;
                default:
                    Handler.RESPONSE_ERROR("Handler() -> body action:" + this.body.action + " is unknown");
                    break;
            }
        else {
            Handler.RESPONSE_ERROR("Handler() -> body doesn't have key action");
        }
        return Handler.RESPONSE;
    }

    static RESPONSE_SUCCESS(data) {
        this.RESPONSE = {success: true, data: data};
    }
    static RESPONSE_ERROR(message) {
        this.RESPONSE = {success: false, message: message};
    }
}
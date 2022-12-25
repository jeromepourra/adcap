import { Initialize } from "./Initialize.js";

const ADDRESS = new function() {
    this.HOST = "localhost";
    this.PORT = 3000;
    this.URL = `http://${this.HOST}:${this.PORT}`;
}

const REFRESH = new function() {
    this.STOCK_PILE = [];
    this.FPS = 60;
    this.INTERVAL = 1000 / this.FPS;
}

const AVERAGE_FPS = new function() {
    this.DATE = Date.now();
    this.RESET_TIME = 1000;
    this.RESET_DATE = this.DATE + this.RESET_TIME
    this.ELEMENT = document.querySelector("#fps > span");
    this.CALL_NB = 0;
    this.AVERAGE = undefined;
    this.calculate = () => {
        let now = Date.now();
        this.CALL_NB++;
        this.AVERAGE = Math.round(1000 / ((now - this.DATE) / this.CALL_NB));
        if (now >= this.RESET_DATE) {
            this.ELEMENT.textContent = this.AVERAGE
            this.reset();
        }
    }
    this.reset = () => {
        this.DATE = Date.now();
        this.RESET_DATE = this.DATE + this.RESET_TIME
        this.CALL_NB = 0;
        this.AVERAGE = undefined;
    }
}

setInterval(function() {
    REFRESH.STOCK_PILE.forEach((item, index) => {
        if (Object.hasOwnProperty.call(item, "call")) {
            let complete = item.call();
            if (complete) {
                if (Object.hasOwnProperty.call(item, "finish")) {
                    item.finish();
                }
                REFRESH.STOCK_PILE.splice(index, 1);
            }
        } else {
            console.error("Error: item on stock pile has no function name call()");
        }
    });
    AVERAGE_FPS.calculate();
}, REFRESH.INTERVAL);

Initialize.player();

export { ADDRESS, REFRESH };
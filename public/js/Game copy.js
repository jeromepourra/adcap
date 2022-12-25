import { numFormat, numRounded } from "./functions.js";
import { ADDRESS, REFRESH } from "./script.js";

class Game {

    static id;
    static name;
    static money;
    static stands;
    static elements;

    /**
    * 
    * @param {{id: number, name: string, money: number, stands: {}}} player
    */
    static initialize(player) {
        this.id = player.id;
        this.name = player.name;
        this.money = player.money;
        this.stands = player.stands;
        this.elements = {
            money: document.querySelector("#money > span"),
            stands: {}
        }
        for (let id in this.stands) {
            let container = document.querySelector("#stand-" + id);
            this.elements.stands[id]           = {};
            this.elements.stands[id].container = container;
            this.elements.stands[id].run       = container.querySelector(".stand-name");
            this.elements.stands[id].buy       = container.querySelector(".stand-buy");
            this.elements.stands[id].level     = container.querySelector(".stand-level");
            this.elements.stands[id].cost      = container.querySelector(".cost > span");
            this.elements.stands[id].time      = container.querySelector(".stand-time > span");
            this.elements.stands[id].progress  = container.querySelector(".stand-progress > .stand-progress-bar");
            this.createEventListenner(id);
            if (this.stands[id].run) {
                let stand = this.stands[id];
                this.standRun(id, stand.runtimer.start, stand.runtimer.end, stand.revenu);
            }
            this.initializeStandLevel(id);
            this.initializeStandCost(id);
        }
        this.initializeMoney();
        console.log(this);
    }

    /**
     * 
     * @param {number} id 
     */
    static createEventListenner(id) {
        this.elements.stands[id].run.addEventListener("click", () => {
            $.ajax({
                type: "POST",
                url: ADDRESS.URL,
                data: {
                    stand: id,
                    action: "stand-run"
                },
                dataType: "json",
                success: (response) => {
                    if (response.success) {
                        this.standRun(id, response.data.start, response.data.end, response.data.revenu);
                    }
                    console.log(response);
                },
                error: (xhr) => {
                    console.log("Error:", xhr);
                }
            });
        });
        this.elements.stands[id].buy.addEventListener("click", () => {
            $.ajax({
                type: "POST",
                url: ADDRESS.URL,
                data: {
                    stand: id,
                    action: "stand-upgrade"
                },
                dataType: "json",
                success: (response) => {
                    if (response.success) {
                        this.updateStand(id, response.data.level, response.data.cost, response.data.revenu)
                    }
                    console.log(response);
                },
                error: (xhr) => {
                    console.log("Error:", xhr);
                }
            });
        });
    }

    static initializeMoney() {
        this.money = numRounded(this.money);
        REFRESH.STOCK_PILE.push({
            call: () => {
                this.elements.money.textContent = numFormat(this.money);
                this.setBuyButtonStyle();
                return true;
            }
        });
    }

    /**
     * 
     * @param {number} id 
     */
    static initializeStandLevel(id) {
        REFRESH.STOCK_PILE.push({
            call: () => {
                this.elements.stands[id].level.textContent = this.stands[id].level;
                this.setRunButtonStyle(id);
                return true;
            }
        });
    }

    /**
     * 
     * @param {number} id 
     */
    static initializeStandCost(id) {
        this.stands[id].cost = numRounded(this.stands[id].cost);
        REFRESH.STOCK_PILE.push({
            call: () => {
                this.elements.stands[id].cost.textContent = numFormat(this.stands[id].cost);
                return true;
            }
        });
    }

    /**
     * 
     * @param {number} value 
     */
    static updateMoney(value) {
        this.money = numRounded(this.money + value);
        REFRESH.STOCK_PILE.push({
            call: () => {
                this.elements.money.textContent = numFormat(this.money);
                this.setBuyButtonStyle();
                return true;
            }
        });
    }

    /**
     * 
     * @param {number} id 
     * @param {number} level 
     * @param {{old: number, new: number}} cost
     * @param {number} revenu 
     */
    static updateStand(id, level, cost, revenu) {
        this.updateMoney(cost.old * -1);
        this.updateStandCost(id, cost.new);
        this.updateStandLevel(id, level);
        this.updateStandRevenu(id, revenu);
    }

    /**
     * 
     * @param {number} cost 
     */
    static updateStandCost(id, cost) {
        this.stands[id].cost = numRounded(cost);
        REFRESH.STOCK_PILE.push({
            call: () => {
                this.elements.stands[id].cost.textContent = numFormat(this.stands[id].cost);
                return true;
            }
        });
    }

    /**
     * 
     * @param {number} level 
     */
    static updateStandLevel(id, level) {
        this.stands[id].level = level;
        REFRESH.STOCK_PILE.push({
            call: () => {
                this.elements.stands[id].level.textContent = this.stands[id].level;
                this.setRunButtonStyle(id);
                return true;
            }
        });
    }

    /**
     * 
     * @param {number} revenu 
     */
    static updateStandRevenu(id, revenu) {
        this.stands[id].revenu = numRounded(revenu);
    }

    /**
     * 
     * @param {number} id 
     * @param {number} start 
     * @param {number} end 
     * @param {number} revenu 
     */
    static standRun(id, start, end, revenu) {
        REFRESH.STOCK_PILE.push({
            call: () => {
    
                let now = Date.now();
    
                // PROGRESS UPDATE
                let percent = 100 * (now - start) / (end - start);
                if (percent < 100) {
                    this.elements.stands[id].progress.style.width = percent + '%';
                } else {
                    this.elements.stands[id].progress.style.width = '0%';
                }
    
                // TIME UPDATE
                let left = end - now;
                if (left > 0) {
                    let hrs = Math.floor(left / (60 * 60 * 1000)).toString().padStart(2, "0");
                    let min = (Math.floor(left / (60 * 1000)) % 60).toString().padStart(2, "0");
                    let sec = (Math.floor(left / 1000) % 60).toString().padStart(2, "0");
                    let tenth = Math.floor((left % 1000) / 100).toString().padStart(1, "0");
                    this.elements.stands[id].time.textContent = `${hrs}:${min}:${sec}.${tenth}`;
                } else {
                    this.elements.stands[id].time.textContent = '00:00:00.0';
                }
    
                // RETURN COMPLETE
                if (percent < 100 && left > 0) {
                    return false;
                }
                return true;
            },
            finish: () => {
                // this.updateMoney(revenu);
                this.updateMoney(this.stands[id].revenu);
            }
        });
    }

    /**
     * 
     * @param {number} id 
     */
    static setRunButtonStyle(id) {
        if (this.stands[id].level < 1) {
            this.elements.stands[id].run.classList.add("disable")
        } else {
            this.elements.stands[id].run.classList.remove("disable")
        }
    }

    static setBuyButtonStyle() {
        for (let id in this.stands) {
            let stand = this.stands[id];
            if (stand.cost > this.money) {
                this.elements.stands[id].buy.classList.add("disable")
            } else {
                this.elements.stands[id].buy.classList.remove("disable")
            }
        }
    }

}

export { Game };
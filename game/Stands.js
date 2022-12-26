const Handler = require("../request/handler");
const Constants = require("./Constants");
const Player = require("./Player");

module.exports = class Stands {

    run;
    runtimer;
    level;
    cost;
    revenu;
    data;

    /**
     * @param {{id: number, name: string, initial_level: number, initial_cost: number, coefficient_cost: number,initial_time: number, initial_revenu: number, revenu_per_second: number}} data
     */
    constructor(data) {
        this.data = data;
        this.run = false;
        this.runtimer = {start: undefined, end: undefined};
        this.time = data.initial_time;
        this.level = data.initial_level;
        this.cost = this.calculateCost();
        this.revenu = this.calculateRevenu();
    }

    calculateCost() {
        let cost = this.data.initial_cost * Math.pow(this.data.coefficient_cost, this.level);
        return Math.round(cost * 100) / 100;
    }

    calculateRevenu() {
        let revenu = this.data.initial_revenu * this.level;
        return Math.round(revenu * 100) / 100;
    }

    setRun() {
        this.run = true;
        this.runtimer.start = Date.now();
        this.runtimer.end = this.runtimer.start + this.time * 1000;
        setTimeout(() => {
            this.run = false;
            console.log("Stands.setRun() -> name:" + this.data.name + " run:" + this.run);
        }, this.runtimer.end - this.runtimer.start);

        let date = new Date(this.runtimer.end);
        let hrs = date.getHours().toString().padStart(2, "0");
        let min = date.getMinutes().toString().padStart(2, "0");
        let sec = date.getSeconds().toString().padStart(2, "0");
        let mil = date.getMilliseconds().toString().padStart(3, "0");
        console.log("Stands.setRun() -> name:" + this.data.name + " run:" + this.run + " finish:[" + hrs + ":" + min + ":" + sec + "." + mil + "]");
    }

    setUpgrade() {
        this.level++;
        this.cost = this.calculateCost();
        this.revenu = this.calculateRevenu();
        console.log("Stands.setUpgrade() -> name:" + this.data.name + " level:" + this.level + " cost:" + this.cost + " revenu:" + this.revenu);
    }

    onRun() {
        if (!this.run) {
            if (this.level > 0) {
                this.setRun();
                Handler.RESPONSE_SUCCESS({start: this.runtimer.start, end: this.runtimer.end});
                return true;
            } else {
                Handler.RESPONSE_ERROR("Stand.onRun() -> stand:" + this.data.name + " level:" + this.level + " must be purchased before launched");
            }
        } else {
            Handler.RESPONSE_ERROR("Stand.onRun() -> stand:" + this.data.name + " already run");
        }
        return false;
    }

    /**
     * 
     * @param {number} money 
     */
    onUpgrade(money) {
        let cost = this.cost
        if (money >= cost) {
            this.setUpgrade();
            Handler.RESPONSE_SUCCESS({level: this.level, cost: {old: cost, new: this.cost}, revenu: this.revenu});
            return true;
        } else {
            Handler.RESPONSE_ERROR("Stand.onUpgrade() -> stand:" + this.data.name + " money:" + money + " cost:" + this.cost + " you can't buy this stand because you don't have enough money");
            return false;
        }
    }

}
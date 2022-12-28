const Handler = require("./request/Handler");
const Constants = require("./Constants");
const Stands = require("./Stands");

module.exports = class Player {
    
    id;
    name;
    money;
    stands;

    constructor() {

        this.id = 0;
        this.name = "";
        this.money = Constants.INITIAL_MONEY;
        this.stands = {};
        
        Constants.STANDS_DATA.forEach(standData => {
            let stand = new Stands(standData);
            this.stands[stand.data.id] = stand;
        });

    }

    onInitialize() {
        Handler.RESPONSE_SUCCESS({player: this});
    }

    /**
     * 
     * @param {number} value 
     */
    updateMoney(value) {
        this.money = Math.round((this.money + value) * 100) / 100;
        console.log("Player.updateMoney() -> money:" + this.money + " value:" + value);
    }

    /**
     * 
     * @param {number} id 
     */
    onStandRun(id) {
        if (Object.hasOwnProperty.call(this.stands, id)) {
            let stand = this.stands[id];
            let run = stand.onRun();
            if (run) {
                setTimeout(() => {
                    this.updateMoney(stand.revenu);
                }, stand.runtimer.end - stand.runtimer.start);
            }
        } else {
            Handler.RESPONSE_ERROR("Player.onStandRun() -> standId:" + id + " not exists");
        }
    }

    /**
     * 
     * @param {number} id 
     */
    onStandUpgrade(id) {
        if (Object.hasOwnProperty.call(this.stands, id)) {
            let stand = this.stands[id];
            let cost = this.stands[id].cost;
            let upgrade = stand.onUpgrade(this.money);
            if (upgrade) {
                this.updateMoney(cost * -1);
            }
        } else {
            Handler.RESPONSE_ERROR("Player.onStandUpgrade() -> standId:" + id + " not exists");
        }
    }

}
module.exports = class Constants {

    static DECIMAL_PLACE = 2;
    static INITIAL_MONEY = 1000;
    static STANDS_DATA = [
        {
            id: 1,
            name: "Lemon Stand",
            initial_level: 1,
            initial_cost: 4 / 1.07,
            coefficient_cost: 1.07,
            initial_time: 0.6,
            initial_revenu: 1,
            revenu_per_second: 1.67
        },
        {
            id: 2,
            name: "Newspaper Delivery",
            initial_level: 0,
            initial_cost: 60,
            coefficient_cost: 1.15,
            initial_time: 3,
            initial_revenu: 60,
            revenu_per_second: 20
        },
        {
            id: 3,
            name: "Car Wash",
            initial_level: 0,
            initial_cost: 720,
            coefficient_cost: 1.14,
            initial_time: 6,
            initial_revenu: 540,
            revenu_per_second: 90
        },
        {
            id: 4,
            name: "Pizza Delivery",
            initial_level: 0,
            initial_cost: 8_640,
            coefficient_cost: 1.13,
            initial_time: 12,
            initial_revenu: 4_320,
            revenu_per_second: 360
        },
        {
            id: 5,
            name: "Donut Shop",
            initial_level: 0,
            initial_cost: 103_680,
            coefficient_cost: 1.12,
            initial_time: 24,
            initial_revenu: 51_840,
            revenu_per_second: 2160
        },
        {
            id: 6,
            name: "Shrimp Boat",
            initial_level: 0,
            initial_cost: 1_244_160,
            coefficient_cost: 1.11,
            initial_time: 96,
            initial_revenu: 622_080,
            revenu_per_second: 6_480
        },
        {
            id: 7,
            name: "Hockey Team",
            initial_level: 0,
            initial_cost: 14_929_920,
            coefficient_cost: 1.10,
            initial_time: 384,
            initial_revenu: 7_464_960,
            revenu_per_second: 19_440
        },
        {
            id: 8,
            name: "Movie Studio",
            initial_level: 0,
            initial_cost: 179_159_040,
            coefficient_cost: 1.09,
            initial_time: 1_536,
            initial_revenu: 89_579_520,
            revenu_per_second: 58_320
        },
        {
            id: 9,
            name: "Bank",
            initial_level: 0,
            initial_cost: 2_149_908_480,
            coefficient_cost: 1.08,
            initial_time: 6_144,
            initial_revenu: 1_074_954_240,
            revenu_per_second: 174_960
        },
        {
            id: 10,
            name: "Oil Company",
            initial_level: 0,
            initial_cost: 25_798_901_760,
            coefficient_cost: 1.07,
            initial_time: 36_864,
            initial_revenu: 29_668_737_024,
            revenu_per_second: 804_816
        }
    ];

}
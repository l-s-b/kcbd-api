const { SeedData, OilData, LotionData, MerchData } = require('./models').models;

module.exports = {
    "seedpack": {
        include: {
            model: SeedData,
            as: "seedpack"
        },
        setMethod: "setSeedpack"
    },
    "oil": {
        include: {
            model: OilData,
            as: "oil"
        },
        setMethod: "setOil"
    },
    "lotion": {
        include: {
            model: LotionData,
            as: "lotion"
        },
        setMethod: "setLotion"
    },
    "merch": {
        include: {
            model: MerchData,
            as: "merch"
        },
        setMethod: "setMerch"
    }
}
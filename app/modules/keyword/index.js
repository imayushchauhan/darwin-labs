//require node modules
const Co = require('co');

//require files
const BLManager = require('./bl-manager');

module.exports = {
    saveKeyword: Co.wrap(function *(req, res) {
        const keyword = req.body.keyword;

        let saveKeywordResponse = yield BLManager.saveKeyword(keyword);

        res.send(saveKeywordResponse);
    }),

    getKeywordList: Co.wrap(function *(req, res) {

        let getKeywordListResponse = yield BLManager.getKeywordList();

        res.send(getKeywordListResponse);
    })
};

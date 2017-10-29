//require node modules
const Mongoose = require('mongoose');
const Scraper = require ('images-scraper');
const Google = new Scraper.Google();
const Co = require('co');
const Jimp = require("jimp");

//require models
const Keyword = Mongoose.model('Keyword');

//require files
const Constants = require('../../libs/constants');
const Utility = require('../../libs/utils');

module.exports = {
    saveKeyword: Co.wrap(function *(keyword) {

        let scrapeImageFromGoogleResponse = yield this.scrapeImageFromGoogle(keyword);
        if(!scrapeImageFromGoogleResponse || !scrapeImageFromGoogleResponse.length){
            return Utility.getResponseObject(null, Constants.MSG.UNABLE_TO_FETCH_IMAGES_FROM_GOOGLE, Constants.CODE.ERROR_RESPONSE_CODE);
        }

        let mediaList = [];
        for(let imageObj of scrapeImageFromGoogleResponse){
            let compressAndFilterImageResponse = yield this.compressAndFilterImage(imageObj);
            if(compressAndFilterImageResponse && compressAndFilterImageResponse.length > 0){
                mediaList.push({
                    mediaName: compressAndFilterImageResponse,
                    mediaURL: 'images/' + compressAndFilterImageResponse
                });
            }
        }

        let queryObj = {
            name: keyword,
            isActive: 1,
            isDeleted: 0
        };

        let getKeywordObjResponse = [];
        try {
            getKeywordObjResponse = yield Keyword.getKeywordObj(queryObj, '', 0, 0);
        }catch(err){
            return Utility.getResponseObject(null, Constants.MSG.UNABLE_TO_GET_KEYWORD, Constants.CODE.ERROR_RESPONSE_CODE);
        }

        if(getKeywordObjResponse.length > 0) {
            let updateObj = {
                mediaList: mediaList,
                modifiedOn: (new Date()).getTime()
            };

            try {
                let updateKeywordObjResponse = yield Keyword.updateKeywordObj(queryObj, updateObj);
            }catch (err){
                return Utility.getResponseObject(null, Constants.MSG.UNABLE_TO_SAVE_KEYWORD, Constants.CODE.ERROR_RESPONSE_CODE);
            }
        }else{
            let keywordObj = new Keyword();

            keywordObj.name = keyword;
            keywordObj.mediaList = mediaList;
            keywordObj.addedOn = (new Date()).getTime();
            keywordObj.modifiedOn = (new Date()).getTime();

            try {
                let saveKeywordObjResponse = yield keywordObj.saveKeywordObj();
            } catch (err) {
                return Utility.getResponseObject(null, Constants.MSG.UNABLE_TO_SAVE_KEYWORD, Constants.CODE.ERROR_RESPONSE_CODE);
            }
        }

        return Utility.getResponseObject(null, Constants.MSG.KEYWORD_SAVED_SUCCESSFULLY, Constants.CODE.SUCCESS_RESPONSE_CODE);
    }),

    scrapeImageFromGoogle: Co.wrap(function *(keyword){

        let imageList = [];
        try {
            let keywordObj = {
                num: 15,
                detail: true,
                nightmare: {
                    show: true
                }
            };

            keywordObj.keyword = keyword;

            imageList = yield Google.list(keywordObj);
        }catch (err){
            return false;
        }

        return imageList;
    }),

    compressAndFilterImage: Co.wrap(function *(imageobj){

        let imageName = '';
        try {
            let image = yield Jimp.read(imageobj.url);

            imageName = (new (Date)).getTime() + '.png';

            image.resize(256, 256)
                    .quality(60)
                    .greyscale()
                    .write('images/' + imageName);

        }catch (err){
            return false;
        }

        return imageName;
    }),

    getKeywordList: Co.wrap(function *() {

        let queryObj = {
            isActive: 1,
            isDeleted: 0
        };

        let getKeywordObjResponse = [];
        try {
            getKeywordObjResponse = yield Keyword.getKeywordObj(queryObj, '', 0, 0);
        }catch(err){
            return Utility.getResponseObject(null, Constants.MSG.UNABLE_TO_GET_KEYWORD_LIST, Constants.CODE.ERROR_RESPONSE_CODE);
        }

        return Utility.getResponseObject(getKeywordObjResponse, Constants.MSG.KEYWORD_LIST_FETCHED_SUCCESSFULLY, Constants.CODE.SUCCESS_RESPONSE_CODE);
    }),
};

//require node modules
const Co = require('co');
const Mongoose = require('mongoose');

const KeywordSchema = new Mongoose.Schema({
    name: {type: String, default: ''},
    mediaList: [{
        mediaName: {type: String, default: ''},
        mediaURL: {type: String, default: ''}
    }],
    addedOn: {type: Number, default: 0},
    modifiedOn: {type: Number, default: 0},
    isActive: {type: Number, default: 1},
    isDeleted: {type: Number, default: 0},
});

KeywordSchema.method({
    saveKeywordObj: function() {
        return this.save();
    }
});

KeywordSchema.static({
    getKeywordObj: function(queryObj, selectionKey, offset, limit){
        return this.find(queryObj, selectionKey).skip(parseInt(offset)).limit(parseInt(limit)).exec();
    },
    updateKeywordObj: function (queryObj, updateObj) {
        return this.update(queryObj, {$set: updateObj}, {multi: true}).exec();
    },
});

/**
 * Register schema
 */
Mongoose.model('Keyword', KeywordSchema);

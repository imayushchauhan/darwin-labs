module.exports = {
    getResponseObject: function(responseData, message, code){
        return {
            responseData: responseData,
            message: message,
            code: code
        };
    }
};

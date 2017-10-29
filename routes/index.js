//require node modules
const Router = require('router');
const router = Router();

//require files
const KeywordController = require('../app/modules/keyword/index');

router.post('/save', KeywordController.saveKeyword);

router.get('/get-keyword-list', KeywordController.getKeywordList);

module.exports = router;

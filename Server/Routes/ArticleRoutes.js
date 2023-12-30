const Article = require('../Controllers/ArticleControllers')
const Router = require('express');
const router = Router();
const multer = require('multer');

// TODO : init a storage engine for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Uploads/'); // Ensure this directory exists
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

// TODO : upload function
const upload = multer({
    storage: storage,
    limits: { fieldSize: 10 * 1024 * 1024 },
});

router.post('/createArticle', upload.single('image'), Article.createArticle);
router.get('/getAllArticles', Article.getAllArticles);
router.get('/getArticleDetails/:articleID', Article.getArticleDetails);
router.put('/updateArtcile/:articleID', Article.updateArticle);
router.delete('/deleteArticle/:articleID', Article.deleteArticle);

module.exports = router;


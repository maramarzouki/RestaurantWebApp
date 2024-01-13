const Article = require('../Controllers/ArticleControllers')
const Router = require('express');
const router = Router();
const multer = require('multer');

const fs = require('fs');

// ...

// Ensure the 'Uploads' directory exists
// const uploadDirectory = './Uploads/';
// if (!fs.existsSync(uploadDirectory)) {
//     fs.mkdirSync(uploadDirectory);
// }

// // TODO: init a storage engine for multer
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadDirectory);
//     },
//     filename: function (req, file, cb) {
//         const originalname = file.originalname;
//         const extension = originalname.split('.').pop();
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
//     }
// });


// TODO : upload function
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fieldSize: 10 * 1024 * 1024 },
});



router.post('/createArticle', upload.single('file'), Article.createArticle);
router.get('/getAllArticles', Article.getAllArticles);
router.get('/getArticlesByCategory/:category', Article.getArticleByCategory)
router.get('/getArticleDetails/:articleID', Article.getArticleDetails);
router.put('/updateArticle/:articleID', upload.single('file'), Article.updateArticle);
router.delete('/deleteArticle/:articleID', Article.deleteArticle);

module.exports = router;


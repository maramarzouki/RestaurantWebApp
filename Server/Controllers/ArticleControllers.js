const Article = require('../Models/Article')
const path = require('path')
const fs = require('fs')
exports.createArticle = async (req, res) => {
    const { title, description, image, price, category } = req.body;
    try {
        console.log(req.file);
        if (req.file) {

            // imgData = req.file.originalname;
            // imgContentType = req.file.mimetype;
            imagePath = path.join(__dirname, "../Uploads", req.file.originalname)
            req.body.image = imagePath;

            try {
                fs.writeFileSync(imagePath, req.file.buffer)
            } catch (error) {
                res.status(500).send("Error saving image")
                console.log("ERROR", error);
            }
            new_article = await Article.create({ title, description, image: imagePath, price, category, });

        }
        console.log("ARTICLE", new_article);
        res.status(201).send(new_article);
    } catch (error) {
        res.status(500).send({ ERROR: error.message });
        console.log("REQBODY:", req.body);

    }
}

exports.getArticleDetails = async (req, res) => {
    try {
        const article = await Article.findById({ _id: req.params.articleID });
        if (article) {
            res.status(200).send(article);
        } else {
            res.status(404).send("Article not found!");
        }
    } catch (error) {
        res.status(500).send({ ERROR: error.message });
    }
}

exports.getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find({});
        if (articles) {
            res.status(200).send(articles)
        } else {
            res.status(204).send("No cotent found!")
        }
    } catch (error) {
        res.status(500).send({ ERROR: error.message });
    }
}

exports.getArticleByCategory = async (req, res) => {
    try {
        const articles = await Article.find({ category: req.params.category });
        if (articles.length > 0) {
            res.status(200).send(articles)
        } else {
            res.status(204).send({ ERR: "No article is found!" })
        }
    } catch (error) {
        res.status(500).send({ ERROR: error.message });
    }
}

exports.updateArticle = async (req, res) => {
    const updates = req.body;
    try {
        const article = await Article.findById({ _id: req.params.articleID })
        if (article) {
            console.log("REQ.FILE",req.file);
            if (req.file) {
                imagePath = path.join(__dirname, "../Uploads", req.file.originalname)
                req.body.image = imagePath;
    
                try {
                    fs.writeFileSync(imagePath, req.file.buffer)
                } catch (error) {
                    res.status(500).send("Error saving image")
                    console.log("ERROR", error);
                }    
            }
            await article.updateOne(updates)
                .then(() => res.status(200).send({msg:"Article updated successfully"}))
                .catch(error => res.status(400).send({ ERR: error.message }));
        } else {
            res.status(404).send({ ERROR: "Article not found!" })
        }
    } catch (error) {
        res.status(500).send({ ERROR: error.message });
    }
}

exports.deleteArticle = async (req, res) => {
    try {
        const result = await Article.findByIdAndDelete({ _id: req.params.articleID })
        if (result) {
            res.status(200).send({msg:"Article deleted!"});
        } else {
            res.status(404).send({msg:"Article not found!"});
        }
    } catch (error) {
        res.status(500).send({ ERROR: error.message })
    }
}
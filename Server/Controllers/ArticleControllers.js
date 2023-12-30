const Article = require('../Models/Article')

exports.createArticle = async (req, res) => {
    const { title, description, price, category } = req.body;
    // let imgData = null;
    // let imgContentType = null;
    try {
        // const imgData = new Buffer(image, 'base64');

        console.log(req.file);
        if (req.file) {
            
            imgData = req.file.buffer;
            imgContentType = req.file.mimetype;
        }
        // console.log(req.file);
        const new_article = await Article.create({
            title: req.body.title,
            description: req.body.description,
            image: {
                data: imgData,
                contentType: imgContentType
            },
            price: req.body.price,
            category: req.body.category
        });


        console.log("REQBODY:", req.body);
        console.log("ARTICLE", new_article);
        res.status(201).send(new_article);
    } catch (error) {
        res.status(500).send({ ERROR: error.message });
        console.log("REQBODY:", req.body);
        console.log("imgType",typeof(req.body.image))

    }
}

exports.getArticleDetails = async (req, res) => {
    try {
        const article = await Article.findById({ _id: req.params.articleID });
        if (article) {
            res.status(200).send({ Article: article });
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
            articles.map(article => {
                article.image = article.image.toString('base64');
            })
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
        const artcilesByCategory = await Article.find({ category: req.params.category });
        if (artcilesByCategory.length > 0) {
            res.status(200).send({ Article: artcilesByCategory })
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
            await article.updateOne(updates)
                .then(() => res.status(200).send("Article updated successfully"))
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
            res.status(200).send("Article deleted!");
        } else {
            res.status(404).send("Article not found!");
        }
    } catch (error) {
        res.status(500).send({ ERROR: error.message })
    }
}
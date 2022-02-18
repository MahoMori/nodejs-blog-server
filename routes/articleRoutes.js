const express = require("express");
const router = express.Router();

const blogController = require("../controllers/articleController");

router.get("/", blogController.getAllArticle);

router.get("/view-article/:articleId", blogController.getViewArticle);
router.post("/submit-comment", blogController.postSubmitComment);

router.get("/add-article", blogController.getAddArticle);
router.post("/add-article", blogController.postAddArticle);

router.get("/edit-delete-article/:articleId", blogController.getEditArticle);
router.post("/edit-article", blogController.postEditArticle);
router.post("/delete-article", blogController.postDeleteArticle);

module.exports = router;

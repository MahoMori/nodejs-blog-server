const Article = require("../models/article");

const getById = (articleId) => {
  return Article.findById(articleId, (err, data) => {
    if (err) console.log(err);
    return data;
  }).clone();
};

exports.getAllArticle = (req, res, next) => {
  Article.find((err, data) => {
    if (err) console.log(err);

    // res.render("index", {
    //   pageTitle: "Blog",
    //   articles: data,
    // });
    res.send(data);
  });
};

exports.getViewArticle = async (req, res, next) => {
  const { articleId } = req.params;

  const article = await getById(articleId);

  // res.render("view-article", {
  //   pageTitle: article.title,
  //   article: article,
  // });
  res.send(article);
};

exports.postSubmitComment = async (req, res, next) => {
  const { articleId, name, comment } = req.body;

  const article = await getById(articleId);

  article.comments.push({ name, comment });

  await article.save();
  // res.redirect(`/view-article/${articleId}`);
};

exports.getAddArticle = (req, res, next) => {
  res.render("add-edit-delete-article", {
    pageTitle: "Add Article",
    editing: false,
  });
};

exports.postAddArticle = async (req, res, next) => {
  const { title, content } = req.body;

  const article = new Article({
    title,
    content,
    comments: [],
  });
  await article.save();
  res.redirect("/");
};

exports.getEditArticle = async (req, res, next) => {
  const { articleId } = req.params;
  const article = await getById(articleId);

  // res.render("add-edit-delete-article", {
  //   pageTitle: "Edit Article",
  //   editing: true,
  //   article: article,
  // });

  res.send(article);
};

exports.postEditArticle = async (req, res, next) => {
  const { articleId, title, content } = req.body;

  const article = await getById(articleId);

  article.title = title;
  article.content = content;

  await article.save();
  res.redirect("/");
};

exports.postDeleteArticle = (req, res, next) => {
  const { articleId } = req.body;
  Article.findByIdAndDelete(articleId, (err) => {
    if (err) console.log(err);
    res.redirect("/");
  });
};

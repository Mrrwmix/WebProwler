const axios = require("axios");
const cheerio = require("cheerio");
const Articles = require("../models/Articles");
const Comments = require("../models/Comments");

module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render("home");
  });
  app.get("/news", (req, res) => {
    Articles.find({})
      .sort({ date: -1 })
      .then(function(results) {
        res.render("news", { results });
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send("oops");
      });
  });
  app.get("/coding", (req, res) => {
    res.render("coding");
  });
  app.get("/gaming", (req, res) => {
    res.render("gaming");
  });
  app.get("*", (req, res) => {
    res.render("404");
  });
};

// axios logic to update news articles
// axios.get("https://www.truthdig.com/news/").then(response => {
//   var $ = cheerio.load(response.data);
//   var responses = {};

//   $("article.archive-item").each(function(index, element) {
//     var arty = {};
//     arty.headline = $(this)
//       .children(".archive-item__content")
//       .children(".archive-item__title")
//       .children("a")
//       .text();
//     arty.category = "news";
//     arty.blurb = $(this)
//       .children(".archive-item__content")
//       .children(".archive-item__excerpt")
//       .children("p")
//       .text();
//     arty.url = $(this)
//       .children(".archive-item__content")
//       .children(".archive-item__title")
//       .children("a")
//       .attr("href");
//     Articles.create(arty)
//       .then(function(addedArticle) {
//         console.log(addedArticle);
//       })
//       .catch(function(err) {
//         console.error(err);
//       });
//   });

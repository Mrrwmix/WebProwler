const axios = require("axios");
const cheerio = require("cheerio");
const Articles = require("../models/Articles");
const Comments = require("../models/Comments");

module.exports = function(app) {
  app.post("/update/:id", (req, res) => {
    switch (req.params.id) {
      case "coding":
        break;
      case "gaming":
        break;
      case "news":
        console.log("News");
        news();
        break;
      default:
        res.status(500).send("No results found");
    }
  });

  app.post("/comments", (req, res) => {
    console.log(req.body);
    let comment = { article: req.body.id, comment: req.body.comment };
    Comments.create(comment)
      .then(addedComment => console.log(addedComment))
      .catch(err => console.error(err));
  });

  // Scraping functions

  const news = () => {
    axios.get("https://www.truthdig.com/news/").then(response => {
      const $ = cheerio.load(response.data);

      $("article.archive-item").each(function(index, element) {
        let arty = {};
        arty.headline = $(this)
          .children(".archive-item__content")
          .children(".archive-item__title")
          .children("a")
          .text();
        arty.category = "news";
        arty.blurb = $(this)
          .children(".archive-item__content")
          .children(".archive-item__excerpt")
          .children("p")
          .text();
        arty.url = $(this)
          .children(".archive-item__content")
          .children(".archive-item__title")
          .children("a")
          .attr("href");
        Articles.create(arty)
          .then(function(addedArticle) {
            console.log(addedArticle);
            res.status(200).send("Updated!");
          })
          .catch(function(err) {
            console.error(err);
          });
      });
    });
  };
};

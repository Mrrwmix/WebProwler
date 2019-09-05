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

  const news = () => {
    axios.get("https://www.truthdig.com/news/").then(response => {
      var $ = cheerio.load(response.data);

      $("article.archive-item").each(function(index, element) {
        var arty = {};
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

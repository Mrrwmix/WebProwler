const axios = require("axios");
const cheerio = require("cheerio");
const Articles = require("../models/Articles");
const Comments = require("../models/Comments");

module.exports = function(app) {
  app.post("/update/:id", (req, res) => {
    switch (req.params.id) {
      case "coding":
        coding(res);
        break;
      case "gaming":
        break;
      case "news":
        console.log("News");
        news(res);
        break;
      default:
        res.status(500).send("No results found");
    }
  });

  app.post("/comments", (req, res) => {
    console.log(req.body);
    let comment = { article: req.body.id, comment: req.body.comment };
    Comments.create(comment)
      .then(addedComment => {
        console.log(addedComment);
        res.json(addedComment);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Oops!");
      });
  });

  // Scraping functions

  const news = res => {
    axios.get("https://www.truthdig.com/news/").then(response => {
      const $ = cheerio.load(response.data);

      try {
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
            })
            .catch(err => console.error(err));
        });
        res.status(200).send("Updated!");
      } catch (err) {
        console.error(err);
        res.status(500).send("No new articles");
      }
    });
  };

  const coding = res => {
    axios.get("https://www.freecodecamp.org/news/").then(function(response) {
      const $ = cheerio.load(response.data, {
        xml: { normalizeWhitespace: true }
      });
      let results = [];
      $("h2.post-card-title").each(function(i, element) {
        let articles = {};
        articles.headline = $(element)
          .children()
          .text()
          .trim();
        articles.url = $(element)
          .find("a")
          .attr("href");
        results.push({
          headline: title,
          link: "https://www.freecodecamp.org" + link
        });
      });
    });
  };
};

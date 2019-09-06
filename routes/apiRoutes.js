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
        gaming(res);
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

  app.delete("/comments/:id", (req, res) => {
    Comments.deleteOne({ _id: req.params.id }, (err, success) => {
      if (err) {
        console.error(err);
        res.status(500).send("Failed to delete comment");
      } else {
        console.log(success);
        res.status(200).send("Deleted!");
      }
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
      try {
        $("h2.post-card-title").each(function(i, element) {
          let arty = {};
          arty.headline = $(element)
            .children()
            .text()
            .trim();
          arty.category = "coding";
          arty.blurb = $(element)
            .siblings("span")
            .children("a")
            .text()
            .trim();
          arty.url =
            "https://www.freecodecamp.org" +
            $(element)
              .find("a")
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

  const gaming = res => {
    axios.get("https://warframe-school.com/").then(function(response) {
      const $ = cheerio.load(response.data, {
        xml: { normalizeWhitespace: true }
      });
      try {
        $("div.hotwp-fp05-post").each(function(i, element) {
          console.log(element);
          let arty = {};
          arty.headline = $(element)
            .children(".hotwp-fp05-post-details")
            .children(".hotwp-fp05-post-title")
            .children("a")
            .text()
            .trim();
          arty.category = "gaming";
          arty.blurb = $(element)
            .children(".hotwp-fp05-post-details")
            .children(".hotwp-fp05-post-snippet")
            .children("p")
            .text()
            .trim();

          arty.url = $(element)
            .children(".hotwp-fp05-post-details")
            .children(".hotwp-fp05-post-title")
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
};

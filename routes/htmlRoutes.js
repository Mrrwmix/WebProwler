const axios = require("axios");
const cheerio = require("cheerio");
const Articles = require("../models/Articles");
const Comments = require("../models/Comments");

module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render("home");
  });
  app.get("/news", (req, res) => {
    Articles.find({
      category: "news"
    })
      .sort({ _id: 1 })
      .then(function(results) {
        Comments.find({})
          .then(function(comments) {
            res.render("news", { results, comments });
          })
          .catch(function(err) {
            console.error(err);
            res.status(500).send("oops");
          });
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send("oops");
      });
  });
  app.get("/coding", (req, res) => {
    Articles.find({
      category: "coding"
    })
      .sort({ _id: 1 })
      .then(function(results) {
        Comments.find({})
          .then(function(comments) {
            res.render("coding", { results, comments });
          })
          .catch(function(err) {
            console.error(err);
            res.status(500).send("oops");
          });
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send("oops");
      });
  });
  app.get("/gaming", (req, res) => {
    Articles.find({
      category: "gaming"
    })
      .sort({ _id: 1 })
      .then(function(results) {
        Comments.find({})
          .then(function(comments) {
            res.render("gaming", { results, comments });
          })
          .catch(function(err) {
            console.error(err);
            res.status(500).send("oops");
          });
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send("oops");
      });
  });
  app.get("*", (req, res) => {
    res.render("404");
  });
};

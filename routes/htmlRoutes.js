module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render("home");
  });
  app.get("/news", (req, res) => {
    res.render("news");
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

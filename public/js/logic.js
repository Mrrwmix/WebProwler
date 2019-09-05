document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("updator").onclick = () => {
    updator();
  };
  const updator = () => {
    fetch(
      `/update/${document.getElementsByTagName("h1")[0].getAttribute("value")}`,
      {
        method: "POST",
        body: ""
      }
    )
      .then(response => console.log(response))
      .catch(console.log("No updates available"));
  };
});

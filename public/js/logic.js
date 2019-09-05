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

  let modal = document.getElementById("commModal");
  let openComments = document.getElementsByClassName("openComments");
  let currentId = null;

  function displayModal() {
    currentId = this.getAttribute("data-id");
    console.log(currentId);
    Array.from(document.querySelectorAll("p")).forEach(function(element) {
      console.log(element);
      console.log(element.getAttribute("article"));
      if (element.getAttribute("article") === currentId) {
        element.removeAttribute("hidden");
      }
    });
    modal.style.display = "block";
  }

  Array.from(openComments).forEach(element =>
    element.addEventListener("click", displayModal, false)
  );

  document.getElementById("close").onclick = () => {
    modal.style.display = "none";
    Array.from(document.querySelectorAll("p")).forEach(function(element) {
      element.setAttribute("hidden", true);
    });
    currentId = null;
  };

  //   window.onclick = e => {
  //     if (e.target !== modal) {
  //       modal.style.display = "none";
  //     }
  //   };

  document.getElementById("addComment").onclick = () => {
    let comment = document.getElementById("commento").value;
    let objecto = { id: currentId, comment: comment };

    console.log(objecto);

    fetch("/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objecto)
    })
      .then(console.log("success"))
      .catch(console.log("failure"));
  };
});

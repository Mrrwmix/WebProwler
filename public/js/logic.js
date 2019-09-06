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
      .then(response => {
        location.reload();
      })
      .catch(err => {
        if (err) {
          document.getElementById("updator").textContent =
            "No new articles available!";
        }
      });
  };
  const deletors = document.getElementsByClassName("del");
  Array.from(deletors).forEach(element =>
    element.addEventListener("click", nonstopDeletion, false)
  );
  function nonstopDeletion() {
    fetch(`/comments/${this.getAttribute("comment")}`, {
      method: "DELETE",
      body: ""
    })
      .then(response => {
        location.reload();
      })
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  }

  let modal = document.getElementById("commModal");
  const openComments = document.getElementsByClassName("openComments");
  let currentId = null;

  function displayModal() {
    currentId = this.getAttribute("data-id");
    Array.from(document.querySelectorAll("p")).forEach(function(element) {
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

  document.getElementById("addComment").onclick = () => {
    let comment = document.getElementById("commento").value;
    let objecto = { id: currentId, comment: comment };

    fetch("/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objecto)
    })
      .then(response => {
        location.reload();
        document.getElementById("commento").value = "";
      })
      .catch(err => {
        console.log(err);
      });
  };
});

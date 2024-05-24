var bookmarkName = document.querySelector("#bookmarkName");
var bookmarkURL = document.querySelector("#bookmarkURL");
var submit = document.querySelector("#submitBtn");
var updateBtn = document.querySelector("#updateBtn");
var search = document.querySelector("#search");
var BookMarkTobeUpdate;
var bookmarkList = [];

if (localStorage.bookmarkList != null) {
  bookmarkList = JSON.parse(localStorage.bookmarkList);
  displayBookmarkList(bookmarkList);
}

function addBookmark() {
  if (validateUrl() && validateBookmarkName()) {
    var newBookmark = {
      bookmarkName: bookmarkName.value,
      bookmarkURL: bookmarkURL.value,
    };
    bookmarkList.push(newBookmark);
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="#">Why do I have this issue?</a>',
    });
  }
}
function displayBookmarkList(array) {
  var cartona = "";
  for (var i = 0; i < array.length; i++) {
    cartona += `
            <tr >
            <td>${i + 1}</td>
            <td>${array[i].bookmarkName}</td>
            <td>${array[i].bookmarkURL}</td>
            <td><a class="btn btn-primary" href="${
              array[i].bookmarkURL
            }" target=_blank>Visit</a></td>
            <td><button class="btn btn-success" onclick=update(${i})>update</button></td>
            <td><button class="btn btn-danger"  onclick=deleteNow(${i})>Delete</button></td>
            </tr>

        `;
  }
  document.querySelector("#tableContent").innerHTML = cartona;
}
submit.addEventListener("click", function () {
  addBookmark();
  displayBookmarkList(bookmarkList);
  clearContent();
});
function clearContent() {
  bookmarkName.value = "";
  bookmarkURL.value = "";
  bookmarkURL.classList.remove("is-valid");
  bookmarkURL.classList.remove("is-invalid");
}
function update(i) {
  BookMarkTobeUpdate = i;
  displayUpdateBtn();
  bookmarkName.value = bookmarkList[i].bookmarkName;
  bookmarkURL.value = bookmarkList[i].bookmarkURL;
}

function displayUpdateBtn() {
  updateBtn.classList.remove("d-none");
  submit.classList.add("d-none");
}
function displaySubmitBtn() {
  submit.classList.remove("d-none");
  updateBtn.classList.add("d-none");
}

updateBtn.addEventListener("click", function () {
  displaySubmitBtn();
  var newupdateBookmark = {
    bookmarkName: bookmarkName.value,
    bookmarkURL: bookmarkURL.value,
  };
  bookmarkList.splice(BookMarkTobeUpdate, 1, newupdateBookmark);
  displayBookmarkList(bookmarkList);
  localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
  clearContent();
});

function deleteNow(i) {
  bookmarkList.splice(i, 1);
  localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
  displayBookmarkList(bookmarkList);
}

search.addEventListener("input", function (e) {
  var resultsearch = [];
  for (i = 0; i < bookmarkList.length; i++) {
    if (
      bookmarkList[i].bookmarkName
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    ) {
      resultsearch.push(bookmarkList[i]);
    }
  }
  displayBookmarkList(resultsearch);
});

function validateUrl() {
  var patternUrl =
    /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/g;
  return patternUrl.test(bookmarkURL.value);
}

bookmarkURL.addEventListener("input", function () {
  if (validateUrl()) {
    bookmarkURL.classList.add("is-valid");
    bookmarkURL.classList.remove("is-invalid");
  } else {
    bookmarkURL.classList.add("is-invalid");
    bookmarkURL.classList.remove("is-valid");
  }
});
function validateBookmarkName() {
  var patternSite = /^\w{3,}(\s+\w+)*$/g;
  return patternSite.test(bookmarkName.value);
}

bookmarkName.addEventListener("input", function () {
  if (validateBookmarkName()) {
    bookmarkName.classList.add("is-valid");
    bookmarkName.classList.remove("is-invalid");
  } else {
    bookmarkName.classList.add("is-invalid");
    bookmarkName.classList.remove("is-valid");
  }
});

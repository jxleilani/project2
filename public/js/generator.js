$("#refreshTops").on("click", e => {
  e.preventDefault();

  $.ajax("/tops/new", {
    type: "GET"
  }).then((res) => {
    // location.reload();
    $("#topsImage").html(`<img src="${res}">`);
    // console.log(res.responseText);
  });
});

$("#refreshBottoms").on("click", e => {
  e.preventDefault();

  $.ajax("/bottoms/new", {
    type: "GET"
  }).then((res) => {
    $("#bottomsImage").html(`<img src="${res}">`);
  });
});

$("#refreshShoes").on("click", e => {
  e.preventDefault();

  $.ajax("/shoes/new", {
    type: "GET"
  }).then((res) => {
    $("#shoesImage").html(`<img src="${res}">`);
  });
});

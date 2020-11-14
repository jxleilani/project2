$("#refreshTops").on("click", e => {
  e.preventDefault();

  $.ajax("/tops/new", {
    type: "GET"
  }).then(res => {
    // location.reload();
    $("#topsImage").html(`<img src="${res}">`);
    // console.log(res.responseText);
  });
});

$("#refreshBottoms").on("click", e => {
  e.preventDefault();

  $.ajax("/bottoms/new", {
    type: "GET"
  }).then(res => {
    $("#bottomsImage").html(`<img src="${res}">`);
  });
});

$("#refreshShoes").on("click", e => {
  e.preventDefault();

  $.ajax("/shoes/new", {
    type: "GET"
  }).then(res => {
    $("#shoesImage").html(`<img src="${res}">`);
  });
});

//SAVE BUTTON
$("#saveBtn").on("click", () => {
  const topsImageUrl = $("#topsImage img").attr("src");
  const bottomsImageUrl = $("#bottomsImage img").attr("src");
  const shoesImageUrl = $("#shoesImage img").attr("src");

  const savedOutfit = {
    favTops: topsImageUrl,
    favBottoms: bottomsImageUrl,
    favShoes: shoesImageUrl
  };

  $.ajax("/favorite", {
    type: "POST",
    data: savedOutfit
  }).then(() => {
    console.log("Outfit Saved");
  });
});

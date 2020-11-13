$("#refreshTops").on("click", e => {
  e.preventDefault();

  $.ajax("/tops", {
    type: "GET"
  }).then(() => {
    location.reload();
  });
});

$("#refreshBottoms").on("click", e => {
  e.preventDefault();

  $.ajax("/bottoms", {
    type: "GET"
  }).then(() => {
    location.reload();
  });
});

$("#refreshShoes").on("click", () => {
  $("#shoesImage").html(
    // eslint-disable-next-line quotes
    '<img src="https://res.cloudinary.com/dzha9rezq/image/upload/c_scale,h_250/v1605027639/oiyd0svurzi8gxcrep3d.jpg">'
  );
});

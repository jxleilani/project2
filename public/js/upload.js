const CLOUDINARY_UPLOAD_PRESET = "zooeakhu";
//Tops Upload Button
$("#topsUpload").change(e => {
  const file = e.target.files[0];
  const fileName = e.target.files[0].name;
  console.log(e);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  console.log(formData);

  $(".loader").toggleClass("hideloader");
  $.ajax({
    url: "/api/upload/tops/" + fileName,
    data: formData,
    type: "POST",
    contentType: false,
    processData: false
  })
    .then(res => {
      console.log("The response is: " + res);
      $(".loader").toggleClass("hideloader");
    })
    .catch(err => {
      console.error("The error is: " + err);
    });
});

//Bottoms Upload Button
$("#bottomsUpload").change(e => {
  const file = e.target.files[0];
  const fileName = e.target.files[0].name;
  console.log(e);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  console.log(formData);

  $(".loader").toggleClass("hideloader");
  $.ajax({
    url: "/api/upload/bottoms/" + fileName,
    data: formData,
    type: "POST",
    contentType: false,
    processData: false
  })
    .then(res => {
      console.log("The response is: " + res);
      $(".loader").toggleClass("hideloader");
    })
    .catch(err => {
      console.error("The error is: " + err);
    });
});

//Shoes Upload Button
$("#shoesUpload").change(e => {
  const file = e.target.files[0];
  const fileName = e.target.files[0].name;
  console.log(e);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  console.log(formData);

  $(".loader").toggleClass("hideloader");
  $.ajax({
    url: "/api/upload/shoes/" + fileName,
    data: formData,
    type: "POST",
    contentType: false,
    processData: false
  })
    .then(res => {
      console.log("The response is: " + res);
      $(".loader").toggleClass("hideloader");
    })
    .catch(err => {
      console.error("The error is: " + err);
    });
});

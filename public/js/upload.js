const CLOUDINARY_UPLOAD_PRESET = "zooeakhu";

$("#topsUpload").change(e => {
  const file = e.target.files[0];
  const fileName = e.target.files[0].name;
  console.log(e);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  console.log(formData);

  $.ajax({
    url: "/api/upload/tops/" + fileName,
    data: formData,
    type: "POST",
    contentType: false,
    processData: false
  })
    .then(res => {
      console.log("The response is: " + res);
    })
    .catch(err => {
      console.error("The error is: " + err);
    });
});

$("#bottomsUpload").change(e => {
  const file = e.target.files[0];
  const fileName = e.target.files[0].name;
  console.log(e);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  console.log(formData);

  $.ajax({
    url: "/api/upload/bottoms/" + fileName,
    data: formData,
    type: "POST",
    contentType: false,
    processData: false
  })
    .then(res => {
      console.log("The response is: " + res);
    })
    .catch(err => {
      console.error("The error is: " + err);
    });
});

$("#shoesUpload").change(e => {
  const file = e.target.files[0];
  const fileName = e.target.files[0].name;
  console.log(e);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  console.log(formData);

  $.ajax({
    url: "/api/upload/shoes/" + fileName,
    data: formData,
    type: "POST",
    contentType: false,
    processData: false
  })
    .then(res => {
      console.log("The response is: " + res);
    })
    .catch(err => {
      console.error("The error is: " + err);
    });
});

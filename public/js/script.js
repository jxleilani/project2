const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dzha9rezq/upload";
const CLOUDINARY_UPLOAD_PRESET = "zooeakhu";

$("#image").change(e => {
  const file = e.target.files[0];
  console.log(e);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  console.log(formData);

  $.ajax({
    url: "/api/upload",
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

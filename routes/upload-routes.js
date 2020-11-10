/* eslint-disable camelcase */
const cloudinary = require("cloudinary");
const path = require("path");

cloudinary.config({
  cloud_name: "dzha9rezq",
  api_key: "458581165992562",
  api_secret: "c1YvAFKpIXS_W5emhI0NY9Mw_pE"
});

module.exports = function(app) {
  app.get("/upload", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "upload.html"));
  });

  app.post("/api/upload", (req, res) => {
    cloudinary.uploader
      .upload(req.files.file.tempFilePath)
      .then(result => {
        console.log("successfully uploaded", result.secure_url);
        res.json(result);
      })
      .catch(err => {
        console.log("there was an error");
        if (err) {
          console.log(err);
        }
      });
  });
};

/* eslint-disable camelcase */
const cloudinary = require("cloudinary");
const path = require("path");
const db = require("../models");

cloudinary.config({
  cloud_name: "dzha9rezq",
  api_key: "458581165992562",
  api_secret: "c1YvAFKpIXS_W5emhI0NY9Mw_pE"
});

module.exports = function(app) {
  app.get("/upload", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "upload.html"));
  });

  app.post("/api/upload/:filename", (req, res) => {
    cloudinary.uploader
      .upload(req.files.file.tempFilePath)
      .then(result => {
        console.log(result);
        console.log("successfully uploaded", result.secure_url);
        res.json(result);

        //now take result.secure_url and save it to db
        db.Tops.create({
          topsName: req.params.filename,
          topsUrl: result.secure_url
        }).then(dbTop => {
          console.log("created item" + dbTop);
        });
      })
      .catch(err => {
        console.log("there was an error");
        if (err) {
          console.log(err);
        }
      });
  });

  app.get("/tops", (req, res) => {
    db.Tops.findAll({}).then(data => {
      // const imagesObj = {
      //   images: data
      // };
      console.log(data[0].topsName);
      // res.render("test", imagesObj);
      res.json(data);
    });
  });
};

/* eslint-disable camelcase */
const cloudinary = require("cloudinary");
const path = require("path");
const { Sequelize } = require("../models");
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

  app.post("/api/upload/tops/:filename", (req, res) => {
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

  app.post("/api/upload/bottoms/:filename", (req, res) => {
    cloudinary.uploader
      .upload(req.files.file.tempFilePath)
      .then(result => {
        console.log(result);
        console.log("successfully uploaded", result.secure_url);
        res.json(result);

        //now take result.secure_url and save it to db
        db.Bottoms.create({
          bottomsName: req.params.filename,
          bottomsUrl: result.secure_url
        }).then(dbBottom => {
          console.log("created item" + dbBottom);
        });
      })
      .catch(err => {
        console.log("there was an error");
        if (err) {
          console.log(err);
        }
      });
  });

  app.post("/api/upload/shoes/:filename", (req, res) => {
    cloudinary.uploader
      .upload(req.files.file.tempFilePath)
      .then(result => {
        console.log(result);
        console.log("successfully uploaded", result.secure_url);
        res.json(result);

        //now take result.secure_url and save it to db
        db.Shoes.create({
          shoesName: req.params.filename,
          shoesUrl: result.secure_url
        }).then(dbShoe => {
          console.log("created item" + dbShoe);
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
    db.Tops.findAll({ order: Sequelize.literal("rand()"), limit: 1 }).then(
      data => {
        const topsObj = {
          tops: data
        };
        res.render("generator", topsObj);
      }
    );

    //WHEN YOU FIRST LAND ON /TOPS NEED TO ALSO POPULATE THE BOTTOMS IMAGE
  });

  //REFRESH BUTTONS
  app.get("/tops/new", (req, res) => {
    db.Tops.findAll({ order: Sequelize.literal("rand()"), limit: 1 }).then(
      data => {
        console.log(data[0].dataValues.topsUrl.toString());
        const topsObj = {
          tops: data
        };
        res.send(data[0].dataValues.topsUrl);
      }
    );
  });

  app.get("/bottoms/new", (req, res) => {
    db.Bottoms.findAll({ order: Sequelize.literal("rand()"), limit: 1 }).then(
      data => {
        const bottomsObj = {
          bottoms: data
        };
        // res.render("generator", bottomsObj);
        res.send(data[0].dataValues.bottomsUrl);
      }
    );
  });

  app.get("/shoes/new", (req, res) => {
    db.Shoes.findAll({ order: Sequelize.literal("rand()"), limit: 1 }).then(
      data => {
        res.send(data[0].dataValues.shoesUrl);
      }
    );
  });
};

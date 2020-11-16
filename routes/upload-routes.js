/* eslint-disable camelcase */
const cloudinary = require("cloudinary");
const { Sequelize } = require("../models");
const db = require("../models");

require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

module.exports = function(app) {
  app.post("/api/upload/tops/:filename", (req, res) => {
    cloudinary.uploader
      .upload(req.files.file.tempFilePath)
      .then(result => {
        console.log(result);
        console.log("successfully uploaded", result.secure_url);

        const splitUrl = result.secure_url.split("/");
        // eslint-disable-next-line prettier/prettier
        const baseUrl = splitUrl[0] + "/" + splitUrl[1] + "/" + splitUrl[2] + "/" + splitUrl[3] + "/" + splitUrl[4] + "/" + splitUrl[5];
        const endUrl = splitUrl[6] + "/" + splitUrl[7];

        const newUrl = baseUrl + "/c_scale,h_300/" + endUrl;
        res.json(result);

        //now take result.secure_url and save it to db
        db.Tops.create({
          topsName: req.params.filename,
          topsUrl: newUrl
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

        const splitUrl = result.secure_url.split("/");
        // eslint-disable-next-line prettier/prettier
        const baseUrl = splitUrl[0] + "/" + splitUrl[1] + "/" + splitUrl[2] + "/" + splitUrl[3] + "/" + splitUrl[4] + "/" + splitUrl[5];
        const endUrl = splitUrl[6] + "/" + splitUrl[7];

        const newUrl = baseUrl + "/c_scale,h_400/" + endUrl;
        res.json(result);

        //now take result.secure_url and save it to db
        db.Bottoms.create({
          bottomsName: req.params.filename,
          bottomsUrl: newUrl
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
        const splitUrl = result.secure_url.split("/");
        // eslint-disable-next-line prettier/prettier
        const baseUrl = splitUrl[0] + "/" + splitUrl[1] + "/" + splitUrl[2] + "/" + splitUrl[3] + "/" + splitUrl[4] + "/" + splitUrl[5];
        const endUrl = splitUrl[6] + "/" + splitUrl[7];

        const newUrl = baseUrl + "/c_scale,h_175/" + endUrl;
        res.json(result);

        //now take result.secure_url and save it to db
        db.Shoes.create({
          shoesName: req.params.filename,
          shoesUrl: newUrl
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

  //Generator landing page
  app.get("/generator", async (req, res) => {
    const topsData = await db.Tops.findAll({
      order: Sequelize.literal("rand()"),
      limit: 1
    });
    const bottomsData = await db.Bottoms.findAll({
      order: Sequelize.literal("rand()"),
      limit: 1
    });
    const shoesData = await db.Shoes.findAll({
      order: Sequelize.literal("rand()"),
      limit: 1
    });
    const hbsObj = {
      tops: topsData,
      bottoms: bottomsData,
      shoes: shoesData
    };
    res.render("outfitgen", hbsObj);
  });

  //REFRESH BUTTONS
  app.get("/tops/new", (req, res) => {
    db.Tops.findAll({ order: Sequelize.literal("rand()"), limit: 1 }).then(
      data => {
        res.send(data[0].dataValues.topsUrl);
      }
    );
  });

  app.get("/bottoms/new", (req, res) => {
    db.Bottoms.findAll({ order: Sequelize.literal("rand()"), limit: 1 }).then(
      data => {
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

  //SAVE TO FAVORITES
  app.post("/favorite", (req, res) => {
    db.Favorites.create({
      favTops: req.body.favTops,
      favBottoms: req.body.favBottoms,
      favShoes: req.body.favShoes
    }).then(results => {
      console.log(results);
      res.end();
    });
  });

  app.get("/favorites", (req, res) => {
    db.Favorites.findAll({}).then(data => {
      const hbsObj = {
        outfits: data
      };
      res.render("favorites", hbsObj);
    });
  });
};

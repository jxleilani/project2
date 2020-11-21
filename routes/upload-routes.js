/* eslint-disable camelcase */
const cloudinary = require("cloudinary");
const { Sequelize } = require("../models");
const db = require("../models");

const isAuthenticated = require("../config/middleware/isAuthenticated");

require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

module.exports = function(app) {
  app.post("/api/upload/tops/:filename/:userid", (req, res) => {
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

        db.Tops.create({
          topsName: req.params.filename,
          topsUrl: newUrl,
          userId: req.params.userid
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

  app.post("/api/upload/bottoms/:filename/:userid", (req, res) => {
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

        db.Bottoms.create({
          bottomsName: req.params.filename,
          bottomsUrl: newUrl,
          userId: req.params.userid
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

  app.post("/api/upload/shoes/:filename/:userid", (req, res) => {
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

        db.Shoes.create({
          shoesName: req.params.filename,
          shoesUrl: newUrl,
          userId: req.params.userid
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
  app.get("/generator", isAuthenticated, async (req, res) => {
    const topsData = await db.Tops.findAll({
      where: {
        userId: req.user.id
      },
      order: Sequelize.literal("rand()"),
      limit: 1
    });
    const bottomsData = await db.Bottoms.findAll({
      where: {
        userId: req.user.id
      },
      order: Sequelize.literal("rand()"),
      limit: 1
    });
    const shoesData = await db.Shoes.findAll({
      where: {
        userId: req.user.id
      },
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
    db.Tops.findAll({
      where: {
        userId: req.user.id
      },
      order: Sequelize.literal("rand()"),
      limit: 1
    }).then(data => {
      res.send(data[0].dataValues.topsUrl);
    });
  });

  app.get("/bottoms/new", (req, res) => {
    db.Bottoms.findAll({
      where: {
        userId: req.user.id
      },
      order: Sequelize.literal("rand()"),
      limit: 1
    }).then(data => {
      res.send(data[0].dataValues.bottomsUrl);
    });
  });

  app.get("/shoes/new", (req, res) => {
    db.Shoes.findAll({
      where: {
        userId: req.user.id
      },
      order: Sequelize.literal("rand()"),
      limit: 1
    }).then(data => {
      res.send(data[0].dataValues.shoesUrl);
    });
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

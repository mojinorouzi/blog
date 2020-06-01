const express = require("express");
const models = require("../models");
const upload = require("../multer.js");
var slug = require("slug");

const routes = express.Router();

// import all controllers
// import SessionController from './app/controllers/SessionController';
//categories..............................................................................................................................
routes.get("/categories", upload.none(), async (req, res) => {
  try {
    let getcat1 = await models.Categories.findAll({
      include: [{ model: models.Posts, as: "Posts" }],
    });
    return res.json(getcat1);
  } catch (error) {
    res.send(error);
  }
});
routes.get("/categories/:namecat", upload.none(), async (req, res) => {
  try {
    let getcat = await models.Categories.findAll({
      where: { name: req.params.namecat },
      include: [{ model: models.Posts, as: "Posts" }],
    });
    return res.json(getcat);
  } catch (error) {
    res.send(error);
  }
});
routes.post("/categories", upload.none(), async (req, res) => {
  try {
    let createcat = await models.Categories.create(req.body);
    return res.json(createcat);
  } catch (error) {
    res.send(error);
  }
});
routes.put("/categories/:namecat", upload.none(), async (req, res) => {
  try {
    let putcat = await models.Categories.update(req.body, {
      where: { name: req.params.namecat },
    });
    return res.status(201).json(putcat);
  } catch (error) {
    res.send(error);
  }
});
routes.delete("/categories/:namecat", upload.none(), async (req, res) => {
  try {
    let delcat = await models.Categories.destroy({
      where: { name: req.params.namecat },
      include: [{ model: models.Posts, onDelete: "cascade" }],
    });

    return res.json(delcat);
  } catch (error) {
    res.send(error);
  }
});

//posts.......................................................................................................................................
routes.get("/posts", upload.none(), async (req, res) => {
  try {
    let postget = await models.Posts.findAll({
      include: [{ model: models.Tags, attributes: ["name"] }],
    });
    return res.status(200).json(postget);
  } catch (error) {
    res.send(error);
  }
});
routes.post("/posts", upload.single("images"), async (req, res) => {
  try {
      console.log(req.file);
      
    const { Tags , title , text , categoryId  } = req.body;

    let createpost = await models.Posts.create({title , text , categoryId ,
      slug: slug(req.body.title), image:req.file.path
    });
    await createpost.setTags(Tags);
    return res.status(201).json({ msg: createpost });
  } catch (error) {
    res.send(error);
  }
});
routes.put("/posts/:titlepost", upload.none(), async (req, res) => {
  try {
    let uppost = await models.Posts.update(
      { title: req.body.title, text: req.body.text, image: req.body.image },
      { where: { title: req.params.titlepost } }
    );
    // await uppost.addTags(req.body.Tags);
    res.json(uppost);
  } catch (error) {
    res.send(error);
  }
});
routes.delete("/posts/:titlepost", upload.none(), async (req, res) => {
  try {
    let delp = await models.Posts.destroy({
      where: { title: req.params.titlepost },
    });
    return res.json(`deleted`);
  } catch (error) {
    res.send(error);
  }
});

//tags.........................................................................................................................................
routes.get("/tags", async (req, res) => {
  try {
    let gettag = await models.Tags.findAll({
      include: [{ model: models.Posts, attributes: ["title"] }],
    });
    // gettag.gettags();
    return res.status(200).json(gettag);
  } catch (error) {
    res.send(error);
  }
});
routes.post("/tags", upload.none(), async (req, res) => {
  console.log(req.body.firstname);
  try {
    let createTag = await models.Tags.create(
      { name: req.body.name },
      { include: [{ model: models.Posts }] }
    );
    await createTag.setPosts(req.body.posts);

    return res.status(201).json(createTag);
  } catch (error) {
    res.send(error);
  }
});
routes.put("/tags/:name", upload.none(), async (req, res) => {
  try {
    let uptags = await models.Tags.update(
      { name: req.body.name },
      { where: { name: req.params.name } }
    );
    // uptags.setPosts(req.body.Posts)
    return res.status(201).json(uptags);
  } catch (error) {
    res.send(error);
  }
});
routes.delete("/tags/:name", upload.none(), async (req, res) => {
  try {
    let deltags = await models.Tags.destroy({
      where: { name: req.params.name },
    });
    return res.status(201).json(deltags);
  } catch (error) {
    res.send(error);
  }
});

routes.get("/", async (req, res) => {
  try {
    let tagpost = await models.TagPost.findAll();
    return res.status(200).json(tagpost);
  } catch (error) {
    return res.status(200).json(error);
  }
});
// Add routes
// routes.get('/', SessionController.store);
// routes.post('/', SessionController.store);
// routes.put('/', SessionController.store);
// routes.delete('/', SessionController.store);

module.exports = routes;

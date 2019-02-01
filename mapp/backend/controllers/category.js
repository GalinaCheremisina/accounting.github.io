const Category = require("../models/category");

exports.createCategory = (req, res, next) => {
    const category = new Category({
        name: req.body.name,
        capacity: req.body.capacity,
        creator: req.userData.userId
    });
    category.save().then(createdCategory => {
      const newCategory = {
        name: createdCategory.name,
        capacity: createdCategory.capacity,
        creator: createdCategory.creator,
        id: createdCategory._id
      };
      res.status(201).json({
        message: "Category added successfully",
        category: newCategory
      });
    })
    .catch(error=>{
      res.status(500).json({ message: "Creating a category failed!" });
    });
  }

exports.updateCategory = (req, res, next) => {
    const category = new Category({
      _id: req.body.id,
      name: req.body.name,
      capacity: req.body.capacity,
      creator: req.userData.userId
    });
    category.updateOne({ _id: req.params.id, creator: req.userData.userId }, category)
      .then(result => {
        if(result.n>0){
          res.status(200).json({ message: "Update successful!" });
        } else{
          res.status(401).json({ message: "Category not changed!" });
        }
    })
    .catch(error=>{
      res.status(500).json({ message: "Couldn't update category!"})
    });
  }

exports.getCategories = (req, res, next) => {
    Category.find({creator: req.userData.userId })
      .then(documents => {
        res.status(200).json({
          message: "Categories fetched successfully!",
          categories: documents
        });
      })
      .catch(error => { message: "Fetching categories failed!"});
  }

exports.getCategiryById = (req, res, next) => {
    Category.findById(req.params.id).then(category => {
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({ message: "Category not found!" });
      }
    }).catch(error => { message: "Fetching category failed!"});
  }

exports.deleteCategory = (req, res, next) => {
    Category.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      if(result.n > 0){
        console.log(result);
        res.status(200).json({ message: "Delete successful!" });
      } else{
        res.status(401).json({ message: "Not authorized!" });
      }
    }).catch(error => { message: "Deleting the category failed!"});
  }
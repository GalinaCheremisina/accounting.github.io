const Bill = require("../models/bill");

exports.createBill = (req, res, next) => {
    const bill = new Bill({
        value: req.body.value,
        currency: req.body.currency,
        creator: req.userData.userId
    });
    bill.save().then(createdBill => {
      res.status(201).json({
        message: "Bill added successfully",
        bill: {
          value: createdBill._doc.value,
          currency: createdBill._doc.currency,
          creator: createdBill._doc.creator,
          id: createdBill._doc._id
        }
      });
    })
    .catch(error=>{
      res.status(500).json({ message: "Creating a bill failed!" });
    });
  }

exports.updateBill = (req, res, next) => {
    const billUpdated = new Bill({
      _id: req.body.id,
      value: req.body.value,
      currency: req.body.currency,
      creator: req.userData.userId
    });
    Bill.updateOne({ _id: req.body.id, creator: req.userData.userId }, billUpdated)
      .then(result => {
        if(result.n>0){
          res.status(200).json({ message: "Update successful!" });
        } else{
          res.status(401).json({ message: "Bill not changed!" });
        }
    })
    .catch(error=>{
      res.status(500).json({ message: "Couldn't update bill!"})
    });
  }

exports.getBill = (req, res, next) => {
    const creatorId = req.query.creator;
    Bill.findOne({creator: creatorId})
      .then(documents => {
        let acBill;
        if(documents){
          acBill = {
            id: documents._id,
            value: documents.value,
            currency: documents.currency,
            creator: documents.creator
          };
        } else {
          acBill = {
            id: null,
            value: 0,
            currency: 'USD',
            creator: creatorId
          };
        }
        res.status(200).json({
          message: "Bill fetched successfully!",
          bill: acBill
        });
      })
      .catch(error => { message: "Fetching bill failed!"});
  }
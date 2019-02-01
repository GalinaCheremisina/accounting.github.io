const Events = require("../models/events");

exports.createEvent = (req, res, next) => {
    const eventt = new Events({
        amount: req.body.amount,
        category: req.body.category,
        description: req.body.description,
        type: req.body.type,
        date: req.body.date,
        catname: req.body.catname,
        creator: req.userData.userId
    });
    eventt.save().then(createdEvent => {
      const newEvent = {
            amount: createdEvent.amount,
            category: createdEvent.category,
            description: createdEvent.description,
            type: createdEvent.type,
            date: createdEvent.date,
            catname: createdEvent.catname,
            creator: createdEvent.creator,
            id: createdEvent._id
      };
      res.status(201).json({
        message: "Event added successfully",
        events: newEvent
      });
    })
    .catch(error=>{
      res.status(500).json({ message: "Creating a Event failed!" });
    });
  }

exports.getEvents = (req, res, next) => {
    Events.find({creator: req.userData.userId })
      .then(documents => {
        const eventsy = documents.map(event =>{
          return {
            amount: event.amount,
            category: event.category,
            description: event.description,
            catname: event.catname,
            creator: event.creator,
            date: event.date,
            type: event.type,
            id: event._id
          }
        });
        res.status(200).json({
          message: "Events fetched successfully!",
          events: eventsy
        });
      })
      .catch(error => { message: "Fetching events failed!"});
  }

exports.getEventById = (req, res, next) => {
    Events.findById(req.params.id).then(eventt => {
      if (eventt) {
        const detailEvent = {
          amount: eventt.amount,
          category: eventt.category,
          description: eventt.description,
          catname: eventt.catname,
          creator: eventt.creator,
          date: eventt.date,
          type: eventt.type,
          id: eventt._id
        };
        res.status(200).json(detailEvent);
      } else {
        res.status(404).json({ message: "Event not found!" });
      }
    }).catch(error => { message: "Fetching event failed!"});
  }

exports.deleteEvent = (req, res, next) => {
  const idCategory = req.query.idCategory;
   Events.deleteMany({ category: idCategory, creator: req.userData.userId })
      .then(result => {
        if(result.n > 0){
          res.status(200).json({ message: "Delete successful!" });
        } else{
          res.status(401).json({ message: "Not authorized!" });
        }
      }).catch(error => { message: "Deleting the event failed!"});   
}
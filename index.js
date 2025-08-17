const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const methodOverride = require('method-override');
var app = express();
const port = process.env.PORT || 8000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended:true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));   // <-- allows PUT & DELETE with forms
dotenv.config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("MongoDB connection error:", err));

const trySchema = new mongoose.Schema({
  title: String,
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Low'
  }
});

const item = mongoose.model("task", trySchema);

// GET all tasks
app.get("/", function(req, res) {
  item.find({}).then((foundItems) => {
    res.render("list", { ejes: foundItems, alert: req.query.alert });
  })
  .catch((err) => {
    console.log(err);
  });
});

// CREATE new task
app.post("/", (req, res) => {
  const itemTitle = req.body.ele1;
  const itemPriority = req.body.priority || 'Low';
  const newItem = new item({
    title: itemTitle,
    priority: itemPriority
  });
  newItem.save().then(() => {
    res.redirect('/');
  })
  .catch((err) => {
    console.log(err);
  });
});

// UPDATE task (PUT)
app.put("/edit/:id", (req, res) => {
  const id = req.params.id;
  const updatedTitle = req.body.name;
  const updatedPriority = req.body.priority;
  item.findByIdAndUpdate(id, { title: updatedTitle, priority: updatedPriority })
    .then(() => {
      res.redirect('/?alert=Todo%20updated%20successfully');
    })
    .catch((err) => {
      console.log(err);
    });
});

// DELETE task (DELETE)
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  item.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/?alert=Todo%20deleted%20successfully');
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port,function(){
  console.log(`server is running at ${port}`);
});

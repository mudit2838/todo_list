const express = require('express');
const bodyParser = require('body-parser');
var app = express();
const port = process.env.PORT || 8000;
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended:true}));

app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/todo");

const trySchema = new mongoose.Schema({
  title: String,
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Low'
  }
});

const item = mongoose.model("task", trySchema);


app.get("/", function(req, res) {
  item.find({}).then((foundItems) => {
    res.render("list", { ejes: foundItems, alert: req.query.alert });
  })
  .catch((err) => {
    console.log(err);
  });
});


app.post("/", (req, res) => {
  const itemTitle = req.body.ele1;
  const itemPriority = req.body.priority || 'Low';
  const newItem = new item({
    title: itemTitle,
    priority: itemPriority
  });
  newItem.save().then(() => {
    res.redirect('/');
  });
});

app.post('/delete', (req, res) => {
  const id = req.body.id;
  item.findByIdAndDelete(id).then(() => {
    res.redirect('/?alert=Todo%20deleted%20successfully');
  })
  .catch((err) => {
    console.log(err);
  });
});

app.post('/edit', (req, res) => {
  const id = req.body.id;
  const updatedTitle = req.body.name;
  const updatedPriority = req.body.priority;
  item.findByIdAndUpdate(id, { title: updatedTitle, priority: updatedPriority }).then(() => {
    res.redirect('/?alert=Todo%20updated%20successfully');
  })
  .catch((err) => {
    console.log(err);
  });
});



app.listen(port,function(){
  console.log("server is running");
})

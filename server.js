const express = require("express");
const app = express();
const path = require("path");
const {connectMongodb} = require("./connection");
const OPERATOR = require("./models/operator");
const methodOverride = require('method-override');
const operatorRoute = require("./routes/operator");

const PORT = 3000;
connectMongodb("mongodb://127.0.0.1:27017/rsb-operators").then(() => console.log("Mongodb connected"));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({extended: false}));
app.use("/operator", operatorRoute);
app.use(methodOverride('_method'));

app.get('/operator/new', (req, res) => {
  res.render('newOperator');
});
app.get("/operator/:id", async (req,res)=>{
    try {
        const operator = await OPERATOR.findById(req.params.id);
        if (!operator) {
          return res.status(404).send();
        }
        res.render('operatorDetail', { operator });
      } catch (error) {
        res.status(500).send(error);
      }
});

app.post("/operator/:id", async (req, res) => {
  try {
    const operator = await OPERATOR.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!operator) {
      res.status(404).send();
    }
    res.redirect("/operator");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/operator/:id/edit", async (req, res) => {
  try {
    const operator = await OPERATOR.findById(req.params.id);

    if (!operator) {
      return res.status(404).send('Operator not found');
    }
    console.log(operator);
    res.render("editOperator", { operator });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/operator/:id', async (req, res) => {
    try {
      const operator = await OPERATOR.findByIdAndDelete(req.params.id);
      if (!operator) {
        return res.status(404).send();
      }
      res.redirect('/operator');
    } catch (error) {
      res.status(500).send(error);
    }
});


app.listen(PORT, ()=>console.log("Server started at: ", PORT));
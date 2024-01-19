const OPERATOR = require("../models/operator.js");
async function handleCreateOperator(req,res){
    try {
        const operator = new OPERATOR(req.body);
        await operator.save();
        res.status(201).redirect("/operator");
      } catch (error) {
        res.status(400).send(error);
      }
}

async function handleGetOperators(req,res){
    try{
        const operators = await OPERATOR.find({});
        res.render("operators", {operators});
    }
    catch(error){
        res.status(500).send(error);
    }
}

module.exports = {
    handleCreateOperator,
    handleGetOperators,
};
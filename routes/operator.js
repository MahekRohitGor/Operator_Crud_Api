const express = require("express");
const router = express.Router();
const {handleCreateOperator, handleGetOperators} = require("../controllers/operator");
router.route("/").get(handleGetOperators).post(handleCreateOperator);
module.exports = router;
const express= require('express');
const path= require('path');

var router= express.Router();

var pathJs= path.join(__dirname, "..", "js");

router.use(express.static(pathJs));

module.exports= router;
const { Router } = require('express');
const { createList, getLists, deleteList, updateList } = require('../controllers/lists.js');
const verifyJWT = require('../controllers/verifyJWT.js');

const router = Router();

// CREATE LIST

router.post("/create", verifyJWT, createList);

// DELETE LIST

router.delete("/delete/:id", verifyJWT, deleteList);

// GET LISTS

router.get("/", getLists);

// UPDATE LISTS

router.put("/update/:id", verifyJWT, updateList);



module.exports = router;
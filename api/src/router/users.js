const { Router } = require('express');
const { updateUser, deleteUser, getUser, getAllUsers, getUserStats } = require('../controllers/users.js');
const verifyJWT = require('../controllers/verifyJWT.js')

const router = Router();

// Update user

router.put("/:id", verifyJWT, updateUser);

// Delete user

router.delete("/delete/:id", verifyJWT, deleteUser);

// Get user

router.get("/find/:id", getUser);

// Get all users

router.get("/", verifyJWT, getAllUsers);

// Get user stats

router.get("/stats", getUserStats);


module.exports = router;
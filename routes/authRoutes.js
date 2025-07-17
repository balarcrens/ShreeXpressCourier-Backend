const express = require('express');
const router = express.Router();
const { login, newAdminController, newClientController, getAllAdminController, getAllClientController } = require('../controllers/authController');
const { protect, superadmin, admin } = require('../middleware/authMiddleware');
const { body, validationResult } = require("express-validator")

router.post('/login', login);

router.post("/new/admin", protect, superadmin, [
    body("name").notEmpty().withMessage('name is required'),
    body("email").isEmail().withMessage("Email is Required"),
    body("password").notEmpty().withMessage("Password is requireed"),
    body("role").notEmpty().withMessage("Role must be define")
], newAdminController);

router.post("/new/client", protect)

router.get('/role-info', protect, (req, res) => {
    res.json({
        message: 'Role info fetched successfully',
        user: {
            id: req.user.id,
            name: req.user.name,
            role: req.user.role
        }
    });
});


router.post("/new/client", protect, admin, newClientController);

router.post("/new/superadmin", async (req, res) => {
    try {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, role } = req.body;

        const query = ` INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING * `;

        const result = await pool.query(query, [name, email, password, role]);

        if (result.rowCount === 0) {
            return res.status(202).json({
                message: "New Super Admin Creation Failed"
            });
        }

        res.status(200).json({
            message: "New Super Admin Created",
            user: result.rows[0],
        });

    } catch (error) {
        console.error("Error while creating new admin:", error.message);
        res.status(500).json({
            message: "Internal Server Error" + error.message
        });
    }
});

//super admin get all admin
router.get("/all/admin", protect, superadmin, getAllAdminController)

//admin got all client what creby him
router.get("/all/client", protect, admin, getAllClientController)



//update-delete pachhi

module.exports = router;
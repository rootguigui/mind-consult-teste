const router = require('express').Router();
const { CourseController } = require('../controllers/course.controller');
const { authRoutes } = require('../middlewares/auth.middleware');

const { upload } = require('../middlewares/upload.middleware');

router.get('/:id', [authRoutes], CourseController.getById);
router.post('/create', [authRoutes, upload.single('image')], CourseController.create);
router.post('/update', [authRoutes, upload.single('image')], CourseController.update);
router.delete('/delete/:id', [authRoutes], CourseController.delete);
router.get('/', [authRoutes], CourseController.courses);

module.exports.courseRouter = router;
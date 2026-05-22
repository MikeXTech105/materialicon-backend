const express = require('express');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const dashboardRoutes = require('./dashboard.routes');
const categoryRoutes = require('./category.routes');
const tagRoutes = require('./tag.routes');
const iconRoutes = require('./icon.routes');
const publicRoutes = require('./public.routes');

const router = express.Router();

router.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'IconAPI service is healthy',
    data: {
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    }
  });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/categories', categoryRoutes);
router.use('/tags', tagRoutes);
router.use('/icons', iconRoutes);
router.use('/public', publicRoutes);

module.exports = router;

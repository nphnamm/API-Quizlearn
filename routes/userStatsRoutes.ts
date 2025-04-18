import express from 'express';
import { isAuthenticated } from '../middleware/auth';
import { getUserStatsOfSet } from '../controllers/userStats.controller';


const router = express.Router();

// Apply authentication middleware to all routes
router.use(isAuthenticated);



// Get user stats
router.get('/set/:id',getUserStatsOfSet);



export default router; 
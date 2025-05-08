import express from 'express';
import { isAuthenticated } from '../middleware/auth';
import { getUserStreak } from '../controllers/userStreaks.controller';


const router = express.Router();

// Apply authentication middleware to all routes
router.use(isAuthenticated);



// Get user stats
router.get('/streak',getUserStreak);



export default router; 
import express from 'express';
import { isAuthenticated } from '../middleware/auth';
import { getRecentSets, getStudyingSets, getUserStatsOfSet } from '../controllers/userStats.controller';


const router = express.Router();

// Apply authentication middleware to all routes
router.use(isAuthenticated);



// Get user stats
router.get('/set/:id',getUserStatsOfSet);
router.get('/getStudyingSets',getStudyingSets);
router.get('/getRecentSets',getRecentSets);



export default router; 
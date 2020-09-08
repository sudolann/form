import express from 'express';
import { getAllEvents, addEvent, getEventById } from '../controllers';
const router = express.Router();

router.post('/addNewEvent', addEvent);
router.get('/events', getAllEvents);
router.get('/event/:eventId', getEventById);

export default router;

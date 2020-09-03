import express from 'express';
import { addEvent, getEventById, getAllEvents } from '../controllers';
const router = express.Router();

router.post('/addNewEvent', addEvent);
router.get('/:eventId', getEventById);
router.get('/events', getAllEvents);

export default router;

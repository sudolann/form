import express from 'express';
import { getAllEvents, addEvent, getEventById, deleteEvent } from '../controllers';
const router = express.Router();

router.post('/addNewEvent', addEvent);
// router.get('/:eventId', getEventById);
router.get('/events', getAllEvents);
router.delete('/delete/:eventId', deleteEvent);



export default router;

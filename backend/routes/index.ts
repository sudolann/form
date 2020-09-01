import express from 'express';
import { addEvent, getEventById } from '../controllers';
const router = express.Router();

router.post('/addNewEvent', addEvent);
router.get('/:eventId', getEventById);

export default router;

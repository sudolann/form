import HttpError from '../models/http-error';
import Event, { IEvent } from '../models/event';

export const getAllEvents = async (_req: any, res: any, next: (arg0: any) => any) => {
  let events: IEvent[];
  try {
    events = await Event.find();
  } catch (err) {
    const error = new HttpError('Fetching events failed, please try again later.', 500);
    return next(error);
  }

  if (events.length === 0) {
    const error = new HttpError('No events found, please add event.');
    return next(error);
  }

  res.status(200).json(events); 
};

export const addEvent = async (req: any, res: any, next: (arg0: any) => any) => {
  const { name, email, date } = req.body;

  const createdNewEvent = new Event({
    name,
    email,
    date,
  });

  try {
    await createdNewEvent.save();
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }
  res.status(201).json({
    eventId: createdNewEvent._id,
  });
};

export const getEventById = async (req: { params: { eventId: string } }, res: { json: (arg0: { event: any }) => void }, next: (arg0: any) => any) => {
  const eventId = req.params.eventId;

  let event;
  try {
    event = await Event.findOne({ _id: eventId });
  } catch (err) {
    const error = new HttpError(err.reason, 500);
    return next(error);
  }

  if(!event) {
    return next(new HttpError("Cant find the event", 500));
  }

  res.json({ event });
};

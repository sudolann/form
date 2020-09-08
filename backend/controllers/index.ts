const HttpError = require('../models/http-error');
import Event from '../models/event';

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
    eventId: createdNewEvent.id,
  });
};

export const getEventById = async (req: { params: { eventId: string } }, res: { json: (arg0: { event: any }) => void }, next: (arg0: any) => any) => {
  const eventId = req.params.eventId;

  let event;
  try {
    event = await Event.findOne({ _id: eventId });
  } catch (err) {
    const error = new HttpError('Fetching event failed, please try again later.', 500);
    return next(error);
  }

  if (!event) {
    return next(new HttpError('Cant find the event', 404));
  }

  res.json({ event });
};


export const getAllEvents = async (_req: any, res: any, next: (arg0: any) => any) => {
  let events;
  try {
    events = await Event.find();
    console.log(events, "events")
  } catch (err) {
    console.log(err)
    // const error = new HttpError('Fetching events failed, please try again later.', 500);
    // return next(error);
  }

  // if (events.length === 0) {
  //   return next(new HttpError('Cant find events', 404));
  // }

  res.json({
    events
  });
};


import { model, Schema } from 'mongoose';
import Document from './document';
export interface IEvent extends Document<IEvent> {
  name: string;
  email: string;
  date: string;
}

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

export default model<IEvent>('Event', schema);

import { Document as MDocument } from 'mongoose';

interface Document<T = {}> extends MDocument {
  _doc: T;
}

export default Document;

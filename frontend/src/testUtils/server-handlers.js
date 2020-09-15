import 'whatwg-fetch';
import {
  rest
} from 'msw';
import {
  setupServer
} from 'msw/node';
import {
  exampleAllEvents,
  eventExample
} from './exampleEvents';


const BASE_URL = 'https://form-d.herokuapp.com/';
const server = setupServer(

  rest.get(`https://form-d.herokuapp.com/event/5f60bd0473ad66b05472379a`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        event: eventExample
      }))
  }),
  rest.get(`https://form-d.herokuapp.com/events`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([...exampleAllEvents]))
  }),

  rest.get('*', (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        error: 'Please add request handler',
      }),
    );
  }),
  rest.post(`https://form-d.herokuapp.com/addNewEvent`, (req, res, ctx) => {
    if (!req.body) {
      return res(
        ctx.status(404),
        ctx.json({
          error: 'Post is not provided',
        }),
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
      }),
    );
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export {
  server,
  rest,
  BASE_URL
};
import 'whatwg-fetch';
import {
  rest
} from 'msw';
import {
  setupServer
} from 'msw/node';

const BASE_URL = 'https://jsonplaceholder.typicode.com/';

const server = setupServer(
  rest.get(BASE_URL, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        posts: [{
          title: 'title 1',
          content: 'content 1',
        }, ],
      }),
    );
  }),
  rest.get('*', (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        error: {
          message: 'Please add request handler'
        },
      }),
    );
  }),
  rest.post(BASE_URL, (req, res, ctx) => {
    if (!req.body) {
      return res(
        ctx.status(404),
        ctx.json({
          error: {
            message: 'Post is not provided',
          }
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
  rest.delete(`${BASE_URL}/:id`, (req, res, ctx) => {
    if (req.params.id === 'FAILED') {
      return res(
        ctx.status(404),
        ctx.json({
          error: {
            message: 'ID must be provied',
          }
        }),
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        success: 'Post deleted',
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
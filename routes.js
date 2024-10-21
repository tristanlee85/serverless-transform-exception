import { Router } from '@edgio/core/router';
import { nextRoutes } from '@edgio/next';

export default new Router()
  .use(nextRoutes)
  .match('/serverless-proxy-exception', ({ proxy }) => {
    proxy('edgio_serverless', {
      path: '/',
      transformResponse: (response) => {
        throw new Error('This is a test error from edgio_serverless transform');
      },
    });
  })
  .match('/origin-proxy-exception', ({ proxy }) => {
    proxy('origin', {
      path: '/',
      transformResponse: (response) => {
        throw new Error('This is a test error from origin transform');
      },
    });
  })
  .match('/redirect-to-error', {
    headers: {
      set_response_headers: {
        location: '%{scheme}://%{host}/edgio-error',
      },
    },
    url: {
      follow_redirects: true,
    },
    response: {
      set_status_code: 302,
    },
  })
  .always({
    caching: {
      bypass_cache: true,
      bypass_client_cache: true,
    },
  })
  .catch(/^(4|5)\d{2}$/, {
    headers: {
      set_response_headers: {
        location: '%{scheme}://%{host}/edgio-error',
      },
    },
    url: {
      follow_redirects: true,
    },
    response: {
      set_status_code: 302,
    },
  });

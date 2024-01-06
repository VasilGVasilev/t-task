Vite bundles and servers code locally during dev. It has HMR. It reminds me of create-react-app in that it is just that, for routing you need your own library.

Next.js includes several features that make it more complex compared to simply serving a static index.html file (routing, ssr).

In our case, we actually merely need to 'update' vite with the react-router-dom so that we not just server static sites, but a client side rendered single page app.
Vite bundles and servers code locally during dev. It has HMR. It reminds me of create-react-app in that it is just that, for routing you need your own library.

Next.js includes several features that make it more complex compared to simply serving a static index.html file (routing, ssr).

In our case, we actually merely need to 'update' vite with the react-router-dom so that we not just server static sites, but a client side rendered single page app. Also, Tailwind.


Links aside from docs:
[quick start redux](https://redux-toolkit.js.org/tutorials/quick-start) mind that you need redux-toolkit and react-redux both
[redux](https://medium.com/@ishdagnesh/how-to-use-react-vite-js-with-redux-0aaf60835052)
[tailwind](https://www.youtube.com/watch?v=3YNijcxYvPk)
[Multi-page, mind it is still SPA, no new fetches, just manipulate the DOM](https://www.youtube.com/watch?v=p8ZjHpMo-E4)
[vite + react](https://medium.com/@galohernandez/vite-react-react-router-dom-the-latest-way-312ee887197e)

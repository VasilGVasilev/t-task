- Stumbled upon how to implement Redux with Next.js due to Next.js shifting to App Router, so no longer need for next-redux-wrapper library used for getServerSideProps. This is not so relevant, here, because we do not focus on architecture, but is useful to know for any other bigger project.

Next.js prioritizes SSR, but I do not see the need for this in the current app. Also, Redux is practically incompatible with the SSR architecure as having a global store can lead to [problems](https://redux.js.org/usage/nextjs#the-app-router-architecture-and-redux). You cannot have a global store, rather a duplicate per each request. **CSR is done on the client browser, SSR is done on the server and only then sent to the client browser, thus, you cannot have a global store, you need a global but for each client.**

We will use Vite as a framework due to the above problems with Next and Redux.

- Learn Vite and Redux


React-router-dom has new docs that reflect on a more capable createBrowserRouter +  <RouterProvider router={router} />, but for CSR -> [BrowserRouter suffices](https://www.w3schools.com/react/react_router.asp) 

- Stumbled upon possible ordering issue of routes -> what if /A11 matches and the Router never goes to /A111, ordered below /A11.
[The docs states that v5 necesitates *routes to be ordered just right*, but no such problems occur in v6](https://reactrouter.com/en/main/start/faq#what-happened-to-regexp-routes-paths).

- Stumbled upon the problem that I want to have different navbar layouts for mobile and desktop versions which means we have to track for resizing of the screen. Media Query and Tailwind will not work as it is not merely resize of component but its whole presentation.
I have had tried two solutions:
1. rely on 'window.innerWidth' to determine width and layout
2. rely on 'window.addEventListener("resize", listener)' that constantly checks for resizing
We will apply the custom hook 2.

    - [Config Tailwind] one smaller problem I incurred during Navbar Development -> being used to Next.js ready to use Tailwind setup, I did not configure my possible extensions (missed the jsx) and my Tailwind did not work.
    - [Tailwind generates its styles at build time] in Navbar -> LinkMobileTemplate, I tried to set the color of an element via dynamically passed prop and the problem is that Tailwind generates the style at build time, while the dynamic props are determined at runtime, thus, Tailwind does not know of the dynamic props' values at build time. Solution is to style the css directly, not via Tailwind.
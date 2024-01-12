- [Next.js problems] due to Next.js shifting to App Router, so no longer need for next-redux-wrapper library used for getServerSideProps. This is not so relevant, here, because we do not focus on architecture, but is useful to know for any other bigger project. Next.js prioritizes SSR, but I do not see the need for this in the current app. Also, Redux is practically incompatible with the SSR architecure as having a global store can lead to [problems](https://redux.js.org/usage/nextjs#the-app-router-architecture-and-redux). You cannot have a global store, rather a duplicate per each request. **CSR is done on the client browser, SSR is done on the server and only then sent to the client browser, thus, you cannot have a global store, you need a global but for each client.** Also, React Leaflet has DOM manipulation so cannot do SSR.

Solution - use Vite as a framework


[new docs of react-router-dom] The docs reflect on a more capable createBrowserRouter +  <RouterProvider router={router} />, but for CSR -> [BrowserRouter suffices](https://www.w3schools.com/react/react_router.asp) 

- [routes matching] -> what if /A11 matches and the Router never goes to /A111, ordered below /A11.
[The docs states that v5 necesitates *routes to be ordered just right*, but no such problems occur in v6](https://reactrouter.com/en/main/start/faq#what-happened-to-regexp-routes-paths).

- [different navbar layouts for mobile and desktop versions] - we have to track for resizing of the screen. Media Query and Tailwind will not work as it is not merely resize of component but its whole presentation.
I have had tried two solutions:
1. rely on 'window.innerWidth' to determine width and layout
2. rely on 'window.addEventListener("resize", listener)' that constantly checks for resizing
We will apply the custom hook 2.

    - [Config Tailwind] one smaller problem I incurred during Navbar Development -> being used to Next.js ready to use Tailwind setup, I did not configure my possible extensions (missed the jsx) and my Tailwind did not work.
    - [Tailwind generates its styles at build time] in Navbar -> LinkMobileTemplate, I tried to set the color of an element via dynamically passed prop and the problem is that Tailwind generates the style at build time, while the dynamic props are determined at runtime, thus, Tailwind does not know of the dynamic props' values at build time. Solution is to style the css directly, not via Tailwind.

- [navigate vs redirect] Leaflet does not work with redirect which is used for actions/loaders, but works with [navigate](https://stackoverflow.com/questions/74413650/what-is-difference-between-usenavigate-and-redirect-in-react-route-v6). My goal was to trigger a redirection to the line's route on click of that very line. 
- [leaflet Events] To manipulate events use hooks like useMapEvent() if you want to manipulate the actual children components of MapContainer -> see eventHandlers.

- [react converts into json on import] When you import a JSON file in a React application, the file is automatically parsed into a JavaScript object. This behavior is due to the json-loader module which is included in tools like Create React App and Webpack. As a result, you don't need to manually parse the JSON file using JSON.parse()

- [update data with colors before using it] I made my own separate colorsOption data. I commented out a possible way to merge it with the original data only in state, but decided for the purposes of this app and given the fact there is no actual API call to fetch data, I am not going to further delve into DB optimization.

- [overlapping lines] I have TM8 and TM10 overlapping in certain segments. I have made the shorter line visible by putting it lower in order to stand out, but a more general solution would be offsetting it. However, this requires consideration with the team and since there is no actual react-leaflet, but only a vanillaJS leaflet plugin for offset, I decided to leave it as it is for the purposes of this task. After, we still have each line clickable from a list, not a map, so functionality is not drastically impaired.

- [filter for line] Filter needs to have its own style that relies on dynamic Booleans that determine if the filter is clicked or not, but again the problem is that Tailwind generates at build time, while state is determined at runtime. 

- [mock api request] all necessary information about populating Redux state is basically on [here](https://redux.js.org/tutorials/essentials/part-5-async-logic), I applied createAsyncThunk, since RTK query seemed like an overkill since we are just mocking data fetching, after all.
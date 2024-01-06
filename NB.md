Stumbled upon how to implement Redux with Next.js due to Next.js shifting to App Router, so no longer need for next-redux-wrapper library used for getServerSideProps. This is not so relevant, here, because we do not focus on architecture, but is useful to know for any other bigger project.

Next.js prioritizes SSR, but I do not see the need for this in the current app. Also, Redux is practically incompatible with the SSR architecure as having a global store can lead to [problems](https://redux.js.org/usage/nextjs#the-app-router-architecture-and-redux). You cannot have a global store, rather a duplicate per each request. **CSR is done on the client browser, SSR is done on the server and only then sent to the client browser, thus, you cannot have a global store, you need a global but for each client.**

We will use Vite as a framework due to the above problems with Next and Redux.

- Learn Vite and Redux
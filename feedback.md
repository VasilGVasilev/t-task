The feedback was mainly centered about the app not being optimised enough.

1. Designing a Normalized State
I should have had a normalised data regarding what I need of the database:
array with coords of polyfill, coords of stops, names of stops



2. Not having normalized state, I had to at least optimise calulcations
Namely, instead of calculating coords on each render of a component that needs coords by feeding it the function that makes the calculation, I should have cached the once calculated array.
Entails having data extracted from state in a ready to use cache
Solution: instead of traversing though the data with my functions that return an array with coords or names, apply useMemo() hook to extract this data in a ready to be used array. Instead I put the function that returns an array directly in the component that relied on the information, thus, making the calculations happen on each render, ex. clicking in between lines.

BUT given React Forget pending update, caching may be an overhead of the [past](https://medium.com/rewrite-tech/what-is-react-forget-00fdd742636c)

3. Parent re-render re-renders children if not stopped via React.memo()

One example is the filter Button. It triggers a change of state, and since it is parent state (Home component) to the subcomponents rendered for each line, a toggle will render off the unselected transportTypes but also re-render the reamining selected transportTypes.

Solution would be memo - *lets you skip re-rendering a component when its props are unchanged*. Mind that **state change in component will re-render whole component and any children components if memo is not used**

accoding to eslint: this is the right way to apply [memo](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/display-name.md)



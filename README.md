# Books explorer

This is a sample project using the following technologies:

- React
- Redux toolkit
- Jest
- react-testing-library
- Material UI

## Architecture

This project is architectured using a Redux architure with a clear separation between the shared state and the view. Using Redux for such a tiny project is an overhead, and the reason to use it is just to show my knowledge and experience with this library. React Context API within `useReducer` is a good alternative for small projects like this.

The folder `slice` gather actions, reducers and selectors grouped by feature. In this case we have only one feature called `books`.

The view is all the component tree that is created from `App.tsx`. View components dispatch actions that are imported from the `slice` features. In this case, a custom hook `useBooks` has been defined to separate all the presentational logic from the data management logic. `useBooks` use the concept of **inversion of control** to provide the functions needed by the presentational components but hidding the internal implementation that make access to the `dispatch` and the Redux actions exported from the `slice`.

## Testing

Tests has been implemented using TDD and BDD. BDD allows that the tests resemble as much as possible to how the software is used avoiding implementation details. Unit tests could be complemented with some E2E tests (i.e. implemented in Cypress).

## Features

- Display a list of books using the `openlibrary` public API.
- Filter books by title using the Search box.
- Hide books clicking on the trash icon.

The rest of features suggested in the technical assessment document can be implemented following this architecture:

- Showcase or edit rows: Create a form component and fill it with the current data. In the case of the edition, create a new action to edit the book fields.
- Column sort: Material UI table provide support for sorting. It is only needed to enable the configuration as is documented in the MUI documentation https://mui.com/material-ui/react-table/#sorting-amp-selecting

## Improvements

- Load more books using pagination format or load more rows using an infinite scroll pattern where new rows are loaded when the user reach scrolling the end of the page.
- Some heavy operations as search, filter or sorting could be moved to web workers avoiding the call stack is blocked. This will allow that render operations are executed meanwhile the heavy operations are executed in background.

## How to launch the project

Execute `nmv use` or make sure that you are using the node version defined in `.nvmrc`.

Then execute:

1. `npm install`
2. `npm start`

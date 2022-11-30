// import { render, RenderResult, } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { store } from '../store/store';
// import { HashRouter as Router } from "react-router-dom";
// import React from "react";
// import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
//
// export const renderWithProvider = (children: ReactJSXElement): RenderResult =>
//   render(
//     <Provider store={store}>
//       <Router>
//         children
//       </Router>
//     </Provider>
//   );
import React, { PropsWithChildren } from 'react'
import { HashRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
// As a basic setup, import your same slice reducers
import weatherReducer, { initialState as weatherInitialState } from '../store/weatherSlicer';

const preloadedState = {
  weather: weatherInitialState,
}

export function renderWithProvider(
  ui: React.ReactElement,
  {
    preloadedState: RootState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: { weather: weatherReducer }, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>) {
    return <Provider store={store}>
      <Router>
        {children}
      </Router>
    </Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

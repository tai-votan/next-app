import React from "react";
import model from "models/index";
import { Provider } from "react-redux";
import createLoading from "dva-loading";
import dva, { connect } from "dva-no-router";

const checkServer = () => Object.prototype.toString.call(global.process) === "[object process]";

const _NEXT_DVA_STORE_ = "_NEXT_DVA_STORE_";

function createDvaStore(initialState) {
  const app = dva({
    initialState,
    ...createLoading()
  });
  const isArray = Array.isArray(model);
  if (isArray) {
    model.forEach((m) => {
      app.model(m);
    });
  } else {
    app.model(model);
  }
  app.router(() => {});
  app.start();
  return app._store;
}

function getOrCreateStore(initialState) {
  const isServer = checkServer();
  if (isServer) {
    // run in server
    return createDvaStore(initialState);
  }
  if (!window[_NEXT_DVA_STORE_]) {
    window[_NEXT_DVA_STORE_] = createDvaStore(initialState);
  }
  return window[_NEXT_DVA_STORE_];
}

export default function withDva(...args) {
  return function CreateNextPage(Component) {
    const ComponentWithDva = (props = {}) => {
      const { store, initialProps, initialState } = props;
      const ConnectedComponent = connect(...args)(Component);
      return React.createElement(
        Provider,
        // in client side, it will init store with the initial state tranfer from server side
        {
          store: store && store.dispatch ? store : getOrCreateStore(initialState)
        },
        // transfer next.js's props to the page
        React.createElement(ConnectedComponent, initialProps)
      );
    };
    ComponentWithDva.getInitialProps = async (props = {}) => {
      const isServer = checkServer();
      const store = getOrCreateStore(props.req);
      // call children's getInitialProps
      // get initProps and transfer in to the page
      const initialProps = Component.getInitialProps ? await Component.getInitialProps({ ...props, isServer, store }) : {};
      return {
        store,
        initialProps,
        initialState: store.getState()
      };
    };
    return ComponentWithDva;
  };
}

import React from "react";
import connect from "utils/store";
import { Button } from "antd";

@connect(({ details }) => ({
  details
}))
class Home extends React.Component {
  static async getInitialProps(props) {
    // first time run in server side
    // other times run in client side ( client side init with default props
    const { pathname, query, isServer, store } = props;
    // dispatch effects to fetch data here
    await store.dispatch({
      type: "details/fetchArticleDetails",
      payload: query.id
    });
    const { details } = store.getState();
    console.log("details", details);
    return {
      // dont use store as property name, it will confilct with initial store
      pathname,
      query,
      isServer,
      dvaStore: store,
      details
    };
  }

  render() {
    const { details } = this.props;
    console.log("this.props details", details);
    return (
      <div>
        <Button>Load</Button>
      </div>
    );
  }
}

export default Home;

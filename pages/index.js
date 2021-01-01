import React from "react";
import { NextSeo } from "next-seo";
import connect from "utils/store";
import { Button, Spin } from "antd";
import Link from "next/link";

@connect(({ index, loading: { effects } }) => ({
  index,
  loading: effects
}))
class Home extends React.Component {
  state = {
    page: 2
  };

  static async getInitialProps(props) {
    // first time run in server side
    // other times run in client side ( client side init with default props
    const { pathname, query, isServer, store } = props;
    // dispatch effects to fetch data here
    await store.dispatch({
      type: "index/fetchLastestArticle",
      payload: {
        language: "VN",
        limit: 6,
        page: 1,
        isIgnoreFeatureArticle: true
      }
    });
    const { index } = store.getState();
    return {
      // dont use store as property name, it will confilct with initial store
      pathname,
      query,
      isServer,
      dvaStore: store,
      index
    };
  }

  handleLoadMore = () => {
    const { dispatch } = this.props;
    const { page } = this.state;
    this.setState({ page: page + 1 });
    dispatch({
      type: "index/fetchLastestArticle",
      payload: {
        language: "VN",
        limit: 6,
        page,
        isIgnoreFeatureArticle: true
      }
    });
  };

  render() {
    const {
      index: { latest },
      loading
    } = this.props;
    return (
      <div>
        <NextSeo
          title="Using More of Config"
          description="This example uses more of the available config options."
          canonical="https://www.canonical.ie/"
          openGraph={{
            url: "https://www.url.ie/a",
            title: "Open Graph Title",
            description: "Open Graph Description",
            images: [
              {
                url: "https://www.example.ie/og-image-01.jpg",
                width: 800,
                height: 600,
                alt: "Og Image Alt"
              },
              {
                url: "https://www.example.ie/og-image-02.jpg",
                width: 900,
                height: 800,
                alt: "Og Image Alt Second"
              },
              { url: "https://www.example.ie/og-image-03.jpg" },
              { url: "https://www.example.ie/og-image-04.jpg" }
            ],
            site_name: "SiteName"
          }}
          twitter={{
            handle: "@handle",
            site: "@site",
            cardType: "summary_large_image"
          }}
        />
        <Spin spinning={loading["index/fetchLastestArticle"]}>
          {latest.map(({ _id, title, slug }) => (
            <div key={_id}>
              <Link
                href={{
                  pathname: "/[slug]",
                  query: { slug }
                }}>
                <a>{title}</a>
              </Link>
            </div>
          ))}
        </Spin>
        <Button type="primary" loading={loading["index/fetchLastestArticle"]} onClick={this.handleLoadMore}>
          Load
        </Button>
      </div>
    );
  }
}

export default Home;

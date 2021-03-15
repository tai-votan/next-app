import React, { useState } from 'react';
import { NextSeo } from 'next-seo';
import connect from 'utils/store';
import { Button, Spin, Row, Col } from 'antd';
import VideoBackground from 'components/videos-bg';
import ArticleItem from 'components/article-item';
import get from 'lodash/get';
import { useRouter } from 'next/router';
import { ARTICLE_LANGUAGE } from 'utils/constants';

const Home = (props) => {
  const { locale } = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    index: { latest },
    loading
  } = props;

  const handleLoadMore = () => {
    const { dispatch } = props;
    const page = currentPage + 1;
    setCurrentPage(page);
    dispatch({
      type: 'index/fetchLatestArticle',
      payload: {
        language: ARTICLE_LANGUAGE[locale],
        limit: 6,
        page,
        isIgnoreFeatureArticle: true
      }
    });
  };
  return (
    <>
      <NextSeo
        title="Using More of Config"
        description="This example uses more of the available config options."
        canonical="https://www.canonical.ie/"
        openGraph={{
          url: 'https://www.url.ie/a',
          title: 'Open Graph Title',
          description: 'Open Graph Description',
          images: [
            {
              url: 'https://www.example.ie/og-image-01.jpg',
              width: 800,
              height: 600,
              alt: 'Og Image Alt'
            },
            {
              url: 'https://www.example.ie/og-image-02.jpg',
              width: 900,
              height: 800,
              alt: 'Og Image Alt Second'
            },
            { url: 'https://www.example.ie/og-image-03.jpg' },
            { url: 'https://www.example.ie/og-image-04.jpg' }
          ],
          site_name: 'SiteName'
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image'
        }}
      />
      <div className={'container'}>
        <Row>
          <Col xs={24} sm={18} xl={{ span: 16, offset: 2 }}>
            <Spin spinning={loading['index/fetchLatestArticle']}>
              {latest.map((item) => {
                const { name, key } = get(item, 'topic[0]', {});
                return (
                  <ArticleItem
                    key={item._id}
                    title={item.title}
                    author={get(item, 'writer.penname')}
                    datePublished={item.publishDate}
                    language={locale}
                    link={`/${key}/${item.slug}`}
                    topic={name}
                  />
                );
              })}
            </Spin>
            <Button type="primary" loading={loading['index/fetchLatestArticle']} onClick={handleLoadMore}>
              Load
            </Button>
          </Col>
        </Row>
      </div>
      <VideoBackground />
    </>
  );
};

Home.getInitialProps = async (ctx) => {
  // first time run in server side
  // other times run in client side ( client side init with default props
  const { pathname, query, isServer, store } = ctx;
  // dispatch effects to fetch data here
  await store.dispatch({
    type: 'index/fetchLatestArticle',
    payload: {
      language: 'VN',
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
};

const mapStateToProps = ({ index, loading: { effects } }) => ({ index, loading: effects });

export default connect(mapStateToProps)(Home);

import React from 'react';
import Link from 'next/link';

const ArticleItem = (props) => {
  const { title, datePublished, link, topic, language } = props;
  return (
    <div>
      <div>
        <Link href={link} locale={language}>
          <a>
            <h3>{title}</h3>
            <div>
              <span />
            </div>
            <p>{topic}</p>
            <div>
              <p>{datePublished}</p>
              <p>11 phút đọc</p>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ArticleItem;

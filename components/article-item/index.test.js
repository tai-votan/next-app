import React from 'react';
import ArticleItem from './index';
import { shallow } from 'enzyme';

describe('<ArticleItem />', () => {
  it('render <ArticleItem />', () => {
    const articleItem = shallow(<ArticleItem />);
    const findElement = articleItem.find('div');
    expect(findElement).toHaveLength(1);
  });
});

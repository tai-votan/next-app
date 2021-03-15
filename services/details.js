import request from 'utils/request';

export async function articleDetails(slug) {
  return request(`/v2/article-detail/${slug}`);
}
// ?limit=6&page=1&language=VN&isIgnoreFeatureArticle=true

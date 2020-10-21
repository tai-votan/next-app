import request from "utils/request";

export async function latestArticle(params) {
  return request("/v2/latest-article", {
    method: "GET",
    params
  });
}
// ?limit=6&page=1&language=VN&isIgnoreFeatureArticle=true

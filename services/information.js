import request from "utils/request";

export async function getFeature(params) {
  return request("/v2/topic-article", {
    method: "GET",
    params,
  });
}

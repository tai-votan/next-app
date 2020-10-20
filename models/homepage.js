import { latestArticle } from "services/home";

const model = {
  namespace: "index",
  state: {
    latest: [],
  },

  effects: {
    *fetchLastestArticle({ payload }, { call, put, select }) {
      const { data } = yield call(latestArticle, payload);
      const { feature } = yield select(({ index }) => index);
      yield put({
        type: "save",
        payload: { latest: feature.concat(data.docs) },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

export default model;

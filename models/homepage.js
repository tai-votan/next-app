import { latestArticle } from "services/home";

const homepage = {
  namespace: "index",
  state: {
    latest: []
  },

  effects: {
    *fetchLastestArticle({ payload }, { call, put, select }) {
      const { data } = yield call(latestArticle, payload);
      const { latest } = yield select(({ index }) => index);
      yield put({
        type: "save",
        payload: { latest: latest.concat(data.docs) }
      });
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};

export default homepage;

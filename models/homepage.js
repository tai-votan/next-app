import { getFeature } from "services/information";

const model = {
  namespace: "index",
  state: {
    feature: [],
  },

  effects: {
    *login({ payload }, { call, put, select }) {
      const { data } = yield call(getFeature, payload);
      const { feature } = yield select(({ index }) => index);
      yield put({
        type: "save",
        payload: { feature: feature.concat(data.docs) },
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

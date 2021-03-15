import { articleDetails } from 'services/details';

const details = {
  namespace: 'details',
  state: {
    details: {}
  },

  effects: {
    *fetchArticleDetails({ payload }, { call, put }) {
      const { data } = yield call(articleDetails, payload);
      yield put({
        type: 'save',
        payload: { details: data.docs[0] }
      });
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};

export default details;

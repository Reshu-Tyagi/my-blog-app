import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchPostsRequest, fetchPostsSuccess, fetchPostsFailure, fetchPostByIdRequest, fetchPostByIdSuccess, fetchPostByIdFailure } from '../slices/postsSlice';
import { getPosts, getPostById } from '@/lib/postsService';

function* handleFetchPosts() {
  try {
    const response = yield call(getPosts);
    yield put(fetchPostsSuccess({ posts: response.posts, total: response.total }));
  } catch (error: any) {
    yield put(fetchPostsFailure(error.message));
  }
}

function* handleFetchPostById(action: ReturnType<typeof fetchPostByIdRequest>) {
  try {
    const response = yield call(getPostById, action.payload);
    yield put(fetchPostByIdSuccess(response));
  } catch (error: any) {
    yield put(fetchPostByIdFailure(error.message));
  }
}

export default function* postsSaga() {
  yield takeLatest(fetchPostsRequest.type, handleFetchPosts);
  yield takeLatest(fetchPostByIdRequest.type, handleFetchPostById);
}
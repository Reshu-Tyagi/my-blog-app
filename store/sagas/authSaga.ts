import { call, put, takeLatest } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure } from '../slices/authSlice';
import { loginUser } from '@/lib/authService';

function* handleLogin(action: ReturnType<typeof loginRequest>) {
  try {
    const response = yield call(loginUser, action.payload);
    
    if (response && response.token) {
      const user = {
        id: response.id,
        username: response.username,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName || '',
        image: response.image || '',
      };
      yield put(loginSuccess({ user, token: response.token }));
    } else {
      throw new Error('Login failed');
    }
  } catch (error: any) {
    yield put(loginFailure(error.message || 'Login failed'));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}
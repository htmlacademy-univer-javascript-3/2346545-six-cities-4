import { clearErrorAction } from '../store/api-actions';
import { setError } from '../store/action';
import { store } from '../store';


export const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};

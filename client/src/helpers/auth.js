import { setCookie, getCookie, deleteCookie } from './cookies';
import { setLocalStorage, getLocalStorage, deleteLocalStorage} from './localStorage';

export const setAuthentication = (token, user) => {
    setCookie('token', token);
    setLocalStorage('user', user);
};

export const isAuthenticated = () => {
    const token = getCookie('token');
    const user = getLocalStorage('user');
    if (user) {
        return user;
    } else {
        return false;
    }
}

export const logout = next => {
    deleteCookie('token');
    deleteLocalStorage('user');

    next();
}

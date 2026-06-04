const KEY = "mathara_user";

export function setSession(user) {
    localStorage.setItem(KEY, JSON.stringify(user));
}

export function getSession() {
    const raw = localStorage.getItem(KEY);

    if (!raw) return null;

    return JSON.parse(raw);
}

export function clearSession() {
    localStorage.removeItem(KEY);
}

export function isLogin() {
    return !!getSession();
}

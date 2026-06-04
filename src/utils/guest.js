const KEY = "mathara_guest";

export function setSessionGuest(progress) {
    localStorage.setItem(KEY, JSON.stringify(progress));
}

export function getSessionGuest() {
    const raw = localStorage.getItem(KEY);

    if (!raw) return null;

    return JSON.parse(raw);
}

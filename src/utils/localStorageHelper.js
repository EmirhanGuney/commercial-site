export const addToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key) => {
    const value = localStorage.getItem(key);
    if (!value) {
        return null;
    }

    try {
        return value ? JSON.parse(value) : null;
    } catch (error) {
        return null;
    }
};

export const cutTheString = (str, length = 10, endOfit = "...") => {
    if (str.length > length) {
        return str.substring(0, length) + endOfit;
    }
    return str;
};
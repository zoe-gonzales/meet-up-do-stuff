export default {
    value(input) {
        return input !== null;
    },
    string(input) {
        return input !== '';
    },
    date(input) {
        return input !== '2000-01-01T00:00:00-07:00';
    },
    email(input) {
        return input.match(/\S+@\S+\.\S+/) !== null;
    },
    password(input) {
        return input.match(/^^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{12,}$/) !== null;
    },
    match(first, second) {
        if (first === '' || second === '') return false;
        return first === second;
    },
    arrayIncludes(item, arr) {
        if (arr.length <= 0) return false;
        return arr.includes(item);
    },
}
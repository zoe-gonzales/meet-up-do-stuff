export default {
    value(input) {
        return input !== null;
    },
    string(input) {
        return input !== '';
    },
    date(input) {
        return input !== '2000-01-01T00:00:00-07:00';
    }
}
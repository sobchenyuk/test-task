//Задание 1
class StringBuilder {

    constructor(baseString) {
        this._value = baseString;
    }

    /**
     * @param {string} str
     * Метод append(str) - получает парметр str (строку)
     * и добавляет ее в конец свойства value.
     */
    append(str) {
        this._value = `${this._value}${str}`
        return this;
    }

    /**
     * @param {string} str
     * Метод prepend(str) - получает парметр str (строку)
     * и добавляет ее в начало свойства value.
     */
    prepend(str) {
        this._value = `${str}${this._value}`
        return this;
    }

    /**
     * @param {string} str
     * Метод pad(str) - получает парметр str (строку)
     * и добавляет ее в начало и в конец свойства value.
     */
    pad(str) {
        this._value = `${str}${this._value}${str}`
        return this;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }
}


const builder = new StringBuilder('.');
builder
    .append('^')
    .prepend('^')
    .pad('=');

console.log(builder.value);

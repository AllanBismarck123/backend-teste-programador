class Tag {

    _nameTag;
    _numberTimes;

    constructor(nameTag) {
        this._nameTag = nameTag;
        this._numberTimes = 0;
    }

    incrementNumberTimes() {
        this._numberTimes++;
    }

    setName(value) {
        this._nameTag = value;
    }

    setNumberTimes(value) {
        this._numberTimes = value;
    }

    getName() {
        return this._nameTag;
    }

    getNumberTimes() {
        return this._numberTimes;
    }

}

module.exports = Tag;
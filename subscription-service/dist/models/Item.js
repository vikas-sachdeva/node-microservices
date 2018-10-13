"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Item {
    constructor(_id, _name) {
        this._id = _id;
        this._name = _name;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
}
exports.Item = Item;
//# sourceMappingURL=Item.js.map
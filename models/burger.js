const orm = require("../config/orm");

module.exports = {
    all: cb => orm.selectAll("burgers", cb),
    create: (name, cb) => orm.insertOne("burgers", ["burger_name"], [name], cb),
    update: (id, objColVals, cb) => orm.updateOne("burgers", id, objColVals, cb)
};
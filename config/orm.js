const connection = require("./connection");

const qify = arr => arr.length === 0 ? "" : "?,".repeat(arr.length - 1) + "?";

// Helper function to convert object key/value pairs to SQL syntax
const objToSql = ob => {
    let arr = [];
    // loop through the keys and push the key/value as a string int arr
    for (let key in ob) {
        let value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
};

module.exports = {
    selectAll: (table, cb) => {
        connection.query("select * from " + table, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: (table, cols, vals, cb) => {
        connection.query(`insert into ${table} (${cols.toString()}) values (${qify(vals)})`, vals, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateOne: (table, id, objColVals, cb) => {
        connection.query(`update ${table} set ${objToSql(objColVals)} where id=${id}`, (err, result) => {
            if(err) throw err;
            cb(result);
        });
    }
};
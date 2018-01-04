const Stringifier = require('./stringifier');

module.exports = function sassStringify(node, builder) {
    var str = new Stringifier(builder);
    str.stringify(node);
};

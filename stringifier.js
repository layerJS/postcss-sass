const Stringifier = require('postcss/lib/stringifier');

const SassStringifier = function (builder) {
    Stringifier.call(this, builder);
};

SassStringifier.prototype = Object.create(Stringifier.prototype);
SassStringifier.prototype.constructor = Stringifier;

SassStringifier.prototype.has = function has(value) {
    return typeof value !== 'undefined';
};

SassStringifier.prototype.block = function (node, start) {
    const between = node.raws.between || '';
    this.builder(start + between, node, 'start');
    if (this.has(node.nodes)) {
        this.body(node);
    }
};

SassStringifier.prototype.decl = function (node) {
    const between = this.raw(node, 'between', 'colon');
    let string = node.prop + between + this.rawValue(node, 'value');

    if (node.important) {
        string += node.raws.important || ' !important';
    }
    this.builder(string, node);
};

SassStringifier.prototype.comment = function (node) {
    let left  = this.raw(node, 'left',  'commentLeft');
    let right = this.raw(node, 'right', 'commentRight');

    if ( node.raws.inline ) {
        let text = node.raws.text || node.text;
        this.builder('//' + left + text + right, node);
    } else {
        this.builder('/*' + left + node.text + right + '*/', node);
    }
};


module.exports = SassStringifier;

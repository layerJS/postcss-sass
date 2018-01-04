const jsonify = require('postcss-parser-tests').jsonify;
const path = require('path');
const fs   = require('fs');

const stringify = require('../stringify');
const parse     = require('../parse');

let tests = fs
    .readdirSync(path.join(__dirname, 'cases'))
    .filter(i => path.extname(i) === '.sass' );

function read(file) {
    return fs.readFileSync(path.join(__dirname, 'cases', file)).toString();
}

function run(sass, from) {
    let root = parse(sass, {
        from
    });
    let output = root.toString(stringify);
    expect(sass.trim()).toEqual(output.trim());
    try {
    } catch (ex) {
        console.log(jsonify(root));
    }
}

for ( let name of tests ) {
    it('stringifies ' + name, () => {
        run(read(name), name);
    });
}

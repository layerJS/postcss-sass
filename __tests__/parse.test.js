const jsonify = require('postcss-parser-tests').jsonify;
const scssSyntax = require('postcss-scss');
const path = require('path');
const fs = require('fs');

const parse = require('../parse');
let tests = fs
    .readdirSync(path.join(__dirname, 'cases'))
    .filter(i => path.extname(i) === '.sass' );

function read(file) {
    return fs.readFileSync(path.join(__dirname, 'cases', file)).toString();
}

for ( let name of tests ) {
    it('parses ' + name, () => {
        const sass = read(name);
        const scss = read(name.replace(/\.\w+$/, '.scss'));
        const root = parse(sass, {
            from: path.posix.join('__tests__/cases', name)
        });
        // fs.writeFile(path.posix.join('__tests__/cases', name.replace(/\.\w+$/, '.scss')), root.toString(scssSyntax));
        expect(root.toString(scssSyntax)).toEqual(scss);
        expect(jsonify(root)).toMatchSnapshot();
    });
}

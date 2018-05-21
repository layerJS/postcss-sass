const jsonify = require('postcss-parser-tests').jsonify
const path = require('path')
const fs = require('fs')
const parse = require('../parse')
const read = require('./utils/read')

const tests = fs
  .readdirSync(path.join(__dirname, 'cases'))
  .filter(i => path.extname(i) === '.sass')

for (const name of tests) {
  it('parses ' + name, () => {
    const sass = read(name)
    const root = parse(sass, { from: name })
    expect(jsonify(root)).toMatchSnapshot()
  })
}

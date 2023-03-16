const path = require('path')
const fs = require('fs')

test('index file exists', () => {
  const filePath = path.join(__dirname, "..", 'index.tsx')
  expect(fs.existsSync(filePath)).toBeTruthy()
})

export {}
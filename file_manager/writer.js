

// const fs = require('fs')
// const content2 = 'Some content!'
// try {
//   const data = fs.writeFileSync('/Users/Allan/Downloads/teste.html', content2)
//   // arquivo escrito com sucesso
// } catch (err) {
//   console.error(err)
// }

var writer = (url, data) => {
    const fs = require('fs')
    fs.writeFile(url, data, { flag: 'a+' }, err => {
        if (err) {
            console.error(err)
            return
        }
        // arquivo escrito com sucesso
    })
}

module.exports = writer;
// var readFileLocal = (url) => {
//   const fs = require('fs')
//   fs.readFileSync(url, 'utf8', (err, data) => {
//     if (err) {
//       console.error(err)
//       return null
//     }
//     console.log(data)
//     return data;
//   })
// }

var readFileLocalSync = (url) => {
  const fs = require('fs')
  try {
    const data = fs.readFileSync(url, 'utf8')
    // console.log(data)
    return data;
  } catch (err) {
    console.error(err)
  }
}

// module.exports = readFileLocal;

module.exports = readFileLocalSync;
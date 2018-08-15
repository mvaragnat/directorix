const { registerApp, connectApp } = require('radixdlt-js-lite');

const name = 'directorix';
const description = 'Register your Radix address, with your personal handle for messaging';
const permissions = [
  'address',
  // 'balance',
  // 'send_transactions',
  // 'send_messages',
  // 'send_application_messages',
  // 'transactions',
  // 'messages',
  // 'application_messages'
];

// Register your App and accept the petition on the desktop wallet:
exports.register = function (code) {
  // switch (code) {
    // case 'infos':
      return registerApp(name, description, permissions)
    // case 'send':
      // return registerApp(name, description, permissions)
    // default:
      // throw new Error('App code unkown')
  // }
}

exports.getAddress = function(token, cb) {
  connectApp(token)
    .then(connection => {
      console.log('getting address')
      connection.getAddress().subscribe(address => {
        console.log(address)
        cb(null, address)
      })
    })
    .catch(error => {
      console.log("Error while re-using a token: " + JSON.stringify(error));
      cb(error)
    });
}

// exports.getAddressAndBalance = function(token, cb) {
//   connectApp(token)
//     .then(connection => {
//       console.log('getting address and balance')
//       connection.getAddress().subscribe(address => {
//         console.log(address)
//         connection.getWallet().getBalance().subscribe(balance => {
//           console.log(balance)
//           cb(address, balance)
//         })
//       })
//     })
//     .catch(error => {
//       console.log("Error while re-using a token: " + JSON.stringify(error));
//       cb(error)
//     });
// }

// exports.send = function(token, cb) {
//   connectApp(token)
//     .then(connection => {
//       console.log('sending')
//       const wallet = connection.getWallet();
//       console.log('wallet')//, wallet)
//       wallet.sendTransaction('9iLyKrt81vWRW5LqamzWiVpAV3CoeML3wzzUZTbGT1y9FLowtF4', 'TEST', 0.0002, 'Test message').subscribe(
//           response => {
//             console.log(`Your transaction was succesfully submitted: ${JSON.stringify(response)}`)
//             cb(null)
//           },
//           error => {
//             console.log(`Sorry, something went wrong: ${JSON.stringify(error)}`)
//             cb(error)
//           }
//         );
//     })
//     .catch(error => {
//       console.log("Error while re-using a token: " + JSON.stringify(error));
//       cb(error)
//     });
// }

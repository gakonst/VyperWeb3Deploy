### Viper Web3 Deploy
Requires Viper (https://github.com/ethereum/viper/) installed (https://viper.readthedocs.io/en/latest/installing-viper.html)
Using *web3@0.20.0*! Does not work with latest web3 as the syntax is a little different.

Javascript wrapper for the Viper Compiler: `./utils/Wrapper.js`

Automatic web3 deployment of Viper Contract: `./utils/Deployer.js`

Ideally this can be used to integrate Viper contracts in truffle-compile (https://github.com/trufflesuite/truffle-compile/) and thus in truffle-framework

### Installing
```
npm install
```

### Test
(launch ganache)
```
node example.js -f contracts/greeter.v.py -h http://localhost:7545
```


### Usage:

## Viper compiler wrapper for Javascript
```javascript
Viper = require("./utils/Wrapper.js")
Viper.compileAll(FILENAME, function(compiled_contract) {
	abi = JSON.parse(compiled_contract['abi'])
	bytecode = '0x' + compiled_contract['bytecode']
	// do whatever you want
});
```

## Automatic Deployment
```javascript
Deployer = require("./utils/Deployer.js")
Deployer.deployContract(FILENAME, RPC_ADDRESS, function(contractInstance) {

	// do whatever you want
});
```


### Viper Web3 Deploy
Requires Viper (https://github.com/ethereum/viper/) installed (https://viper.readthedocs.io/en/latest/installing-viper.html)

Includes Viper-Wrapper.js:
Wrapper for the Viper compiler for javascript
Ideally this can be used to integrate Viper contracts in truffle-compile (https://github.com/trufflesuite/truffle-compile/)

Usage:
```Viper = require("./utils/Viper-Wrapper.js")
Viper.compileAll(FILENAME, function(compiled_contract) {
	abi = JSON.parse(compiled_contract['abi'])
	bytecode = '0x' + compiled_contract['bytecode']
	// do whatever you want
	```

TODO: Find out why viper contract costs so much for deployment. 

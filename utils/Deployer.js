// FILENAME path to contract
// RPC_ADDRESS IP:PORT of your node's JSON-RPC interface
deployContract = function(FILENAME, RPC_ADDRESS, GAS, PARAMETER, callback) {
	// Load Viper compiler wrapper
	const Viper = require('./Wrapper.js');
	// Start compilation of contract
	Viper.compileAll(FILENAME, function(compiled_contract) {

		// get contract abi
		abi = compiled_contract['abi']
		console.log("[+] Contract ABI:\n", abi);
		abi = JSON.parse(abi)

		// get contract bytecode
		bytecode = compiled_contract['bytecode'].replace('\n','')
		console.log("[+] Contract Bytecode:\n", bytecode)

		// load web3
		const Web3 = require('web3');
		const web3 = new Web3(new Web3.providers.HttpProvider(RPC_ADDRESS));
		owner = web3.eth.accounts[0];

		// create contract object from abi
		contract = web3.eth.contract(abi);

		// deploy contract - Gas used: 182704 with Ganache testrpc
		contractInstance = contract.new( PARAMETER, { 
			from: web3.eth.accounts[0], 
			gas: GAS,
			data: bytecode
		}, function(err, myContract) {
    		if(!err) {
       			// NOTE: The callback will fire twice!
       			// Once the contract has the transactionHash property set and once its deployed on an address.

       			// e.g. check tx hash on the first call (transaction send)
       			if(!myContract.address) {
					receipt = web3.eth.getTransactionReceipt(contractInstance.transactionHash)
					console.log("[+] TX Hash:", contractInstance.transactionHash)
       
       			// check address on the second call (contract deployed)
       			} else {
					address = myContract.address
					console.log("[+] Contract deployed at:", address)

					contract = contract.at(address)
					callback(contract)
       			}	
    		}
  		});
	})
}

module.exports = {
	deployContract : deployContract
}


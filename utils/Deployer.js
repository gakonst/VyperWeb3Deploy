// FILENAME path to contract
// RPC_ADDRESS IP:PORT of your node's JSON-RPC interface
deployContract = function(FILENAME, RPC_ADDRESS, callback) {
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
		// https://ethereum.stackexchange.com/questions/6132/what-are-the-arguments-to-new-from-a-contract-object
		contractInstance = contract.new(/* CONSTUCTOR ARGS ,*/ { 
			from: web3.eth.accounts[0], 
			gas: 3000000,
			data: bytecode
		}, function(err, myContract) {
    		if(!err) {
       			// NOTE: The callback will fire twice!
       			// Once the contract has the transactionHash property set and once its deployed on an address.

       			// e.g. check tx hash on the first call (transaction send)
       			if(!myContract.address) {
					receipt = web3.eth.getTransactionReceipt(contractInstance.transactionHash)
					console.log("[+] TX Hash:", contractInstance.transactionHash)
	           		//console.log(myContract.transactionHash) // The hash of the transaction, which deploys the contract
       
       			// check address on the second call (contract deployed)
       			} else {
					address = myContract.address //receipt.contractAddress
					console.log("[+] Contract deployed at:", address)
           			//console.log(myContract.address) // the contract address

					contract = contract.at(address)
					callback(contract)
       			}	

       		// Note that the returned "myContractReturned" === "myContract",
       		// so the returned "myContractReturned" object will also get the address set.
    		}
  		});
	})
}

module.exports = {
	deployContract : deployContract
}


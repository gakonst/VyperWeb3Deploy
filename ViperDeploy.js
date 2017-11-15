/* Set command line arguments */
const commandLineArgs = require('command-line-args')

const optionDefinitions = [
	{ name: 'filename', alias: 'f', type: String},
	{ name: 'host', alias: 'h', type: String}
]
const options = commandLineArgs(optionDefinitions)

if (options['filename']) {
	FILENAME = options['filename']
} else { 
	console.log("Please provide a filename")
	process.exit()	
}

if (options['host']) {
	RPC_ADDRESS = options['host'];
} else {
	RPC_ADDRESS = "http://localhost:8545"	
}

// Set provider
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(RPC_ADDRESS));
owner = web3.eth.accounts[0];

// Load Viper compiler wrapper
const Viper = require('./utils/Viper-Wrapper.js');

// Start compilation of contract
Viper.compileAll(FILENAME, function(compiled_contract) {

	// get contract abi
	abi = JSON.parse(compiled_contract['abi'])
	// get contract bytecode
	bytecode = compiled_contract['bytecode']

	// create contract object from abi
	contract = web3.eth.contract(abi);

	// deploy contract - TODO: Find why it costs so much gas. Bytecode wrong maybe?
	contractInstance = contract.new( { 
		from: web3.eth.accounts[0], 
		gas: 100000,
		data: bytecode
	})
});




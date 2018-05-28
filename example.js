Deployer = require("./utils/Deployer.js")

/* Set command line arguments */
const commandLineArgs = require('command-line-args')

const optionDefinitions = [
	{ name: 'filename', alias: 'f', type: String},
	{ name: 'arguments', alias: 'a', type: String},
	{ name: 'gas', alias: 'g', type: String},
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

if (options['arguments']) {
	PARAMETERS = options['arguments'];
} else {
	PARAMETERS = "Hello World"
} 

if (options['gas']) {
	GAS = options['gas'];
} else {
	GAS = 500000	
} 

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(RPC_ADDRESS));

Deployer.deployContract(FILENAME, RPC_ADDRESS, GAS, "Initial Greetings!", function(contractInstance) {

	greeter = contractInstance;

	greeting = greeter.greet.call();
	console.log("[-->] Initial greeting:", web3.toAscii(greeting));

	console.log("[+] Setting new greeting...");

	greeter.setGreeting(PARAMETERS, {from: web3.eth.accounts[0], gas: GAS});

	var myEvent = contract.Newgreeting({eventType: 1},{fromBlock: 0, toBlock: 'latest'});
    myEvent.watch(function(error, result){

    	if ( !error) {
			myEvent.stopWatching();
			console.log("[-->] New Greeting:", web3.toAscii(result.args._newgreeting), " msg_sender:", result.args._sender);
		}
    });

});

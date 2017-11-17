Deployer = require("./utils/Deployer.js")

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

Deployer.deployContract(FILENAME, RPC_ADDRESS, function(contractInstance) {

	greeter = contractInstance
	console.log("[!] Testing if greeter.greet() == 'Hello World'")
	hello_world = greeter.greet.call()
	if (hello_world !== '0x48656c6c6f20576f726c64') { // hex encoding of 'Hello World'
		console.log( '[-] not hex of Hello World')
	} else {
	console.log("[+] Success! Your contract compiled and worked as expected.")
	}

});


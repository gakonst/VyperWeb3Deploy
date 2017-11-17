/* Exec system call asynchronously */
var exec = require('child_process').exec;
function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};

VIPER_PATH = '`which viper`'

compileAbi = function(fileName, callback){
    execute(VIPER_PATH + " -f json " + fileName, function(res){
		callback(res);
	});
};

compileBytecode = function(fileName, callback){
    execute(VIPER_PATH + " -f bytecode " + fileName, function(res){
		callback(res);
	});};

compileIr = function(fileName, callback){
    execute(VIPER_PATH + " -f ir " + fileName, function(res){
		callback(res);
	});};

compileAll = function(fileName, callback){
	compileAbi(fileName, function(abi) {
		compileBytecode(fileName, function(bytecode) {
			callback({abi, bytecode});
			});
		});
};

module.exports = {
	compileAbi : compileAbi,
	compileBytecode : compileBytecode,
	copmileIr : compileIr,
	compileAll : compileAll
}

/* Exec system call asynchronously */
var exec = require('child_process').exec;
function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};

VYPER_PATH = '`which vyper`'

compileAbi = function(FILE_PATH, callback){
    execute(VYPER_PATH + " -f json " + FILE_PATH, function(res){
		callback(res);
	});
};

compileBytecode = function(FILE_PATH, callback){
    execute(VYPER_PATH + " -f bytecode " + FILE_PATH, function(res){
		callback(res);
	});};

compileIr = function(FILE_PATH, callback){
    execute(VYPER_PATH + " -f ir " + FILE_PATH, function(res){
		callback(res);
	});};

compileAll = function(FILE_PATH, callback){
	compileAbi(FILE_PATH, function(abi) {
		compileBytecode(FILE_PATH, function(bytecode) {
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

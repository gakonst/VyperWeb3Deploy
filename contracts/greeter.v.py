# Greeter.v.py
# -----------( T. Leijtens, v1.0, Nov 2017 )

Newgreeting: event({_sender: indexed(address), _newgreeting: string[20]})

greeting: public( string[20])

@public
def __init__(_greeting: string[20]):
	self.greeting = _greeting

@public
@payable
def setGreeting(_greeting: string[20]) -> bool:
	self.greeting = _greeting
	log.Newgreeting( msg.sender, _greeting)
	return True

@public
@constant
def greet() -> string[20]:
	return self.greeting

@public
@constant
def sayHello() -> string[20]:
	return "Hello" 

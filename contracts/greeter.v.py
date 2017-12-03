# Greeter.v.py
# -----------( T. Leijtens, v1.0, Nov 2017 )

Newgreeting: __log__({_sender: indexed(address), _newgreeting: bytes <= 20})

greeting: public( bytes <= 20)

@public
def __init__(_greeting: bytes <= 20):
	self.greeting = _greeting

@public
@payable
def setGreeting(_greeting: bytes <= 20) -> bool:
	self.greeting = _greeting
	log.Newgreeting( msg.sender, _greeting)
	return True

@public
@constant
def greet() -> bytes <= 20:
	return self.greeting

@public
@constant
def sayHello() -> bytes <= 20:
	return "Hello" 

# Greeter.vy
# -----------( T. Leijtens, v1.0, Nov 2017 )

greeting: public(bytes <= 20)

@public
def __init__(_greeting: bytes <= 20):
	self.greeting = _greeting

@public
@payable
def setGreeting(_greeting: bytes <= 20):
	self.greeting = _greeting

@public
@constant
def greet() -> bytes <= 20:
	return self.greeting

@public
@constant
def sayHello() -> bytes <= 20:
	return "Hello" 
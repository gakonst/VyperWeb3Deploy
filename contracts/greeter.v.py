# Greeter.v.py
# -----------( T. Leijtens, v1.0, Nov 2017 )

greeting: public(bytes <= 20)

def __init__(_greeting: bytes <= 20):
	self.greeting = _greeting

def setGreeting(_greeting: bytes <= 20):
	self.greeting = _greeting

@constant
def greet() -> bytes <= 20:
	return self.greeting

@constant
def sayHello() -> bytes <= 20:
	return "Hello" 

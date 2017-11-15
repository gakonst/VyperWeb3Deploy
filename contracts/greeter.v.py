phrase: bytes <= 100

# The constructor is only called on deployment
def __init__():
    self.phrase = 'Hello World'

# A read only method. Reading from the EVM is free. Writing costs Gas
@constant
def speak() -> bytes <= 100:
    return self.phrase

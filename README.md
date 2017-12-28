# Unixify

Frameworks can be great. By making varying amount of choices for you, they let
you get to the domain logic as fast as possible. Frameworks can be limiting,
by not choosing you might be missing out on better solutions to your specific
problem. Frameworks can also be complex, they might add a lot more then you
need, needlessly increaing the complexity.

I wanted to see if I could split up Choo, a modern (awesome) web framework,
into a couple of different parts (that I can learn seperately) and see if it
helps me make smarter decicions.

* Creating DOM nodes using tagged template literals
* Morphing DOM nodes when state change
* Support multiple pages using client-side routing
* Act on what's happening using events

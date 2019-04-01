# Dog Adoption Database
Final project for Intro to Databases class.

*Problem statement*

Finding a dog to adopt is tedious because many shelters have dog databases independent from one another. This causes a potentional dog owner has to check dozens of websites to find potential dogs. Basically, information sharing and networking could be improved.

The Goal was to make it easier to find an adoptable dog so that dogs can be adopted quicker, information shared more easily which means happy dogs and happy owners! 

*Project Outline*

The database we will be making will represent a dog adoption shelter network. This is for a fictional
organization but could be used in real life to track adoptable dog attributes and status such as their
name, age, breed, weight, location, status (coming soon, adoptable, and adopted) and new owner
information. In the network, there are multiple shelters and new shelters can be added later. There will
also be vets that are tracked at the shelters. It is assumed that when dogs are entered into the system,
they will have some unknown attributes that can be entered later; noted below where needed. When
dogs are adopted, they remain in the system and will then need owner information.

*The relationships in our database are:*

1) Shelters have Vets – This is a one-to-many relationship because shelters can have many vets
while a vet works at one shelter.

2) Dogs live in shelters – This is a one-to-many relationship because multiple dogs can be in the
same shelter, but a dog can only be in one shelter.

3) Owners dogs – This is a many-to-many relationship because each dog will end up with one or
two owners, but owners can adopt more than one dog. The constraints are such that, there
must be at least 1 dog owner, but there can be multiple owners. Also, dogs can have zero or
many owners, but owners must have at least one dog, but can have multiple dogs (no limit).

4) Dogs have vaccinations – This is a many -to-many relationship because a dog can have many
vaccinations and all dogs can receive the same vaccinations.


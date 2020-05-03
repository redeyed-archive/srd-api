# Races

## RaceAPI

You can access the RaceAPI functions using the default client `srdClient.races` or by creating a new instance of the RaceAPI `const raceAPI = new RaceAPI();`

### get
Gets the named race. This is case insensitive.

### list
Gets all the available races in the collection.

### query
Query the available races in the collection.

You can state one or more of the following filters:

- name: a string to compare to part or the whole of a name of a race. This is case insensitive.

## Race

### Name

The name of the race.

### Description

The spell description text.

This field is an array of description blocks, or paragraphs which include

- a string
- an object detailing a list
- an object detailing a table

### Size

The creature size for the race.

### Speed

The base movement speed for the race.

### Languages

An array of languages that the race knows. 

Additionally, a race could include a `choice` of any available language.

### Traits

An array of racial traits for the race.

A racial trait consists of a `name` and a `description`, which has the same definition as the race description.

### Subraces

An array of subraces for the race.

A subrace definition can include anything from the race definition, except more sub races.

The defined fields in the subrace are in addition to the race traits, even if they have the same name, unless specifically mentioned that it is a replacement.

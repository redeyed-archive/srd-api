# Conditions

## ConditionAPI

You can access the ConditionAPI functions using the default client `srdClient.conditions` or by creating a new instance of the ConditionAPI `const conditionAPI = new ConditionAPI();`

The following functions are available in the ConditionAPI

### get
Gets the named condition.

### list
Gets all the available conditions in the collection.

## Condition

### Name

The name of the condition.

### Description

The condition description text.

This field is an array of description blocks, or paragraphs which include

- a string
- an object detailing a list
- an object detailing a table

### Linked Conditions

An array of other condition names that this condition is associated with.

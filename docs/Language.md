# Languages

## LanguageAPI

You can access the LanguageAPI functions using the default client `srdClient.languages` or by creating a new instance of the LanguageAPI `const languageAPI = new LanguageAPI();`

### get
Gets the named language.

### list
Gets all the available language in the collection.

### query
Query the available languages in the collection.

You can state one or more of the following filters:

- types: one or more LanguageType that the language may use.
- scripts: one or more ScriptType that the language may use.

## Language

### Name

The name of the language.

### Typical Speakers

An array of the names of the creatures or races that will normally speak this language.

### Script

The type of script that is used for this languages written form.

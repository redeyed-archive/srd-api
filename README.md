# SRD API

Tools and helpers to query content made available through the [Systems Reference Document (SRD)](https://dnd.wizards.com/articles/features/systems-reference-document-srd) and the [Open Gaming Licence (OGL)](http://www.opengamingfoundation.org/ogl.html).

## Usage

Install the package using `npm install @evilmonkeyinc/srd-api`

You can then import the library and use the exported client:

`import srdClient from '@evilmonkeyinc/srd-api';`

or you can import the individual API clients instead:

`import { SpellAPI } from '@evilmonkeyinc/srd-api';`

## SpellAPI

You can access the SpellAPI functions using the default client `srdClient.spells` or by creating a new instance of the SpellAPI `const spellAPI = new SpellAPI();`

The following functions are available in the SpellAPI

### get
Gets the named spell. This is case insensitive.

### list
Gets all the available spells in the collection.

### query
Query the available spells in the collection.

You can state one or more of the following filters:

- classes: one or more SpellcasterClass that the spells could belong to.
- levels: one or more spell levels that the spell could have.
- name: a string to compare to part or the whole of a name of a spell. This is case insensitive.
- schools: one or more spell School that the spell could have.
for example, you can request all cantrips (level 0) for Wizards and Warlocks, and all the spells returned will have level 0 and the wizard and/or warlock values in classes

# Licence

This project is covered under the MIT licence.

The files under `public/` such as `public/spells.json` contains content from the SRD and is restricted and covered by the (OGL).

You can find the OGL [here](http://www.opengamingfoundation.org/ogl.html).

You can find the SRD source [here](https://dnd.wizards.com/articles/features/systems-reference-document-srd).

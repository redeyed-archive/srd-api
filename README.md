# SRD API

> **This library is still in under alpha development**: 
> 
> While this library is under development under version v0.x.x minor changes may include breaking changes normally expected of major change version upgrades. 
> 
> The library changes will become more stable when it reaches v1.0.0 and future breaking changes will result in a major change to the version number.

## Description

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

- attackTypes: one or more AttackType that the spells may use.
- castingTime: one or more CastingTime that the spells may use.
- classes: one or more ClassType that the spells could belong to.
- components: state the components the spells uses, verbal, somatic, and material.
- concentration: state if the spells would require concentration or not.
- conditions: one or more ConditionType that the spells is associated with.
- damageTypes: one or more DamageType that the spells could cause.
- durations?: one or more Duration that the spells could be maintained for.
- levels: one or more spell levels that the spells could have.
- name: a string to compare to part or the whole of a name of a spell. This is case insensitive.
- ritual: state if the spells can be cast as a ritual or not.
- saveTypes: one or more Ability that the spells may force a saving through on.
- schools: one or more spell School that the spells could have.
for example, you can request all cantrips (level 0) for Wizards and Warlocks, and all the spells returned will have level 0 and the wizard and/or warlock values in classes

### Spell

The `Spell` object returned by the `SpellAPI` is detailed further [here](docs/Spell.md)

# Licence

This project is covered under the MIT licence.

The files under `public/` such as `public/spells.json` contains content from the SRD and is restricted and covered by the (OGL).

You can find the OGL [here](http://www.opengamingfoundation.org/ogl.html).

You can find the SRD source [here](https://dnd.wizards.com/articles/features/systems-reference-document-srd).

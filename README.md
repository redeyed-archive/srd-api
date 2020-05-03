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


## Conditions

The `Condition` object and the `ConditionAPI` is detailed [here](docs/Condition.md)

## Languages

The `Language` object and the `LanguageAPI` is detailed [here](docs/Language.md)

## Races

The `Race` object and the `RaceAPI` is detailed [here](docs/Race.md)

## Spells

The `Spell` object and the `SpellAPI` is detailed [here](docs/Spell.md)

# Licence

This project is covered under the MIT licence.

The files under `public/` such as `public/spells.json` contains content from the SRD and is restricted and covered by the (OGL).

You can find the OGL [here](http://www.opengamingfoundation.org/ogl.html).

You can find the SRD source [here](https://dnd.wizards.com/articles/features/systems-reference-document-srd).

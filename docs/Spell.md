# Spell

This interface describes a spell object

## Name

The name of the spell.

Each spell has a unique name, although a spell may contain all or part of the name of another spell, for example `Delayed Blast Fireball`

## Level

The level of the spell.

`0` denotes cantrips, where as `1` to `9` state the minimum level of spell slot needed to cast the spell.

## School

The school of magic that the spell belongs too.

## Casting Time

The time it takes to cast the spell.

## Duration

How long that the spell effect will last.

If the spell requires concentration the effect may be ended early if the caster loses concentration or the caster may end an effect early if the spell allows.

## Range

The range of the spell.

## Area

The area of effect of the spell if required.

## Components

The material, somatic, or verbal components of the spell

## Damage Type

The damage type, if any, that the spell causes.

## Description

The spell description text.

This field is an array of description blocks, or paragraphs which include

- a string
- an object detailing a list
- an object detailing a table

## Higher Levels

Additional description information for when this spell is cast at a higher level than it's default level. This field follows the same formatting rules as Description

## Ritual

States if this spell can be cast as a ritual.

## Attack

States what type of attack, melee or ranged, if any, is made when this spell is cast in order to hit the target.

## Save

States what ability saving throw, if any, is required when this spell is used by those effected by it.

## Concentration

States if this spell requires the user to maintain concentration to prolong the effects.

## Reaction Trigger

If the spell has a casting time of `reaction`, this details what the reaction trigger is.

## Classes

An array of ClassType values that denote what spellcasting classes normally have access to this spell.

## Conditions

The name of any conditions that the spell could cause, resist, or remove.

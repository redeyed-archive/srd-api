# Spells

## Spell API

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
- durations: one or more Duration that the spells could be maintained for.
- levels: one or more spell levels that the spells could have.
- name: a string to compare to part or the whole of a name of a spell. This is case insensitive.
- ritual: state if the spells can be cast as a ritual or not.
- saveTypes: one or more Ability that the spells may force a saving through on.
- schools: one or more spell School that the spells could have.
for example, you can request all cantrips (level 0) for Wizards and Warlocks, and all the spells returned will have level 0 and the wizard and/or warlock values in classes

## Spell

This interface describes a spell object

### Name

The name of the spell.

Each spell has a unique name, although a spell may contain all or part of the name of another spell, for example `Delayed Blast Fireball`

### Area

The area of effect of the spell if required.

### Attack

States what type of attack, melee or ranged, if any, is made when this spell is cast in order to hit the target.

### Casting Time

The time it takes to cast the spell.

### Classes

An array of ClassType values that denote what spellcasting classes normally have access to this spell.

### Components

The material, somatic, or verbal components of the spell

### Concentration

States if this spell requires the user to maintain concentration to prolong the effects.

### Conditions

The name of any conditions that the spell could cause, resist, or remove.

### Damage Type

The damage type, if any, that the spell causes.

### Description

The spell description text.

This field is an array of description blocks, or paragraphs which include

- a string
- an object detailing a list
- an object detailing a table

### Duration

How long that the spell effect will last.

If the spell requires concentration the effect may be ended early if the caster loses concentration or the caster may end an effect early if the spell allows.

### Higher Levels

Additional description information for when this spell is cast at a higher level than it's default level. This field follows the same formatting rules as Description

### Level

The level of the spell.

`0` denotes cantrips, where as `1` to `9` state the minimum level of spell slot needed to cast the spell.

### Range

The range of the spell.

### Reaction Trigger

If the spell has a casting time of `reaction`, this details what the reaction trigger is.

### Ritual

States if this spell can be cast as a ritual.

### Save

States what ability saving throw, if any, is required when this spell is used by those effected by it.

### School

The school of magic that the spell belongs too.

import * as io_ts from 'io-ts';

export function optional<Type extends io_ts.Any>(
    type: Type,
    name: string = `${type.name} | undefined`
): io_ts.UnionType<
    [Type, io_ts.UndefinedType],
    io_ts.TypeOf<Type> | undefined,
    io_ts.OutputOf<Type> | undefined,
    io_ts.InputOf<Type> | undefined
> {
    return io_ts.union<[Type, io_ts.UndefinedType]>([type, io_ts.undefined], name);
}

export const descriptionInterface = io_ts.union([
    io_ts.string,
    io_ts.interface({
        type: io_ts.literal('list'),
        title: optional(io_ts.string),
        content: io_ts.array(io_ts.string),
    }),
    io_ts.interface({
        type: io_ts.literal('table'),
        title: optional(io_ts.string),
        content: io_ts.array(io_ts.array(io_ts.string)),
    })
]);

export const sizeUnion = io_ts.union([
    io_ts.literal('tiny'),
    io_ts.literal('small'),
    io_ts.literal('medium'),
    io_ts.literal('large'),
    io_ts.literal('huge'),
    io_ts.literal('gargantuan'),
]);

export const movementInterface = io_ts.interface(
    {
        burrow: optional(io_ts.number),
        climb: optional(io_ts.number),
        fly: optional(io_ts.number),
        hover: optional(io_ts.boolean),
        swim: optional(io_ts.number),
        walk: optional(io_ts.number),
    }
);

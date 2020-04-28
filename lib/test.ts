import * as io_ts from 'io-ts';

export function optional<RT extends io_ts.Any>(
    type: RT,
    name: string = `${type.name} | undefined`
): io_ts.UnionType<
    [RT, io_ts.UndefinedType],
    io_ts.TypeOf<RT> | undefined,
    io_ts.OutputOf<RT> | undefined,
    io_ts.InputOf<RT> | undefined
> {
    return io_ts.union<[RT, io_ts.UndefinedType]>([type, io_ts.undefined], name);
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
]
);
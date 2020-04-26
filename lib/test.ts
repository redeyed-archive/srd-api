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
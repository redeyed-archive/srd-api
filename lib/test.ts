import * as iots from 'io-ts';

export function optional<RT extends iots.Any>(
    type: RT,
    name: string = `${type.name} | undefined`
): iots.UnionType<
    [RT, iots.UndefinedType],
    iots.TypeOf<RT> | undefined,
    iots.OutputOf<RT> | undefined,
    iots.InputOf<RT> | undefined
> {
    return iots.union<[RT, iots.UndefinedType]>([type, iots.undefined], name);
}
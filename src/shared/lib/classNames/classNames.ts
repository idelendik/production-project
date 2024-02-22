export type Mods = Record<string, boolean | string | undefined>;

export function classNames(
    cls: string,
    mods: Mods = {},
    additional: Array<string | undefined> = [],
): string {
    return [
        cls,
        ...additional,
        ...Object.entries(mods)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([className, value]) => Boolean(value))
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .map(([className, value]) => className),
    ]
        .filter(Boolean)
        .join(' ');
}

export default function snapshot<T extends (...args: any) => any>(
  algo: T
): (snapshots) => (...args: Parameters<T>) => any

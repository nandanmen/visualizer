export default function snapshot<T extends (...args: any) => any>(
  algo: T
): Recordable<T>

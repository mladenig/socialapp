import { KeyOption } from '../types/key-option';

const getDtoMetadata = (target: new () => any): KeyOption[] => {
  const metadata = Reflect.getMetadata('dto:transformer', target);
  if (!metadata) {
    throw new Error(`Expected class ${target.name} to have published properties!`);
  }

  return metadata;
};

export const transformToDTO = <T extends new () => any>(target: T, original: any): T => {
  const metadata = getDtoMetadata(new target());
  if (Array.isArray(original)) {
    return original.map(o => transformToDTO(target, o)) as any;
  }
  const result = metadata
    .reduce((constructed: any, option) => option.dto !== null
      ? (constructed[option.key] = transformToDTO(option.dto,  original[`__${option.key}__`] || original[option.key]), constructed)
      : Object.keys(original).includes(`__${option.key}__`)
        ? (constructed[option.key] = original[`__${option.key}__`], constructed)
        : (constructed[option.key] = original[option.key], constructed)
  , {} as T);

  return result;
};

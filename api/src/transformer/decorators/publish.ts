// tslint:disable: only-arrow-functions
import 'reflect-metadata';

export const Publish = <T>(dto?: T) => {
  return function(target: any, propertyKey: string) {
    const exposed = Reflect.getMetadata('dto:transformer', target) || [];
    if (dto) {
      exposed.push({
        key: propertyKey,
        dto,
      });
    } else {
      exposed.push({
        key: propertyKey,
        dto: null,
      });
    }
    Reflect.defineMetadata('dto:transformer', exposed, target);
  };
};

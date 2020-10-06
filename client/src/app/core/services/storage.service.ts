import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  public save(key: string, value: any) {
    localStorage.setItem(key, String(value));
  }

  public read(key: string) {
    const value =  localStorage.getItem(key);

    return value && value !== 'undefined'
      ? value
      : null;
  }

  public delete(key: string) {
    localStorage.removeItem(key);
  }

  public clear() {
    localStorage.clear();
  }

}

import { Pipe } from '@angular/core';

@Pipe({
  name: "sort"
})
export class ArraySortPipe {
  transform(array: Array<string>): Array<string> {
    if (array !== undefined) {
    array.sort((a: any, b: any) => {
     
      if (a.sortOrder < b.sortOrder) {
        return -1;
      } else if (a.sortOrder > b.sortOrder) {
        return 1;
      } else {
        return 0;
      }
    
    });
  }
    return array;
  }
}
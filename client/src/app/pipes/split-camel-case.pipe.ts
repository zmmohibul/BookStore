import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitCamelCase',
})
export class SplitCamelCasePipe implements PipeTransform {
  transform(camelCase: string): string {
    let ccSplit = camelCase.split(/(?=[A-Z])/).join(' ');
    return ccSplit;
  }
}

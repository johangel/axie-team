import { Pipe, PipeTransform } from '@angular/core';
import { ethereumParser } from '@chat/models';
@Pipe({
  name: 'ethereum',
})
export class EthereumPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (typeof value === 'undefined') {
      return '';
    }
    return ethereumParser(value);
  }
}

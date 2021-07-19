import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUserByName',
})
export class FilterUserByNamePipe implements PipeTransform {
  transform(value: any, arg: any): any {
    const resultado = [];
    for (const post of value) {
      if (post.first_name.indexOf(arg) > -1) {
        resultado.push(post);
      }
    }
    return resultado;
  }
}

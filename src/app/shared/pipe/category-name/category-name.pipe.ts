import { Pipe, PipeTransform} from '@angular/core';
import {CategoryNameService} from "../../service/category-name/category-name.service";

@Pipe({
  name: 'categoryName'
})
export class CategoryNamePipe implements PipeTransform {

  constructor(private categoryService: CategoryNameService) {
  }

  transform(value: any, ...args: any[]): any {
    return value.split('/').map(name => this.categoryService.getCategories().get(name)).join(', ');
  }
}

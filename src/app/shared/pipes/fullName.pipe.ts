import { Pipe, PipeTransform } from "@angular/core"

@Pipe({name: 'fullName'})
export class FullNamePipe implements PipeTransform {
  transform(obj: {firstName: string, lastName: string}): string {
    return `${obj.lastName.toUpperCase()} ${obj.firstName}`
  }
}

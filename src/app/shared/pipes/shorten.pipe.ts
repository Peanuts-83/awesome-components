import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, maxLength = 50): string {
    return value.length > maxLength ?
      value.substring(0,maxLength) + '...' : value
  }
}

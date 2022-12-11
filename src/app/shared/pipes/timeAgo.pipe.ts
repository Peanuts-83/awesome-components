import { Pipe, PipeTransform } from "@angular/core"

@Pipe({ name: 'timeAgo' })
export class TimeAgoPipe implements PipeTransform {
  timeDiff = {
    minute: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    year: 365 * 24 * 60 * 60 * 1000,
  }
  transform(value: string | Date): string {
    const now = Date.now()
    const target = new Date(value).getTime()
    const diff = now - target
    if (diff < this.timeDiff.minute) {
      return 'Il y a quelques secondes'
    } else if (diff < this.timeDiff.hour) {
      return 'Il y a quelques minutes'
    } else if (diff < this.timeDiff.day) {
      return 'Il y a quelques heures'
    } else if (diff < this.timeDiff.week) {
      return 'Il y a quelques jours'
    } else if (diff < this.timeDiff.month) {
      return 'Il y a quelques semaines'
    } else if (diff < this.timeDiff.year) {
      return 'Il y a quelques mois'
    } else {
      return "Il y a plus d'un an"
    }
  }

}

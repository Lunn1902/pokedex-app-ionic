import { Pipe, PipeTransform } from '@angular/core';
import { Stat } from '../models/pokemon';

@Pipe({
  name: 'getStat',
  standalone: false
})
export class GetStatPipe implements PipeTransform {

  transform(stats: Stat[], statName: string): number {
    if (stats && Array.isArray(stats)) {
      const statFound = stats.find(s => s.stat.name === statName);
      if (statFound) {
        return statFound.base_stat;
      }
    }
    return 0;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'time'
})
export class TimePipe implements PipeTransform {
    transform(value: number | undefined): string {
        if (!value) return '';

        const hours = Math.floor(value/60);
        const minutes = value % 60;

        return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
    }
}
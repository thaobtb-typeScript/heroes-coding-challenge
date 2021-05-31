import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({name: 'noSanitize'})

export class NoSanitizePipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {
  }

  transform(data: any): SafeUrl {
     return this.domSanitizer.bypassSecurityTrustUrl(data);
  }
}

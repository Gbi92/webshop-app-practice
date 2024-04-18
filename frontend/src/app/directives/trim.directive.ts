import { Directive, ElementRef, HostListener, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTrim]',
})
export class TrimDirective {
  constructor(
    private element: ElementRef,
    @Optional() private ngControl: NgControl
  ) {}

  @HostListener('blur') onBlur() {
    const value = this.element.nativeElement.value;
    this.ngControl.control?.setValue(value.trim());
  }
}

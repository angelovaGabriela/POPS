import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appLiquidCard]'
})
export class LiquidCardDirective {

  @HostBinding('style.transition')
  transition = 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)';

  @HostBinding('style.transform')
  transform = 'translateY(0) scale(1)';

  @HostBinding('style.boxShadow')
  boxShadow = '0 4px 10px rgba(0,0,0,0.1)';

  @HostBinding('style.borderRadius')
  borderRadius = '12px';

  
  @HostListener('mouseenter')
  onHover() {
    this.transform = 'translateY(-6px) scale(1.04)';
    this.boxShadow = '0 14px 32px rgba(0,0,0,0.2)';
    this.borderRadius = '20px 20px 28px 28px';
  }

  @HostListener('mouseleave')
  onLeave() {
    this.transform = 'translateY(0) scale(1)';
    this.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
    this.borderRadius = '12px';
  }

 
  @HostListener('mousedown')
  onPress() {
    this.transform = 'translateY(-2px) scale(0.97)';
  }

  @HostListener('mouseup')
  onRelease() {
    this.onHover();
  }
}
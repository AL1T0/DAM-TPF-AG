import { Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appMouseHover]'
})
export class MouseHoverDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}
  
    @HostListener('mouseenter') onMouseEnter() {
      this.highlight('blue');
    }
  
    @HostListener('mouseleave') onMouseLeave() {
      this.highlight(null);
    }
  
    private highlight(color: string | null) {
      this.renderer.setStyle(this.el.nativeElement, 'color', color);
    }
  }
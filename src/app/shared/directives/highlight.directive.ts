import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from "@angular/core"

@Directive({ selector: '[highlight]' })
export class HighlightDirective implements AfterViewInit {
  @Input() color = 'yellow';

  ngAfterViewInit(): void {
    this.setBackgroundColor(this.color)
  }

  setBackgroundColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color)
    color === 'orangered' ?
      this.renderer.setStyle(this.el.nativeElement, 'color', 'white') :
      this.renderer.setStyle(this.el.nativeElement, 'color', 'black')
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setBackgroundColor('yellow')
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.setBackgroundColor(this.color)
  }
  @HostListener('mousedown') onMouseDown() {
    this.setBackgroundColor('orangered')
  }
  @HostListener('mouseup') onCMouseUp() {
    this.setBackgroundColor('yellow')
  }

  constructor(private el: ElementRef, private renderer: Renderer2) { }
}

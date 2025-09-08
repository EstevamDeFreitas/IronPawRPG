import { ChangeDetectionStrategy, Component, Directive, ElementRef, HostListener, model } from '@angular/core';
import { Item } from '../../models/inventory.model';
import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ItemDetailsComponent } from '../item-details/item-details.component';

@Directive({
  selector: '[itemTooltip]',
  standalone: true,
})
export class ItemTooltipDirective {
  item = model<Item | undefined>(undefined, {alias: 'itemTooltip'});
  private overlayRef: OverlayRef | null = null;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef
  ) {}

  @HostListener('mouseenter')
  show() {
    if (this.overlayRef || !this.item()) {
      return;
    }

    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'top',
          offsetX: -10,
        },
      ]);

    this.overlayRef = this.overlay.create({ positionStrategy });
    const portal = new ComponentPortal(ItemDetailsComponent);
    const componentRef = this.overlayRef.attach(portal);
    componentRef.instance.item = this.item;
  }

  @HostListener('mouseleave')
  hide() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  ngOnDestroy() {
    this.hide();
  }
}

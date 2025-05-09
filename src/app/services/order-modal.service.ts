import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Injectable } from '@angular/core';
import { OrderModalComponent } from '../components/client-main-page/feed/specialist-card/order-modal/order-modal.component';

@Injectable({
    providedIn: null,
})
export class OrderModalService {

    private _ref?: DynamicDialogRef;

    constructor(
        private readonly _dialog: DialogService,
    ) {}

    public open(services: { name: string; price: number }[]) {
        this._ref = this._dialog.open(OrderModalComponent, {
            maskStyleClass: 'responsive-modal-wrapper',
            header: "Создание заявки",
            data: { services },
            style: {
                boxShadow: 'none',
            },
            contentStyle: {
               gap: "16px",
            },
            dismissableMask: true,
            width: "1000px",
            height: "600px"

        });
        return this._ref;
    }

    public close() {
        this._ref?.close();
    }

}

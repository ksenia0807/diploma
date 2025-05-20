import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Injectable } from '@angular/core';
import { OrderModalComponent } from '../components/client-main-page/feed/specialist-card/order-modal/order-modal.component';
import { Work } from '../models/work.model';

@Injectable({
    providedIn: null,
})
export class OrderModalService {

    private _ref?: DynamicDialogRef;

    constructor(
        private readonly _dialog: DialogService,
    ) {}

    public open(
        services: 
        { id?: number;
        title: string;
        description: string;
        works: Work[];
        location: string;
        photos: string[]; }[]) {
        this._ref = this._dialog.open(OrderModalComponent, {
            maskStyleClass: 'responsive-modal-wrapper',
            header: "Создание заявки",
            data: { services },
            style: {
               
            },
            contentStyle: {
                padding: '0 32px 32px 32px'
            },
            dismissableMask: true,
            width: "1000px",
            height: "570px"

        });
        return this._ref;
    }

    public close() {
        this._ref?.close();
    }

}

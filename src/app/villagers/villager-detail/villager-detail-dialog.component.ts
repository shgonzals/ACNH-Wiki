
import { Component, Inject } from '@angular/core';
import { Villager } from '../villager';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Proyecto } from '../proyecto';
import { DateAdapter } from '@angular/material/core';
import { VillagersService } from '../villagers.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'villager-detail-dialog',
  templateUrl: 'villager-detail-dialog.component.html',
  styleUrls: ['./villager-detail-dialog.component.scss']
})
export class VillagerDetailDialog {

    years! : string;

    constructor(@Inject(MAT_DIALOG_DATA) public data: Villager, private dateAdapter: DateAdapter<Date>,
            private villagersService: VillagersService, private snackBar: MatSnackBar){

    }
}
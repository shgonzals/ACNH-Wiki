
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

    dataSource = new MatTableDataSource<Proyecto>();
    columnsToDisplay = ['cod','division', 'leader', 'work', 'rol', 'bill', 'createdAt'];
    years! : string;

    constructor(@Inject(MAT_DIALOG_DATA) public data: Villager, private dateAdapter: DateAdapter<Date>,
            private villagersService: VillagersService, private snackBar: MatSnackBar){
      //this.dataSource.data = this.data.projects;

      //Seteamos el formato para las fechas
      this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy

      //Calculamos los años de antiguedad
    }

    calculateYears(date: string) : string{
      var today = new Date();
      var dateFormat = new  Date (date);
      var res = '';
      var years = today.getUTCFullYear() - dateFormat.getUTCFullYear();

      if(years < 1){
        res = 'Menos de 1 año';
      }else{ 
        res = years + ' años'
      }
      return res;
    }

    onDelete(): void{
      const config = new MatSnackBarConfig();
      config.duration = 3000;

      this.snackBar.open("Villager borrado correctamente.", "Cerrar", config);
    }
}
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Villager } from './villager';
import { VillagersService } from './villagers.service';
import { MatSort } from '@angular/material/sort';
import { VillagerDetailDialog } from './villager-detail/villager-detail-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-villagers-list',
  templateUrl: './villagers-list.component.html',
  styleUrls: ['./villagers-list.component.scss']
})
export class VillagersListComponent implements OnInit, OnDestroy{
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    columnsToDisplay = ['image', 'name','personality', 'birthday', 'species', 'gender'];
    dataSource = new MatTableDataSource<Villager>();

    sub!: Subscription;
    villagers: Villager[] = [];

    constructor(private villagersService: VillagersService, public dialog: MatDialog){}

    ngOnInit(): void {
        this.sub = this.villagersService.getVillagers().subscribe({
            next: villagers => {
                for (var [key, value] of Object.entries(villagers)) {
                    value.name =  value.name['name-EUen'];
                    this.villagers.push(value);
                }
                //this.villagers = villagers;   
                this.dataSource.data = this.villagers;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error: err =>  console.error(err)
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openDetail(row: any){
        const dialogRef = this.dialog.open(VillagerDetailDialog,{
            data: row,
            height: '350px'
        });
        dialogRef.afterClosed().subscribe();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}

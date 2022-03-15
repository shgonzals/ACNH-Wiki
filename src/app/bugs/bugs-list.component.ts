import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Bug } from './bug';
import { BugsService } from './bugs.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bugs-list',
  templateUrl: './bugs-list.component.html',
  styleUrls: ['./bugs-list.component.scss']
})
export class BugsListComponent implements OnInit, OnDestroy{
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    columnsToDisplay = ['image', 'name', 'price','rarity', 'time', 'catchPhrase'];
    dataSource = new MatTableDataSource<Bug>();

    sub!: Subscription;
    bugs: Bug[] = [];

    constructor(private bugsService: BugsService, public dialog: MatDialog){}

    ngOnInit(): void {
        this.sub = this.bugsService.getBugs().subscribe({
            next: bugs => {
                for (var [key, value] of Object.entries(bugs)) {
                    debugger;
                    value.name =  value.name['name-EUen'];
                    value.time = value["availability"].time;
                    value.rarity = value["availability"].rarity;
                    value.museumPhrase = value["museum-phrase"];
                    value.catchPhrase = value["catch-phrase"];
                    this.bugs.push(value);
                }
                this.dataSource.data = this.bugs;
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
        /*
        const dialogRef = this.dialog.open(VillagerDetailDialog,{
            data: row,
            height: '350px'
        });
        dialogRef.afterClosed().subscribe();
        */
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}

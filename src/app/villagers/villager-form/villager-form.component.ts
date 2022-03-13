import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Proyecto } from "../proyecto";
import { Villager } from "../villager";
import { MatTableDataSource } from '@angular/material/table';
import { VillagersService } from "../villagers.service";
import { MatPaginator } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { MatSort } from "@angular/material/sort";
import { SelectionModel } from "@angular/cdk/collections";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Component({
    selector: 'villager-form',
    templateUrl: 'villager-form.component.html',
    styleUrls: ['./villager-form.component.scss']
  })
  export class VillagerFormComponent implements OnInit, OnDestroy{
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    
    villager!: Villager; 

    form: FormGroup = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('',[Validators.required, Validators.email]),
      city: new FormControl('', []),
      office: new FormControl('', Validators.required),
      practice: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      keyPeople: new FormControl('', ),
      saga: new FormControl('', Validators.required),
      grade: new FormControl('', Validators.required),
      areaLeader: new FormControl('', Validators.required),
      area: new FormControl('', Validators.required),
      work: new FormControl('', Validators.required),
      exit: new FormControl('', Validators.required),
      updatedAt: new FormControl('', Validators.required)
    });

    dataSource = new MatTableDataSource<Proyecto>();
    columnsToDisplay = ['select','cod','division', 'leader', 'work'];
    selection = new SelectionModel<Proyecto>(true, []);

    sub!: Subscription;
    proyectos: Proyecto[] = [];
    id! : string | null;
    
    
    constructor(private villagersService: VillagersService, 
              private route: ActivatedRoute, private router: Router,
              private snackBar: MatSnackBar){}

    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');

      if(this.id != null){
        this.villagersService.getVillager(this.id).subscribe({
          next: e => {
            this.villager = e;
            this.loadVillager();
          }
        });
      }

  }

  loadVillager(): void {
    /*
    if(this.villager){
      this.form.controls['firstname'].setValue(this.villager.firstname);
      this.form.controls['lastname'].setValue(this.villager.lastname);
      this.form.controls['email'].setValue(this.villager.email);
      this.form.controls['office'].setValue(this.villager.office);
      this.form.controls['practice'].setValue(this.villager.practice);
      this.form.controls['status'].setValue(this.villager.status);
      this.form.controls['keyPeople'].setValue(this.villager.);
      this.form.controls['saga'].setValue(this.villager.saga);
      this.form.controls['grade'].setValue(this.villager.grade);
      this.form.controls['areaLeader'].setValue(this.villager.areaLeader);
      this.form.controls['area'].setValue(this.villager.area);
      this.form.controls['work'].setValue(this.villager.work);
      this.form.controls['exit'].setValue(this.villager.exit);
      this.form.controls['updatedAt'].setValue(this.villager.updatedAt);
      this.form.controls['city'].setValue(this.villager.city.toUpperCase());

      if(this.villager != null && this.villager.projects.length > 0){
        this.villager.projects.forEach((element: Proyecto) => {
          this.proyectos.push(element);
        });
        this.dataSource.data = this.proyectos;
      }
      
    }
    */
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Proyecto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.cod}`;
  }

  onSave() : any{
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    
    this.villager = this.form.value;
    
    

    
    
  }

  returnList() {
    setTimeout(() => 
    {
        this.router.navigate(['/villagers']);
    },
    3000);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}



import {Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { ApiUsuariosService } from './api-usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  displayedColumns = ['Id', 'Nombre', 'Apellido', 'Nacionalidad', "Edad"];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: ApiUsuariosService) {}

  ngOnInit() {  
    this.RenderDataTable(); 
  }  

  RenderDataTable() {  
    this.dataService.getUsuarios()  
      .subscribe(  
      res => {  
        this.dataSource = new MatTableDataSource();  
        this.dataSource.data = res;  
        console.log(this.dataSource.data);
        this.dataSource.sort = this.sort; 
        this.dataSource.paginator = this.paginator;
          
      },  
      error => {  
        console.log('There was an error while retrieving Usuarios !!!' + error);  
      });  
  }  

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
 /*  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  } */

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

export interface UserData {
  id: string;
  nombre: string;
  apellido: string;
  nacionalidad: string;
}
import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { CrudService } from '../crud.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];

  constructor(public crudService: CrudService) { }

  ngOnInit() {
    this.crudService.getAll().subscribe((result)=>{
      this.products = result['data'];
    })  
  }

  deleteProduct(id) {
    this.crudService.delete(id).subscribe((result)=>{
      this.loadTableData();
    })  
  }

  loadTableData() {
    this.crudService.getAll().subscribe((result)=>{
      this.products = result['data'];
    })  
  }
}

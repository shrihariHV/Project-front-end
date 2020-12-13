import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { CrudService } from '../crud.service'
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];

  constructor(public crudService: CrudService, private authService: AuthService, private router: Router) { }

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

  logOut() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}

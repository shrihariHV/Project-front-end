import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  productForm: FormGroup;
  id: any;

  ngOnInit() {
    this.productForm = this.fb.group({
      name: [''],
      price: ['']  
    })
    this.id = this.route.snapshot.params.productId;
    this.crudService.getById(this.id).subscribe((result)=>{
      this.productForm = this.fb.group({
        name: result['data'][0]['name'],
        price: result['data'][0]['price']  
      })
    });
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public crudService: CrudService,
    private route: ActivatedRoute
  ){ }

  submitForm() {
    this.crudService.update(this.id, this.productForm.value).subscribe(res => {
      console.log('Product updated!')
      this.router.navigateByUrl('/home')})

  }
}

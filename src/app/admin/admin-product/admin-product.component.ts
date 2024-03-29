import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent {
  public adminCategories: Array<ICategoryResponse> = [];
  public adminProducts: Array<IProductResponse> = [];
  public productForm!: FormGroup; 
  public editStatus = false;
  public isUploaded = false;
  private currentCategoryId = 0;
  private currentProductId = 0;
  public placeholderName = '*Назва';
  public placeholderTitle = '*Шлях';
  public placeholderDescription = "*Інгредієнти"
  public placeholderWeight = "*Вага"
  public placeholderPrice = "*Ціна"
  public bShowForm = false;
  public selectedFileName: string | undefined;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private imageService: ImageService,
  ) { }

  ngOnInit(): void {
    this.initProductForm();
    this.loadCategories();
    this.loadProduct();
  }

  showForm() {
    if (this.bShowForm == true) {
      this.bShowForm = false;
    } else {
      this.bShowForm = true;
    }
  }


  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      path: [null, Validators.required],
      description: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null, Validators.required],
      count: [1]
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
        this.adminCategories = data;
        if (this.adminCategories.length > 0) {
            this.productForm.patchValue({
                category: this.adminCategories[0]
            });
        }
    });
}

  loadProduct(): void {
    this.productService.getAll().subscribe(data => {
      this.adminProducts = data;
    })
  }

  addProduct(): void {
    if(this.editStatus){
      this.productService.update(this.productForm.value, this.currentProductId).subscribe(() => {
        this.loadProduct();
        this.selectedFileName = "";
        this.bShowForm = false;
        this.editStatus = false;
      })
    } else {
      this.productService.create(this.productForm.value).subscribe(() => {
        console.log(this.productForm.value)

        this.loadProduct();
        this.selectedFileName = "";
        this.bShowForm = false;
        this.editStatus = false;
      })
    }
    this.isUploaded = false;

    this.productForm.reset();
    this.loadCategories();
}

  editProduct(product: IProductResponse): void {
    this.productForm.patchValue({
      category: product.category,
      name: product.name,
      path: product.path,
      description: product.description,
      weight: product.weight,
      price: product.price,
      imagePath: product.imagePath,
    });
    this.isUploaded = true;
    this.editStatus = true;
    this.bShowForm = true;
    this.currentProductId = product.id;
  }

  deleteProduct(product: IProductResponse): void {
    this.productService.delete(product.id).subscribe(() => {
      this.loadProduct();
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.selectedFileName = file.name;
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.productForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteImage(): void {
    this.selectedFileName = "";
    this.imageService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.productForm.patchValue({ imagePath: null });
      })
      .catch(err => {
        console.log(err);
      })
  }

  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
  }


}

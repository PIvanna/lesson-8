import { Component } from '@angular/core';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent {
  public placeholderName = '*Назва';
  public placeholderTitle = '*Шлях';
  public bShowForm = false;
  public selectedFileName: string | undefined;


  showForm() {
    if (this.bShowForm == true) {
      this.bShowForm = false;
    } else {
      this.bShowForm = true;
    }
  }

  public adminCategory: Array<ICategoryResponse> = [];
  public imagePath = '';
  public editStatus = false;
  public editID!: number;

  public categoryForm!: FormGroup;
  public uploadPercent = 0;
  public isUploaded = false;
  private currentDiscountId = 0;
 
  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.initCategoryForm();
    this.loadCategory();
  }

  initCategoryForm(): void {

    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: ['https://monosushi.com.ua/wp-content/uploads/2022/07/imgonline-com-ua-compressed-ajbic74qfau00-scaled-697x379.jpg', Validators.required]
    });
  }

  loadCategory(): void {
    this.categoryService.getAll().subscribe((data: ICategoryResponse[]) => {
      this.adminCategory = data;
      console.log(this.adminCategory)
    })
  }

  addCategory(): void {
    if (this.editStatus) {
      this.categoryService.update(this.categoryForm.value, this.currentDiscountId).subscribe(() => {
        this.selectedFileName = "";
        this.loadCategory();
        this.bShowForm = false;
      })
    } else {
      this.categoryService.create(this.categoryForm.value).subscribe(() => {
        this.selectedFileName = "";
        this.loadCategory();
        this.bShowForm = false;
      })
    }
    this.editStatus = false;
    this.categoryForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
  }

  editCategory(category: ICategoryResponse): void {
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      imagePath: category.imagePath
    });
    this.bShowForm = true;
    this.editStatus = true;
    this.currentDiscountId = category.id;
    this.isUploaded = true;
  }

  deleteCategory(category: ICategoryResponse): void {
    this.categoryService.delete(category.id).subscribe(() => {
      this.loadCategory();
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.categoryForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    this.selectedFileName = name;
    const path = `${folder}/${name}`;
    let url = '';
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress
        });
        await task;
        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('wrong format');
    }
    return Promise.resolve(url);
  }

  deleteImage(): void {
    const task = ref(this.storage, this.valueByControl('imagePath'));
    deleteObject(task).then(() => {
      console.log('File deleted');
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.categoryForm.patchValue({
        imagePath: null
      })
    })
  }

  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;
  }
}

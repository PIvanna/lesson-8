import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDiscountRequest, IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})

export class AdminDiscountComponent {
  public placeholderName = '*Назва';
  public placeholderTitle = '*Заголовок';
  public placeholderDescription = '*Опис';
  public bShowForm = false;
  public selectedFileName: string | undefined;


  showForm() {
    if(this.bShowForm == true){
      this.bShowForm = false;
    } else{
      this.bShowForm = true;
    }
  }

  public adminDiscounts: Array<IDiscountResponse> = [];
  public description!: string;
  public imagePath = 'https://la.ua/wp-content/uploads/2021/08/6-1.jpg';
  public editStatus = false;
  public editID!: number;

  public discountForm!: FormGroup;
  public uploadPercent = 0;
  public isUploaded = false;
  private currentDiscountId = 0;

  constructor(
    private discountService: DiscountService,
    private fb: FormBuilder,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.initCategoryForm();
    this.loadDiscounts();
  }

  initCategoryForm(): void {
    const currentDate = new Date();
    this.discountForm = this.fb.group({
      createdDate: [{ value: currentDate, disabled: true }],
      date: [currentDate],
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: ['', Validators.required]
    });
  }

  loadDiscounts(): void {
    this.discountService.getAll().subscribe((data: IDiscountResponse[]) => {
      this.adminDiscounts = data;
    })
  }

  addDiscount(): void {
    if (this.editStatus) {
      this.discountService.update(this.discountForm.value, this.currentDiscountId).subscribe(() => {
        this.loadDiscounts();
        this.bShowForm = false;
        this.selectedFileName = "";
        const currentDate = new Date();
        this.discountForm.patchValue({
          createdDate: currentDate
        });
      })
    } else {
      this.discountService.create(this.discountForm.value).subscribe(() => {
        const currentDate = new Date();
        this.discountForm.patchValue({
          createdDate: [{ value: currentDate, disabled: true }],
          date: [currentDate],
        });
        console.log(currentDate)
        this.loadDiscounts();
        console.log("Hi")
        this.bShowForm = false;
        this.selectedFileName = "";

      })
    }
    this.editStatus = false;
    this.discountForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
  }

  editDiscount(discount: IDiscountResponse): void {
    const currentDate = new Date();
    this.discountForm.patchValue({
      date: currentDate,
      name: discount.name,
      title: discount.title,
      description: discount.description,
      imagePath: discount.imagePath
    });
    this.bShowForm = true;
    this.editStatus = true;
    this.currentDiscountId = discount.id;
    this.isUploaded = true;
  }

  deleteDiscount(discount: IDiscountResponse): void {
    this.discountService.delete(discount.id).subscribe(() => {
      this.loadDiscounts();
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.discountForm.patchValue({
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
      this.discountForm.patchValue({
        imagePath: null
      })
    })
  }

  valueByControl(control: string): string {
    return this.discountForm.get(control)?.value;
  }
}

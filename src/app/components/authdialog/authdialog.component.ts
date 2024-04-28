import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { ROLE } from 'src/app/shared/constants/constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authdialog',
  templateUrl: './authdialog.component.html',
  styleUrls: ['./authdialog.component.scss']
})
export class AuthdialogComponent {
  public authForm!: FormGroup;
  public isLogin = false;

  constructor(
    private auth: Auth,
    private afs: Firestore,
    private router: Router,
    private accountService: AccountService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AuthdialogComponent>
  ) { }

  ngOnInit(): void {
    this.initAuthForm();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      passwordRepeat: [null, [Validators.required]],
    })
  }

  loginUser(): void {
    const { email, password } = this.authForm.value;
    this.login(email, password).then(() => {
      this.authForm.reset();
    }).catch(e => {
      alert(e)
    })
  }
  private userDataSubscription: Subscription | undefined;
  
  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
      console.log('hi')
    }
    this.userDataSubscription = docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      const cur = { ...user };
      console.log(cur['role'])
      const currentUser = { ...user, uid: credential.user.uid };
      if(user &&  cur['role'] === ROLE.USER) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        this.router.navigate(['/cabinet/user-info']);
      } else if(user &&  cur['role'] === ROLE.ADMIN){
      }
      this.accountService.isUserLogin$.next(true);

    }, (e) => {
      console.log('error', e);
    })
  }

  public isRegister = true;

  registerUser(): void {
    const { email, password } = this.authForm.value;

    if (this.authForm.get('password')!.value !== this.authForm.get('passwordRepeat')!.value) {
      this.authForm.get('passwordRepeat')!.setErrors({ passwordMismatch: true });
      console.log("Passwords do not match");
      return;
    }

    if (this.authForm.valid) {
      this.emailSignUp(email, password).then(() => {
        this.isLogin = !this.isLogin;
        this.authForm.reset();
        this.isRegister = true;
      }).catch(e => {
        console.log(e);
      });
    }
  }

  async emailSignUp(email: string, password: string): Promise<any> {
    const { firstName, lastName, phoneNumber } = this.authForm.value;
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = {
      email: credential.user.email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      address: '',
      orders: [],
      role: 'USER'
    };
    setDoc(doc(this.afs, 'users', credential.user.uid), user);
  }

  changeIsLogin(): void {
    this.isLogin = !this.isLogin;
    this.isRegister = !this.isRegister;
  } 
}

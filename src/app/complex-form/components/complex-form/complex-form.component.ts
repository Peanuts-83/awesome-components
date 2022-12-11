import { ComplexFormService } from './../../complex-form.service'
import { Observable, map, startWith, tap } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms'
import { ConfirmEqualValidator } from '../../validators/confirm-equal.validator'

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.component.pug',
  styleUrls: ['./complex-form.component.scss']
})
export class ComplexFormComponent implements OnInit {
  public loading = false

  public mainForm!: FormGroup
  public personnalInfo!: FormGroup
  public contactPref!: FormControl
  public email!: FormGroup
  public phone!: FormControl
  public login!: FormGroup
  public minLengthUsernameAndPwd = 8

  public showPhone$!: Observable<boolean>
  public showEmail$!: Observable<boolean>

  constructor(private fb: FormBuilder, private formService: ComplexFormService) { }

  ngOnInit(): void {
    this.initFormControls()
    this.initMainForm()
    this.initShowForm()
  }

  public onSubmitForm() {
    this.loading = true
    this.formService.saveUserInfo(this.mainForm.value).pipe(
      tap(saved => {
        this.loading = false
        if (saved) {
          this.mainForm.reset()
          this.contactPref.patchValue('email')
          alert('Votre profil a bien été enregistré')
        } else {
          alert('Il y a eu un problème')
        }
      })
    )

  }

  private initFormControls() {
    this.personnalInfo = this.fb.group({
      firstname: ['Thomas', Validators.required],
      lastname: ['Ranque', Validators.required],
    })
    this.contactPref = this.fb.control('email')
    this.email = this.fb.group({
      email: ['toto@free.fr', []],
      confirmEmail: ['toto@free.fr', []]
    }, { validators: [ConfirmEqualValidator('email', 'confirmEmail')], updateOn: 'blur' })
    this.phone = this.fb.control('')
    this.login = this.fb.group({
      username: ['totolehero', [Validators.required, Validators.minLength(8)]],
      password: ['aZerty#83', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])[A-Za-z\d@$!%*?&"#'{([\-|`_\\^)\]=+<>]{8,}$/)]],
      confirmPassword: ['aZerty#83', Validators.required]
    }, { validators: [ConfirmEqualValidator('password', 'confirmPassword')], updateOn: 'blur' })
  }

  private initMainForm() {
    this.mainForm = this.fb.group({
      personnalInfo: this.personnalInfo,
      contactPref: this.contactPref,
      email: this.email,
      phone: this.phone,
      login: this.login
    })
  }

  private initShowForm() {
    this.showPhone$ = this.contactPref.valueChanges.pipe(
      startWith(this.contactPref.value),
      map(pref => pref === 'telephone'),
      tap(showPhone => this.setPhoneValidators(showPhone))
    )
    this.showEmail$ = this.contactPref.valueChanges.pipe(
      startWith(this.contactPref.value),
      map(pref => pref === 'email'),
      tap(showEmail => this.setEmailValidators(showEmail))
    )
  }

  private setPhoneValidators(showPhone: boolean) {
    if (showPhone) {
      this.phone.addValidators([Validators.required, Validators.pattern(/^0[1-9]\d{8}$/)])
    } else {
      this.phone.clearValidators()
    }
    this.phone.updateValueAndValidity()
  }

  private setEmailValidators(showEmail: boolean) {
    if (showEmail) {
      this.email.get('email')?.addValidators([Validators.required, Validators.email])
      this.email.get('confirmEmail')?.addValidators([Validators.required])
    } else {
      this.email.get('email')?.clearValidators()
      this.email.get('confirmEmail')?.clearValidators()
    }
    this.email.get('email')?.updateValueAndValidity()
    this.email.get('confirmEmail')?.updateValueAndValidity()
  }

  getFormCtrlError(ctrl: AbstractControl | null): string {
    if (ctrl?.hasError('required')) {
      return 'Ce champs est requis'
    } else if (ctrl?.hasError('email')) {
      return 'Entrez une adresse email valide'
    } else if (ctrl?.hasError('minlength')) {
      return `Vous devez utiliser au moins ${this.minLengthUsernameAndPwd} caractères`
    } else if (ctrl?.hasError('notEqual')) {
      return 'Vos deux saisies sont différentes'
    } else if (ctrl && ctrl.hasError('pattern') && ctrl.parent?.get(['password'])) {
      return '8 caractères minimum, dont une majuscule, une minuscule, un chiffre et un caractère spécial'
    } else if (ctrl && ctrl.hasError('pattern') && ctrl.parent?.get(['phone'])) {
      return 'Vous devez entrer un numéro de téléphone valide'
    } else {
      return ' '
    }
  }

}

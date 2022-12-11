export class ComplexFormValue {
  personnalInfo!: {
    firstname: string,
    lastname: string
  }
  contactPref!: string
  email!: {
    email: string
    confirmEmail: string
  }
  phone!: string
  login!: {
    username: string
    password: string
    confirmPassword: string
  }
}

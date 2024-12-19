export interface FormRules {
  [key: string]: Array<{
    required?: boolean
    message: string
    min?: number
    max?: number
    type?: string
    pattern?: RegExp
    validator?: (rule: any, value: any) => boolean | Promise<boolean>
  }>
}

export interface FormInstance {
  validate: () => Promise<boolean>
  validateField: (field: string) => Promise<boolean>
  resetFields: () => void
  clearValidate: (fields?: string | string[]) => void
  setRules: (rules: FormRules) => void
}

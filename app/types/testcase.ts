export interface Testcase {
  id: string
  title: string
  input: string
  mode: 'view' | 'edit' | 'execute'
  passed?: boolean
}

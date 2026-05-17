export type MetricStatus = 'normal' | 'high' | 'low' | 'abnormal'
export type SysStatus = 'normal' | 'attention' | 'nodata'

export interface Metric {
  name: string
  value: string
  unit: string
  ref: string
  status: MetricStatus
  group: string
  explain: string
  relate: string
  suggest: string
}

export interface SystemMap {
  [key: string]: SysStatus
}

export interface Patient {
  id: string
  name: string
  slug: string
  dob: string
  age: string
  gender: string
  sample_date: string
  metrics: Metric[]
  system_map: SystemMap
  n_total: number
  n_normal: number
  n_attention: number
}

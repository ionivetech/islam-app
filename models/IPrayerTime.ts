export interface ISchedule {
  ashar: string
  date: string
  dhuha: string
  dzuhur: string
  imsak: string
  isya: string
  maghrib: string
  subuh: string
  tanggal: string
  terbit: string
  tanggal?: string
  class?: string
}

interface ICoordinate {
  bujur: string
  lat: number
  lintang: string
  lon: number
}

export interface IPrayerTime {
  daerah: string
  id: string
  jadwal: ISchedule
  koordinat: ICoordinate
  lokasi: string
}

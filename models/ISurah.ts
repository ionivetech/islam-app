export interface ISurah {
  arti: string
  audioFull: { [key: string]: string }[]
  deskripsi: string
  jumlahAyat: number
  nama: string
  namaLatin: string
  nomor: number
  tempatTurun: string
}

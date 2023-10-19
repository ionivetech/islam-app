export interface IBeforeNextSurah {
  jumlahAyat: number
  nama: string
  namaLatin: string
  nomor: number
}

export interface IVerse {
  audio: { [key: string]: string }[]
  nomorAyat: string
  teksArab: string
  teksIndonesia: string
  teksLatin: string
}

export interface ISurah {
  arti: string
  audioFull: string
  ayat?: IVerse[]
  deskripsi: string
  jumlahAyat: number
  nama: string
  namaLatin: string
  nomor: number
  suratSebelumnya?: boolean | IBeforeNextSurah
  suratSelanjutnya?: boolean | IBeforeNextSurah
  tempatTurun: string
  isFavorite: boolean
}

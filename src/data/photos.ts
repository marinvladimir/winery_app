export interface Photo {
  src: string;
  /** Translation key for the alt text. */
  altId: string;
}

const photo = (file: string, key: string): Photo => ({
  src: `assets/${file}`,
  altId: `photo.${key}`,
});

export const TOUR_PHOTOS: Photo[] = [
  photo("w1.jpeg", "w1"),
  photo("w2.jpeg", "w2"),
  photo("w3.jpeg", "w3"),
  photo("w4.jpeg", "w4"),
  photo("w5.jpeg", "w5"),
  photo("w6.jpeg", "w6"),
  photo("w7.jpeg", "w7"),
  photo("w8.jpeg", "w8"),
  photo("w9.jpeg", "w9"),
];

export const GALLERY_PHOTOS: Photo[] = [
  photo("f2.jpg", "f2"),
  photo("f4.jpeg", "f4"),
  photo("f3.jpg", "f3"),
  photo("fb.jpg", "fb"),
  photo("f1.jpg", "f1"),
  photo("1-1.jpg", "barrel"),
  photo("2.jpg", "vineyard"),
  ...TOUR_PHOTOS,
];

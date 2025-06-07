import { Phone } from '../types';

export const phones: Phone[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    price: 1199,
    originalPrice: 1299,
    discount: 8,
    image: 'https://cdn.dxomark.com/wp-content/uploads/medias/post-155689/Apple-iPhone-15-Pro-Max_-blue-titanium_featured-image-packshot-review.jpg',
    images: [
      'https://images.pexels.com/photos/18525574/pexels-photo-18525574/free-photo-of-unboxing-iphone-15-pro-max-box-in-natural-titanium-color-mention-zana_qaradaghy-on-instagram-while-use-this-photo-follow-on-instagram-zana_qaradaghy.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/18525574/pexels-photo-18525574/free-photo-of-unboxing-iphone-15-pro-max-box-in-natural-titanium-color-mention-zana_qaradaghy-on-instagram-while-use-this-photo-follow-on-instagram-zana_qaradaghy.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/18525574/pexels-photo-18525574/free-photo-of-unboxing-iphone-15-pro-max-box-in-natural-titanium-color-mention-zana_qaradaghy-on-instagram-while-use-this-photo-follow-on-instagram-zana_qaradaghy.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    rating: 4.8,
    reviews: 2341,
    inStock: true,
    specs: {
      ram: '8GB',
      storage: '256GB',
      battery: '4422mAh',
      camera: '48MP Triple',
      display: '6.7" Super Retina XDR',
      processor: 'A17 Pro Bionic',
      os: 'iOS 17',
      network: '5G'
    },
    colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
    features: ['Dynamic Island', 'Always-On Display', 'Ceramic Shield', 'MagSafe'],
    description: 'The most advanced iPhone ever with titanium design and pro camera system.',
    category: 'flagship'
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    price: 1299,
    originalPrice: 1399,
    discount: 7,
    image: 'https://th.bing.com/th/id/OIP.Qou6mwsr6zh_7-8HraQDwwHaHa?rs=1&pid=ImgDetMain',
    images: [
      'https://th.bing.com/th/id/OIP.Qou6mwsr6zh_7-8HraQDwwHaHa?rs=1&pid=ImgDetMain',
      'https://th.bing.com/th/id/OIP.Qou6mwsr6zh_7-8HraQDwwHaHa?rs=1&pid=ImgDetMain'
    ],
    rating: 4.7,
    reviews: 1876,
    inStock: true,
    specs: {
      ram: '12GB',
      storage: '512GB',
      battery: '5000mAh',
      camera: '200MP Quad',
      display: '6.8" Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 3',
      os: 'Android 14',
      network: '5G'
    },
    colors: ['Titanium Black', 'Titanium Gray', 'Titanium Violet', 'Titanium Yellow'],
    features: ['S Pen Built-in', '100x Space Zoom', '45W Fast Charging', 'DeX Mode'],
    description: 'Ultimate productivity powerhouse with S Pen and advanced AI features.',
    category: 'flagship'
  },
  {
    id: '3',
    name: 'Google Pixel 8 Pro',
    brand: 'Google',
    price: 999,
    originalPrice: 1099,
    discount: 9,
    image: 'https://cdn.neowin.com/news/images/uploaded/2023/10/1696431529_pixel-8.jpg',
    images: [
      'https://cdn.neowin.com/news/images/uploaded/2023/10/1696431529_pixel-8.jpg'
    ],
    rating: 4.6,
    reviews: 1234,
    inStock: true,
    specs: {
      ram: '12GB',
      storage: '256GB',
      battery: '5050mAh',
      camera: '50MP Triple',
      display: '6.7" LTPO OLED',
      processor: 'Google Tensor G3',
      os: 'Android 14',
      network: '5G'
    },
    colors: ['Obsidian', 'Porcelain', 'Bay'],
    features: ['Magic Eraser', 'Live Translate', 'Car Crash Detection', 'Pure Android'],
    description: 'Pure Google experience with computational photography excellence.',
    category: 'premium'
  },
  {
    id: '4',
    name: 'OnePlus 12',
    brand: 'OnePlus',
    price: 799,
    originalPrice: 899,
    discount: 11,
    image: 'https://images.pexels.com/photos/32418565/pexels-photo-32418565/free-photo-of-confident-woman-holding-smartphone-indoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/32418565/pexels-photo-32418565/free-photo-of-confident-woman-holding-smartphone-indoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    rating: 4.5,
    reviews: 987,
    inStock: true,
    specs: {
      ram: '16GB',
      storage: '512GB',
      battery: '5400mAh',
      camera: '50MP Triple',
      display: '6.82" LTPO AMOLED',
      processor: 'Snapdragon 8 Gen 3',
      os: 'OxygenOS 14',
      network: '5G'
    },
    colors: ['Silky Black', 'Flowy Emerald', 'Pale Green'],
    features: ['100W SuperVOOC', '120Hz Display', 'Hasselblad Camera', 'Alert Slider'],
    description: 'Never Settle flagship with ultra-fast charging and premium performance.',
    category: 'premium'
  },
  {
    id: '5',
    name: 'Xiaomi 14 Ultra',
    brand: 'Xiaomi',
    price: 1149,
    originalPrice: 1249,
    discount: 8,
    image: 'https://www.pakmobizone.pk/wp-content/uploads/2024/05/Xiaomi-14-Ultra-Black-1.png',
    images: [
      'https://www.pakmobizone.pk/wp-content/uploads/2024/05/Xiaomi-14-Ultra-Black-1.png'
    ],
    rating: 4.4,
    reviews: 756,
    inStock: true,
    specs: {
      ram: '16GB',
      storage: '512GB',
      battery: '5300mAh',
      camera: '50MP Quad',
      display: '6.73" LTPO AMOLED',
      processor: 'Snapdragon 8 Gen 3',
      os: 'HyperOS',
      network: '5G'
    },
    colors: ['Black', 'White', 'Blue'],
    features: ['Leica Camera', '90W Charging', 'IP68 Rating', 'Dolby Vision'],
    description: 'Photography flagship with Leica co-engineered camera system.',
    category: 'flagship'
  },
  {
    id: '6',
    name: 'Nothing Phone (2a)',
    brand: 'Nothing',
    price: 349,
    originalPrice: 399,
    discount: 13,
    image: 'https://sm.mashable.com/t/mashable_tr/photo/default/nothing-phone-2a_98fe.1248.jpg',
    images: [
      'https://sm.mashable.com/t/mashable_tr/photo/default/nothing-phone-2a_98fe.1248.jpg'
    ],
    rating: 4.2,
    reviews: 543,
    inStock: true,
    specs: {
      ram: '8GB',
      storage: '128GB',
      battery: '5000mAh',
      camera: '50MP Dual',
      display: '6.7" AMOLED',
      processor: 'Dimensity 7200 Pro',
      os: 'Nothing OS 2.5',
      network: '5G'
    },
    colors: ['Black', 'White'],
    features: ['Glyph Interface', 'Nothing OS', 'Wireless Charging', 'Transparent Design'],
    description: 'Unique transparent design with innovative Glyph lighting system.',
    category: 'mid-range'
  }
];

export const brands = ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Nothing'];
export const ramOptions = ['4GB', '6GB', '8GB', '12GB', '16GB'];
export const storageOptions = ['64GB', '128GB', '256GB', '512GB', '1TB'];
export const batteryOptions = ['3000-4000mAh', '4000-5000mAh', '5000mAh+'];
export const networkOptions = ['4G', '5G'];
export const colorOptions = ['Black', 'White', 'Blue', 'Green', 'Purple', 'Gold', 'Silver'];
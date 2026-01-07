export type WeekDay = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Daily';

export interface Variant {
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  nameAr?: string;
  description?: string;
  price: number; // Base price. If variants exist, this might be 0 or the lowest price.
  variants?: Variant[];
  category: string;
  availability?: WeekDay[]; // If undefined, available every day
  imageQuery: string; // Used to generate the image URL
  imageUrl?: string; // Hardcoded image URL to use instead of generation
  isPopular?: boolean;
}

export interface CartItem {
  cartId: string; // Unique ID for the cart entry (handling variants/notes)
  menuItem: MenuItem;
  variantName?: string;
  price: number; // The specific price for this item/variant
  quantity: number;
  notes?: string;
}

export type OrderType = 'Delivery' | 'Pickup';

export interface UserDetails {
  name: string;
  phone: string;
  orderType: OrderType;
  address: string; // Only for Delivery
  mapsLink?: string; // Only for Delivery
  pickupTime?: string; // Only for Pickup
  notes?: string;
}
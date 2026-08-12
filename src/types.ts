export type BouquetCategory = 'all' | 'money' | 'floral' | 'hybrid' | 'box';

export type Occasion = 'birthday' | 'anniversary' | 'graduation' | 'wedding' | 'valentines' | 'corporate' | 'just_because';

export interface BouquetItem {
  id: string;
  title: string;
  category: BouquetCategory;
  priceBase: number; // Cost of craftsmanship & flowers
  cashAmountDefault: number; // Face value of money included
  billDenominationDefault: number; // e.g. 20 for $20 bills
  billCountDefault: number; // number of bills
  image: string;
  description: string;
  flowers: string[];
  billStyle: string; // e.g., 'Fan Fold', 'Rose Bud Roll', 'Butterfly Sleeve', 'Layered Crown'
  wrapperColor: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  isBestSeller?: boolean;
  isNew?: boolean;
}

export interface CustomOrderState {
  category: BouquetCategory;
  cashAmount: number;
  billDenomination: number;
  billCount: number;
  billStyle: string;
  flowerChoice: string[];
  colorPalette: string;
  wrapperColor: string;
  ribbonColor: string;
  addOns: {
    fairyLights: boolean;
    crownTopper: boolean;
    luxuryBox: boolean;
    chocolates: boolean;
    plushBear: boolean;
    printedCard: boolean;
  };
  cardMessage: string;
  occasion: Occasion;
  deliveryType: 'pickup' | 'standard' | 'express';
  deliveryDate: string;
  deliveryTimeSlot: string;
  recipientName: string;
  recipientPhone: string;
  deliveryAddress: string;
  specialInstructions: string;
  senderName: string;
  senderPhone: string;
  senderEmail: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  avatar: string;
  rating: number;
  date: string;
  bouquetTitle: string;
  bouquetType: BouquetCategory;
  comment: string;
  photoUrl?: string;
  verified: boolean;
  occasion: string;
  helpfulCount: number;
}

export interface OrderTrackResult {
  orderId: string;
  customerName: string;
  bouquetTitle: string;
  status: 'confirmed' | 'crafting' | 'ready' | 'delivering' | 'delivered';
  estimatedDelivery: string;
  trackingSteps: {
    title: string;
    description: string;
    completed: boolean;
    time?: string;
  }[];
  deliveryPhoto?: string;
}

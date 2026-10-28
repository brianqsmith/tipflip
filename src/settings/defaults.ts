export type Settings = {
  // Welcome screen
  discounts: [number, number, number, number];
  allowCustom: boolean;
  welcomeMessage: string;
  // Signature screen
  requireSignature: boolean;
  signatureMessage: string;
  // "No discount" screens
  allowNoDiscount: boolean;
  noDiscountMessage: string;
  requireHumanCheck: boolean;
  humanCheckMessage: string;
  // Waiter's Terms of Use
  terms: string;
  darkMode: boolean;
};

export const DEFAULT_SETTINGS: Settings = {
  discounts: [20, 30, 40, 100],
  allowCustom: true,
  welcomeMessage: 'Please select a customer discount',
  requireSignature: true,
  signatureMessage: 'By signing, I agree to provide the selected discount.',
  allowNoDiscount: true,
  noDiscountMessage:
    'Customers are 99% more likely to leave a tip if they receive a discount first.',
  requireHumanCheck: true,
  humanCheckMessage:
    "Humans normally give discounts. Verify you're not a heartless robot by solving this math problem.",
  terms:
    "By selecting a discount, you agree to provide the selected discount to the customer. TipFlip records this request on the customer's device. The customer may show the record to a manager if needed.",
  darkMode: false,
};

// Character limits for the editable texts.
export const LIMITS = {
  welcomeMessage: 60,
  signatureMessage: 200,
  noDiscountMessage: 150,
  humanCheckMessage: 120,
  terms: 1000,
};

export const DISCOUNT_STEP = 5;
export const DISCOUNT_MIN = 10;
export const DISCOUNT_MAX = 100;

declare type Item = {
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

declare type InvoiceFormInputs = {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  sellerName: string;
  sellerAddress: string;
  sellerPhone: string;
  sellerEmail: string;
  buyerName: string;
  buyerAddress: string;
  buyerPhone: string;
  buyerEmail: string;
  items: Item[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  paymentMethods: string;
  paymentInstructions: string;
  latePaymentTerms: string;
};

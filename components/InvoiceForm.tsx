"use client";

import { createInvoice } from "@/lib/invoice.actions";
import { generateInvoiceNumber } from "@/lib/utils";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export default function InvoiceForm() {
  const { register, control, watch, setValue } = useForm<InvoiceFormInputs>({
    defaultValues: {
      invoiceNumber: "",
      issueDate: "",
      dueDate: "",
      sellerName: "",
      sellerAddress: "",
      sellerPhone: "",
      sellerEmail: "",
      buyerName: "",
      buyerAddress: "",
      buyerPhone: "",
      buyerEmail: "",
      items: [
        {
          description: "",
          quantity: 1,
          unitPrice: 0,
          totalPrice: 0,
        },
      ],
      subtotal: 0,
      taxRate: 20,
      taxAmount: 0,
      totalAmount: 0,
      paymentMethods: "",
      paymentInstructions:
        "Please Contact us in order to process payment. Use the invoice number as the payment reference.",
      latePaymentTerms:
        "Payment is due within 30 days. Late payments will incur a fee of 1.5% per month.",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const watchItems = watch("items");
  const watchSubtotal = watch("subtotal");
  const watchTaxRate = watch("taxRate");

  useEffect(() => {
    const subtotal = watchItems.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );
    setValue("subtotal", subtotal);

    const taxAmount = (subtotal * (watchTaxRate || 0)) / 100;
    setValue("taxAmount", taxAmount);
    setValue("totalAmount", subtotal + taxAmount);
  }, [watchItems, watchTaxRate, setValue]);

  //   generate invoice number when component mounts
  useEffect(() => {
    const invoiceNumber = generateInvoiceNumber();
    setValue("invoiceNumber", invoiceNumber);
  }, [setValue]);

  return (
    <div>
      <div className="bg-gray-50 text-gray-800 p-8 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Create Invoice</h2>
            <p>When submitted a copy will be sent to you and your customer</p>
          </div>
          <form action={createInvoice}>
            {/* Invoice Information */}
            <div className="mb-6">
              <label htmlFor="invoice-number" className="invoice-label">
                Invoice Number
              </label>
              <input
                type="text"
                id="invoice-number"
                {...register("invoiceNumber")}
                className="invoice-input"
                placeholder="Enter invoice number"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="issue-date" className="invoice-label ">
                Issue Date
              </label>
              <input
                type="date"
                id="issue-date"
                {...register("issueDate")}
                className="invoice-input cursor-pointer"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="due-date" className="invoice-label">
                Due Date
              </label>
              <input
                type="date"
                id="due-date"
                {...register("dueDate")}
                className="invoice-input cursor-pointer"
              />
            </div>

            {/* Seller Information */}
            <h3 className="invoice-section-header">Seller Information</h3>
            <div className="mb-6">
              <label htmlFor="seller-name" className="invoice-label">
                Company Name
              </label>
              <input
                type="text"
                id="seller-name"
                {...register("sellerName")}
                className="invoice-input"
                placeholder="Enter company name"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="seller-address" className="invoice-label">
                Address
              </label>
              <input
                type="text"
                id="seller-address"
                {...register("sellerAddress")}
                className="invoice-input"
                placeholder="Enter company address"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="seller-phone" className="invoice-label">
                Phone Number
              </label>
              <input
                type="tel"
                id="seller-phone"
                {...register("sellerPhone")}
                className="invoice-input"
                placeholder="Enter phone number"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="seller-email" className="invoice-label">
                Email Address
              </label>
              <input
                type="email"
                id="seller-email"
                {...register("sellerEmail")}
                className="invoice-input"
                placeholder="Enter email address"
              />
            </div>

            {/* Buyer Information */}
            <h3 className="invoice-section-header">Buyer Information</h3>
            <div className="mb-6">
              <label htmlFor="buyer-name" className="invoice-label">
                Customer Name
              </label>
              <input
                type="text"
                id="buyer-name"
                {...register("buyerName")}
                className="invoice-input"
                placeholder="Enter customer name"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="buyer-address" className="invoice-label">
                Address
              </label>
              <input
                type="text"
                id="buyer-address"
                {...register("buyerAddress")}
                className="invoice-input"
                placeholder="Enter customer address"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="buyer-phone" className="invoice-label">
                Phone Number
              </label>
              <input
                type="tel"
                id="buyer-phone"
                {...register("buyerPhone")}
                className="invoice-input"
                placeholder="Enter phone number"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="buyer-email" className="invoice-label">
                Email Address
              </label>
              <input
                type="email"
                id="buyer-email"
                {...register("buyerEmail")}
                className="invoice-input"
                placeholder="Enter email address"
              />
            </div>

            {/* Itemized List of Goods/Services */}
            <h3 className="invoice-section-header">Items/Services</h3>
            <div id="items-container">
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="mb-6 flex flex-wrap md:flex-row space-x-4 space-y-1"
                >
                  <input
                    type="text"
                    {...register(`items.${index}.description`)}
                    className="w-1/2 px-3 py-2 border rounded-lg"
                    placeholder="Description"
                  />

                  <input
                    type="number"
                    {...register(`items.${index}.quantity`, {
                      valueAsNumber: true,
                    })}
                    className="item-input cursor-pointer"
                    placeholder="Quantity"
                  />
                  <input
                    type="number"
                    {...register(`items.${index}.unitPrice`, {
                      valueAsNumber: true,
                    })}
                    className="item-input cursor-pointer"
                    placeholder="Unit Price"
                  />

                  <input
                    type="number"
                    {...register(`items.${index}.totalPrice`, {
                      valueAsNumber: true,
                    })}
                    className="item-input"
                    placeholder="Total Price"
                    readOnly
                    value={
                      (watchItems[index]?.quantity || 0) *
                      (watchItems[index]?.unitPrice || 0)
                    }
                  />

                  <button
                    type="button"
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() =>
                append({
                  description: "",
                  quantity: 1,
                  unitPrice: 0,
                  totalPrice: 0,
                })
              }
            >
              Add Item
            </button>

            {/* Subtotal, Taxes, and Total Amount */}
            <div className="mb-6">
              <label htmlFor="subtotal" className="invoice-label">
                Subtotal
              </label>
              <input
                type="number"
                id="subtotal"
                {...register("subtotal")}
                className="invoice-input"
                readOnly
              />
            </div>
            <div className="mb-6">
              <label htmlFor="tax-rate" className="invoice-label">
                Tax Rate (%)
              </label>
              <input
                type="number"
                id="tax-rate"
                {...register("taxRate", { valueAsNumber: true })}
                className="invoice-input"
                placeholder="Enter tax rate"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="tax-amount" className="invoice-label">
                Tax Amount
              </label>
              <input
                type="number"
                id="tax-amount"
                {...register("taxAmount")}
                className="invoice-input"
                readOnly
              />
            </div>
            <div className="mb-6">
              <label htmlFor="total-amount" className="invoice-label">
                Total Amount
              </label>
              <input
                type="number"
                id="total-amount"
                {...register("totalAmount")}
                className="invoice-input"
                readOnly
              />
            </div>

            {/* Payment Terms */}
            <h3 className="invoice-section-header">Payment Terms</h3>
            <div className="mb-6">
              <label htmlFor="payment-methods" className="invoice-label">
                Payment Methods
              </label>
              <input
                type="text"
                id="payment-methods"
                {...register("paymentMethods")}
                className="invoice-input"
                placeholder="Enter payment methods"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="payment-instructions" className="invoice-label">
                Payment Instructions
              </label>
              <input
                type="text"
                id="payment-instructions"
                {...register("paymentInstructions")}
                className="invoice-input"
                placeholder="Enter payment instructions"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="late-payment-terms" className="invoice-label">
                Late Payment Terms
              </label>
              <input
                type="text"
                id="late-payment-terms"
                {...register("latePaymentTerms")}
                className="invoice-input"
                placeholder="Enter late payment terms"
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn">
              Generate and Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

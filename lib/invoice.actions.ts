"use server";

import { redirect } from "next/navigation";
import nodemailer from "nodemailer";
import generateEmailContent from "./emailTemplate";

export async function createInvoice(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  //   console.log(rawFormData);

  // Reconstruct items array from the flat structure
  const items: Item[] = [];
  const itemIndexes = new Set<string>();

  for (const key in rawFormData) {
    const match = key.match(/^items\.(\d+)\./);
    if (match) {
      itemIndexes.add(match[1]);
    }
  }

  itemIndexes.forEach((index) => {
    items.push({
      description: rawFormData[`items.${index}.description`] as string,
      quantity: parseFloat(rawFormData[`items.${index}.quantity`] as string),
      unitPrice: parseFloat(rawFormData[`items.${index}.unitPrice`] as string),
      totalPrice: parseFloat(
        rawFormData[`items.${index}.totalPrice`] as string
      ),
    });
  });

  //   console.log("Reconstructed Items:", items);

  const data: InvoiceFormInputs = {
    invoiceNumber: rawFormData.invoiceNumber as string,
    issueDate: rawFormData.issueDate as string,
    dueDate: rawFormData.dueDate as string,
    sellerName: rawFormData.sellerName as string,
    sellerAddress: rawFormData.sellerAddress as string,
    sellerPhone: rawFormData.sellerPhone as string,
    sellerEmail: rawFormData.sellerEmail as string,
    buyerName: rawFormData.buyerName as string,
    buyerAddress: rawFormData.buyerAddress as string,
    buyerPhone: rawFormData.buyerPhone as string,
    buyerEmail: rawFormData.buyerEmail as string,
    items: items,
    subtotal: parseFloat(rawFormData.subtotal as string),
    taxRate: parseFloat(rawFormData.taxRate as string),
    taxAmount: parseFloat(rawFormData.taxAmount as string),
    totalAmount: parseFloat(rawFormData.totalAmount as string),
    paymentMethods: rawFormData.paymentMethods as string,
    paymentInstructions: rawFormData.paymentInstructions as string,
    latePaymentTerms: rawFormData.latePaymentTerms as string,
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: data.sellerEmail,
    to: data.buyerEmail,
    subject: `Invoice ${data.invoiceNumber}`,
    html: generateEmailContent(data),
  };

  try {
    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  } finally {
    redirect("/invoice/success");
  }
}

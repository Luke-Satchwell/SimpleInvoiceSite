const generateEmailContent = (data: InvoiceFormInputs): string => {
  const itemsTableRows = data.items
    .map(
      (item) => `
    <tr>
      <td>${item.description}</td>
      <td>${item.quantity}</td>
      <td>£${item.unitPrice.toFixed(2)}</td>
      <td>£${item.totalPrice.toFixed(2)}</td>
    </tr>
  `
    )
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Invoice ${data.invoiceNumber}</h2>

      <p style="margin-bottom:48px">FAO: ${data.buyerName}</p>


      <p><strong>Issue Date:</strong> ${data.issueDate}</p>
      <p><strong>Due Date:</strong> ${data.dueDate}</p>

      <h3 style="margin-top:48px">Seller Information</h3>
      <p><strong>Name:</strong> ${data.sellerName}</p>
      <p><strong>Address:</strong> ${data.sellerAddress}</p>
      <p><strong>Phone:</strong> ${data.sellerPhone}</p>
      <p><strong>Email:</strong> ${data.sellerEmail}</p>

      <h3 style="margin-top:48px">Buyer Information</h3>
      <p><strong>Name:</strong> ${data.buyerName}</p>
      <p><strong>Address:</strong> ${data.buyerAddress}</p>
      <p><strong>Phone:</strong> ${data.buyerPhone}</p>
      <p><strong>Email:</strong> ${data.buyerEmail}</p>

      <h3 style="margin-top:48px">Items</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px;">Description</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Unit Price</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Total Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsTableRows}
        </tbody>
      </table>

      <h3 style="margin-top:48px">Summary</h3>
      <p><strong>Subtotal:</strong> ${data.subtotal.toFixed(2)}</p>
      <p><strong>Tax Rate:</strong> ${data.taxRate.toFixed(2)}%</p>
      <p><strong>Tax Amount:</strong> ${data.taxAmount.toFixed(2)}</p>
      <p><strong>Total Amount:</strong> ${data.totalAmount.toFixed(2)}</p>

      <h3 style="margin-top:48px">Payment Instructions</h3>
      <p>${data.paymentInstructions}</p>

      <h3>Late Payment Terms</h3>
      <p>${data.latePaymentTerms}</p>
    </div>
  `;
};

export default generateEmailContent;

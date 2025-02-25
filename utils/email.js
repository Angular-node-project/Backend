const nodemailer = require("nodemailer");
const { APP_CONFIG } = require("../config/app.config");
const { number } = require("joi");

const sendEmail = async (toEmail,subject, text,fromEmail = APP_CONFIG.USER_EMAIL) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: APP_CONFIG.USER_EMAIL,
            pass: APP_CONFIG.USER_PASS
        },
    });

    const mailOptions = {
        from: fromEmail,
        to: toEmail,
        subject: subject,
        text: text,
    };

    return transporter.sendMail(mailOptions);
};
const sendReceiptEmail = async (toEmail, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: APP_CONFIG.USER_EMAIL,
            pass: APP_CONFIG.USER_PASS
        },
    });

    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: toEmail,
        subject: subject,
        html: text,
    };

    return transporter.sendMail(mailOptions);
};
const ReceiptGenerator = async (data,email,orderId) => {

    const Receipt = data
    date=new Date(Date.now()).toISOString().split("T")[0]
    tableContent = '';
    totalPrice=Number(Receipt.totalPrice)
    if (!isNaN(totalPrice)) {
        totalPrice = totalPrice.toFixed(2); // Format only if it's a valid number
    }
    // const pro[]=Receipt.product
    console.log("-------------------------------------------")
    console.log(Receipt)
    if (Array.isArray(Receipt.product)) {
        Receipt.product.forEach(p => {
            tableContent += `
              <tr>
                <td>${p.name} (x${p.qty})</td>
                <td style="text-align: right;">$ ${(p.price).toFixed(2)}</td>
                <td></td>
            </tr>
            `;
        });
    }

    //     <tr>
    //     <td>${p.name}</td>
    //     <td>${(p.price).toFixed(2)}</td>
    //     <td>${p.qty}</td>
    //     <td>${(p.qty * p.price).toFixed(2)}</td>
    // </tr>
    //     header = `<!DOCTYPE html>
    // <html lang="en">
    // <head>
    //     <meta charset="UTF-8">
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //     <title>E-commerce Invoice</title>
    //     <style>
    //         * {
    //             margin: 0;
    //             padding: 0;
    //             box-sizing: border-box;
    //             font-family: 'Arial', sans-serif;
    //         }

    //         body {
    //             background-color: #f5f5f5;
    //             padding: 2rem;
    //         }

    //         .invoice-container {
    //             max-width: 800px;
    //             margin: 0 auto;
    //             background: white;
    //             padding: 2rem;
    //             box-shadow: 0 0 10px rgba(0,0,0,0.1);
    //         }

    //         .header {
    //             text-align: center;
    //             margin-bottom: 2rem;
    //         }

    //         .company-name {
    //             font-size: 2rem;
    //             color: #333;
    //             margin-bottom: 0.5rem;
    //         }

    //         .invoice-info {
    //             display: flex;
    //             justify-content: space-between;
    //             margin-bottom: 2rem;
    //         }

    //         .billing-details {
    //             margin-bottom: 1.5rem;
    //         }

    //         .items-table {
    //             width: 100%;
    //             border-collapse: collapse;
    //             margin-bottom: 1.5rem;
    //         }

    //         .items-table th,
    //         .items-table td {
    //             padding: 12px;
    //             text-align: left;
    //             border-bottom: 1px solid #ddd;
    //         }

    //         .items-table th {
    //             background-color: #f8f9fa;
    //         }

    //         .total-section {
    //             text-align: right;
    //             margin-top: 2rem;
    //         }

    //         .total-line {
    //             margin-bottom: 10px;
    //             font-size: 1.1rem;
    //         }

    //         .grand-total {
    //             font-size: 1.3rem;
    //             font-weight: bold;
    //             color: #2c3e50;
    //         }

    //         .footer {
    //             margin-top: 2rem;
    //             padding-top: 1rem;
    //             border-top: 1px solid #eee;
    //             text-align: center;
    //             color: #666;
    //         }

    //         .highlight {
    //             color: #3498db;
    //         }
    //     </style>
    // </head>
    // <body>
    //       <div class="invoice-container">
    //       <div class="header">
    //           <div class="company-name">Invoice </div>
    //           <div>Online</div>
    //       </div>
    //             <div class="invoice-info">
    //           <div class="billing-details">
    //               <h3>Billed To:</h3>
    //               <p>
    //               Add:${Receipt?.address}<br>
    //               Gov:${Receipt?.governorate} , ${Receipt.zipcode}<br>
    //               Ph:${Receipt?.phone_number}</p>
    //           </div>
    //              <div>
    //               <h3>Invoice Details</h3>
    //               Date: ${Date.now()} <br>
    //           </div>
    //       <table class="items-table">
    //           <thead>
    //               <tr>
    //                   <th>Item</th>
    //                   <th>Price</th>
    //                   <th>Quantity</th>
    //                   <th>Total</th>
    //               </tr>
    //           </thead>
    //           <tbody>
    //           /tbody>
    //       </table>






    //           </body>
    // </html>`
    header = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Payment Receipt</title>
    <style type="text/css">
        /* Reset styles */
        body { margin: 0; padding: 0; min-width: 100%; font-family: Arial, sans-serif; }
        table { border-spacing: 0; }
        td { padding: 0; }
        img { border: 0; }
        
        /* Main styles */
        .wrapper { width: 100%; table-layout: fixed; background-color: #f6f6f6; }
        .main { background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 600px; }
        
        .header { padding: 30px 25px; text-align: center; background-color: #2c3e50; }
        .content { padding: 25px; color: #444444; }
        
        .receipt-table { width: 100%; margin: 20px 0; }
        .receipt-table td { padding: 12px 0; border-bottom: 1px solid #eeeeee; }
        .total-row td { font-weight: bold; border-bottom: none; }
        
        .footer { padding: 25px; text-align: center; background-color: #f8f9fa; font-size: 12px; }
    </style>
</head>
<body>
    <table class="wrapper">
        <tr>
            <td>
                <table class="main">
                    <!-- Header -->
                    <tr>
                        <td class="header">
                            <img src="https://ik.imagekit.io/woiv2eo8w/4deaeee7fc349932ee0eeb1c09d03de8.jpg?updatedAt=1740398527662" alt="Company Logo" width="150">
                            <h1 style="color: #ffffff; margin: 15px 0 0 0;">Payment Receipt</h1>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td class="content">
                            <p>Hello ${email},</p>
                            <p>Thank you for your purchase! Here's your transaction details:</p>

                            <!-- Transaction Details -->
                            <table class="receipt-table">
                                <tr>
                                    <td>Order ID:</td>
                                    <td>${orderId}</td>
                                </tr>
                                <tr>
                                    <td>Date:</td>
                                    <td>${date}</td>
                                </tr>
                            </table>

                            <!-- Items Table -->
                            <table class="receipt-table">
                                <tr>
                                    <th style="text-align: left; padding-bottom: 10px;">Description</th>
                                    <th style="text-align: right; padding-bottom: 10px;">Price</th>
                                    <th style="text-align: right; padding-bottom: 10px;">Status</th>
                                </tr>
                              ${tableContent}
                                <!-- Total Row -->
                                <tr class="total-row">
                                    <td>Total Paid:</td>
                                    <td style="text-align: right;">$ ${totalPrice} </td>
                                    <td style="text-align: right;"> ${Receipt.status} </td>
                                </tr>
                            </table>
                            <p>Notes</p>
                            <p>${Receipt.additional_data}</p>
                            <p>Need help? Contact our support team at <a href="mailto:${process.env.USER_EMAIL}">${process.env.USER_EMAIL}</a></p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td class="footer">
                            <p>© 2024 Green-Store. All rights reserved.</p>
                            <p>Business Address: 51 street Cairo,Egypt  </p>
                            <p><a href="#">View our terms and conditions</a></p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
    return header;
};



module.exports = {
    sendEmail,
    sendReceiptEmail,
    ReceiptGenerator
}

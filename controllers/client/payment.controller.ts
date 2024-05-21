import { Request, Response } from "express";

import { VNPay, ProductCode, VnpLocale } from 'vnpay';

const port: number | string = process.env.PORT || 3000;

const vnpay = new VNPay({
    tmnCode: '2QXUI4B4',
    secureSecret: 'secret',
    vnpayHost: 'https://sandbox.vnpayment.vn',
    testMode: true, // optional
    hashAlgorithm: 'SHA512', // optional
});

const createOrder = async (body: any) => {
    // Your order creation logic here
    return { id: 'orderId123' }; // Example return value, adjust based on your logic
};

const getIpAddress = (req: Request): string => {
    const ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.ip;

    return Array.isArray(ip) ? ip[0] : ip;
};

export const premiumStudentPayment = async (req: Request, res: Response) => {
    // Tạo đơn hàng
    const order = await createOrder(req.body); // Hàm tạo đơn hàng, bạn cần tự cài đặt

    // Tạo URL thanh toán
    const paymentUrl = vnpay.buildPaymentUrl({
        vnp_Amount: 10000,
        vnp_IpAddr: getIpAddress(req),
        vnp_TxnRef: '12345',
        vnp_OrderInfo: 'Thanh toan don hang 12345',
        vnp_OrderType: ProductCode.Other,
        vnp_ReturnUrl: `http://localhost:${port}/vnpay-return`,
        vnp_Locale: VnpLocale.VN,
    });

    return res.redirect(paymentUrl);
};

export const premiumStudentPaymentPost = async (req: Request, res: Response) => {
    // Tạo đơn hàng
    const order = await createOrder(req.body); // Hàm tạo đơn hàng, bạn cần tự cài đặt

    // Tạo URL thanh toán
    const paymentUrl = vnpay.buildPaymentUrl({
        vnp_Amount: 10000,
        vnp_IpAddr: getIpAddress(req),
        vnp_TxnRef: '12345',
        vnp_OrderInfo: 'Thanh toan don hang 12345',
        vnp_OrderType: ProductCode.Other,
        vnp_ReturnUrl: `http://localhost:${port}/vnpay-return`,
        vnp_Locale: VnpLocale.VN,
    });

    return res.redirect(paymentUrl);
};

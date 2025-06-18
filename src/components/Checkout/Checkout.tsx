import './Checkout.css'; // Make sure this path is correct
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Checkout = () => {
    const upiDeepLink = "upi://pay?pa=9713270983@ybl&pn=Krishnakant&am=5&cu=INR";
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiDeepLink)}`;

   

    return (
        <div className="checkout-container">
            <h2 className="checkout-title">Checkout Page</h2>
            <p className="checkout-description">Click below to complete your payment:</p>

            <PayPalScriptProvider
                options={{ clientId: "AfP7MnAwUjqaelqRAjCINuqyGrZlTR7mmDWKYGr7iSy5gmQmIkJPuLpYObF8XoI8-MT5op4sLXSGq6fP" }}
            >
                <PayPalButtons
                    style={{ layout: "vertical", color: "blue", shape: "pill", label: "pay" }}
                    createOrder={(_, actions) => {
                        return actions.order!.create({
                            intent: "CAPTURE",
                            purchase_units: [{
                                amount: { currency_code: "USD", value: "10.00" }
                            }]
                        });
                    }}
                    onApprove={async (_, actions) => {
                        const details = await actions.order!.capture();
                        const payerName = details?.purchase_units?.[0]?.shipping?.name?.full_name ?? "Customer";
                        alert(`✅ Payment completed by ${payerName}`);
                        console.log("Payment details:", details);
                    }}
                    onError={(err) => {
                        console.error("❌ PayPal Checkout Error:", err);
                    }}
                />
            </PayPalScriptProvider>

            <hr className="divider" />

            <div className="upi-section">
                <h4>Or Pay via UPI</h4>
                <p>Scan this QR code using PhonePe / Google Pay</p>
                <img className="qr-image" src={qrImageUrl} alt="Scan to Pay" />
                <br />
                <button className="upi-button">
                    Pay with UPI
                </button>
            </div>
        </div>
    );
};

export default Checkout;


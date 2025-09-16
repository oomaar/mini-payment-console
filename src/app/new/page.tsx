import { createPayment } from "@/actions/payments";
import "./CreatePaymentPage.css";

export default function NewPaymentPage() {
  return (
    <div className="create-payment-page-container">
      <div className="create-payment-page-container-sub-container">
        <h1 className="create-payment-page-title">Create Payment</h1>
        <form action={createPayment} className="create-payment-page-form">
          <div className="create-payment-page-form-control">
            <label>
              <span>Amount (in cents)</span>
              <input type="number" name="amount" required />
            </label>
          </div>

          <div className="create-payment-page-form-control">
            <label>
              <span>Merchant Order ID</span>
              <input type="text" name="merchantOrderId" required />
            </label>
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}

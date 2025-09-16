import { getPaymentById } from "@/lib/db";
import CopyButton from "./CopyButton";
import "./Payment.css";

export default async function PaymentDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const payment = await getPaymentById(params.id);
  if (!payment) return <div>Payment not found.</div>;

  const publicUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  }/pay/${payment.publicId}`;

  const activities = [
    { label: "Created", date: payment.createdAt },
    { label: `Status changed to ${payment.status}`, date: payment.updatedAt },
  ];

  return (
    <div className="payment-page-container">
      <div className="payment-page-sub-container">
        <h1 className="payment-page-title">Payment Details</h1>
        <ul className="payment-details-list">
          <li className="payment-details-list-item">
            <p>ID</p>
            <p className="payment-details-list-item-value">{payment.id}</p>
          </li>
          <li className="payment-details-list-item">
            <p>Merchant Order ID</p>
            <p className="payment-details-list-item-value">
              {payment.merchantOrderId}
            </p>
          </li>
          <li className="payment-details-list-item">
            <p>Amount</p>
            <p className="payment-details-list-item-value">
              {payment.amount / 100} {payment.currency}
            </p>
          </li>
          <li className="payment-details-list-item">
            <p>Status</p>
            <p className="payment-details-list-item-value">{payment.status}</p>
          </li>
          <li className="payment-details-list-item">
            <p>Created</p>
            <p className="payment-details-list-item-value">
              {new Date(payment.createdAt).toLocaleString("en-UK")}
            </p>
          </li>
          <li className="payment-details-list-item">
            <p>Updated</p>
            <p className="payment-details-list-item-value">
              {new Date(payment.updatedAt).toLocaleString("en-UK")}
            </p>
          </li>
        </ul>

        <div className="payment-page-body">
          <div className="payment-page-body-container">
            <h2 className="payment-page-body-title">Public Link</h2>
            <input
              className="payment-page-payment-link-input"
              type="text"
              value={publicUrl}
              readOnly
              style={{ width: "100%" }}
            />
            <CopyButton text={publicUrl} />
          </div>

          <div className="payment-page-body-container">
            <h2 className="payment-page-body-title">Activity</h2>
            <ul className="payment-page-activity-list">
              {activities.map((activity, index) => (
                <li key={index} className="payment-page-activity-list-item">
                  <p>{activity.label} at</p>{" "}
                  <span>{new Date(activity.date).toLocaleString("en-UK")}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

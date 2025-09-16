import { getPaymentByPublicId } from "@/lib/db";
import { markPaid, markCanceled } from "@/actions/payments";
import "./PayPublicId.css";

type PayPageProps = {
  params: { publicId: string };
};

export default async function PayPage(props: PayPageProps) {
  const { params } = props;
  const { publicId } = await params;

  const payment = await getPaymentByPublicId(publicId);

  if (!payment)
    return (
      <div className="pay-public-id-page-empty-container">
        Payment not found.
      </div>
    );

  return (
    <div className="pay-public-id-page-container">
      <div className="pay-public-id-page-sub-container">
        <h1 className="pay-public-id-page-title">
          Pay for Order {payment.merchantOrderId}
        </h1>

        <div className="pay-public-id-page-form">
          <p className="pay-public-id-page-detail-text">
            Amount:{" "}
            <span>
              {payment.amount / 100} {payment.currency}
            </span>
          </p>
          <p className="pay-public-id-page-detail-text">
            Status: <span>{payment.status}</span>
          </p>

          {payment.status === "pending" ? (
            <div className="pay-public-id-page-footer">
              <form
                action={async () => {
                  "use server";
                  await markPaid(publicId);
                }}
              >
                <button type="submit">Mark Paid</button>
              </form>
              <form
                action={async () => {
                  "use server";
                  await markCanceled(publicId);
                }}
              >
                <button
                  type="submit"
                  className="pay-public-id-page-footer-cancel-button"
                >
                  Cancel
                </button>
              </form>
            </div>
          ) : (
            <p>
              This payment is already <b>{payment.status}</b>.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

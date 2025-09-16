import { Payment } from "@/lib/db";
import "./HomePageTable.css";

type HomePageTableProps = {
  payments: Payment[];
};

export function HomePageTable(props: HomePageTableProps) {
  const { payments } = props;

  return (
    <div className="table-container">
      <table className="table-table">
        <thead>
          <tr>
            <th>Merchant Order ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id}>
              <td>
                <a href={`/payments/${p.id}`}>{p.merchantOrderId}</a>
              </td>
              <td>
                {p.amount / 100} {p.currency}
              </td>
              <td>{p.status}</td>
              <td>{new Date(p.createdAt).toLocaleString("en-UK")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

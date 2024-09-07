import "./BankCardComponent.scss";

interface item {
  number: string;
  date: string;
  CVV: string;
}

export default function BankCardComponent(item: item) {
  return (
    <div className="bank_card_component">
      <p>{item.number}</p>
      <div>
        <p>Дата: {item.date}</p>
        <p>CVV: {item.CVV}</p>
      </div>
    </div>
  );
}

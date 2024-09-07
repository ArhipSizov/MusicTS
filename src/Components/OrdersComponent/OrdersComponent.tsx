import "./OrdersComponent.scss";

export default function OrdersComponent(item:any) {
 
  return (
    <div className="orders_component">
      <div className="orders_nav">
        <img src={item.logo} alt="" />
        <div>
          <p className="name">{item.name}</p>
          <p>{item.area}</p>
        </div>
      </div>
      <div className="orders_settings">
        <div>
          {item.date.map((item:string) => (
            <p>{item}, </p>
          ))}
          <p>числа</p>
        </div>
        <p>{item.cost} р.</p>
        <div>
          {item.time.map((item:number) => (
            <p>{item}:00, </p>
          ))}
        </div>
        <p>{item.room}</p>
      </div>
      <p className="number">Связь: {item.number}</p>
    </div>
  );
}

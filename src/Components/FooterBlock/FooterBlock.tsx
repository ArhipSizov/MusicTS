import { NavLink } from 'react-router-dom';

import "./FooterBlock.scss";

export default function FooterBlock(item:any) {
 
  return (
    <NavLink to={item.link} className="footerBlock">
      <img className={item.clas_active} src={item.img_active} alt="" />
      <img className={item.clas} src={item.img} alt="" />
      <p className="text">{item.text}</p>
    </NavLink>
  );
}

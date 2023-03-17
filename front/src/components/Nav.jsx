import SearchBar from "./SearchBar";
import style from "./Nav.module.css";
import { Link } from "react-router-dom";

export default function Nav(props) {
  return (
    <nav>
      <img
        src = 'https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg'
        alt="Rick&Morty"
        width="10%"
      />
      <Link  to = '/about' className={style.links}>About</Link>
      <Link  to = '/home'  className={style.links}>Home</Link>
      <button className={style.links} onClick={props.logout}>LogOut</button>
      <Link to = '/favorites' className={style.links}>Favorites</Link>

      <SearchBar onSearch = {props.onSearch} random={props.random}/>
    </nav>
  );
}

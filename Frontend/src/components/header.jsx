import {Link }from "react-router-dom";

export default function Header() {
    return (
      <div className="bg-green-300 w-full flex flex-col">
        <Link to ="/">Home</Link>
        <Link to ="/login">Login</Link>
        <Link to ="/signup">Signup</Link>
      </div>
    );
}
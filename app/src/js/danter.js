import React from "react";
import ReactDOM from "react-dom/client";
import User from "../components/registration/registration";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<User value={['email', 'password']} show={false} src={'./api/danter.php'} name={'Log in'} />);



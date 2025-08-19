import { Navigate } from "react-router-dom";

function TokenRoute({ token, children }) {
    console.log("TokenRoute페이지")
    console.log("token",token)
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default TokenRoute;

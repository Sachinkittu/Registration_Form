import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegistrationForm } from "./Forms/RegistrationForm";
function App() {


  const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  );


  const Table = React.lazy(() => import("./Tables/Table1.js"));

  return (
    <>
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route  path="/form" name="Registration Page" element={<RegistrationForm />} />
          <Route  path="/table" name="DataTable Page" element={<Table />} />
        
        </Routes>
      </Suspense>
    </BrowserRouter>
    </>
  );
}

export default App;

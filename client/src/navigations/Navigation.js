import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import ROUTES from './Routes';
function Navigation() {
  return (
    <div>
   <BrowserRouter>
   <Routes>
    <Route path={ROUTES.home.name}element={ROUTES.home.component} />
    <Route path={ROUTES.login.name}element={ROUTES.login.component} />
    <Route path={ROUTES.register.name}element={ROUTES.register.component} />
    <Route path={ROUTES.university.name}element={ROUTES.university.component} />
    <Route path={ROUTES.department.name}element={ROUTES.department.component} />
    <Route path={ROUTES.product.name}element={ROUTES.product.component} />
    <Route path={ROUTES.productdetail.name}element={ROUTES.productdetail.component} />
    <Route path={ROUTES.cart.name}element={ROUTES.cart.component} />
    <Route path={ROUTES.productAdmin.name}element={ROUTES.productAdmin.component} />
    <Route path={ROUTES.departmentAdmin.name}element={ROUTES.departmentAdmin.component} />
    <Route path={ROUTES.universityAdmin.name}element={ROUTES.universityAdmin.component} />
    <Route path={ROUTES.summary.name}element={ROUTES.summary.component} />
    <Route path={ROUTES.CheckoutForm.name}element={ROUTES.CheckoutForm.component}/>
    <Route path={ROUTES.Movies.name}element={ROUTES.Movies.component}/>
    <Route path={ROUTES.PaymentForm.name}element={ROUTES.PaymentForm.component}/>
    <Route path={ROUTES.ChatBot.name}element={ROUTES.ChatBot.component}/>
    <Route path={ROUTES.ChatBotReact.name}element={ROUTES.ChatBotReact.component}/>
    {/* <Route path={ROUTES.navy.name}element={ROUTES.navy.component}/> */}
   </Routes>
   </BrowserRouter>
   </div>
  )
}

export default Navigation

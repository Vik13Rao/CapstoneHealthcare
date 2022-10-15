import { Container, createTheme, CssBaseline, ThemeProvider  } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Route } from "react-router-dom";

import AboutPage from "../../features/about/AboutPage";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import CartPage from "../../features/cart/CartPage";
import { fetchCartAsync, setCart } from "../../features/cart/cartSlice";
import Catalog from "../../features/catalog/Catalog";
import MedicineDetails from "../../features/catalog/MedicineDetails";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import Contact from "../../features/contact/Contact";
import HomePage from "../../features/home/HomePage";
import Orders from "../../features/orders/Orders";

import { useAppDispatch } from "../store/configureStore";
import Header from "./Header";
import PrivateRoute from "./PrivateRoute";



function App() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

 const initApp = useCallback(async ()=>{
        try {
            await dispatch(fetchCurrentUser());
            await dispatch(fetchCartAsync());
        } catch (error) {
            console.log(error);
        }
    },[dispatch])

    useEffect(() => {
        initApp().then(() => setLoading(false));
    }, [initApp])

    const theme = createTheme({
        palette: {
            
            background: { 
                default:  '#e0f2f1'}
        }
    })
    

  return (
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Container>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/catalog' component={Catalog} />
              <Route path='/catalog/:id' component={MedicineDetails} />
              <Route path='/about' component={AboutPage} />
              <Route path='/contact' component={Contact} />
              <Route path='/cart' component={CartPage} />
              <PrivateRoute path='/checkout' component={CheckoutPage} />
              <PrivateRoute path='/orders' component={Orders} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />

          </Container>
          
         
      </ThemeProvider>
  );
}

export default App;

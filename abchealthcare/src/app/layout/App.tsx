import { Container, createTheme, CssBaseline, ThemeProvider  } from "@mui/material";
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";

import AboutPage from "../../features/about/AboutPage";
import CartPage from "../../features/cart/CartPage";
import { setCart } from "../../features/cart/cartSlice";
import Catalog from "../../features/catalog/Catalog";
import MedicineDetails from "../../features/catalog/MedicineDetails";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import Contact from "../../features/contact/Contact";
import HomePage from "../../features/home/HomePage";
import axiosagent from "../api/axiosagent";

import { useAppDispatch } from "../store/configureStore";
import { getCookie } from "../utility/util";
import Header from "./Header";



function App() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const buyerId = getCookie('buyerId');
        if (buyerId) {
            axiosagent.Cart.get()
                .then(cart => dispatch(setCart(cart)))
                .catch(error => console.log(error))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [dispatch])

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
              <Route path='/checkout' component={CheckoutPage} />
          </Container>
          
         
      </ThemeProvider>
  );
}

export default App;

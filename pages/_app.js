import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { Provider } from "next-auth/client"
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ToastyProvider } from '../src/contexts/Toasty'

import CheckAuth from '../src/componentes/CheckAuth'
import theme from '../src/theme'




export default function MyApp(props) {
  const { Component, pageProps } = props;


  React.useEffect(() => {
    //Remove the server-side injected Css

    const jssStyle = document.querySelector("#jss-server-side")
    if(jssStyle) {
      jssStyle.parentElement.removeChild(jssStyle)
    }
  }, [])

 
  return (
    <React.Fragment>
      <Head>
        <title>Anunx</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Provider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          <ToastyProvider>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {
              Component.requireAuth
                ? <CheckAuth Component={Component} pageProps={pageProps} />
                : <Component {...pageProps} />
            }
          </ToastyProvider>
        </ThemeProvider>
      </Provider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
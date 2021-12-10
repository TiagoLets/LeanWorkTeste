import { AppProps } from 'next/dist/next-server/lib/router/router'
import Head from "next/head";

import { GlobalStyle } from "styles/global"
import 'styles/reset.css';

import { UserProvider } from 'src/contexts/userContext';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <UserProvider>
            <Head>
                <title>Lean Work - Cadastro</title>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="description" content="App de cadastro no LocalStorage" />
                <meta name="viewport" content="height=device-height,width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no,minimal-ui" />
                <meta name="robots" content="index, follow" />
                <meta name="referrer" content="origin" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="author" content="Tiago Maciel" />
            </Head>
            <GlobalStyle/>
            <Component {...pageProps} />
        </UserProvider>
    )
}

export default App;
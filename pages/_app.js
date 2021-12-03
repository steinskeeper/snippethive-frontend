import 'tailwindcss/tailwind.css'
import AuthContext from '../src/context/AuthContext'

function MyApp({ Component, pageProps }) {
  return <AuthContext>
    <Component {...pageProps} />
  </AuthContext>
}

export default MyApp

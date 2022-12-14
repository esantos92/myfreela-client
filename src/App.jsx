import { AuthProvider } from "./context/auth";
import { AppRouter } from "./routes";


const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App;

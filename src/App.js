import { ThemeProvider } from 'styled-components';
import GlobalStyles from './libs/styles/global';
import { theme } from './libs/styles/theme';
import Router from './routes/Router';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Router />
        </ThemeProvider>
    );
}
export default App;

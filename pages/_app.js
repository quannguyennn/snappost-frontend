import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import Router from 'next/router';
import NProgress from 'nprogress';
import { useRouter } from 'next/router'
import store from '../redux/store';
import '../scss/styles.scss';
import Header from '../layout/Header/Header';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ContactBar from '../layout/ContactBar/ContactBar';
import ChatContainer from '../layout/ChatContainer/ChatContainer';
import 'emoji-mart/css/emoji-mart.css'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer, Slide } from 'react-toastify';
import LightOff from '../components/LightOff/LightOff';
import ApiService from '../services/ApiService/ApiService';
import { connect, useSelector } from "react-redux";
import { Paper } from '@material-ui/core';

Router.events.on('routeChangeStart', url => {
	console.log(`Loading: ${url}`);
	NProgress.start()
})

Router.events.on('routeChangeComplete', () => {
	NProgress.done()
})

Router.events.on('routeChangeError', () => NProgress.done())

export default function MyApp({ Component, pageProps }) {
	let router = useRouter();

	let [pathname, setPathname] = useState(router.pathname);
	const [isDark, setIsDark] = useState(false)

	useEffect(() => {
		setPathname(router.pathname)
		ApiService.setStore(store)

		let user = JSON.parse(localStorage.getItem('user'));
		let token = localStorage.getItem('token');

		ApiService.login(user, token)

		if (pathname != "/auth" && !user) {
			Router.push('/auth')
		}

		setIsDark(JSON.parse(localStorage.getItem('isDark')));

	}, [router.pathname])


	const theme = createMuiTheme({
		palette: {
			primary: { main: "#1e88e5" },
			type: isDark ? "dark" : "light"
		},
	});

	// const header = () => {
	// 	if (pathname !== "/auth") {
	// 		return
	// 	} else return null
	// }

	const body = () => {

		if (pathname !== "/auth") {
			return (
				<Grid className="container-content" container style={{ height: "100%", position: 'relative' }}>
					<Grid item xs={10}>
						<Paper>
							<LightOff />
							<Component {...pageProps} />
							<ChatContainer />
						</Paper>
					</Grid>
					<Grid item xs={2} style={{ zIndex: 1, position: "relative" }}>
						<ContactBar />
					</Grid>
				</Grid>
			)
		} else {
			return <Component {...pageProps} />
		}
	}

	return (
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				{
					pathname != "/auth" ? <Header isDark={isDark} toggleDarkMood={() => { setIsDark(!isDark); }} /> : null
				}
				{body()}
				<ToastContainer
					pauseOnFocusLoss={false}
					autoClose={3000}
					position={toast.POSITION.BOTTOM_LEFT}
					transition={Slide}
				/>
			</Provider>
		</ThemeProvider>
	);
}

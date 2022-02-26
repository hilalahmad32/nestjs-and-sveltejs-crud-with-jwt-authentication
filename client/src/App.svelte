<script>
	import Router from "svelte-spa-router";
	import Login from "./pages/auth/Login.svelte";
	import Signup from "./pages/auth/Signup.svelte";
	import Navbar from "./pages/Navbar.svelte";
	import NotFound from "./pages/NotFound.svelte";
	import CreateProduct from "./pages/post/CreateProduct.svelte";
	import Home from "./pages/post/Home.svelte";
	import UpdateProduct from "./pages/post/UpdateProduct.svelte";
	import { token } from "./pages/store/store";

	let routes;
	let tokens;
	token.subscribe((val) => {
		tokens = val;
	});
	if (tokens) {
		routes = {
			"/": Home,
			"/create-product": CreateProduct,
			"/update-product/:id": UpdateProduct,
			"*": NotFound,
		};
	} else {
		routes = {
			"/": Home,
			"/login": Login,
			"/signup": Signup,
			"*": NotFound,
		};
	}
</script>

<main>
	<Navbar />
	<Router {routes} />
</main>

<style>
	* {
		margin: 0px;
		padding: 0px;
	}
</style>

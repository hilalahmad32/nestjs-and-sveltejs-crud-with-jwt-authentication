<script>
    import { push } from "svelte-spa-router";

    import { token } from "./store/store";
    const logout = () => {
        token.set("");
        localStorage.removeItem("token");
        push("/");
    };
</script>

<main>
    <div class="container-fluid bg-dark">
        <div class="container">
            <div class="navbar">
                <div class="d-flex">
                    <a href="#/" class="nav-link">Home</a>
                    {#if $token}
                        <a href="#/create-product" class="nav-link">Product</a>
                    {/if}
                </div>
                <div class="d-flex">
                    {#if $token}
                        <button class="btn btn-danger" on:click={logout}
                            >logout</button
                        >
                    {:else}
                        <a href="#/login" class="nav-link">Login</a>
                        <a href="#/signup" class="nav-link">Signup</a>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</main>

<script>
    import { push } from "svelte-spa-router";

    let name = "";
    let email = "";
    let password = "";

    let error = "";
    let errorStatus = true;

    const signup = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            error = "Please fill the Field";
            errorStatus = false;
        } else {
            const data = {
                name: name,
                email: email,
                password: password,
            };
            const res = await fetch("http://localhost:3000/auth/signup", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });
            const output = await res.json();
            if (output.success) {
                error = output.msg;
                errorStatus = true;
                setTimeout(() => {
                    push("/login");
                }, 1000);
                name = "";
                email = "";
                password = "";
            } else {
                error = output.msg;
                errorStatus = false;
            }
        }
    };
</script>

<main>
    <div class="container my-5">
        <div class="row">
            <div
                class="col-xl-6 col-lg-6 col-md-8 col-sm-12 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-12"
            >
                <div class="card">
                    <div class="card-header">
                        <h3>Signup Form</h3>
                    </div>
                    <div class="card-body">
                        {#if error}
                            <div
                                class="alert {errorStatus
                                    ? 'alert-success'
                                    : 'alert-danger'}"
                            >
                                {error}
                            </div>
                        {/if}
                        <form action="" on:submit={signup}>
                            <div class="mb-3">
                                <label for=""><b>Enter Name</b></label>
                                <input
                                    type="text"
                                    bind:value={name}
                                    class="form-control form-control-lg"
                                />
                            </div>
                            <div class="mb-3">
                                <label for=""><b>Enter Email</b></label>
                                <input
                                    type="email"
                                    bind:value={email}
                                    class="form-control form-control-lg"
                                />
                            </div>
                            <div class="mb-3">
                                <label for=""><b>Enter Password</b></label>
                                <input
                                    type="password"
                                    bind:value={password}
                                    class="form-control form-control-lg"
                                />
                            </div>
                            <div class="mb-3">
                                <button class="btn btn-success">Signup</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

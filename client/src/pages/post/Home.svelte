<script>
    import { onMount } from "svelte";

    import { token } from "../store/store";

    let tokens;
    let products = [];
    token.subscribe((val) => {
        tokens = val;
    });
    let username = "";
    let error = "";
    let errorStatus = true;
    const getUser = async () => {
        const res = await fetch("http://localhost:3000/auth/me", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + tokens,
            },
        });
        const output = await res.json();
        username = output.name;
    };
    const getProduct = async () => {
        const res = await fetch("http://localhost:3000/product/products", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const output = await res.json();
        if (output.success) {
            products = output.products;
        } else {
            error = output.msg;
            errorStatus = false;
        }
    };

    const deleteProduct = async (id) => {
        if (confirm("Are you sure you want to delete product")) {
            const res = await fetch(
                `http://localhost:3000/product/products/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const output = await res.json();
            if (output.success) {
                error = output.msg;
                errorStatus = true;
                getProduct();
            } else {
                error = output.msg;
                errorStatus = false;
            }
        }
    };
    onMount(() => {
        getUser();
        getProduct();
    });
</script>

<main>
    <div class="container my-5">
        <div class="row">
            <div
                class="col-xl-6 col-lg-6 col-md-8 col-sm-12 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-12"
            >
                {#if error}
                    <div
                        class="alert {errorStatus
                            ? 'alert-success'
                            : 'alert-danger'}"
                    >
                        {error}
                    </div>
                {/if}
                <div class="card">
                    <div class="card-body">
                        {#if $token}
                            <h3>Hi {username}</h3>
                        {:else}
                            <h3>Please Login</h3>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
        {#if $token}
            <div class="table-responsive my-4">
                {#if products.length > 0}
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Content</th>
                                <th>Price</th>
                                <th>UserName</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each products as product, index}
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{product.title}</td>
                                    <td>{product.content}</td>
                                    <td>{product.price}</td>
                                    <td>{product.user.name}</td>
                                    <td>
                                        <a
                                            href="#/update-product/{product._id}"
                                            class="btn btn-success">Edit</a
                                        >
                                    </td>
                                    <td>
                                        <button
                                            on:click={() => {
                                                deleteProduct(product._id);
                                            }}
                                            class="btn btn-danger"
                                            >Delete</button
                                        >
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                {:else}
                    <h3>Record Not Found</h3>
                {/if}
            </div>
        {/if}
    </div>
</main>

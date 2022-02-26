<script>
    import { onMount } from "svelte";
    import { push } from "svelte-spa-router";

    export let params = "";
    let title = "";
    let content = "";
    let price = "";
    let error = "";
    let errorStatus = true;

    const getProduct = async () => {
        const res = await fetch(
            `http://localhost:3000/product/products/${params.id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
            }
        );
        const output = await res.json();
        if (output.success) {
            title = output.products.title;
            content = output.products.content;
            price = output.products.price;
        } else {
            alert(output.msg);
        }
    };

    onMount(() => {
        getProduct();
    });

    const update = async (e) => {
        e.preventDefault();
        if (!title || !content || !price) {
            error = "Please fill the Field";
            errorStatus = false;
        } else {
            const data = {
                title: title,
                content: content,
                price: price,
            };
            const res = await fetch(
                `http://localhost:3000/product/products/${params.id}`,
                {
                    method: "PATCH",
                    body: JSON.stringify(data),
                    headers: { "Content-Type": "application/json" },
                }
            );
            const output = await res.json();
            if (output.success) {
                error = output.msg;
                errorStatus = true;
                setTimeout(() => {
                    push("/");
                }, 1000);
                title = "";
                content = "";
                price = "";
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
                        <h3>Update Post Form</h3>
                    </div>
                    <div class="card-body">
                        <form action="" on:submit={update}>
                            {#if error}
                                <div
                                    class="alert {errorStatus
                                        ? 'alert-success'
                                        : 'alert-danger'}"
                                >
                                    {error}
                                </div>
                            {/if}
                            <div class="mb-3">
                                <label for=""><b>Enter Title</b></label>
                                <input
                                    type="text"
                                    bind:value={title}
                                    class="form-control form-control-lg"
                                />
                            </div>
                            <div class="mb-3">
                                <label for=""><b>Enter Content</b></label>
                                <input
                                    type="text"
                                    bind:value={content}
                                    class="form-control form-control-lg"
                                />
                            </div>
                            <div class="mb-3">
                                <label for=""><b>Enter Price</b></label>
                                <input
                                    type="number"
                                    bind:value={price}
                                    class="form-control form-control-lg"
                                />
                            </div>
                            <div class="mb-3">
                                <button class="btn btn-success">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

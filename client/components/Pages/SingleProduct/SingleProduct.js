import React from "react";
function SingleProduct(){
    return (
        <React.Fragment>
            <main>
                <div>
                    "Link History"
                    <button>Go Back</button>
                </div>
                <section id="singleProductShow">
                    <div>
                        <h1>Product</h1>
                        <img src="">Something</img>
                    </div>
                    <div>
                        <div>
                            <h3>Product Name: </h3>
                            <p>Description</p>
                            <span>Price</span>
                        </div>
                        <button>Add to Cart</button>
                    </div>
                </section>
            </main>
        </React.Fragment>
    );
}
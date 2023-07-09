export default function NewProduct() {
  return (
    <>
      <h2>New product</h2>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" />
        <label htmlFor="quantity">Quantity</label>
        <input type="number" id="quantity" />
        <label htmlFor="productCodes">Product Codes</label>
        <input type="text" id="productCodes" />
        <label htmlFor="validFrom">Valid From</label>
        <input type="date" id="validFrom" />
        <label htmlFor="validTo">Valid To</label>
        <input type="date" id="validTo" />
        <label htmlFor="couponTerms">Coupon terms</label>
        <input type="text" id="couponTerms" />
        <button type="submit">Create</button>
      </form>
    </>
  );
}

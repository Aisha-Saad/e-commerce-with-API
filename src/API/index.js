
export const getAllProducts=()=>{
  return fetch('https://dummyjson.com/products')
.then(res => res.json())

}

export const addTocart=(id)=>{

  return fetch('https://dummyjson.com/carts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: 1,
      products: [
        {
          id: id,
          quantity: 4,
        }
      ]
    })
  })
  .then(res => res.json())
}
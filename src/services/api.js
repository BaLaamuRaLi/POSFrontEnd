export const api={
   addProduct:(product)=>window.partyApi.add(product),
   verifyUser:(data)=>window.loginApi.login(data),
   createPurchase:()=>window.purchaseApi.new(),
   submitPurchase:(billData)=>window.purchaseApi.save(billData),
   getPending:()=>window.salesApi.pending(),
   createOrder:()=>window.salesApi.newOrder(),
   submitSales:(billData)=>window.salesApi.submitOrder(billData),
   searchParty:(name,type)=>window.partyApi.search(name,type),
   getCategories:()=>window.productApi.categories(),
   getProducts:(filter)=>window.productApi.products(filter),
}
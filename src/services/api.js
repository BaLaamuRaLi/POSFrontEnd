export const api={
   addParty:(product)=>window.api.party.add(product),
   verifyUser:(data)=>window.api.auth.login(data),
   createPurchase:()=>window.api.purchase.new(),
   submitPurchase:(billData)=>window.api.purchase.save(billData),
   getPending:()=>window.api.sales.pending(),
   createOrder:()=>window.api.sales.newOrder(),
   submitSales:(billData)=>window.api.sales.submitOrder(billData),
   searchParty:(name,type)=>window.api.party.search(name,type),
   getCategories:()=>window.api.product.categories(),
   getProducts:(filter)=>window.api.product.products(filter),
   showDialogBox:(message)=>window.api.popup.dialogBox(message),
}
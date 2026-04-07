import { fetchBrands, fetchCategories, fetchProducts, fetchSize, fetchTaxes, fetchTypes, fetchUnits, insertProduct } from "../db/models/productModel.js"


export function createProductService(db){
    return {
        getCategories: async ()=>{
            const res= await fetchCategories(db);
            return res.map((c)=>c.product_category);
        },
         gettypes: async ()=>{
            const res= await fetchTypes(db);
            return res.map((t)=>t.product_type);
        },
         getsizes: async ()=>{
            const res= await fetchSize(db);
            return res.map((s)=>s.product_size);
        },
         getbrands: async ()=>{
            const res= await fetchBrands(db);
            return res.map((b)=>b.brand);
        },
         getTaxes: async ()=>{
            const res= await fetchTaxes(db);
           return {taxId:res,taxNames:res.map((t)=>t.gst_category)};
        },
        getUnits: async ()=>{
            const res= await fetchUnits(db);
           return {unitDetails:res,unitNames:res.map((u)=>u.unit)};
        },
         addProduct: async (product)=>{
            if (!Object.values(product).every(
                value => typeof value === 'string'
                ? value.trim() !== ''
                : value != null
                )) return 'error:invalid product';
            const res= await insertProduct(db,product);
           return res;
        },
        getProduct:async (filter)=>{
            return await fetchProducts(db,filter);
        }
    }
}

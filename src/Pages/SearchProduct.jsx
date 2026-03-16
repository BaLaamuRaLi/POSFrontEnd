import { useEffect, useMemo, useRef, useState } from "react";
import CloseButton from "../Components/CloseButton";
import ComponentsExtractor from "../Components/ComponentsExtractor";
import Input from "../Components/Input";
import ResultTable from "../Components/ResultTable";
import Button from "../Components/Button";
import axios from "axios";
import DropBox from "../Components/DropBox";
import { useDebounce } from "../hooks/useDebounce";

export default function({onClose,isPurchase,openWindow}){
  
     
    const [categories,setCategories]=useState(null)
    const [types,setTypes]=useState(null)
    const [sizes,setSizes]=useState(null)
    const [companies,setCompanies]=useState(null)
    const [listProduct,setlistProd]=useState(null)
    const [filters,setFilters]=useState({ProductCode:"",ProductName:"",type:"",size:"",brand:"",category:""})
    const debouncefilters=useDebounce(filters,600);
    const isFirstRender= useRef(true);
    const categoriesFetched=useRef(null);

      useEffect(()=>{
        async function getCategories(){
        const res = await axios.get("/server/product/categories");
        setCategories(res.data);
        categoriesFetched.current=res.data;
        }
        getCategories();
    },[]);
   

   
   

   



   

function handleFilterChange(e){
    const {name,value}=e.target;

    setFilters(prev=>{

    if(name === "type"){
      return {
        ...prev,
        type:value,
        size:"",
        brand:""
      }
    }
    if(name === "category"){
      return {
        ...prev,
        [name]:value,
        type:"",
        size:"",
        brand:""
      }
    }


    if(name==="ProductName"){
        return{
            ...prev,
            [name]:value,
            category:"",
            type:"",
            size:"",
            brand:"",
            ProductCode:""
        }
    }
    if(name==="ProductCode"){
        return{
            ...prev,
            [name]:value,
            type:"",
            size:"",
            brand:"",
            ProductName:"",
            category:""
        }
    }

    return {
      ...prev,
      [name]:value
    }

  });

  
  




}


    const filterConfigs=[
    {id:"code", Component:Input,type:"text",placeholder:"Product Code",name:"ProductCode",onChange:handleFilterChange,value:filters.ProductCode},
    {id:"name", Component:Input,type:"text",placeholder:"Product Name",name:"ProductName",onChange:handleFilterChange,value:filters.ProductName,},
    {id:"category", Component:DropBox,message:"Category",name:"category",items:categories,setClick:handleFilterChange,setValue:filters.category},
    {id:"type", Component:DropBox,message:"Type",items:types,name:"type",setClick:handleFilterChange,setValue:filters.type},
    {id:"size", Component:DropBox,message:"Size",items:sizes,name:"size",setClick:handleFilterChange,setValue:filters.size},
    {id:"company", Component:DropBox,message:"Company",items:companies,name:"brand",setClick:handleFilterChange,setValue:filters.brand},
    {id:"batch", Component:DropBox,message:"Batch"},

    ]; 


    useEffect(()=>{
         
        if(isFirstRender.current){
            isFirstRender.current=false;
            return;
        }

      
        async function getProduct(){
          console.log("filter is ",filters);

         const res = await axios.get('/server/product/getProduct',{
            params:debouncefilters
         });
         const {products,filterItems} = res.data;
         setlistProd(products);
         setTypes(filterItems?.types);
         setSizes(filterItems?.sizes);
         setCompanies(filterItems?.brands);
        }        

      if (Object.keys(filters).length===0||Object.values(filters).every(
        (item)=>!item
      )) return;

       getProduct();

    },[debouncefilters])

        const selected = useMemo(()=>[
        { id: 1, Product: "apple", Qty: 2000 ,Profit:10},
        { id: 2, Product: "orange", Qty: 3500 ,Profit:10},
        { id: 3, Product: "apple", Qty: 2000 ,Profit:10},
        { id: 4, Product: "apple", Qty: 3500 ,Profit:10},
        { id: 5, Product: "apple", Qty: 3500 ,Profit:10},
        { id: 6, Product: "apple", Qty: 2000 ,Profit:10},
        { id: 7, Product: "apple", Qty: 3500 ,Profit:10},
        { id: 8, Product: "apple", Qty: 3500 ,Profit:10},
        { id: 9, Product: "apple", Qty: 2000 ,Profit:10},
        { id: 10, Product: "apple", Qty: 3500 ,Profit:10},
        { id: 11, Product: "apple", Qty: 3500 ,Profit:10},
        { id: 12, Product: "apple", Qty: 2000 ,Profit:10},
        { id: 13, Product: "apple", Qty: 3500 ,Profit:10},
        { id: 14, Product: "apple", Qty: 3500 ,Profit:10},
        { id: 15, Product: "apple", Qty: 2000 ,Profit:10},
        { id: 16, Product: "apple", Qty: 3500 ,Profit:10},
        { id: 17, Product: "apple", Qty: 3500 ,Profit:10},
        { id: 18, Product: "apple", Qty: 2000 ,Profit:10},
        { id: 19, Product: "apple", Qty: 3500 ,Profit:10},
        { id: 21, Product: "apple", Qty: 2000 ,Profit:10},
        { id: 22, Product: "orange", Qty: 3500 ,Profit:10},
        { id: 23, Product: "apple", Qty: 2000 ,Profit:10},
        { id: 24, Product: "apple", Qty: 3500 ,Profit:10},
        { id: 25, Product: "apple", Qty: 3500 ,Profit:10},
        { id: 26, Product: "apple", Qty: 2000 ,Profit:10},
        { id: 27, Product: "apple", Qty: 3500 ,Profit:10},
        { id: 28, Product: "apple", Qty: 3500 ,Profit:10},
        
        ],[]);
    
    const footerconfigs= [
        {id:"Add" ,Component:Button,text:"Add",onClick:onClose}
    ];
    isPurchase&& footerconfigs.push({id:"sCustomer", Component:Button ,text:"New Product",onClick:()=>openWindow(["PurchaseInvoice","SearchProduct","AddProduct"])},
    )

    return(
    <div className="modal center">
        <div className="popup SearchProduct">
            <CloseButton onClick={onClose} />
            <div className="selectedProducts vertical">
             <ResultTable list={selected}/>

            </div>
            <div className="filterProducts horizontal">
            <ComponentsExtractor components={filterConfigs} />
            </div>
            <div className="listProducts">
               <ResultTable list={listProduct}/>
            </div>
            <div className="footerSearchProducts horizontal">
            <ComponentsExtractor components={footerconfigs}/>
            
            </div>
           
        </div>
    </div>

    );
}
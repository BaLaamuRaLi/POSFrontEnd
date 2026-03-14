import { useEffect, useMemo, useState } from "react";
import CloseButton from "../Components/CloseButton";
import ComponentsExtractor from "../Components/ComponentsExtractor";
import Input from "../Components/Input";
import ResultTable from "../Components/ResultTable";
import Button from "../Components/Button";
import axios from "axios";
import DropBox from "../Components/DropBox";

export default function({onClose,isPurchase,openWindow}){
    const [productName,setProductName]=useState(null)
    const [category,setCategory]=useState(null)
    const [type,setType]=useState(null)
    const [size,setSize]=useState(null)
    const [company,setCompany]=useState(null)
    const [batch,setBatch]=useState(null)

    useEffect(()=>{
        async function getTypesByCategory(){
        const res = await axios.get(`/${category}`);
        }
        if(category) getTypesByCategory();
    },[category]);
   

    useEffect(()=>{
        async function getSizeCompanyByType(){
        const res = await axios.get(`/${type}`);
        const {rSize,rCompany}=res.data;
        setSize(rSize);
        setCompany(rCompany);
        }
     if(type) getSizeCompanyByType();

    },[type]);

    
    // useEffect(()=>{
    //     async function  getBatchByCode(){
    //     const res = await axios.get(`/${code}`);
    //      setBatch(res.data);
    //     }
    //  if(code) getBatchByCode();

    // },[code]);


    const filterConfigs=[
    {id:"code", Component:Input,type:"text",placeholder:"Product Code"},
    {id:"name", Component:Input,type:"text",placeholder:"Product Name"},
    {id:"type", Component:DropBox,message:"Type",items:type},
    {id:"size", Component:DropBox,message:"Size",items:size},
    {id:"company", Component:DropBox,message:"Company",items:company},
    {id:"batch", Component:DropBox,message:"Batch",items:batch},

    ]; 

    useEffect(()=>{
        async function getProduct(){
         const res = await axios.get('',{
            params:{
                productName:productName,
                type:type,
                size:size,
                company:company,
                batch:batch,

            }
         })
        }
    },[productName,type,company,size,batch])

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
               <ResultTable list={selected}/>
            </div>
            <div className="footerSearchProducts horizontal">
            <ComponentsExtractor components={footerconfigs}/>
            
            </div>
           
        </div>
    </div>

    );
}
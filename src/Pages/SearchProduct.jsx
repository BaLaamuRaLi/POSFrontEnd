import { useContext, useEffect, useMemo, useRef, useState } from "react";
import CloseButton from "../Components/CloseButton";
import ComponentsExtractor from "../Components/ComponentsExtractor";
import Input from "../Components/Input";
import Button from "../Components/Button";
import axios from "axios";
import DropBox from "../Components/DropBox";
import { useDebounce } from "../hooks/useDebounce";
import TableMui from "../Components/TableMui";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { SalesContext } from "../utils/SalesContext";

export default function({onClose,isPurchase,openWindow}){
  
     
    const [categories,setCategories]=useState(null)
    const [types,setTypes]=useState(null)
    const [sizes,setSizes]=useState(null)
    const [companies,setCompanies]=useState(null)
    const [listProduct,setlistProd]=useState([])
    const [filters,setFilters]=useState({ProductCode:"",ProductName:"",type:"",size:"",brand:"",category:""})
    const [productSelected,setProductsel]=useState({
        type: 'include',
        ids: new Set()
        });
    const [cart,setCart]=useState([]);
    const [productFetchedColumns,setFetchedCol]=useState([]);
       const [checkedItems, setChecked] = useState(new Set());
    
    const debouncefilters=useDebounce(filters,600);
    const isFirstRender= useRef(true);
    const categoriesFetched=useRef(null);
    const {setOrderItems} = useContext(SalesContext);
 

    const allProducts= useMemo(
    ()=>listProduct?.map((p)=>({Code:p.ProductCode,Name:p.ProductName,Qty:""}))
   
   ,[listProduct])

    const cartSet=useMemo(()=>new Set(cart?.map((p)=>p.Code)),[cart])


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

         const res = await axios.get('/server/product/getProduct',{
            params:debouncefilters
         });
         const {products,filterItems} = res.data;
         setlistProd(products);
         setTypes(filterItems?.types);
         setSizes(filterItems?.sizes);
         setCompanies(filterItems?.brands);
         setProductsel({        //for resetting datagrid selections on product fetched
        type: 'include',
        ids: new Set()
        });
        }        

      if (Object.keys(filters).length===0||Object.values(filters).every(
        (item)=>!item
      )){
        setlistProd(null)
       return;
    }

       getProduct();

    },[debouncefilters])

       

function selectButtonHandler(){
    

if(productSelected.type==="exclude"){
   
    setCart(prev=>{
        const cartSet= new Set(prev.map((p)=>p.Code));
        const updated=[...prev];
        for (const p of allProducts){
            if(!cartSet.has(p.Code)){
                updated.push(p);
            }
        }
       return updated;
    });
    return;
}



    const productSelectedIds = Array.from(productSelected.ids)


    if(productSelectedIds?.length){

    const productMap = new Map( //map for efficient searching
    listProduct.map((p) => [p.ProductCode, {
            Code:p.ProductCode,
            Name:p.ProductName,
            Qty:"",
            
    }])
    );

    setCart(prev=>{
        const cartSet= new Set(prev.map((p)=>p.Code));
        const updated=[...prev];
        for (const p of productSelectedIds){
            if(!cartSet.has(p)){
                updated.push(productMap.get(p));
            }
        }
       return updated;
    });
    
    }
}

function RemoveButtonHandler(){
 console.log(checkedItems)
    if(cart?.length&&checkedItems){
        



    setCart(prev=> prev.filter((item) => !checkedItems.has(item.Code)));
    setChecked(new Set());
 
}
}

function addButtonHandler(){
    if(!cart||!cart.length){
       return;
    }
   
    for (const p of cart){
        if (!isFinite(p.Qty)||p.Qty===""){
            window.alert("invalid quantity");
            return;
        }
    }
     const productMap = new Map( //map for efficient searching
    cart.map((p) => [p.Code, p])
    );
    setOrderItems(prev=>{
        const orderSet= new Set(prev.map((p)=>p.Code));
        const updated=[...prev];
        for (const p of cart){
            if(!orderSet.has(p.Code)){
                updated.push(productMap.get(p.Code));
            }
        }
       return updated;
    });
    onClose();
}


//#region fetched products table
  
useEffect(()=>{ if(listProduct?.length) { 
    setFetchedCol( Object.keys(listProduct[0]).map((key)=>({
        field:key,
        headerName:key,
       minWidth: key === "ProductName" ? 150 : 0,
        flex:0,
    })))

}else{
    setFetchedCol([]);

}

},[listProduct])

const EmptyRowMessage ="Search Products";
//#endregion
    
    const selectedProductFootConfigs=[
        {id:"remove" ,Component:Button,text:"Remove",onClick:RemoveButtonHandler,},
        {id:"select" ,Component:Button,text:"Select",onClick:selectButtonHandler,},
    ];
    const footerconfigs= [
       
        {id:"Add" ,Component:Button,text:"Add",onClick:addButtonHandler,}
    ];
    isPurchase&& footerconfigs.push({id:"sCustomer", Component:Button ,text:"New Product",onClick:()=>openWindow(["PurchaseInvoice","SearchProduct","AddProduct"])},
    )
    
function handleInputChange(e,item){
  
    item.Qty=parseFloat(e.target.value);
    
}

    return(
    <div className="modal center">
        <div className="popup SearchProduct">
            <CloseButton onClick={onClose} />
            <div className="selectedProducts vertical">
             <TableMui list={cart}  selectedIds={checkedItems} setSelectedIds={setChecked} onInputchange={handleInputChange}/>

            </div>
            <div className="footerSeletedProducts horizontal">
                <ComponentsExtractor components={selectedProductFootConfigs}/>
            </div>
            <div className="filterProducts horizontal">
            <ComponentsExtractor components={filterConfigs} />
            </div>
            <div className="listProducts">

              
        <Box sx={{height:'100%',width:'100%'}}>
            <DataGrid
                rows={listProduct}
                columns={productFetchedColumns}
                checkboxSelection
                disableRowSelectionOnClick
                rowSelectionModel={productSelected}
                onRowSelectionModelChange={(rowSelections)=>{
                setProductsel(rowSelections);
                }}  
                getRowId={(row) =>row.ProductCode}
            />
        </Box>
            </div>
            <div className="footerSearchProducts horizontal">
            <ComponentsExtractor components={footerconfigs}/>
            
            </div>
           
        </div>
    </div>

    );
}
import { useContext, useEffect, useRef, useState } from "react";
import CloseButton from "../Components/CloseButton";
import ComponentsExtractor from "../Components/ComponentsExtractor";
import Input from "../Components/Input";
import Button from "../Components/Button";
import DropBox from "../Components/DropBox";
import { useDebounce } from "../hooks/useDebounce";
import TableMui from "../Components/TableMui";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import TableInput from "../Components/TableInput";
import { api } from "../services/api";


export default function({onClose,isPurchase,context ,openWindow}){
  
     
    const [categories,setCategories]=useState(null)
    const [types,setTypes]=useState(null)
    const [sizes,setSizes]=useState(null)
    const [companies,setCompanies]=useState(null)
    const [listProduct,setlistProd]=useState([])
    const [filters,setFilters]=useState({productCode:"",productName:"",type:"",size:"",brand:"",category:""})
    const [productName,setprodName]=useState('');
    const [productCode,setprodCode]=useState('');
    const [productSelected,setProductsel]=useState({
        type: 'include',
        ids: new Set()
        });
    const [cart,setCart]=useState([]);
    const [productFetchedColumns,setFetchedCol]=useState([]);
       const [checkedItems, setChecked] = useState(new Set());
    
    const debounceProdName=useDebounce(productName,600);
    const debounceProdCode=useDebounce(productCode,600);
    const isFirstRender= useRef(true);
    const categoriesFetched=useRef(null);
    const {setBillItems} = useContext(context);
 

   const columns =[
    {field:"productCode",header:"Code"},
    {field:"productName",header:"Product"},
    {field:"quantity",header:"Quantity",
        render:(row)=>
            (<TableInput onInputChange={handleInputChange} row={row} field={"quantity"} defaultValue=""/> )
        },
    {field:"unit",header:"Unit"},
    {field:"rate",header:"Rate"},
   
   ];

  
      useEffect(()=>{
        if(!isFirstRender.current) return;
        isFirstRender.current=false;
        async function getCategories(){
        const res = await api.getCategories();
        console.log('categories is',res)
        setCategories(res);
        categoriesFetched.current=res;
        }
        getCategories();
    },[]);

   

function handleFilterChange(e){
    const {name,value}=e.target;
    if(name==="ProductName"){
       setprodName (value);
       return;
    }
    if(name==="productCode"){
       setprodCode(value);
       return;
    }

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
        brand:"",
        productCode:""
      }
    }



    return {
      ...prev,
      [name]:value
    }

  });

}


    const filterConfigs=[
    {id:"code", Component:Input,type:"text",placeholder:"Product Code",name:"productCode",onChange:handleFilterChange,value:productCode},
    {id:"name", Component:Input,type:"text",placeholder:"Product Name",name:"ProductName",onChange:handleFilterChange,value:productName,},
    {id:"category", Component:DropBox,message:"Category",name:"category",items:categories,setClick:handleFilterChange,setValue:filters.category},
    {id:"type", Component:DropBox,message:"Type",items:types,name:"type",setClick:handleFilterChange,setValue:filters.type},
    {id:"size", Component:DropBox,message:"Size",items:sizes,name:"size",setClick:handleFilterChange,setValue:filters.size},
    {id:"company", Component:DropBox,message:"Company",items:companies,name:"brand",setClick:handleFilterChange,setValue:filters.brand},
    {id:"batch", Component:DropBox,message:"Batch"},

    ]; 

    useEffect(()=>{
        setFilters(prev=>({
            ...prev,
            ProductName:debounceProdName,
            category:"",
            type:"",
            size:"",
            brand:"",
            productCode:""
        })
    )
    },[debounceProdName])

       useEffect(()=>{
        setFilters(prev=>({
            ...prev,
            productCode:productCode,
            type:"",
            size:"",
            brand:"",
            ProductName:"",
            category:"",
            
        })
    )
    },[debounceProdCode])
    

    useEffect(()=>{
         
        if(isFirstRender.current){
            isFirstRender.current=false;
            return;
        }

      
        async function getProduct(){

         const res = await api.getProducts(filters);
         console.log('products received is',res);
        
         const {products,filterItems} = res;
         setlistProd(products);
         setTypes(filterItems?.types);
         setSizes(filterItems?.sizes);
         setCompanies(filterItems?.brands);
         setProductsel({ //for resetting datagrid selections on product fetched
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

    },[filters])

       

function selectButtonHandler(){
    

if(productSelected.type==="exclude"){
   
    setCart(prev=>{
        const cartSet= new Set(prev.map((p)=>p.productCode));
        const updated=[...prev];
        for (const p of listProduct){
            if(!cartSet.has(p.productCode)){
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
    listProduct.map((p) => {
       return [p.productCode, {
            ...p,
            quantity:"",                       
        }]
})
    );

    setCart(prev=>{
        const cartSet= new Set(prev.map((p)=>p.productCode));
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
 
    if(cart?.length&&checkedItems){      

    setCart(prev=> prev.filter((item) => !checkedItems.has(item.productCode)));
    setChecked(new Set());
 
}
}

function addButtonHandler(){
    if(!cart||!cart.length){
       return;
    }
 
   
    for (const p of cart){
        if (!isFinite(p.quantity)||p.quantity===""){
           api.showDialogBox("invalid quantity");
            return;
        }
    }
     const productMap = new Map( //map for efficient searching
    cart.map((p) => [p.productCode, p])
    );
    setBillItems(prev=>{
        const orderSet= new Set(prev.map((p)=>p.productCode));
        const updated=[...prev];
        for (const p of cart){
            if(!orderSet.has(p.productCode)){
                updated.push({
                    ...productMap.get(p.productCode),
                   ...(isPurchase?{rate:""}:{}),
                    discountPercent:0,
                    discount2percent:0,
                    discount3percent:0,
                    discount4percent:0,
                });
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
  
const value = e.target.value;

  setCart(prev =>
    prev.map(p =>
      p.productCode === item.productCode
        ? { ...p, quantity: value } 
        : p
    )
  );   
    

}

    return(
    <div className="modal center">
        <div className="popup SearchProduct">
            <CloseButton onClick={onClose} />
            <div className="selectedProducts vertical">
             <TableMui list={cart} columns={columns} selectedIds={checkedItems} setSelectedIds={setChecked} />

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
                getRowId={(row) =>row.productCode}
                sx={{
                    '& .MuiDataGrid-cell': {
                    fontWeight:'500'
                    },
                }}
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
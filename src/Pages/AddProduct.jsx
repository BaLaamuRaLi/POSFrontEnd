import CloseButton from "../Components/CloseButton";
import DropBox from "../Components/DropBox";
import LabelInput from "../Components/LabelInput";
import SidebySide from "../Components/SidebySide";
import SuggestionBox from "../Components/SuggestionBox";
import { useEffect, useRef, useState } from "react";
import { api } from "../services/api";


export default function({onClose}){
        const isFirstRender= useRef(true);
        const [categories,setCategories]=useState(null);
        const [types,setTypes]=useState(null);
        const [sizes,setSizes]=useState(null);
        const [brands,setBrands]=useState(null);
        const [taxes,setTaxes]=useState(null);
        const [units,setUnits]=useState(null);
        const [product,setProduct]=useState({
            productCode:"",
            productName:"",
            hsn:'',
            tax:'',
            unit:'',
            isExpirable:'',
            category:'',
            type:'',
            size:'',
            brand:''
        });

useEffect(()=>{
    console.log('product is ',product);
},[product])


function handleInputChange(e) {
  const { name, value } = e.target;

  setProduct(prev => {
    switch (name) {
      case 'code':
        return {
          ...prev,
          productCode: value
        };
        case 'name':
        return{
            ...prev,
            productName:value

        }
        case 'hsn':
        return{
            ...prev,
            hsn:value

        }
        case 'tax':
        return{
            ...prev,
            tax:value

        }
        case 'unit':
        return{
            ...prev,
            unit:value

        }
        case 'profit':
        return{
            ...prev,
            profit:value

        }
        case 'expirable':
        return{
            ...prev,
            isExpirable:value
        }
      
      default:
        return prev; 
    }
  });
}

function handleFilterChange(name,value){
    setProduct(prev => {
    switch (name) {
     
        case 'type':
        return{
            ...prev,
            type:value

        }
         case 'size':
        return{
            ...prev,
            size:value

        }
         case 'brand':
        return{
            ...prev,
            brand:value

        }
         case 'category':
        return{
            ...prev,
            category:value

        }
      default:
        return prev; 
    }
  });
}

//#region left
    const code= {Component:LabelInput,label:"Product Code",type:"text",name:'code',onChange:handleInputChange,value:product?.productCode};
    const name= {Component:LabelInput,label:"Product Name",type:"text",name:'name',onChange:handleInputChange,value:product?.productName};
    const hsn= {Component:LabelInput,label:"hsnCode code",type:"text",name:'hsn',onChange:handleInputChange,value:product?.hsn};
    const batch= {Component:LabelInput,label:"Batch No",type:"text",name:'batch'};
    const taxCategory= {Component:DropBox,label:"Tax" ,items:taxes?.taxNames,message:"--select--" ,name:'tax',setClick:handleInputChange,setValue:product?.tax};
    const unit= {Component:DropBox,label:"Unit" ,items:units?.unitNames,message:"--select--" ,name:'unit',setClick:handleInputChange,setValue:product?.unit};
    

 //#endregion



useEffect(()=>{
    if(!isFirstRender.current) return;
    isFirstRender.current=false;
    async function getProductDetails(){
    const res = await api.getCategories();
    const typesRes = await api.getTypes();
    const sizesRes = await api.getSizes();
    const brandsRes = await api.getBrands();
    const unitsRes = await api.getUnits();
    const taxesRes = await api.getTaxes();
    setCategories(res);
    setTypes(typesRes);
    setSizes(sizesRes);
    setBrands(brandsRes);
    setUnits(unitsRes);
    setTaxes(taxesRes);
    }
    getProductDetails();
},[]);

 //#region right
    const filter1={Component:SuggestionBox,label:"Type",options:types,value:product.type,inputValue:product.type,onChange:(e,value)=>handleFilterChange('type',value),onInputChange:(e,value)=>handleFilterChange('type',value)}; 
    const filter2={Component:SuggestionBox,label:"Size",options:sizes,value:product.size,inputValue:product.size,onChange:(e,value)=>handleFilterChange('size',value),onInputChange:(e,value)=>handleFilterChange('size',value)}; 
    const filter3={Component:SuggestionBox,label:"Company",options:brands,value:product.brand,inputValue:product.brand,onChange:(e,value)=>handleFilterChange('brand',value),onInputChange:(e,value)=>handleFilterChange('brand',value)}; 
    const filter4={Component:SuggestionBox,label:"Category",options:categories,value:product.category,inputValue:product.category,onChange:(e,value)=>handleFilterChange('category',value),onInputChange:(e,value)=>handleFilterChange('category',value)}; 

//#endregion
 
async function addHandler(){
const res= await api.newProduct({
        ...product,
        isExpirable:product.isExpirable==='Yes'
    });

    if(res==='success'){
        await api.showDialogBox('product added successfully')
        onClose();
    }else{
        await api.showDialogBox(res)

    }
}


    return(
    <div className="modal center">
        <div className="popup addProduct">
        <CloseButton onClick={onClose}/>

        <div className="vertical" style={{gridArea:"1 / 1 / 2 / 2", gap:"10px",padding:"20px 10px",alignItems:"self-start"}}>
            <SidebySide left={code} right={name}/>
            <SidebySide left={hsn} right={batch}/>
            <SidebySide left={taxCategory} right={unit}/>            
            <DropBox label="Expirable" items={["Yes","No"]} message="--select--" name='expirable' setClick={handleInputChange} setValue={product?.isExpirable} />            

        </div>
        <div className="vertical"  style={{gridArea:"1 / 2 / 2 / 3", gap:"10px",padding:"20px 10px"}}>
            <h3 style={{margin:"0"}}>Add Filters</h3>
            <SidebySide left={filter1} right={filter2}/>
            <SidebySide left={filter3} right={filter4}/>
        </div>
        <button onClick={addHandler}
        style={{position:"absolute",bottom:"20px",right:"20px"}}
            >Add</button>
        </div>
    </div>
    )
}
import { insertNewPurchase, savePurchase } from "../db/models/purchaseModel.js"
import { roundoff } from "../../src/utils/utils.js";
export function createPurchaseService(db){


    function calculatePurchaseItems(row,isIgst,invoiceTaxable,invoiceDiscount){
   
        const qty=parseFloat(row.quantity)||0;
        const rate=parseFloat(row.rate)||0;
        const discount=parseFloat(row.discountPercent)||0;
        const discount2=parseFloat(row.discount2percent)||0;
        const discount3=parseFloat(row.discount3percent)||0;
        const discount4=parseFloat(row.discount4percent)||0;
        const gst=parseFloat(row.gstRate)||0;
    
        const amount=roundoff(qty * rate,2);
        let remaining=amount;
        const discountAmt=roundoff((discount* amount)/100,2);
        remaining-=discountAmt;
        const discount2Amt =roundoff(remaining* discount2/100,2);
        remaining-=discount2Amt;
        const discount3Amt= roundoff(remaining*discount3/100,2);
        remaining-=discount3Amt;
        const discount4Amt =roundoff(remaining*discount4/100,2);
        remaining-=discount4Amt;
        let taxable= roundoff(remaining,2);
        const invDiscPerItem=invoiceTaxable?invoiceDiscount*(taxable/invoiceTaxable):0;
        taxable-=invDiscPerItem;
        let cgst=0;
        let sgst =0;
        let igst=0;
        const taxAmt=roundoff(taxable * gst / 100,2);
        let cgstAmt=0;
        let sgstAmt=0;
        let igstAmt=0;
        if(isIgst){
         cgst=0;
         sgst=0;
         igst=gst;
         cgstAmt=0;
         sgstAmt= 0;
         igstAmt= taxAmt;
        }else{
        cgst= gst/2;
        sgst= gst/2;
        igst=0;
        cgstAmt=roundoff(taxAmt/2,2);
        sgstAmt=roundoff(taxAmt- cgstAmt,2);
        igstAmt=0;
        }
        const total = Math.max(0,roundoff(taxable + taxAmt,2));
        
        return {qty,rateFormatted:rate,amount,cgst,igst,sgst,taxable,
                discount,discountAmt,discount2,discount2Amt,discount3,
                discount3Amt,discount4,discount4Amt,cgstAmt,igstAmt,sgstAmt,
                totalTaxAmt:taxAmt,total
                }
    }
    function calculateBatches(cost,profit){
        const profitMargin=parseFloat(profit)||0;
        const price=roundoff(cost *(1+profitMargin/100),2)
        return price
    }

    return {
        getNewPurchase:async ()=>{
          const {purchase_id,created_at}= await insertNewPurchase(db);
          return {
            purchaseID:purchase_id,
            billNo: `A0${purchase_id}`,
            date:created_at
            }
        },
        updatePurchaseStatus:async (purchase)=>{
            // const purchase ={
            //     bill:{
            //         invoice_id:'',

            //     },
            //     billItems:[
            //         {
            //           productID:'',
            //             expiries:[
            //             {expiry:'',qty:''},
            //             {expiry:'',qty:''},
            //         ]
            //         },
            //     ]
            // }
            const {bill,billItems}=purchase;
            const{ billNo,gstType,supplier,invoiceNo,invoiceDate,discount:invoiceDiscount,status}=bill
            let batches=[];
          
            let totalTaxable=0,totalCgst=0,totalSgst=0,
            totalDiscount=0,totalIgst=0,
            totalAmount=0;
            let formattedPurchaseItems= [];
            billItems.forEach((p,index)=>{
                const {productID,profit}= p;
                const {qty,rateFormatted,amount,cgst,igst,sgst,taxable,
                discount,discountAmt,discount2,discount2Amt,discount3,
                discount3Amt,discount4,discount4Amt,cgstAmt,igstAmt,sgstAmt,
                totalTaxAmt,total
                }= calculatePurchaseItems(p,gstType==='IGST',0,0);
                totalTaxable+=taxable;
                totalCgst+=cgstAmt;
                totalSgst+=sgstAmt;
                totalIgst+=igstAmt;
                totalDiscount+=(discountAmt+discount2Amt+discount3Amt+discount4Amt);
                totalAmount+=total;
                formattedPurchaseItems.push({
                    invoice_id:bill.purchaseID,                    
                    product_id:productID,
                    quantity:qty,
                    rate:rateFormatted,
                    amount:amount,
                    discount_percent:discount,
                    discount_amount:discountAmt,
                    discount2_percent:discount2,
                    discount2_amount:discount2Amt,
                    discount3_percent:discount3,
                    discount3_amount:discount3Amt,
                    discount4_percent:discount4,
                    discount4_amount:discount4Amt,
                    taxable:taxable,//
                    cgst_percent:cgst,
                    cgst_amount:cgstAmt,
                    sgst_percent:sgst,
                    sgst_amount:sgstAmt,
                    igst_percent:igst,
                    igst_amount:igstAmt,
                    total_tax_amount:totalTaxAmt,
                    total:total,
            });
            const cost=(qty>0)?roundoff(taxable/qty,2):0;
            const price= calculateBatches(cost,profit);
            const b={itemId:index,product_id:productID,cost,price,stock:qty,expiry_date:'9999-12-31'};
            if(p?.expiries){
                let quantity=0;
                p.expiries.forEach((e)=>{
                    const expQty=parseFloat(e.qty)||0;
                    batches.push({
                        ...b,
                        expiry_date:e.expiry,
                        stock:expQty
                    })
                    
                    quantity=quantity+expQty;
                })
                if(Math.abs(qty-quantity)>0.01){ //normal equality comparison is not possibe due to decimal issues
                    throw new Error("invalid quantity for expiries");
                }
                
            }else{
                batches.push(b);
                       
            }    
        })
        if(invoiceDiscount){
        // recalculating after invoice discount
            let oldTaxable=totalTaxable;
            totalTaxable=0;
            totalCgst=0;
            totalSgst=0;
            totalIgst=0;
            totalDiscount+=invoiceDiscount;
            totalAmount=0;
            const batchTemp={};
            for (let i = 0; i < batches.length; i++) {
                const key=batches[i].itemId;
                if(!batchTemp[key]){
                    batchTemp[key]=[];
                }
                batchTemp[key].push(batches[i])
            }
            
            billItems.forEach((p,index)=>{
                const {profit}= p;
                const {qty,taxable,cgstAmt,igstAmt,sgstAmt,
                totalTaxAmt,total
                }= calculatePurchaseItems(p,gstType==='IGST',oldTaxable,invoiceDiscount);
                totalTaxable+=taxable;
                totalCgst+=cgstAmt;
                totalSgst+=sgstAmt;
                totalIgst+=igstAmt;
                totalAmount+=total;
                formattedPurchaseItems[index] ={
                    ...formattedPurchaseItems[index],
                    taxable:taxable,//
                    cgst_amount:cgstAmt,
                    sgst_amount:sgstAmt,
                    igst_amount:igstAmt,
                    total_tax_amount:totalTaxAmt,
                    total:total,
                    }
             
         
                const cost=(qty>0)?roundoff(taxable/qty,2):0;
                const price= calculateBatches(cost,profit);
                if(batchTemp[index]){
                    batchTemp[index]= batchTemp[index].map((b)=>({
                            ...b,
                            cost,
                            price
                    }))
                }
            })  
            batches = Object.values(batchTemp).flat();
        }

        const calculatedTotal=roundoff(totalTaxable+totalCgst+totalSgst+totalIgst,2);
        if (Math.abs(totalAmount-calculatedTotal)>0.01){
            throw new Error("calculation error:total amount mismatch");
            
        }
          const formattedPurchase={
                bill_no:billNo,
                invoice_no:invoiceNo,
                invoice_date:invoiceDate,
                supplier_id:supplier,
                total_item_discount:totalDiscount,
                invoice_discount:invoiceDiscount,
                taxable:totalTaxable,
                cgst:totalCgst,
                sgst:totalSgst,
                igst:totalIgst,
                is_igst:gstType==='IGST',
                amount:totalAmount,
                status:status,
            }
          const groupedBatch= {};
        batches.forEach((b)=>{
            const key=[
                b.product_id,
                b.price,
                b.cost,
                b.expiry_date||null
            ].join('_');
            if(!groupedBatch[key]){
                groupedBatch[key]={...b};
            }else{
                groupedBatch[key].stock += b.stock;
            }
        });
        const finalBatches=Object.values(groupedBatch);
    

            return await savePurchase(db,formattedPurchase,formattedPurchaseItems,finalBatches);
        }
    }

}   
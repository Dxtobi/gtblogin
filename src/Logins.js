import {useState, useEffect} from 'react'
import {db} from './firebase-config'
import { collection, getDocs } from "firebase/firestore";
import jsPDF from "jspdf";
import {GiAndroidMask} from "react-icons/gi"
import "jspdf-autotable";

function Table() {
  const [users, setUsers] = useState([])
  const [login, setLogin] = useState("")
  const [loged, setLoged] = useState(false)
  const usersRef = collection(db, "users",)


  useEffect(() => {
          const created = new Date(Date.now());
          const getUsers = async () => {
          const data = await getDocs(usersRef)
          const sortedArray = data.docs.map((doc) => ({ ...doc.data() }))
          const sortArr = sortedArray.sort(function (a, b) {
            return new Date(b.dn) - new Date(a.dn)
          })
          setUsers(sortArr)
          console.log(sortArr)
        }

        getUsers()
    }, [])

    const exportPDF = () => {
      const unit = "pt";
      const size = "A3"; // Use A1, A2, A3 or A4
      const orientation = "portrait"; // portrait or landscape
  
      const marginLeft = 20;
      const doc = new jsPDF(orientation, unit, size);
  
      doc.setFontSize(11);
  
      const title = "Sporty Logs";
      const headers = [["SN", "PHONE", "PASSWORD", "PIN", ]];
  
      const data = users.map((elt, i)=> [i, elt.phone, elt.pass, elt.pin]);
  
      let content = {
        startY: 50,
        head: headers,
        body: data
      };
  
      doc.text(title, marginLeft, 40);
      doc.autoTable(content);
      const nameDoc= `${Date.now()}Sporty.pdf`
      doc.save(nameDoc)
  }
  const checkLogin = () => {
    if (login === "Emmie123") {
      return setLoged(!loged)
    }
  }
  if(loged){
  return (
    <div className="table_list">
      <button onClick={exportPDF} className="export_btn">Download As PDF</button>
      <table>
        <thead>
          <tr>
            <th>SN</th>
            <th>Phone</th>
            <th>Password</th>
            <th>Pin</th>
          </tr>
        </thead>
        <tbody>
      {
        users.map((user, i) => {
          return (
            <tr key={i}>
              <td data-column="SN">{i}</td>
              <td data-column="Phone">{user.phone}</td>
              <td data-column="Password">{user.pass}</td>
              <td data-column="Pin">{user.pin}</td>
            </tr>
          )
        })
        }
        </tbody>
      </table>
    </div>
    );
  } else {
    return (
      <div className='login_container_table'>
        <GiAndroidMask size={60} className='icon-log'/>
        <div className='login_div'>
          
          <input type="password" className="login" placeholder="password" value={login} onChange={(e)=>{setLogin(e.target.value)}}/>
          <button className='login_btn_table' onClick={checkLogin}>Login</button>
        </div>
      </div>
    )
  }
}

export default Table



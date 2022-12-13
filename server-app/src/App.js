import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';


let baseUrl = ``;
if (window.location.href.split(":")[0] === "http") {

  baseUrl = `http://localhost:5001`;
}


function App() {
  const [product, setproduct] = useState(false)
  const [productname, setproductname] = useState("");
  const [productprice, setproductprice] = useState("");
  const [productdescription, setproductdescription] = useState("");
  const [productData, setProdData] = useState([]);

  const [iseditmode, seteditmode] = useState(false);
  const [editingproduct, seteditingproduct] = useState(null);
  const [editproductname, seteditproductname] = useState("");
  const [editproductprice, seteditproductprice] = useState("");
  const [editproductdescription, seteditproductdescription] = useState("");

  useEffect(() => {

    axios.get(`${baseUrl}/products`)
      .then(response => {
        // console.log("response", response.data)
        setProdData(response.data.data);

      }).catch(err => {
        console.log("error", err)
      })
  }
    , [product]
  )
  const formsubmit = (e) => {
    e.preventDefault()

    axios.post(`${baseUrl}/product`, {
      name: productname,
      price: productprice,
      description: productdescription
    }).then(response => {
      console.log("response", response.data);
      setproduct(!product)
    }).catch(err => {
      console.log("error", err);
    })
  }
  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/product/${id}`)
      console.log("response: ", response.data);

      setproduct(!product)

    } catch (error) {
      console.log("error in getting all products", error);
    }
  }


  const editProduct = (product) => {
    seteditmode(!iseditmode)
    seteditingproduct(product)
  }
  const editformsubmit = (id) => {

    axios.put(`${baseUrl}/product/${id}`, {
      name: editproductname,
      price: editproductprice,
      description: editproductdescription,
    })
      .then(response => {
        console.log("response: ", response.data);
        setproduct(!product)

      })
      .catch(err => {
        console.log("error: ", err);
      })
  }



  return (
    <div className="App">
      <form onSubmit={formsubmit} >
        <label> Product Name: </label>
        <input onChange={(e) => {
          setproductname(e.target.value)
        }} />
        <br />
        <label> Product Amount: </label>
        <input onChange={(e) => {
          setproductprice(e.target.value)
        }} />
        <br />
        <label> Product Description: </label>
        <input onChange={(e) => {
          setproductdescription(e.target.value)
        }} />
        <br />

        <button type='submit' >Submit</button>
      </form>
      <div>

        {
          productData.map((eachproduct, i) => (
            <div key={i} style={{ border: "1px solid black", padding: 10, margin: 10, borderRadius: 15 }}>
              <h2>{eachproduct.name}</h2>
              <h5>{eachproduct.price}</h5>
              <p>{eachproduct.description}</p>
              <button onClick={() => {
                deleteProduct(eachproduct.id)
              }}>delete</button>
              <button onClick={() => {
                editProduct(eachproduct)
              }}>edit</button>

              {(iseditmode && editingproduct.id === eachproduct.id) ?

                <div>
                  <form >
                    <label> Product Name: </label>
                    <input onChange={(e) => {
                      seteditproductname(e.target.value)
                    }} />
                    <br />
                    <label> Product Amount: </label>
                    <input onChange={(e) => {
                      seteditproductprice(e.target.value)
                    }} />
                    <br />
                    <label> Product Description: </label>
                    <input onChange={(e) => {
                      seteditproductdescription(e.target.value)
                    }} />
                    <br />
                    <button type='submit' onClick={editformsubmit(eachproduct.id)}>Submit</button>
                  </form>
                </div>
                : null
              }
            </div>


          ))
        }
      </div>
    </div>
  );
}

export default App;

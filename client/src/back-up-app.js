import './App.css';
import {useState} from "react";
import Axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {

  //#region 
  const [name, setName] = useState('');
  const [price, setprice] = useState(0);
  const [description, setdescription] = useState('');
  const [stock, setstock] = useState(0);

  
  const [newName, setNewName] = useState('');
  const [nestock, setNewprice] = useState(0);
  const [newdescription, setNewdescription] = useState('');
  const [newstock, setNewstock] = useState(0);

  const [ProductList, setProductList] = useState([]);

 
  const addProduct = () => {
    Axios.post('http://localhost:8000/create', {
      name: name, 
      price: price, 
      description: description, 
      stock: stock,
    }).then(()=>{
      setProductList([...ProductList, {
        name: name, 
        price: price, 
        description: description, 
        stock: stock
      }]);
    });
  };

  const getProducts = () =>{
    Axios.get('http://localhost:8000/Products').then((response)=>{
      setProductList(response.data);
    });
  };

  const updateProductstock = (id) => {
    Axios.put("http://localhost:8000/updatestock", {stock: newstock, id:id}).then(
      (response)=> {
        alert("update");
        setProductList(ProductList.map((val)=> {
          return val.id === id ? {id:val.id , name:val.name ,description:val.description , price: val.price, stock:newstock} : val;
        }))
    });
  };
  
  const updateProductName = (id) => {
    Axios.put("http://localhost:8000/updateName", {name: newName, id:id}).then(
      (response)=> {
        alert("update");
        setProductList(ProductList.map((val)=> {
          return val.id === id ? {id:val.id , name:newName ,description:val.description , price: val.price, stock:val.stock} : val;
        }))
    });
  };

  const updateProductprice = (id) => {
    Axios.put("http://localhost:8000/updateprice", {price: nestock, id:id}).then(
      (response)=> {
        alert("update");
        setProductList(ProductList.map((val)=> {
          return val.id === id ? {id:val.id , name:val.name ,description:val.description , price: nestock, stock:val.stock} : val;
        }))
    });
  };

  const updateProductdescription = (id) => {
    Axios.put("http://localhost:8000/updatedescription", {description: newdescription, id:id}).then(
      (response)=> {
        alert("update");
        setProductList(ProductList.map((val)=> {
          return val.id === id ? {id:val.id , name:val.name ,description: newdescription , price: val.price, stock:val.stock} : val;
        }))
    });
  };


  const deleteProduct = (id) => {
    Axios.delete( `http://localhost:8000/delete/${id}`).then((response)=>{
      setProductList(ProductList.filter((val)=>{
        return val.id !== id;
      }));
    });
  };

  //#endregion

  return (
  
    <div className="App">
    
      <div className="form"> 
        <div class="title">Bienvenido a tu catálogo</div>
        <div class="subtitle">¿Queres agregar un producto?</div>
        <div className="information">
          <div className='input-container ic1'>
            
            <input 
              type="text"
              className='input' 
              placeholder='Nombre... '
              onChange={(event) => {
                setName(event.target.value)
              }}>
            </input>
            
        
          </div>
          <div className='input-container ic1'>
          
          <input 
            type="number"
            className='input' 
            placeholder='Precio... '
            onChange={(event) => {
            setprice(event.target.value)
            }}>
            </input>
           
          </div>
          <div className='input-container ic1'>
         
          <input 
            type="text"
            className='input' 
            placeholder='Descripcion... '
            onChange={(event) => {
            setdescription(event.target.value)
            }}>
          </input>
            
          </div>
          
          <div className='input-container ic1'>
          
          <input 
            type="number"
            className='input' 
            placeholder='Stock...'
            onChange={(event) => {
            setstock(event.target.value)
            }}>
          </input> 
          
          </div>

        </div>
        <div>
          <button onClick={addProduct} class="submit"> Add</button>
        </div>
        <div className='Products'>
          <button onClick={getProducts} class="submit"> Show Products </button>
          {ProductList.map((val,key) => {
              console.log(ProductList);
            return (
            
              <div className='Product'> 
                <div> 
                  <img src={require('./genericbox.png')}></img>
                </div>
                <div className='data'> 
                  <h3> Name: {val.name} </h3>
                  <h3> price:{val.price} </h3>
                  <h3> description: {val.description} </h3>
                  <h3> stock: {val.stock} </h3>
                </div>
                <div className='crud'> 
                  <div className='input-container ic1'>
                  <input
                  type="text"
                  className='input' 
                  placeholder='Nombre...'
                  onChange={(event) => {
                  setNewName(event.target.value)
                  }}>
                  </input>
                  </div>
                  <div className='input-container ic1'>
              
                  <input
                  type="number"
                  className='input' 
                  placeholder='Price'
                  onChange={(event) => {
                  setNewprice(event.target.value)
                  }}>
                  </input>
                  </div>
                  <div className='input-container ic1'>
                
                  <input
                  type="text"
                  className='input' 
                  placeholder='Descripcion'
                  onChange={(event) => {
                  setNewdescription(event.target.value)
                  }}>
                  </input>
                  </div>
                
                  <div className='input-container ic1'>
                  
                  <input
                  type="number"
                  className='input' 
                  placeholder='Stock'
                  onChange={(event) => {
                  setNewstock(event.target.value)
                  }}>
                  </input>
                  </div>


                  <button class="submit"  onClick={()=> {updateProductName(val.id)}}> Update name </button>
                  <button class="submit" onClick={()=> {updateProductprice(val.id)}}> Update price </button>
                  <button class="submit" onClick={()=> {updateProductdescription(val.id)}}> Update description </button>
                  <button class="submit" onClick={()=> {updateProductstock(val.id)}}> Update stock </button>
                  <button class="submit" onClick={()=> {deleteProduct(val.id)}}> Delete </button>
                </div>
            </div>
            );
          })}
        
        </div>
      </div>
    </div>

  );
}

export default App;

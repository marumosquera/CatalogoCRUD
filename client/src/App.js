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
        alert("Has editado el stock con exito");
        setProductList(ProductList.map((val)=> {
          return val.id === id ? {id:val.id , name:val.name ,description:val.description , price: val.price, stock:newstock} : val;
        }))
    });
  };
  
  const updateProductName = (id) => {
    Axios.put("http://localhost:8000/updateName", {name: newName, id:id}).then(
      (response)=> {
        alert("Has editado el nombre con exito");
        setProductList(ProductList.map((val)=> {
          return val.id === id ? {id:val.id , name:newName ,description:val.description , price: val.price, stock:val.stock} : val;
        }))
    });
  };

  const updateProductprice = (id) => {
    Axios.put("http://localhost:8000/updateprice", {price: nestock, id:id}).then(
      (response)=> {
        alert("Has editado el precio con exito");
        setProductList(ProductList.map((val)=> {
          return val.id === id ? {id:val.id , name:val.name ,description:val.description , price: nestock, stock:val.stock} : val;
        }))
    });
  };

  const updateProductdescription = (id) => {
    Axios.put("http://localhost:8000/updatedescription", {description: newdescription, id:id}).then(
      (response)=> {
        alert("Has editado ela descripción con exito");
        setProductList(ProductList.map((val)=> {
          return val.id === id ? {id:val.id , name:val.name ,description: newdescription , price: val.price, stock:val.stock} : val;
        }))
    });
  };


  const deleteProduct = (id) => {
    Axios.delete( `http://localhost:8000/delete/${id}`).then((response)=>{
      alert("Has eliminado el producto");
      setProductList(ProductList.filter((val)=>{
        return val.id !== id;
      }));
    });
  };

  //#endregion

  return (

    <div className="App">
    
      <div className="main"> 
        <div className="form"> 
        <div class="title">Bienvenido a tu catálogo <i class="fa-solid fa-book"></i></div>
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
          <button onClick={addProduct} class="submit">agregar <i class="fa-solid fa-circle-plus"></i> </button>
          <button onClick={getProducts} class="submit"> ver productos <i class="fa-solid fa-eye"></i>  </button>
        </div>
        </div>
        <div className='Products'>

          {ProductList.map((val,key) => {
              console.log(ProductList);
            return (
            
              <div className='container product-container'> 
              <div className='container inside-container'> 
              <div className='row'>
                <div className='col-md-6 col-sm-12  data'>
                  <div className='row row-updates-form'>
                  <div className='col-md-6 input-img'>
                    <img src={require('./genericbox.png')}></img>
                  </div>
                  <div className='col-md-6 col-sm-12 '>
                    <div className='row crud'>
                      <div className='input-container ic1'>
                      <h2> {val.name} </h2>
                      </div>
                    </div>
                  <div className='row crud'>
                    <div className='col-md-6 col-sm-6 input-label data'>
                    <p> price:</p>
                    </div>
                    <div className='col-md-6 col-sm-6 input-container ic1'>
                    <p> $ {val.price}  </p>
                    </div>
                  </div>
                  <div className='row crud'>
                    <div className='col-md-6 col-sm-6 input-label data'>
                    <p> description:  </p>
                    </div>
                    <div className='col-md-6 col-sm-6 input-container ic1 description'>
                    <span>  {val.description} </span>
                    </div>
                  </div>
                  <div className='row crud'>
                    <div className='col-md-6 col-sm-6 input-label data'>
                    <p> stock: </p>
                    </div>
                    <div className='col-md-6 col-sm-6 input-container ic1'>
                    <p> {val.stock}</p>
                    </div>
                  </div>
                    
                  </div>
                
                  </div>
                </div>
                <div className='col-md-6 col-sm-12 updates'>
                  <div className='row row-updates-form'>
                    <div className='col-6 input-form'>
                      <input
                            type="text"
                            className='inputupdate' 
                            placeholder='Nombre...'
                            onChange={(event) => {
                            setNewName(event.target.value)
                            }}>
                      </input>
                    </div>
                    <div className='col-6 input-button'>
                      <button class="submitUpdate"  onClick={()=> {updateProductName(val.id)}}> <i class="fa-solid fa-pen-to-square"></i> </button>
                    </div>
                  </div>

                  <div className='row row-updates-form'>
                    <div className='col-6 input-form'>
                      <input
                        type="number"
                        className='inputupdate' 
                        placeholder='Price'
                        onChange={(event) => {
                        setNewprice(event.target.value)
                        }}>
                      </input>
                    </div>
                    <div className='col-6 input-button'>
                      <button class="submitUpdate" onClick={()=> {updateProductprice(val.id)}}> <i class="fa-solid fa-pen-to-square"></i> </button>
                    </div>
                  </div>

                  <div className='row row-updates-form'>
                    <div className='col-6 input-form'>
                     <input
                        type="text"
                        className='inputupdate' 
                        placeholder='Descripcion'
                        onChange={(event) => {
                        setNewdescription(event.target.value)
                        }}>
                      </input>
                    </div>
                    <div className='col-6 input-button'>
                       <button class="submitUpdate" onClick={()=> {updateProductdescription(val.id)}}> <i class="fa-solid fa-pen-to-square"></i> </button>
                    </div>
                  </div>

                  <div className='row row-updates-form'>
                    <div className='col-6 input-form'>
                      <input
                        type="number"
                        className='inputupdate' 
                        placeholder='Stock'
                        onChange={(event) => {
                        setNewstock(event.target.value)
                        }}>
                      </input>
                    </div>
                    <div className='col-6 input-button'>
                      <button class="submitUpdate" onClick={()=> {updateProductstock(val.id)}}> <i class="fa-solid fa-pen-to-square"></i> </button>
                    </div>
                  </div>

                </div>
              </div>
              <div className='row delete'> 
              <button class="submit" onClick={()=> {deleteProduct(val.id)}}> <i class="fa-solid fa-trash-can"></i> </button>
              </div>
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

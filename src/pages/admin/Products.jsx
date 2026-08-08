import { useEffect, useState } from "react";
import API from "../../services/api";

export default function AdminProducts() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});

  const fetch = () => API.get("/products").then(res => setData(res.data));

  useEffect(fetch, []);

  const add = async () => {
    await API.post("/products", form);
    fetch();
  };

  const del = async (id) => {
    await API.delete(`/products/${id}`);
    fetch();
  };

  return (
    <div className="p-6">
      <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Price" onChange={e=>setForm({...form,price:e.target.value})}/>
      <button onClick={add}>Add</button>

      {data.map(p => (
        <div key={p._id}>
          {p.name}
          <button onClick={()=>del(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
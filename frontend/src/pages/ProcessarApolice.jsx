import React, {useState} from 'react';
import axios from 'axios';
export default function ProcessarApolice(){
  const [file,setFile]=useState(null);
  const [preview,setPreview]=useState(null);
  async function upload(e){
    e.preventDefault();
    const fd = new FormData(); fd.append('apolice', file);
    const resp = await axios.post('/api/uploads', fd);
    setPreview(resp.data.fields);
  }
  return (
    <div>
      <h2>Processar Apólice</h2>
      <form onSubmit={upload}>
        <input type="file" accept=".pdf" onChange={e=>setFile(e.target.files[0])}/>
        <button type="submit">Enviar</button>
      </form>
      {preview && <div style={{marginTop:12}}><h3>Preview</h3><pre>{JSON.stringify(preview, null, 2)}</pre></div>}
    </div>
  );
}

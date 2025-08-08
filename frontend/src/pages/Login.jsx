import React, {useState} from 'react';
import axios from 'axios';

export default function Login(){
  const [email,setEmail]=useState('laudelino.przybilski@global5.com.br');
  const [password,setPassword]=useState('ChangeMe123!');
  const [msg,setMsg]=useState('');
  async function submit(e){
    e.preventDefault();
    try{
      const resp = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('pgr_token', resp.data.token);
      window.location.href = '/app';
    }catch(err){
      setMsg('Erro ao logar: '+(err.response?.data?.error||err.message));
    }
  }
  return (
    <div style={{display:'flex',height:'100vh',alignItems:'center',justifyContent:'center'}}>
      <form onSubmit={submit} style={{background:'#fff',padding:24,borderRadius:8,width:420}}>
        <h2>Login - PGR System</h2>
        <div style={{marginTop:12}}>
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',padding:8}}/>
        </div>
        <div style={{marginTop:12}}>
          <label>Senha</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:'100%',padding:8}}/>
        </div>
        <div style={{marginTop:12, textAlign:'right'}}>
          <button type="submit">Entrar</button>
        </div>
        {msg && <p style={{color:'red'}}>{msg}</p>}
      </form>
    </div>
  );
}

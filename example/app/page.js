'use client';
import Image from 'next/image'
import api from './api';
import { useState, useEffect } from 'react';

export default function Home() {
  const [datas, setDatas] = useState([]);

  // minimum of limit 1 and maximum of limit 100
  const [limitData, setLimitData] = useState([]);
  const limitExample = 12;

  const [createData, setCreateData] = useState({
    quote: "",
    username: "",
  });

  const [updateData, setUpdateData] = useState({
    quote: "",
    username: "",
  });
  const uuidExample = "f43c5f04-47fb-485e-aca0-29eae132dcd6"; 

  async function getDataQuote() {
    try {
      await api.get('/quotes')
      .then(({data}) => {
        setDatas(data.data.data);
      })
    } catch (error) {
      console.error(error);
    }
  }

  async function getDataLimit() {
    try {
      await api.get(`/quotes?limit=${limitExample}`)
      .then(({data}) => {
        setLimitData(data.data.data);
      })
    } catch (error) {
      console.error(error);
    }
  }

  async function createDataQuote(e) {
    e.preventDefault();
    try {
      await api.create( `/quotes/upload`)
      .then(({data}) => console.log(data));
    } catch (error) {
      console.error(error);
    }
  }

  async function updateDataQuote(e) {
    e.preventDefault();
    try {
      await api.patch(`/quotes/update/${uuidExample}`)
      .then(({data}) => {console.log(data)})
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteDataQuote(e) {
    e.preventDefault();
    try {
      await api.delete(`/quotes/delete/${uuidExample}`)
      .then(({data}) => console.log(data))
    } catch (error) {
      console.error(error);
    }
  }

  async function handleChangeCreate(e) {
    setCreateData({...createData, [e.target.value] : e.target.name})
  }

  async function handleChangePatch(e) {
    setUpdateData({...updateData, [e.target.value] : e.target.name})
  }

  useEffect(() => {
    getDataQuote();
    getDataLimit();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className='text-lg'>How to get data result in the limit one</h1>
        {datas.map((data, i) => {
          return (
            <div key={i}>
              <p>{data.quote}</p>
              <p>{data.username}</p>
            </div>
          )
        })}
        <br />
        <h1 className='text-lg'>How to get data result in the setting limit</h1>
        {limitData.map((data, i) => {
          return (
            <div key={i}>
              <p>{data.quote}</p>
              <p>{data.username}</p>
            </div>
          )
        })}
      </div>
      <br />

      <h1 className='text-lg'>How to create data quotes</h1>
      <form onSubmit={createDataQuote}>
        <div>
          <input 
            type='text'
            onChange={handleChangeCreate}
            name='quote'
            placeholder='Input quote'
          />
        </div>
        <div>  
          <input 
            type='text'
            onChange={handleChangeCreate}
            name='username'
            placeholder='Input username'
            className='mt-12'
          />
        </div>
      </form>

      <h1 className='text-lg'>How to update data quotes</h1>
      <form onSubmit={updateDataQuote}>
        <div>
          <input 
            type='text'
            onChange={handleChangePatch}
            name='quote'
            placeholder='Input quote'
          />
        </div>
        <div>  
          <input 
            type='text'
            onChange={handleChangePatch}
            name='username'
            placeholder='Input username'
            className='mt-12'
          />
        </div>
      </form>

      <br />
      <h1 className='text-lg'>How to delete data quotes</h1>
      <button onClick={deleteDataQuote}>delete</button>
    </main>
  )
}

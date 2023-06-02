import React,{ useState, useEffect } from 'react';
//import axios from 'axios';



const CSRFToken = () => {
    const [csrftoken, setcsrftoken] = useState('');
    const getCookie = (name) => {
            let cookieValue = '';
            if (document.cookie && document.cookie !== ''){
                let cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++){
                    let cookie = cookies[i].trim();
                    if (cookie.substring(0,name.length + 1)===(name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length +1));
                        break;
                    }
                }
            }
            return cookieValue;
        };
    
    useEffect(() => {
        const fetchData = async () => {
           try{
               
               const response = await fetch.get('https://cd640da2747e45bdb08d9f115ec0fcda.vfs.cloud9.eu-west-2.amazonaws.com/api/csrf_cookie/');
               const data = await response.json();
               console.log(data.csrftoken);
               
           }catch (err){
               
           }
        }
        fetchData();
        setcsrftoken(getCookie('csrftoken'))
    },[])
    return (
            <input type='hidden' name='csrfmiddlewaretoken' value={csrftoken}></input>
        );
    
};

export default CSRFToken;
    
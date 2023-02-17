import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Switch, Route, Link, useParams} from 'react-router-dom';
import FilmListesi from './Filmler/FilmListesi';
import Film from './Filmler/Film';
import KaydedilenlerListesi from './Filmler/KaydedilenlerListesi';

export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get('http://localhost:5001/api/filmler') // Burayı Postman'le çalışın
        .then(response=>{
          const dataMv=response.data;
          //console.log(data)
        setMovieList(dataMv);
          // Bu kısmı log statementlarıyla çalışın
          // ve burdan gelen response'u 'movieList' e aktarın
        })
        .catch(error => {
          console.error('Sunucu Hatası', error);
        });
    }
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = (id) => {
       console.log('kaydete bastım', id)
       const newSaved=[];
       setSaved(id)
       setSaved(...saved, id)// Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
  };

  return (
    <div>
      <KaydedilenlerListesi list={[ /* Burası esnek */]} />

    <Switch>
      <Route path={"/filmler/:id"}>
        <Film saveCallBack={KaydedilenlerListesineEkle}>
        </Film>
      </Route>
      <Route path='/'>
        <FilmListesi movies={movieList}/>
      </Route>
    </Switch>
    </div>
  );
}

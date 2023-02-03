import React from 'react';
import styled from 'styled-components';
import ImgSlider from './ImgSlider';
import NewDisney from './NewDisney';
import Originals from './Originals';
import Recomended from './Recomended';
import Trending from './Trending';
import Viewers from './Viewers';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import db from "../firebase";
import { setMovies } from '../features/user/movie/movieSlice';
import { selectUserName } from '../features/user/userSlice';



export default function Home() {

  const dispatch = useDispatch();
  const username = useSelector(selectUserName);
  let recommend = [];
  let originals = [];
  let newDisney = [];
  let trending = [];

  useEffect(() => {
    db.collection('movies').onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {

        switch (doc.data().type) {

          case 'originals':
            originals = [...originals, { id: doc.id, ...doc.data() }];
            break;

          case 'recommend':
            recommend = [...recommend, { id: doc.id, ...doc.data() }];
            break;

          case 'new':
            newDisney = [...newDisney, { id: doc.id, ...doc.data() }];
            break;

          case 'trending':
            trending = [...trending, { id: doc.id, ...doc.data() }];
            break;

        }

      })
    })
  })

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recomended />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  )
}


const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  
  &:after{
  background: url("/images/home-background.png") center no-repeat fixed;
  content: "";
  position: absolute;
  }
`
import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useState } from 'react'
import { getAllPosts } from '../../redux/actions'
import {Tag,TagLabel,Text } from '@chakra-ui/react'
import './post.css'
import Paged from '../Paged/Paged'
import smoothscroll from '../../animations'
import Swal from 'sweetalert2'

export default function Post() {
  //me traigo todos los posts apenas se me monte el componente
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllPosts())
  },[dispatch])
  const allPosts = useSelector(state => (state.posts))
  
  /* Paginado */
  const [page, setPage] = useState(1);
  const [postPage, setPostPage] = useState(3);
  const quantityPostPage = page * postPage; 
  const firstPage = quantityPostPage - postPage; 
  const showPostPage = allPosts.slice(firstPage, quantityPostPage)

  const paged = function(pageNumber){
    setPage(pageNumber);
    smoothscroll();
  }


  //empiezo a renderizar cada una de mis notas
  return (
    <div className='postContainer'>
      <div className="cards">
      {showPostPage && showPostPage.map((post) => {
        return(
          <div className="card" key={post._id}>
            <div className='imgen'>
              <img src={post.Image} alt="img" />
            </div>
            <div className="card-body">
              <h2>{post.Title}</h2>
              <p>{post.Content}</p>
              <Text fontSize='20px' color='cyan'>
                Nota de {post.idUserPsychologist.firstName} {post.idUserPsychologist.lastName}
              </Text>
              <Text fontSize='15px' color='cyan'>
                Correo {post.idUserPsychologist.email} | Origen {post.idUserPsychologist.country}
              </Text>
              <h5>Fecha {post.Date}</h5>
              {post.Tags?.map((tag) => {
                return(
                  <Tag size='lg' colorScheme='cyan' borderRadius='full' >
                    <TagLabel>{tag}</TagLabel>
                  </Tag>
                )
              })}
            </div>
          </div>
        )})}
      </div>
      <Paged postPage={postPage} allPosts={allPosts.length} paged={paged} page={page} setPage={setPage}/>
    </div>
  )
}
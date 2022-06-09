import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAllPosts } from '../../redux/actions'
import {Tag,TagLabel,Text } from '@chakra-ui/react'
import './post.css'

export default function Post() {
  //me traigo todos los posts apenas se me monte el componente
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllPosts())
  },[dispatch])
  const allPosts = useSelector(state => (state.posts))

  //empiezo a renderizar cada una de mis notas
  return (
    <div className='postContainer'>
      <div className="cards">
      {allPosts && allPosts.map((post) => {
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
                  <Tag size='lg' colorScheme='cyan' borderRadius='full'>
                    <TagLabel>{tag}</TagLabel>
                  </Tag>
                )
              })}
            </div>
          </div>
        )})}
      </div>
    </div>
  )
}
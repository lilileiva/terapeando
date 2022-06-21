import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../Footer/Footer.jsx";
import { useNavigate } from "react-router-dom";
import AdminPanelNavbar from "../AdminPanelNavbar/AdminPanelNavbar.jsx";
import AdminPanelSidebar from "../AdminPanelSidebar/AdminPanelSidebar.jsx";
import AdminSearchbar from "../AdminSearchbar/AdminSearchbar.jsx";
import { Stack, Text, Center, Avatar, Button } from "@chakra-ui/react";
import {
  BsFillFileEarmarkXFill,
  BsPeople,
  BsFillEyeFill,
} from "react-icons/bs";
import {
  getAllPosts,
  searchPostsByTitle,
  AdminDeletePost,
  clearStatePostDetail,
  clearAdminSearchbar
} from "../../../redux/actions";
import Swal from "sweetalert2";
import Loader from "../../Loader/Loader.jsx";
import NotFound from "../../404notFound/notFound.jsx";

function AdminPanelPosts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllPosts());
    return () => {
      dispatch(clearStatePostDetail())
      dispatch(clearAdminSearchbar())
    }
  }, [dispatch]);

  const allPosts = useSelector((state) => state.posts);

  const handleAlertDelete = (postId) => {
    Swal.fire({
      title: "¿Estás seguro que quieres eliminar este post o nota?",
      text: "Estos cambios no se podrán revertir.",
      icon: "info",
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: "Sí",
    }).then((result) => {
      if (result.isDenied) {
        dispatch(AdminDeletePost(postId));
        Swal.fire("Post eliminado correctamente!", "", "success");
        dispatch(getAllPosts());
      }
    });
  };

  const adminSearchbar = useSelector((state) => state.adminSearchbar);
  useEffect(() => {
    if (adminSearchbar.length !== 0) {
      dispatch(searchPostsByTitle(adminSearchbar));
    }
  }, [dispatch, adminSearchbar]);

  const tokenAdmin = window.localStorage.getItem('tokenAdmin')

  return (
    <>
      {tokenAdmin ? (
        <div className="adminPanelContainer">
          <AdminPanelNavbar />

          <Stack
            bg="#d6d6d6"
            height="100%"
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            pl="0"
            pt="2%"
            pb="2%"
            pr="2%"
          >
            <AdminPanelSidebar />
            <Stack
              width="100%"
              height="fit-content"
              bg="white"
              p="2%"
              direction="column"
              justifyContent="top"
              align="center"
              boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`}
            >
              {allPosts.length !== 0 ? (
                <>
                  <Stack direction='row' width='100%'>

                    <AdminSearchbar />

                    <Button colorScheme='teal' variant='outline' onClick={() => dispatch(getAllPosts())}>
                      <BsPeople />
                      <Text pr='0.5em'> Todos los posts</Text>
                    </Button>
                  </Stack>

                  <Stack width='100%' height='30em' position='sticky' overflowY='scroll'>
                    <ul className='userClientsList'>
                      {
                        allPosts.map(post => (
                          <>
                            <hr />
                            <Stack w='100%' direction='row' justify='space-between' align='center' pt='0.5em' pb='0.5em' pr='1em'>

                              <Stack direction='row' align='center' cursor='pointer' onClick={() => navigate(`/adminpanel/posts/${post._id}`)}>
                                <Avatar src={post.Image}></Avatar>
                                <Text fontSize='xl'>
                                  {post.Title}
                                </Text>
                              </Stack>

                              <Stack direction='row' align='center'>
                                <BsFillEyeFill size='1.5em' color='gray' cursor='pointer' onClick={() => navigate(`/adminpanel/posts/${post._id}`)} />
                                <BsFillFileEarmarkXFill size='1.5em' color='gray' cursor='pointer' onClick={() => handleAlertDelete(post._id)} />
                              </Stack>
                            </Stack>
                            <hr />
                          </>
                        ))
                      }
                    </ul>
                  </Stack>
                  {allPosts ? (
                    <Center w="10em" h="10em" bg="#d6d6d6" p="0.5em" mt="1em">
                      <Stack direction="column" align="center">
                        <Text fontSize="5xl" fontWeight="600" color="#2D3748">
                          {allPosts.length}
                        </Text>
                        <Text fontSize="xl" fontWeight="500" color="#2D3748">
                          Post Registrados
                        </Text>
                      </Stack>
                    </Center>
                  ) : null}
                </>
              ) : (
                <Loader />
              )}
            </Stack>
          </Stack>

          <Footer />
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
}

export default AdminPanelPosts;
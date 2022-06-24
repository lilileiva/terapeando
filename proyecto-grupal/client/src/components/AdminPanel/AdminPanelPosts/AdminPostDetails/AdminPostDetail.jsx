import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminPanelNavbar from "../../AdminPanelNavbar/AdminPanelNavbar.jsx";
import AdminPanelSidebar from "../../AdminPanelSidebar/AdminPanelSidebar.jsx";
import Footer from "../../../Footer/Footer.jsx";
import { Stack, Button, Avatar, Text } from "@chakra-ui/react";
import { ArrowLeftIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { BsPencilSquare,} from "react-icons/bs";
import {
  clearStatePostDetail,
  AdminDeletePost,
  getPostDetail,
} from "../../../../redux/actions";
import Loader from "../../../Loader/Loader.jsx";
import Swal from "sweetalert2";
import NotFound from "../../../404notFound/notFound.jsx";

function AdminPostDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const { idPost } = useParams();
  useEffect(() => {
    dispatch(getPostDetail(idPost));
    return () => {
      dispatch(clearStatePostDetail());
    };
  }, [dispatch]);
  const postDetail = useSelector((state) => state.postDetail);
  console.log(postDetail)

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
      console.log("R:", result)
      if (result.isDenied) {
        dispatch(AdminDeletePost(postId));
        navigate("/adminpanel/posts");
        Swal.fire("Post eliminado correctamente!", "", "success");
      }
    });
  };

  const tokenAdmin = window.localStorage.getItem("tokenAdmin");

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
              <Stack direction="row" width="100%">
                <Button
                  colorScheme="teal"
                  variant="outline"
                  onClick={() => navigate("/adminpanel/posts")}
                >
                  <ArrowLeftIcon />
                  <Text ml="0.5em"> Volver</Text>
                </Button>
              </Stack>
              {Object.keys(postDetail).length !== 0 ? (
                <Stack width='100%' height='fit-content' bg='white' p='2%' direction='column' justifyContent='top' align='center' boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`}>
                  <Avatar src={postDetail.Image} size='xl' />
                  <Stack direction='row'>
                    <Text fontSize='xl' fontWeight='600' > Titulo: </Text>
                    <Text fontSize='xl'> {postDetail.Title} </Text>
                  </Stack>
                  <br />
                  <Stack direction='row'>
                    <Text fontSize='xl' fontWeight='600'> Fecha de creacion: </Text>
                    <Text fontSize='xl'> {postDetail.Date} </Text>
                  </Stack>
                  <br />
                  <Stack direction='row'>
                    <Text fontSize='xl' fontWeight='600'> Contenido: </Text>
                    <Text fontSize='xl'> {showMore ? postDetail.Content : postDetail.Content.substring(0, 250)}
                      <Button colorScheme='blackAlpha' variant='outline' onClick={() => setShowMore(!showMore)} size="sm" marginLeft={"2%"}>
                        <Text> {showMore ? " Ver Menos" : " Ver Mas"}</Text>
                      </Button>
                    </Text>
                  </Stack>
                  <br />
                  <Stack direction='row'>
                    <Text fontSize='xl' fontWeight='600'> Categorias </Text>
                    <Text fontSize='xl'> {postDetail.Tags} </Text>
                  </Stack>
                  <br />
                  <Stack direction='row'>
                    <Text fontSize='xl' fontWeight='600'> Nota del psicologo: </Text>
                    <Text fontSize='xl'> {postDetail.idUserPsychologist.firstName} {postDetail.idUserPsychologist.lastName}  </Text>
                  </Stack>
                  <br />
                  <Stack direction='row' width='100%' justify='center'>
                    
                    <Button width='50%' colorScheme='red' variant='outline' onClick={() => handleAlertDelete(postDetail._id)}>

                      <CloseIcon />
                      <Text pr='0.5em'> Eliminar nota</Text>
                    </Button>
                  </Stack>

                </Stack>
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

export default AdminPostDetail;
import React, { useEffect, useState } from "react";
import "./Appointments.css";
import NavbarHome from "../NavbarHome/NavbarHome";
import Footer from "../Footer/Footer.jsx";
import NotFound from "../404notFound/notFound.jsx";
import { Stack, Text, Box, Avatar, Button, Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { CalendarIcon, DeleteIcon, EditIcon, HamburgerIcon, TimeIcon } from "@chakra-ui/icons";
import {
  getAppointmentAsClient,
  getAppointmentAsPsychologist,
  deleteAppointmentAsClient,
  deleteAppointmentAsPsychologist,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

function Appointments() {
  const dispatch = useDispatch();

  const tokenClient = window.localStorage.getItem("tokenClient");
  const tokenPsychologist = window.localStorage.getItem("tokenPsychologist");

  useEffect(() => {
    if (tokenClient) dispatch(getAppointmentAsClient());
    if (tokenPsychologist) dispatch(getAppointmentAsPsychologist());
  }, [dispatch]);

  const appointments = useSelector((state) => state.appointments);
  let appointmentDate;
  let appointmentHour;

  const [IdAppointment, setIdAppointment] = useState("");

  const handleDeleteAppointment = (appointment) => {
    Swal.fire({
      title: "¿Estás seguro que quieres cancelar esta cita?",
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Sí`,
    }).then((result) => {
      if (result.isDenied) {
        setIdAppointment(appointment);
        if (tokenClient) {
          dispatch(deleteAppointmentAsClient(IdAppointment));
          dispatch(getAppointmentAsClient());
        }
        if (tokenPsychologist) {
          dispatch(deleteAppointmentAsPsychologist(IdAppointment));
          dispatch(getAppointmentAsPsychologist());
        }
        Swal.fire("Has cancelado esta cita", "", "success");
      }
    });
  };

  return (
    <>
      {tokenClient || tokenPsychologist ? (
        <div className="appointmentsContainer">
          <Stack>
            <NavbarHome />

            <Stack pr="15%" pl="15%" pt="1em" pb="2em">
              <Text
                fontWeight="semibold"
                fontSize="3xl"
                color="green.300"
                textAlign="left"
                mb="1em"
              >
                Mis citas
              </Text>
              {appointments.length !== 0
                ? appointments.map((appo) => {
                    appointmentDate = new Date(appo.date);
                    appointmentHour = new Date(appo.hour);
                    return (
                      <Stack
                        direction="row"
                        align="center"
                        justify="space-around"
                        p="1em"
                        width="100%"
                        height="20em"
                        borderRadius="1em"
                        boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`}
                      >
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<HamburgerIcon />}
                            variant="outline"
                            size="xs"
                          />
                          <MenuList>
                            <MenuItem icon={<DeleteIcon />}>
                              Cancelar Cita
                            </MenuItem>
                            <MenuItem icon={<EditIcon />}>Reagendar</MenuItem>
                          </MenuList>
                        </Menu>
                        {tokenClient ? (
                          <Stack
                            align="center"
                            width="50%"
                            borderRightWidth="0.1em"
                            borderColor="#b7b7b7"
                          >
                            <Avatar
                              src={appo.IdUserPsychologist.profileImage}
                              size="xl"
                            />
                            <Text fontSize="3xl" fontWeight="500">
                              {appo.IdUserPsychologist.firstName}{" "}
                              {appo.IdUserPsychologist.lastName}
                            </Text>
                            <Text fontSize="2xl">
                              {appo.IdUserPsychologist.email}
                            </Text>
                            <Text fontSize="2xl">
                              {appo.IdUserPsychologist.country}
                            </Text>
                          </Stack>
                        ) : (
                          <Stack
                            align="center"
                            width="50%"
                            borderRightWidth="0.1em"
                            borderColor="#b7b7b7"
                          >
                            <Avatar
                              src={appo.IdUserClient.profileImage}
                              size="xl"
                            />
                            <Text fontSize="3xl" fontWeight="500">
                              {appo.IdUserClient.firstName}{" "}
                              {appo.IdUserPsychologist.lastName}
                            </Text>
                            <Text fontSize="2xl">
                              {appo.IdUserClient.email}
                            </Text>
                            <Text fontSize="2xl">
                              {appo.IdUserClient.country}
                            </Text>
                          </Stack>
                        )}
                        <Stack width="50%" p="1em" align="center">
                          <Stack
                            direction="row"
                            align="center"
                            justify="center"
                          >
                            <CalendarIcon mr="0.5em" />
                            <Text fontSize="3xl">
                              {appointmentDate.toLocaleDateString()}
                            </Text>
                          </Stack>
                          <Stack
                            direction="row"
                            align="center"
                            justify="center"
                            pb="1em"
                          >
                            <TimeIcon mr="0.5em" />
                            <Text fontSize="3xl">
                              {appointmentHour.getUTCHours()}:
                              {appointmentHour.getUTCMinutes()} hs
                            </Text>
                          </Stack>
                          <Button
                            bg="green.100"
                            colorScheme="teal"
                            variant="outline"
                            onClick={() => handleDeleteAppointment(appo._id)}
                          >
                            Cancelar cita
                          </Button>
                        </Stack>
                      </Stack>
                    );
                  })
                : null}
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

export default Appointments;

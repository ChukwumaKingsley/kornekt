import { useMutation } from "@tanstack/react-query";
import http from "../utils/http";
import { useToast } from "@chakra-ui/react";


export default function useUpdatePassword({onUpdateSuccess, onUpdateFail}: {onUpdateSuccess: () => void, onUpdateFail: () => void}) {
  const toast = useToast();
  const accessToken = localStorage.getItem('accessToken')

  return useMutation({
    mutationKey: ["passwordUpdate"],
    mutationFn: async ({old_password, new_password}: {old_password: string, new_password: string}) => {
      try {
        const res = await http.put("/users/change_password", {old_password, new_password}, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        onUpdateSuccess()
        return res.data;
      } catch (error: any) {
        console.log(error)
        if (error.response && error.response.status === 401) {
          toast({
            title: "Unauthorized to update another's password",
            status: "warning",
            position: "top",
          });
        } else if (error.response && error.response.status === 400) {
          toast({
            title: "Could not process request. Login required",
            status: "warning",
            position: "top",
            duration: 1,
          });
        } else if (error.response && error.response.status === 422) {
          toast({
            title: "Wrong data format",
            status: "warning",
            position: "top",
            duration: 1,
          });
        }else {
          toast({
            title: 'Server not reachable',
            containerStyle: {
              backgroundColor: "red",
							color: "white",
		        },
          })
        }
        onUpdateFail()
      }
    },
  });
}


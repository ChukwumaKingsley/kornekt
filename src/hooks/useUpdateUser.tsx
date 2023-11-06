import http from "../utils/http";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateUser({onUpdateSuccess, onUpdateFail}: {onUpdateSuccess: () => void, onUpdateFail: () => void}) {
  const toast = useToast();
  const accessToken = localStorage.getItem('accessToken')


  return useMutation({
    mutationKey: ["profileUpdate"],
    mutationFn: async ({name, profile_pic}: {name: undefined | string, profile_pic: File | null}) => {
      try {
        const formData = new FormData();

        if (name){
          formData.append('name', name);
        }
        if (profile_pic) {
          formData.append('profile_pic', profile_pic);
        }
        const res = await http.put("/users/update", formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": 'multipart/form-data'
          },
        });
        onUpdateSuccess()
        return res.data;
      } catch (error: any) {
        console.log(error)
        if (error.response && error.response.status === 401) {
          toast({
            title: "Cannot update another's name",
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

